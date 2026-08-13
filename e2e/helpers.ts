import { expect, type Page } from "@playwright/test";

export function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  return errors;
}

export async function gotoHome(page: Page): Promise<void> {
  const response = await page.goto("/", { waitUntil: "load" });
  expect(response, "home page must respond").not.toBeNull();
  expect(response?.ok(), `home page HTTP ${response?.status()}`).toBeTruthy();
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

export function isCinematicVideoUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    const isVideo = /\.(mp4|webm|mov)$/i.test(pathname);
    return (
      isVideo &&
      (pathname.includes("/assets/cinematic/") ||
        pathname.includes("golden-identity"))
    );
  } catch {
    return false;
  }
}

export async function blockCinematicVideos(page: Page): Promise<void> {
  await page.route("**/*", async (route) => {
    if (isCinematicVideoUrl(route.request().url())) {
      await route.abort("failed");
      return;
    }

    await route.continue();
  });
}

export async function assertHeroNotBlack(page: Page): Promise<void> {
  const hero = page.getByRole("region", { name: "Hero" });
  await expect(hero).toBeVisible();

  const box = await hero.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThan(40);
  expect(box?.height ?? 0).toBeGreaterThan(40);

  const screenshot = await hero.screenshot({ animations: "disabled" });
  expect(screenshot.byteLength).toBeGreaterThan(500);

  const dataUrl = `data:image/png;base64,${screenshot.toString("base64")}`;
  const brightRatio = await page.evaluate(async (src) => {
    const image = new Image();
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("hero screenshot failed to decode"));
    });
    image.src = src;
    const decoded = await loaded;
    const canvas = document.createElement("canvas");
    canvas.width = decoded.naturalWidth;
    canvas.height = decoded.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx || canvas.width === 0 || canvas.height === 0) {
      return 0;
    }
    ctx.drawImage(decoded, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let bright = 0;
    const total = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      const luminance = (data[i]! + data[i + 1]! + data[i + 2]!) / 3;
      if (luminance > 24) {
        bright += 1;
      }
    }
    return bright / total;
  }, dataUrl);

  expect(
    brightRatio,
    "Hero cinematic area must not be an empty black frame",
  ).toBeGreaterThan(0.02);
}
