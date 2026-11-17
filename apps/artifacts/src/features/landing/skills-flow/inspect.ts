import { RUNS } from "./runs";
import { initialState, reducer } from "./reducer";
import type { EdgeId, EntryId, FlowEvent, FlowState, SkillId } from "./reducer";

interface Trace {
  // states[0] is the initial state. states[i] is the state after event i.
  states: FlowState[];
  // Every helper edge that this run fires, so the diagram can show the path ahead.
  planned: EdgeId[];
  // What the caller asks each helper for, by edge, for the label on the line.
  labels: Partial<Record<EdgeId, string>>;
}

const traces = new Map<EntryId, Trace>();

// The skills that an event is about. The diagram rings these, and the edge below links them.
function actorsOf(event: FlowEvent | null): SkillId[] {
  if (!event) return [];
  if (event.type === "helper_called") return [event.caller, event.helper];
  if (event.type === "skill_started" && event.by !== "you") return [event.by, event.skill];
  return [event.skill];
}

function edgeOf(event: FlowEvent | null): EdgeId | null {
  if (event?.type === "helper_called") return `${event.caller}>${event.helper}`;
  if (event?.type === "skill_started" && event.by !== "you") return `${event.by}>${event.skill}`;
  return null;
}

// The skill that owns the step, for the colour of its marker.
function ownerOf(event: FlowEvent): EntryId {
  return event.type === "helper_called" ? event.caller : event.skill;
}

// Runs the real reducer over the events of one example, once. The UI only shows
// states[cursor], so going back is a replay and needs no undo.
function buildTrace(entry: EntryId): Trace {
  const cached = traces.get(entry);
  if (cached) return cached;

  const states = [initialState];
  for (const { event } of RUNS[entry].steps) {
    states.push(reducer(states[states.length - 1], event));
  }

  const planned = [...new Set(RUNS[entry].steps.map(({ event }) => edgeOf(event)))].filter(
    (edge): edge is EdgeId => edge !== null && !edge.startsWith("schedule>brief"),
  );

  const labels: Trace["labels"] = {};
  for (const { event } of RUNS[entry].steps) {
    if (event.type === "helper_called") labels[`${event.caller}>${event.helper}`] = event.use;
  }

  const trace = { states, planned, labels };
  traces.set(entry, trace);
  return trace;
}

export { actorsOf, buildTrace, edgeOf, ownerOf };
export type { Trace };
