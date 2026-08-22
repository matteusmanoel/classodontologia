/**
 * Geometry-preserving placeholder for gated assets (ASSET_PLAN §19).
 * Renders a neutral dark or paper well at the required aspect ratio.
 * Dev-only: asset ID label visible in development.
 */

interface MediaWellProps {
  assetId?: string;
  aspectRatio?: string;
  /** "dark" (default) | "paper" */
  surface?: "dark" | "paper";
  className?: string;
}

export function MediaWell({
  assetId,
  aspectRatio = "4/5",
  surface = "dark",
  className,
}: MediaWellProps) {
  const bg =
    surface === "paper"
      ? "bg-[#e8e4dc]"
      : "bg-bg-surface";

  return (
    <div
      className={[
        "relative overflow-hidden",
        bg,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ aspectRatio }}
      aria-hidden="true"
    >
      {process.env.NODE_ENV === "development" && assetId ? (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-mono tracking-widest uppercase opacity-30 text-center px-4 text-text-secondary">
          {assetId}
        </span>
      ) : null}
    </div>
  );
}
