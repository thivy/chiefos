type EntryId = "schedule" | "brief" | "visual-minutes" | "powerpoint";
type HelperId = "image-prompt" | "motion" | "design";
type SkillId = EntryId | HelperId;
type SkillStatus = "idle" | "running" | "waiting" | "done";

type InputId =
  | "email"
  | "calendar"
  | "Teams chat"
  | "meeting recaps"
  | "recap"
  | "transcript"
  | "meeting chat"
  | "notes"
  | "documents";

type ArtifactId =
  | "Daily schedule"
  | "Task list"
  | "Briefing image"
  | "ChiefOS app"
  | "Summary email"
  | "Meeting page"
  | "Q4 budget deck";

type EdgeId = `${SkillId}>${SkillId}`;

interface FlowState {
  skills: Record<SkillId, SkillStatus>;
  calls: Record<HelperId, number>;
  edges: EdgeId[];
  inputs: InputId[];
  artifacts: ArtifactId[];
}

type FlowEvent =
  | { type: "skill_started"; skill: EntryId; by: "you" | EntryId }
  | { type: "user_asked"; skill: EntryId }
  | { type: "user_answered"; skill: EntryId }
  | { type: "inputs_read"; skill: EntryId; inputs: InputId[] }
  | { type: "helper_called"; caller: EntryId; helper: HelperId; use: string; calls: number }
  | { type: "artifact_saved"; skill: EntryId; artifact: ArtifactId }
  | { type: "skill_finished"; skill: EntryId };

const initialState: FlowState = {
  skills: {
    schedule: "idle",
    brief: "idle",
    "visual-minutes": "idle",
    powerpoint: "idle",
    "image-prompt": "idle",
    motion: "idle",
    design: "idle",
  },
  calls: { "image-prompt": 0, motion: 0, design: 0 },
  edges: [],
  inputs: [],
  artifacts: [],
};

// The life of a skill that you can start. An event that is not listed for the
// current status is ignored, so the machine cannot reach an impossible state.
const LIFECYCLE: Record<SkillStatus, Partial<Record<FlowEvent["type"], SkillStatus>>> = {
  idle: { skill_started: "running" },
  running: { user_asked: "waiting", skill_finished: "done" },
  waiting: { user_answered: "running" },
  done: {},
};

function addUnique<T>(list: readonly T[], items: readonly T[]): T[] {
  return [...list, ...items.filter((item) => !list.includes(item))];
}

// A helper call is synchronous: the helper runs inside one event, and is done at the next.
function settleHelpers(state: FlowState): FlowState {
  const skills = { ...state.skills };
  for (const helper of ["image-prompt", "motion", "design"] as const) {
    if (skills[helper] === "running") skills[helper] = "done";
  }
  return { ...state, skills };
}

function reducer(state: FlowState, event: FlowEvent): FlowState {
  const settled = settleHelpers(state);

  switch (event.type) {
    case "skill_started":
    case "user_asked":
    case "user_answered":
    case "skill_finished": {
      const status = LIFECYCLE[settled.skills[event.skill]][event.type];
      if (!status) return state;

      // A skill started by another skill is a trigger: the edge between them fires.
      const edges =
        event.type === "skill_started" && event.by !== "you"
          ? addUnique(settled.edges, [`${event.by}>${event.skill}` as const])
          : settled.edges;

      return { ...settled, skills: { ...settled.skills, [event.skill]: status }, edges };
    }

    case "inputs_read":
      if (settled.skills[event.skill] !== "running") return state;
      return { ...settled, inputs: addUnique(settled.inputs, event.inputs) };

    case "artifact_saved":
      if (settled.skills[event.skill] !== "running") return state;
      return { ...settled, artifacts: addUnique(settled.artifacts, [event.artifact]) };

    case "helper_called":
      if (settled.skills[event.caller] !== "running") return state;
      return {
        ...settled,
        skills: { ...settled.skills, [event.helper]: "running" },
        calls: { ...settled.calls, [event.helper]: settled.calls[event.helper] + event.calls },
        edges: addUnique(settled.edges, [`${event.caller}>${event.helper}` as const]),
      };
  }
}

export { initialState, reducer };
export type {
  ArtifactId,
  EdgeId,
  EntryId,
  FlowEvent,
  FlowState,
  HelperId,
  InputId,
  SkillId,
  SkillStatus,
};
