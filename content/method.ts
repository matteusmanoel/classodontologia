/**
 * Method timeline — suggested evolutions of clinical instruments.
 * Copy describes the field, not a dated equipment inventory.
 * Fill `imageSrc` when real assets land; plates stay styled without them.
 */

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
}

export const methodBeats: MethodBeat[] = [
  {
    id: "face",
    era: "1998",
    from: "Observação",
    to: "Estudo da face",
    title: "O critério",
    body: "Antes de qualquer instrumento, o tratamento começa na leitura da face — anatomia, proporção e o resultado que a pessoa reconhece como seu.",
    motif: "face",
    assetId: "method-face-01",
    imageSrc: "/assets/treatments/method-planning-v1.webp",
    imageAlt:
      "Estudo editorial de planejamento e precisão — imagem representativa",
  },
  {
    id: "scan",
    era: "Registro",
    from: "Molde em massa",
    to: "Escaneamento intraoral",
    title: "O registro",
    body: "A cópia física da boca cede lugar a um modelo digital. O registro fica mais confortável para quem se senta na cadeira — e mais fiel para quem planeja.",
    motif: "scan",
    assetId: "method-scan-01",
  },
  {
    id: "volume",
    era: "Imagem",
    from: "Radiografia plana",
    to: "Volume em três dimensões",
    title: "A imagem",
    body: "O corte em dois eixos abre espaço para um volume. Ver a estrutura no espaço muda a decisão antes da mão entrar em cena.",
    motif: "volume",
    assetId: "method-volume-01",
  },
  {
    id: "form",
    era: "Forma",
    from: "Enceramento em gesso",
    to: "Desenho digital",
    title: "A forma",
    body: "O estudo da forma deixa o gesso e passa a ser desenhado com a mesma disciplina do planejamento — encaixe, proporção e teste, ainda em ambiente controlado.",
    motif: "form",
    assetId: "method-form-01",
  },
  {
    id: "proof",
    era: "Prova",
    from: "Ajuste na cadeira",
    to: "Mock-up previsível",
    title: "A prova",
    body: "A prova deixa de ser um ajuste no escuro. O mock-up antecipa o resultado para o paciente ver — e para o critério confirmar.",
    motif: "proof",
    assetId: "method-proof-01",
  },
];
