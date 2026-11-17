import { RUNS } from "./runs";
import { initialState, reducer } from "./reducer";
import type { EdgeId, EntryId, FlowEvent, FlowState, SkillId } from "./reducer";

interface Trace {
  // states[0] is the initial state. states[i] is the state after event i.
  states: FlowState[];
  // changes[i] lists what event i changed, one line each.
  changes: string[][];
  // Every helper edge that this run fires, so the diagram can show the path ahead.
  planned: EdgeId[];
}

function diffState(before: FlowState, after: FlowState): string[] {
  const lines: string[] = [];

  for (const skill of Object.keys(after.skills) as (keyof FlowState["skills"])[]) {
    if (before.skills[skill] !== after.skills[skill]) {
      lines.push(`skills.${skill}: ${before.skills[skill]} → ${after.skills[skill]}`);
    }
  }
  for (const helper of Object.keys(after.calls) as (keyof FlowState["calls"])[]) {
    if (before.calls[helper] !== after.calls[helper]) {
      lines.push(`calls.${helper}: ${before.calls[helper]} → ${after.calls[helper]}`);
    }
  }
  for (const edge of after.edges.filter((item) => !before.edges.includes(item))) {
    lines.push(`edges: + ${edge}`);
  }
  for (const input of after.inputs.filter((item) => !before.inputs.includes(item))) {
    lines.push(`inputs: + ${input}`);
  }
  for (const artifact of after.artifacts.filter((item) => !before.artifacts.includes(item))) {
    lines.push(`artifacts: + ${artifact}`);
  }

  return lines;
}

function formatEvent(event: FlowEvent): string {
  const lines = Object.entries(event).map(([key, value]) =>
    Array.isArray(value)
      ? `  ${key}: [${value.join(", ")}]`
      : `  ${key}: ${typeof value === "string" ? `"${value}"` : value}`,
  );
  return `{\n${lines.join(",\n")}\n}`;
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
  const changes: string[][] = [];
  for (const { event } of RUNS[entry].steps) {
    const before = states[states.length - 1];
    const after = reducer(before, event);
    states.push(after);
    changes.push(diffState(before, after));
  }

  const planned = [...new Set(RUNS[entry].steps.map(({ event }) => edgeOf(event)))].filter(
    (edge): edge is EdgeId => edge !== null && !edge.startsWith("schedule>brief"),
  );

  const trace = { states, changes, planned };
  traces.set(entry, trace);
  return trace;
}

export { actorsOf, buildTrace, edgeOf, formatEvent, ownerOf };
export type { Trace };
