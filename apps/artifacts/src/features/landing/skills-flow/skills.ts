import {
  CalendarIcon,
  GaugeIcon,
  ImageIcon,
  NewspaperIcon,
  NotebookPenIcon,
  PenCilSparklesIcon,
  VideoIcon,
} from "../../../components/icons";
import type { EntryId, HelperId, SkillId } from "./reducer";

interface SkillMeta {
  name: string;
  command: string;
  tone: string;
  Icon: typeof CalendarIcon;
}

const SKILLS: Record<SkillId, SkillMeta> = {
  schedule: {
    name: "Schedule",
    command: "/chief-os-schedule",
    tone: "bg-card-sage",
    Icon: CalendarIcon,
  },
  brief: {
    name: "Daily brief",
    command: "/chief-os-brief",
    tone: "bg-card-lemon",
    Icon: NewspaperIcon,
  },
  "visual-minutes": {
    name: "Meeting minutes",
    command: "/chief-os-visual-minutes",
    tone: "bg-card-lilac",
    Icon: VideoIcon,
  },
  powerpoint: {
    name: "Deck builder",
    command: "/chief-os-powerpoint",
    tone: "bg-card-blush",
    Icon: NotebookPenIcon,
  },
  "image-prompt": {
    name: "Picture maker",
    command: "/chief-os-image-prompt",
    tone: "bg-card",
    Icon: ImageIcon,
  },
  motion: { name: "Motion", command: "/chief-os-motion", tone: "bg-card", Icon: GaugeIcon },
  design: {
    name: "Look and wording",
    command: "/chief-os-design",
    tone: "bg-card",
    Icon: PenCilSparklesIcon,
  },
};

const ENTRY_IDS = [
  "schedule",
  "brief",
  "visual-minutes",
  "powerpoint",
] as const satisfies readonly EntryId[];

const HELPER_IDS = ["image-prompt", "motion", "design"] as const satisfies readonly HelperId[];

export { ENTRY_IDS, HELPER_IDS, SKILLS };
export type { SkillMeta };
