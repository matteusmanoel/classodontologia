/**
 * Method timeline — suggested evolutions of clinical instruments.
 * Copy describes the field, not a dated equipment inventory.
 * Fill `imageSrc` when real assets land; plates stay styled without them.
 */

import { mediaSlots } from "@/content/media";

export type MethodMotif = "face" | "scan" | "volume" | "form" | "proof";

export interface MethodBeat {
  id: string;
  era: string;
  from: string;
  to: string;
  title: string;
  body: string;
  motif: MethodMotif;
  assetId: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional muted loop over the plate (see content/media.ts). */
  videoSrc?: string;
}

export const methodBeats: MethodBeat[] = [
  {
    id: "face",
    era: "O olhar",
    from: "Observação",
    to: "Estudo da face",
    title: "O olhar",
    body: "Antes de qualquer instrumento, o tratamento começa na leitura da face — anatomia, proporção e o resultado que você reconhece como seu.",
    motif: "face",
    assetId: "method-face-01",
    imageSrc: "/assets/treatments/method-planning-v1.webp",
    imageAlt:
      "Estudo editorial de planejamento e precisão — imagem representativa",
  },
  {
    id: "scan",
    era: "O registro",
    from: "Molde e radiografia plana",
    to: "Escaneamento e volume 3D",
    title: "O registro",
    body: "A boca é registrada em modelo digital e a estrutura é vista em três dimensões. Mais conforto para você na cadeira — e mais fidelidade para quem planeja.",
    motif: "scan",
    assetId: "method-scan-01",
    ...(mediaSlots.methodLoops.scan.src
      ? { videoSrc: mediaSlots.methodLoops.scan.src }
      : {}),
  },
  {
    id: "proof",
    era: "A prova",
    from: "Ajuste no escuro",
    to: "Desenho digital e mock-up",
    title: "A prova",
    body: "A forma é desenhada e testada antes do tratamento. O mock-up antecipa o resultado para você ver — e para a equipe confirmar.",
    motif: "proof",
    assetId: "method-proof-01",
    ...(mediaSlots.methodLoops.proof.src
      ? { videoSrc: mediaSlots.methodLoops.proof.src }
      : {}),
  },
];
