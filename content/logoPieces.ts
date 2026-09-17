/**
 * Decomposed CLASS lockup — crop boxes from the source PNGs
 * (opaque-glyph bounds) so padded canvases sit as real letters.
 */

export const LOGO_DIR = "/assets/cinematic/logo/logo-decomposed";

export type GlyphCrop = {
  /** Canvas pixel box: x, y, width, height */
  box: readonly [number, number, number, number];
  canvas: readonly [number, number];
};

export const glyphCrop = {
  swirl: { box: [86, 297, 1082, 623], canvas: [1254, 1254] },
  c: { box: [295, 218, 675, 850], canvas: [1254, 1254] },
  l: { box: [442, 254, 425, 772], canvas: [1254, 1254] },
  lambda: { box: [205, 186, 813, 907], canvas: [1254, 1254] },
  s: { box: [325, 132, 587, 998], canvas: [1254, 1254] },
  a: { box: [175, 165, 872, 922], canvas: [1254, 1254] },
  d: { box: [343, 224, 569, 809], canvas: [1254, 1254] },
  g: { box: [363, 189, 521, 903], canvas: [1254, 1254] },
  i: { box: [533, 223, 188, 813], canvas: [1254, 1254] },
  n: { box: [336, 216, 581, 826], canvas: [1254, 1254] },
  o: { box: [355, 157, 538, 951], canvas: [1254, 1254] },
  t: { box: [307, 197, 640, 868], canvas: [1254, 1254] },
  registered: { box: [224, 232, 805, 776], canvas: [1254, 1254] },
  line: { box: [206, 334, 1761, 46], canvas: [2172, 724] },
  classWord: { box: [408, 159, 1351, 414], canvas: [2172, 724] },
  odontologiaWord: { box: [198, 231, 1783, 258], canvas: [2172, 724] },
} as const satisfies Record<string, GlyphCrop>;

export interface LockupPieceDef {
  id: string;
  file: string;
  crop: keyof typeof glyphCrop;
  row: "swirl" | "class" | "line" | "odontologia" | "seal";
  /** Assemble-from / exit scatter, in px relative to rest. */
  from: { x: number; y: number; rotate: number; scale?: number };
}

export const DECOMPOSED_FILES = [
  "a-letter.png",
  "c-letter.png",
  "class-word.png",
  "copywright-icon.png",
  "d-letter.png",
  "g-letter.png",
  "i-letter.png",
  "l-letter.png",
  "lambda-letter.png",
  "line-underscore.png",
  "main-logo.png",
  "n-letter.png",
  "o-letter.png",
  "odontologia-word.png",
  "s-letter.png",
  "t-letter.png",
] as const;

export const classLetters: LockupPieceDef[] = [
  { id: "c", file: "c-letter.png", crop: "c", row: "class", from: { x: -150, y: 48, rotate: -18 } },
  { id: "l", file: "l-letter.png", crop: "l", row: "class", from: { x: -62, y: 118, rotate: 12 } },
  { id: "lambda", file: "lambda-letter.png", crop: "lambda", row: "class", from: { x: 18, y: -88, rotate: 20 } },
  { id: "s1", file: "s-letter.png", crop: "s", row: "class", from: { x: 92, y: 108, rotate: -13 } },
  { id: "s2", file: "s-letter.png", crop: "s", row: "class", from: { x: 156, y: 36, rotate: 15 } },
];

export const odontologiaLetters: LockupPieceDef[] = [
  { id: "o1", file: "o-letter.png", crop: "o", row: "odontologia", from: { x: -96, y: 86, rotate: -8 } },
  { id: "d", file: "d-letter.png", crop: "d", row: "odontologia", from: { x: -58, y: 102, rotate: 9 } },
  { id: "o2", file: "o-letter.png", crop: "o", row: "odontologia", from: { x: -22, y: 114, rotate: -6 } },
  { id: "n", file: "n-letter.png", crop: "n", row: "odontologia", from: { x: 14, y: 94, rotate: 7 } },
  { id: "t", file: "t-letter.png", crop: "t", row: "odontologia", from: { x: 44, y: 108, rotate: -10 } },
  { id: "o3", file: "o-letter.png", crop: "o", row: "odontologia", from: { x: 72, y: 98, rotate: 5 } },
  { id: "l2", file: "l-letter.png", crop: "l", row: "odontologia", from: { x: 98, y: 84, rotate: -7 } },
  { id: "o4", file: "o-letter.png", crop: "o", row: "odontologia", from: { x: 122, y: 92, rotate: 8 } },
  { id: "g", file: "g-letter.png", crop: "g", row: "odontologia", from: { x: 144, y: 78, rotate: -9 } },
  { id: "i", file: "i-letter.png", crop: "i", row: "odontologia", from: { x: 162, y: 70, rotate: 6 } },
  { id: "a", file: "a-letter.png", crop: "a", row: "odontologia", from: { x: 182, y: 64, rotate: -5 } },
];

export const lockupMarks: LockupPieceDef[] = [
  { id: "swirl", file: "main-logo.png", crop: "swirl", row: "swirl", from: { x: 40, y: -96, rotate: -24, scale: 0.62 } },
  { id: "registered", file: "copywright-icon.png", crop: "registered", row: "swirl", from: { x: 88, y: -42, rotate: 52, scale: 0.36 } },
  { id: "line", file: "line-underscore.png", crop: "line", row: "line", from: { x: 0, y: 28, rotate: 0, scale: 0.2 } },
];

export const lockupSeals: LockupPieceDef[] = [
  { id: "class-word", file: "class-word.png", crop: "classWord", row: "seal", from: { x: 0, y: 24, rotate: 0, scale: 0.92 } },
  { id: "odontologia-word", file: "odontologia-word.png", crop: "odontologiaWord", row: "seal", from: { x: 0, y: 32, rotate: 0, scale: 0.92 } },
];
