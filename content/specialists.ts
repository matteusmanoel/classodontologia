export interface Specialist {
  id: string;
  name: string;
  /** Credential line (e.g. "CRO 9278-PR"). */
  title?: string | null;
  specialty: string;
  bio: string;
  photo: string;
}

export const specialists: Specialist[] = [
  {
    id: "alessandro-schwertner",
    name: "Dr. Alessandro Schwertner",
    title: "CRO 9278-PR",
    specialty: "Ortodontia e Ortopedia Facial",
    bio: "PHD em Odontologia. Especialista em Ortodontia, Ortopedia Facial e Ortopedia Funcional dos Maxilares. Fundou a clínica em Foz do Iguaçu em 1998 e segue à frente da Class.",
    photo: "/assets/people/dr-alessandro.webp",
  },
  {
    id: "renata-schwertner",
    name: "Dra. Renata Schwertner",
    title: "CRO 9438-PR",
    specialty: "Dentística Estética",
    bio: "Mestre em Dentística Estética. Conduz os protocolos de lentes, facetas e reabilitação do sorriso com precisão de cor, textura e proporção.",
    photo: "/assets/people/dra-renata-schwertner.webp",
  },
  {
    id: "khaled-rahal",
    name: "Dr. Khaled Rahal",
    title: "CRO 18297-PR",
    specialty: "Prótese dentária",
    bio: "Especialista em Prótese Dentária. Reabilitação oral e soluções restauradoras estéticas, incluindo próteses e facetas.",
    photo: "/assets/people/dr-khaled-white.webp",
  },
  {
    id: "matheus-schwertner",
    name: "Dr. Matheus Schwertner",
    title: "CRO 36863-PR",
    specialty: "Reabilitação e estética",
    bio: "Integra a nova geração da Class na reabilitação oral e na estética do sorriso, com o mesmo critério de planejamento facial que define a clínica.",
    photo: "/assets/people/dr-matheus.webp",
  },
  {
    id: "mohamed-ismail",
    name: "Dr. Mohamed Ismail",
    title: "CRO 33159-PR",
    specialty: "Implantodontia e prótese",
    bio: "Atua na reabilitação sobre implantes e próteses — a linha que devolve mastigação, estabilidade e a presença de um sorriso completo.",
    photo: "/assets/people/dr-mohamad.webp",
  },
  {
    id: "robson-melo",
    name: "Dr. Robson Melo",
    title: "CRO 10089-PR",
    specialty: "Implantodontia e periodontia",
    bio: "Mestre em Odontologia e especialista em Implantodontia. Cirurgia, implantes e reabilitação oral.",
    photo: "/assets/people/dr-robson-melo-jaleco-preto.webp",
  },
  {
    id: "thaina-mayer",
    name: "Dra. Thainá Mayer",
    title: "CRO 35838-PR",
    specialty: "Clínica geral",
    bio: "Cirurgiã-dentista com atuação em clínica geral — prevenção, diagnóstico e o cuidado do dia a dia.",
    photo: "/assets/people/dra-thaina-mayer.webp",
  },
  {
    id: "yasser-faisal-ismail",
    name: "Dr. Yasser Faisal Ismail",
    title: "CRO 36265-PR",
    specialty: "Dentística",
    bio: "Atua em Dentística — restauração, preservação da estrutura dental e estética do sorriso.",
    photo: "/assets/people/dr-yasser-faisal-ismail.webp",
  },
  {
    id: "alex-silvestri",
    name: "Dr. Alex Silvestri",
    title: "CRO 38940-PR",
    specialty: "Endodontia",
    bio: "Atua em clínica geral e endodontia — tratamento da polpa e dos tecidos da raiz, com foco em preservar o dente.",
    photo: "/assets/people/dr-alex-silvestri.webp",
  },
];
