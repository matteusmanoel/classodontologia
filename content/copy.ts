/** Clinic founded 25/03/1998 (BRAND_EXPERIENCE.md). Evaluated at build/render time. */
const FOUNDED = { year: 1998, month: 3, day: 25 } as const;

function yearsSinceFounding(now: Date = new Date()): number {
  const beforeAnniversary =
    now.getMonth() + 1 < FOUNDED.month ||
    (now.getMonth() + 1 === FOUNDED.month && now.getDate() < FOUNDED.day);
  return now.getFullYear() - FOUNDED.year - (beforeAnniversary ? 1 : 0);
}

export const copy = {
  hero: {
    heading: "Class Odontologia",
    /** Idle slogan typed under the lockup. */
    slogan: "A arte de sorrir com Class.",
    scrollCue: "Role para começar",
    /** Scroll beat after the wordmark exits — giant 3D “3”. */
    decadeNumeral: String(yearsSinceFounding()),
    decadeLabel: "anos",
    /** Factual subtitle under the decade numeral. */
    decadeSubtitle: "Desde 1998, um padrão próprio de fazer odontologia.",
    /** Lines that rise one-by-one after the decade beat. */
    scrollLines: [
      "Você merece sorrir com Class.",
      "Precisão, cuidado e atenção a cada detalhe, do primeiro olhar ao resultado que você espera.",
    ],
    /** Full sentence for screen readers / reduced motion. */
    tagline:
      "A arte de sorrir com Class. Desde 1998, um padrão próprio de fazer odontologia em Foz do Iguaçu. Você merece sorrir com Class. Precisão, cuidado e atenção a cada detalhe, do primeiro olhar ao resultado que você espera.",
  },
  manifesto: {
    eyebrow: "A clínica · Desde 1998",
    headline: "O padrão não nasce pronto. É construído.",
    body: "Experiência cria critério. Precisão transforma esse critério em resultado. Evolução mantém esse padrão em movimento.",
  },
  legacy: {
    metadata: "EST. 1998",
    year: "1998",
    headline: "O tempo aperfeiçoa o olhar.",
    headlineLines: ["O tempo", "aperfeiçoa", "o olhar."],
    body: "Desde 1998, evoluímos sem abrir mão daquilo que sempre orientou nosso trabalho: atenção aos detalhes.",
  },
  specialties: {
    heading: "Oito caminhos. Um padrão.",
    pair: {
      lead: "Oito",
      leadMark: "caminhos.",
      trail: "Um",
      trailMark: "padrão.",
    },
    stitch: "Oito disciplinas. O mesmo olhar.",
    subheading:
      "Cada tratamento exige uma abordagem. Todos compartilham o mesmo rigor.",
  },
  method: {
    headline: "A ferramenta não decide. O critério decide.",
    dissolveLead: "A ferramenta não decide.",
    dissolveMark: "O critério decide.",
    stitch: "Tecnologia, com propósito.",
    body: "Recursos que ampliam diagnóstico, planejamento e previsibilidade — para que você veja o caminho e o resultado antes de decidir.",
    timelineEyebrow: "Linha do tempo",
    fromLabel: "De",
    toLabel: "Para",
    placeholderCaption: "Imagem a definir",
  },
  specialists: {
    heading: "Nove especialistas. Um critério.",
    pair: {
      lead: "Nove",
      leadMark: "especialistas.",
      trail: "Um",
      trailMark: "critério.",
    },
    subheading:
      "O planejamento começa na face — e termina no sorriso que você reconhece como seu.",
    moreLabel: "Conheça toda a equipe",
    lessLabel: "Mostrar menos",
  },
  selected: {
    eyebrow: "SELECTED BY CLASS",
    marqueeLabel:
      "Marcas e tecnologias presentes na prática clínica: Invisalign, Odontolatina, Ortoplan, Rennova e Class Odontologia.",
  },
  place: {
    stitch: "Foz do Iguaçu · Desde 1998",
    headline: "Onde o padrão Class ganha forma.",
    body: "Um ambiente pensado para transformar cuidado, conforto e atenção aos detalhes em experiência.",
  },
  conversion: {
    headline: "Comece por uma conversa.",
    signature: "A arte de sorrir com Class.",
    buttonLabel: "Agende sua avaliação",
    mapsLabel: "Ver no Maps",
    /** What happens on the first visit — lowers friction without promising outcomes. */
    stepsLabel: "Como é a primeira visita",
    steps: [
      { title: "Conversa", body: "Você conta o que deseja e a equipe escuta." },
      { title: "Estudo", body: "Avaliação do seu caso, a começar pela face." },
      { title: "Plano claro", body: "Caminho, etapas e tempo explicados com transparência." },
    ],
    freeNote: "Avaliação sem custo",
  },
  cta: {
    heading: "Agende sua avaliação",
    body: "Converse com a equipe. Entendemos o que o seu sorriso pede — e desenhamos o caminho com clareza, tempo e precisão.",
    buttonLabel: "Agende sua avaliação",
    /** Whisper CTAs between acts: invitation first, action last (see ADR-013 addendum). */
    soft: {
      folio: {
        lead: "O espaço conta parte da história. O prazer de sorrir, a gente provoca de perto.",
        label: "Conheça a Class pessoalmente",
      },
      specialties: {
        lead: "O caminho começa no sorriso que você deseja sentir.",
        label: "Converse com a equipe",
      },
      method: {
        lead: "O plano só existe para você ver, antes, o sorriso que quer viver.",
        label: "Antecipe o seu sorriso",
      },
      specialists: {
        lead: "Conhecer quem cuida do seu sorriso faz diferença.",
        label: "Agende uma visita",
      },
    },
    fabLabel: "Agendar visita",
    fabAria: "Agendar visita pelo WhatsApp",
  },
  nav: {
    clinic: "A clínica",
    specialties: "Especialidades",
    method: "Método",
    specialists: "Especialistas",
    visit: "Visite",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    primary: "Navegação principal",
  },
  location: {
    heading: "Localização",
    buttonLabel: "Ver no Maps",
  },
  footer: {
    copyright: "© {year} Class Odontologia. Todos os direitos reservados.",
  },
} as const;
