import type { ArtifactId, EntryId, FlowEvent, InputId } from "./reducer";

interface FlowStep {
  event: FlowEvent;
  title: string;
  why: string;
  how: string;
  source: string;
}

interface FlowRun {
  example: string;
  inputs: InputId[];
  artifacts: ArtifactId[];
  steps: FlowStep[];
}

// The permission step that opens a direct Daily brief run. A scheduled run is unattended,
// so the Schedule skill asks for approvals up front instead.
const BRIEF_PERMISSIONS: FlowStep[] = [
  {
    event: { type: "user_asked", skill: "brief" },
    title: "Cowork asks for approvals",
    why: "Later steps change files and send email. Cowork asks about each action before it runs.",
    how: "Step 0 attempts four actions once: republish the chiefos app, make sure the OneDrive folder exists, upload todo.md and memory.md, and send a permission check email to you.",
    source: "chief-os-brief: Pipeline step 0",
  },
  {
    event: { type: "user_answered", skill: "brief" },
    title: "You choose always allow",
    why: "The rest of the run then does not stop for approval.",
    how: "Each action is reported as Allowed or Failed. Your answer moves the skill from waiting back to running.",
    source: "chief-os-brief: Pipeline step 0",
  },
];

const BRIEF_BODY: FlowStep[] = [
  {
    event: {
      type: "inputs_read",
      skill: "brief",
      inputs: ["email", "calendar", "Teams chat", "meeting recaps"],
    },
    title: "Brief reads your work",
    why: "A briefing must come from evidence. It never invents a person, a date, or a link.",
    how: "Triage reads email, calendar, Teams chat, and meeting recaps. It drops noise and ranks by evidenced consequence, not by sender title or unread state.",
    source: "chief-os-brief: Pipeline step 1",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "todo.md" },
    title: "Brief updates your task list",
    why: "Each thing that you owe becomes one task, so nothing is lost between runs.",
    how: "Step 3 reconciles todo.md in OneDrive. A recorded completion stays completed. A new obligation becomes a new task.",
    source: "chief-os-brief: Pipeline step 3",
  },
  {
    event: {
      type: "helper_called",
      caller: "brief",
      helper: "image-prompt",
      use: "Illustrated Page",
      calls: 3,
    },
    title: "Brief asks for three picture prompts",
    why: "Each task gets its own illustration. The brief never writes an image prompt itself.",
    how: "Step 5 makes one chief-os-image-prompt call per task. This example has three tasks, so it makes three calls. Each call returns a prompt only.",
    source: "chief-os-brief: Pipeline step 5",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "artifact-image.png" },
    title: "Brief makes the briefing image",
    why: "The image shows your tasks at a glance.",
    how: "The brief joins the three prompts into one page prompt, then generates artifact-image.png. If the image fails, the run continues without it and does not send the email.",
    source: "chief-os-brief: output-image.md",
  },
  {
    event: {
      type: "helper_called",
      caller: "brief",
      helper: "motion",
      use: "Web",
      calls: 1,
    },
    title: "Brief asks motion for the app",
    why: "The chiefos app must move in the same calm way as every other ChiefOS page.",
    how: "Step 6 uses chief-os-motion for the web: fixed timing tokens, four effects, and reduced-motion rules. The brief never writes a duration or a curve itself.",
    source: "chief-os-brief: output-html-design.md",
  },
  {
    event: {
      type: "helper_called",
      caller: "brief",
      helper: "design",
      use: "Palette, Card",
      calls: 1,
    },
    title: "Brief asks design for the look",
    why: "The app, the cards, and the email must look the same.",
    how: "The app takes its colours from chief-os-design: Palette and its cards from chief-os-design: Card. The email uses the same Palette in hex values.",
    source: "chief-os-brief: output-html-design.md",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "chiefos app" },
    title: "Brief publishes the chiefos app",
    why: "You read the briefing in the app and mark tasks done there.",
    how: "The brief finds the app named chiefos, updates it in place with this run's data and image, then publishes it. It never makes a second app.",
    source: "chief-os-brief: Pipeline step 6",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "Summary email" },
    title: "Brief emails you a summary",
    why: "This is the only email that ChiefOS sends. It goes to you.",
    how: "The subject starts with Morning Brief, then the local date. artifact-image.png is attached as a regular file. Drafts for other people stay unsent.",
    source: "chief-os-brief: Pipeline step 8",
  },
  {
    event: { type: "skill_finished", skill: "brief" },
    title: "Brief reports the run",
    why: "You see what needs you, what was left out, and what is done.",
    how: "The report has three headings: For you to do, Not included, and Done. Done holds the app link. An empty heading says There are no items.",
    source: "chief-os-brief: Run report",
  },
];

const RUNS: Record<EntryId, FlowRun> = {
  schedule: {
    example: "Set 7:00 AM and 4:00 PM once, then see the 7:00 AM run that the schedule starts.",
    inputs: ["email", "calendar", "Teams chat", "meeting recaps"],
    artifacts: [
      "Chief of Staff - Daily Assistant",
      "todo.md",
      "artifact-image.png",
      "chiefos app",
      "Summary email",
    ],
    steps: [
      {
        event: { type: "skill_started", skill: "schedule", by: "you" },
        title: "You enter /chief-os-schedule",
        why: "You want ChiefOS to run every day without being asked.",
        how: "The slash command loads the schedule skill. It sets one daily schedule. That schedule later starts the brief skill.",
        source: "chief-os-schedule: Overview",
      },
      {
        event: {
          type: "helper_called",
          caller: "schedule",
          helper: "design",
          use: "Voice",
          calls: 1,
        },
        title: "Schedule asks design for the voice",
        why: "Every question and report to you must use the same plain words.",
        how: "The skill names chief-os-design: Voice before it writes anything. Design gives rules only. It never runs a workflow.",
        source: "chief-os-schedule: Overview",
      },
      {
        event: { type: "user_asked", skill: "schedule" },
        title: "Schedule asks one question",
        why: "It needs two times. It asks once and offers the default first.",
        how: "The default is 7:00 AM and 4:00 PM. The morning can be 8 or 9 AM. The afternoon can be 3 or 5 PM. The skill waits for you.",
        source: "chief-os-schedule: Step 1",
      },
      {
        event: { type: "user_answered", skill: "schedule" },
        title: "You answer: default",
        why: "The word default picks 7:00 AM and 4:00 PM.",
        how: "Your reply is the event. The skill moves from waiting to running. If your request named both times, the skill would skip the question.",
        source: "chief-os-schedule: Step 1",
      },
      {
        event: {
          type: "artifact_saved",
          skill: "schedule",
          artifact: "Chief of Staff - Daily Assistant",
        },
        title: "Schedule saves one recurring run",
        why: "One schedule holds both times, so you get one daily rhythm.",
        how: "The schedule is named Chief of Staff - Daily Assistant, so a second run updates it in place. Its prompt is: Apply the chief-os-brief skill and complete its workflow for the current local time.",
        source: "chief-os-schedule: Steps 2 and 3",
      },
      {
        event: { type: "user_asked", skill: "schedule" },
        title: "Cowork asks for approvals up front",
        why: "A scheduled run is unattended. An approval prompt would stop it.",
        how: "Step 4 attempts five actions once, in order: OneDrive upload, Outlook send email, create reply draft, update draft, and create draft message. Cowork asks about each.",
        source: "chief-os-schedule: Step 4",
      },
      {
        event: { type: "user_answered", skill: "schedule" },
        title: "You choose always allow",
        why: "The choice lasts for this conversation only, and the schedule uses the same conversation.",
        how: "Each action is reported as Allowed or Failed. If you skip one, the scheduled run waits at that action.",
        source: "chief-os-schedule: Step 4",
      },
      {
        event: { type: "skill_finished", skill: "schedule" },
        title: "Schedule is done",
        why: "Nothing more happens until a run time arrives. The schedule skill never runs the brief itself.",
        how: "It reports the times, the time zone, and the conversation mode. It also tells you to delete the permission check email and the two drafts.",
        source: "chief-os-schedule: Steps 3 and 4",
      },
      {
        event: { type: "skill_started", skill: "brief", by: "schedule" },
        title: "7:00 AM: the schedule starts the brief",
        why: "This is how one skill triggers another. The saved prompt names the brief skill.",
        how: "Before local noon the brief picks Morning Brief. At 4:00 PM it picks Afternoon Recap. It runs in the same conversation, so the approvals that you chose still apply.",
        source: "chief-os-schedule: Step 2",
      },
      ...BRIEF_BODY,
    ],
  },
  brief: {
    example: "A Morning Brief with three tasks, started by you.",
    inputs: ["email", "calendar", "Teams chat", "meeting recaps"],
    artifacts: ["todo.md", "artifact-image.png", "chiefos app", "Summary email"],
    steps: [
      {
        event: { type: "skill_started", skill: "brief", by: "you" },
        title: "You enter /chief-os-brief",
        why: "You want a briefing now, or one part of it.",
        how: "The slash command loads the brief skill. It picks Morning Brief before local noon and Afternoon Recap after. If you ask for one part, such as triage my email, it runs only the steps that it needs.",
        source: "chief-os-brief: Overview",
      },
      ...BRIEF_PERMISSIONS,
      ...BRIEF_BODY,
    ],
  },
  "visual-minutes": {
    example: "The Q4 budget review, with seven key moments and three follow-up actions.",
    inputs: ["recap", "transcript", "meeting chat"],
    artifacts: ["visual-minutes.png"],
    steps: [
      {
        event: { type: "skill_started", skill: "visual-minutes", by: "you" },
        title: "You enter /chief-os-visual-minutes",
        why: "You want one meeting as one illustrated page.",
        how: "Name or attach the meeting, such as the Q4 budget review. The skill never summarises several meetings, and never works from an invitation alone.",
        source: "chief-os-visual-minutes: Workflow step 1",
      },
      {
        event: {
          type: "inputs_read",
          skill: "visual-minutes",
          inputs: ["recap", "transcript", "meeting chat"],
        },
        title: "It reads that meeting only",
        why: "Every moment and every action needs direct evidence.",
        how: "It reads the recap, the transcript, and the meeting chat of that one meeting. It stops if the meeting has not ended or has none of the three.",
        source: "chief-os-visual-minutes: meeting-capture.md",
      },
      {
        event: {
          type: "helper_called",
          caller: "visual-minutes",
          helper: "design",
          use: "Voice",
          calls: 1,
        },
        title: "It asks design for the voice",
        why: "Every line in the chat breakdown and in the image must use the same plain words.",
        how: "The skill names chief-os-design: Voice. It then builds two collections: seven key moments in timeline order, and three follow-up actions with owners and due dates. It reports both in chat before it makes the image.",
        source: "chief-os-visual-minutes: Workflow steps 2 and 3",
      },
      {
        event: {
          type: "helper_called",
          caller: "visual-minutes",
          helper: "image-prompt",
          use: "Illustrated Page",
          calls: 10,
        },
        title: "It asks for ten picture prompts",
        why: "Each moment and each action gets its own illustration.",
        how: "It makes one chief-os-image-prompt call per item: seven moments, then three actions. The number of calls must equal the number of items.",
        source: "chief-os-visual-minutes: Workflow step 4",
      },
      {
        event: { type: "artifact_saved", skill: "visual-minutes", artifact: "visual-minutes.png" },
        title: "It saves one page",
        why: "The page shows the key moments first, then the follow-up actions.",
        how: "It joins the ten prompts into one page prompt, generates the image, and replaces visual-minutes.png in place. It never makes a dated copy.",
        source: "chief-os-visual-minutes: output-image.md",
      },
      {
        event: { type: "skill_finished", skill: "visual-minutes" },
        title: "It reports the result",
        why: "You see the meeting, the number of items in each band, and the saved file.",
        how: "It also reports gaps, conflicts, and merges. If both collections were empty, it would say so and stop.",
        source: "chief-os-visual-minutes: Workflow step 5",
      },
    ],
  },
  powerpoint: {
    example: "A 12-slide Q4 budget review deck with four illustrations.",
    inputs: ["notes", "documents"],
    artifacts: ["q4-budget-review.pptx"],
    steps: [
      {
        event: { type: "skill_started", skill: "powerpoint", by: "you" },
        title: "You enter /chief-os-powerpoint",
        why: "You want an editable deck from your notes, documents, or a briefing.",
        how: "Point to your files. The skill settles audience, purpose, length, and sources. It asks one short question only if a missing answer would change the story.",
        source: "chief-os-powerpoint: Workflow step 1",
      },
      {
        event: { type: "inputs_read", skill: "powerpoint", inputs: ["notes", "documents"] },
        title: "It reads your files",
        why: "Every slide must rest on your content. It never invents a metric, a quotation, or a date.",
        how: "It reads every file that you point to, then plans the story: one message per slide, with titles that tell the whole story when read in order.",
        source: "chief-os-powerpoint: Workflow steps 1 and 2",
      },
      {
        event: {
          type: "helper_called",
          caller: "powerpoint",
          helper: "design",
          use: "Palette, Card",
          calls: 1,
        },
        title: "It asks design for colours and cards",
        why: "Every deck uses the ChiefOS palette and card style. The layout stays free.",
        how: "The design system names chief-os-design: Palette for colours and chief-os-design: Card for card surfaces. Cards are limited to seven layouts.",
        source: "chief-os-powerpoint: design-system.md",
      },
      {
        event: {
          type: "helper_called",
          caller: "powerpoint",
          helper: "image-prompt",
          use: "Everyday Doodle",
          calls: 4,
        },
        title: "It asks for four picture prompts",
        why: "Image layouts need one illustration each. Images go on at most half of the slides.",
        how: "It makes one call per image, in slide order. The deck keeps one style, and each call lists the objects of earlier calls, so no two images repeat.",
        source: "chief-os-powerpoint: images.md",
      },
      {
        event: {
          type: "helper_called",
          caller: "powerpoint",
          helper: "motion",
          use: "PowerPoint",
          calls: 1,
        },
        title: "It asks motion for the transitions",
        why: "The deck must move in the same calm way as the app, and read fully with animation off.",
        how: "It adds one Fade transition at 400 ms, then Fade, Float In, and Wipe builds from chief-os-motion for PowerPoint. The whole deck uses one trigger mode.",
        source: "chief-os-motion: powerpoint.md",
      },
      {
        event: {
          type: "artifact_saved",
          skill: "powerpoint",
          artifact: "q4-budget-review.pptx",
        },
        title: "It checks and saves the deck",
        why: "No slide may ship with overlap, overflow, or a missing font.",
        how: "It renders every slide to an image, inspects each one, fixes faults, and renders again. Then it saves one .pptx that is named from the deck title.",
        source: "chief-os-powerpoint: Workflow steps 5 and 6",
      },
      {
        event: { type: "skill_finished", skill: "powerpoint" },
        title: "It reports the deck",
        why: "You see what you must still supply.",
        how: "The report lists the file, the slide count, the layouts, the image style, the number of image prompt calls, the trigger mode, and how to play the deck without animation.",
        source: "chief-os-powerpoint: Workflow step 6",
      },
    ],
  },
};

export { RUNS };
export type { FlowRun, FlowStep };
