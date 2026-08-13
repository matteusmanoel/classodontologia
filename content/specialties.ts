export interface Specialty {
  id: string
  name: string
  description: string
  icon?: string
}

export const specialties: Specialty[] = [
  {
    id: "estetica",
    name: "Estética e lentes",
    description:
      "Lentes, facetas e dentística restauradora para devolver cor, forma e harmonia ao sorriso — com o mínimo de desgaste e o máximo de naturalidade.",
  },
  {
    id: "implantes",
    name: "Implantodontia",
    description:
      "Reabilitação sobre implantes de titânio, unitários ou múltiplos, fixos ou removíveis. Segurança clínica e um resultado que se aproxima do dente natural.",
  },
  {
    id: "ortodontia",
    name: "Ortodontia",
    description:
      "Alinhamento de dentes e bases ósseas com aparelhos convencionais ou alinhadores. Equilíbrio funcional e estético, planejado para a sua face.",
  },
  {
    id: "protese",
    name: "Prótese e reabilitação",
    description:
      "Da peça unitária ao protocolo: próteses que restituem mastigação, fala e presença. Indicadas quando um, vários ou todos os dentes foram perdidos.",
  },
  {
    id: "atm",
    name: "ATM e prevenção",
    description:
      "Cuidado com a articulação temporomandibular, periodonto e sensibilidade. Diagnóstico preciso para tratar a causa — não só o sintoma.",
  },
]
