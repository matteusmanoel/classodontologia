export interface Specialty {
  id: string
  name: string
  description: string
  /** Working microcopy for the sticky scene (Scene Contract §2). */
  sceneCopy: string
  assetId?: string
  imageSrc?: string
  imageAlt?: string
  imagePosition?: string
}

export const specialties: Specialty[] = [
  {
    id: "protese",
    name: "Prótese",
    description:
      "Da peça unitária ao protocolo: próteses que restituem mastigação, fala e presença. Indicadas quando um, vários ou todos os dentes foram perdidos.",
    sceneCopy: "Forma, função e naturalidade em equilíbrio.",
    assetId: "specialties-protese-01",
    imageSrc: undefined,
    imageAlt: "Prótese dentária com naturalidade e precisão",
    imagePosition: "center",
  },
  {
    id: "estetica",
    name: "Estética",
    description:
      "Lentes, facetas e dentística restauradora para devolver cor, forma e harmonia ao sorriso — com o mínimo de desgaste e o máximo de naturalidade.",
    sceneCopy: "Detalhes que respeitam a identidade de cada sorriso.",
    assetId: "specialties-estetica-01",
    imageSrc: undefined,
    imageAlt: "Estética dental com atenção aos detalhes",
    imagePosition: "center",
  },
  {
    id: "implantodontia",
    name: "Implantodontia",
    description:
      "Reabilitação sobre implantes de titânio, unitários ou múltiplos, fixos ou removíveis. Segurança clínica e um resultado que se aproxima do dente natural.",
    sceneCopy: "Planejamento preciso para reconstruir função e confiança.",
    assetId: "specialties-implantodontia-01",
    imageSrc: undefined,
    imageAlt: "Implante dentário planejado com precisão",
    imagePosition: "center",
  },
  {
    id: "periodontia",
    name: "Periodontia",
    description:
      "Diagnóstico e tratamento de doenças periodontais, preservando a saúde da gengiva e do osso que sustentam os dentes.",
    sceneCopy: "Cuidado com a base que sustenta o sorriso.",
    assetId: "specialties-periodontia-01",
    imageSrc: undefined,
    imageAlt: "Periodontia: cuidado com a base do sorriso",
    imagePosition: "center",
  },
  {
    id: "sensibilidade",
    name: "Sensibilidade",
    description:
      "Avaliação e tratamento da hipersensibilidade dentinária, identificando a origem do desconforto para definir o cuidado adequado.",
    sceneCopy: "Entender a origem do desconforto para definir o cuidado adequado.",
    assetId: "specialties-sensibilidade-01",
    imageSrc: undefined,
    imageAlt: "Tratamento de sensibilidade dental",
    imagePosition: "center",
  },
  {
    id: "ortodontia",
    name: "Ortodontia",
    description:
      "Alinhamento de dentes e bases ósseas com aparelhos convencionais ou alinhadores. Equilíbrio funcional e estético, planejado para a sua face.",
    sceneCopy: "Movimento planejado. Equilíbrio construído ao longo do tempo.",
    assetId: "specialties-ortodontia-01",
    imageSrc: undefined,
    imageAlt: "Ortodontia: alinhamento planejado",
    imagePosition: "center",
  },
  {
    id: "cirurgias",
    name: "Cirurgias",
    description:
      "Procedimentos cirúrgicos bucais realizados com planejamento rigoroso e técnica precisa em cada etapa.",
    sceneCopy: "Planejamento e técnica em cada etapa.",
    assetId: "specialties-cirurgias-01",
    imageSrc: undefined,
    imageAlt: "Cirurgia bucal com planejamento e precisão",
    imagePosition: "center",
  },
  {
    id: "atm",
    name: "ATM — Disfunção Temporomandibular",
    description:
      "Cuidado com a articulação temporomandibular, periodonto e sensibilidade. Diagnóstico preciso para tratar a causa — não só o sintoma.",
    sceneCopy: "Um olhar atento à função, ao conforto e ao equilíbrio.",
    assetId: "specialties-atm-01",
    imageSrc: undefined,
    imageAlt: "ATM: equilíbrio funcional e conforto",
    imagePosition: "center",
  },
]
