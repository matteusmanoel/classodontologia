import type { PrototypeVariant } from "@/components/ui/PrototypeSwitcher";

export const MANIFESTO_LINE_VARIANTS: PrototypeVariant[] = [
  { key: "a", label: "Plotter" },
  { key: "b", label: "Arco → horizonte" },
  { key: "c", label: "Fio no manifesto" },
  { key: "d", label: "Grade de proporção" },
  { key: "e", label: "Misto A+B+D" },
];

export type ManifestoLineVariantKey = "a" | "b" | "c" | "d" | "e";
