export interface Specialist {
  id: string;
  name: string;
  title: string;
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
    bio: "Doutor em Odontologia. Especialista em Ortodontia, Ortopedia Facial e Ortopedia Funcional dos Maxilares. Fundou a clínica em Foz do Iguaçu em 1998 e segue à frente da Class.",
    photo: "/assets/people/dr-alessandro.webp",
  },
  {
    id: "renata-schwertner",
    name: "Dra. Renata Schwertner",
    title: "CRO 9438-PR",
    specialty: "Dentística Estética",
    bio: "Mestre em Dentística Estética. Conduz os protocolos de lentes, facetas e reabilitação do sorriso com precisão de cor, textura e proporção.",
    photo: "/assets/people/dra-renata.webp",
  },
  {
    id: "matheus-schwertner",
    name: "Dr. Matheus Schwertner",
    title: "Especialistas",
    specialty: "Reabilitação e estética",
    bio: "Integra a nova geração da Class na reabilitação oral e na estética do sorriso, com o mesmo critério de planejamento facial que define a clínica.",
    photo: "/assets/people/dr-matheus.webp",
  },
  {
    id: "mohamed-ismail",
    name: "Dr. Mohamed Ismail",
    title: "Especialistas",
    specialty: "Implantodontia e prótese",
    bio: "Atua na reabilitação sobre implantes e próteses — a linha que devolve mastigação, estabilidade e a presença de um sorriso completo.",
    photo: "/assets/people/dr-mohamad.webp",
  },
];
