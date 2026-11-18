import { mediaSlots } from "@/content/media";

export interface ClinicPlate {
  id: string;
  src: string;
  alt: string;
  /** Optional muted ambient loop layered over the still (see content/media.ts). */
  videoSrc?: string;
}

export const clinicPlates: readonly ClinicPlate[] = [
  {
    id: "fachada",
    src: "/assets/clinic/fachada.webp",
    alt: "Fachada da Class Odontologia na Rua Engenheiro Rebouças, 441",
  },
  {
    id: "recepcao",
    src: "/assets/clinic/recepcao.webp",
    alt: "Recepção da Class Odontologia",
  },
  {
    id: "waiting-room",
    src: "/assets/clinic/waiting-room.webp",
    alt: "Sala de espera da Class Odontologia",
  },
  {
    id: "office2",
    src: "/assets/clinic/office2.webp",
    alt: "Consultório da Class Odontologia",
    ...(mediaSlots.clinicLoop.src ? { videoSrc: mediaSlots.clinicLoop.src } : {}),
  },
];
