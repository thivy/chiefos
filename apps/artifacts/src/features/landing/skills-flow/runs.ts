import type { ArtifactId, EntryId, FlowEvent, InputId } from "./reducer";

interface FlowStep {
  event: FlowEvent;
  title: string;
  why: string;
  how: string;
}

interface FlowRun {
  example: string;
  inputs: InputId[];
  artifacts: ArtifactId[];
  steps: FlowStep[];
}

// The approval step that opens a direct Daily brief run. A scheduled run happens while you
// are away, so the Schedule skill asks for approvals up front instead.
const BRIEF_PERMISSIONS: FlowStep[] = [
  {
    event: { type: "user_asked", skill: "brief" },
    title: "Cowork asks for approvals",
    why: "Later steps change files and send an email. Cowork checks with you first.",
    how: "It tries four actions once so that Cowork can ask about each: updating your ChiefOS app, setting up a OneDrive folder, saving your task list, and sending you a test email.",
  },
  {
    event: { type: "user_answered", skill: "brief" },
    title: "You choose always allow",
    why: "The rest of the run then does not stop to ask.",
    how: "Each action shows as allowed or failed. Once you answer, the brief carries on.",
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
    why: "A briefing must come from what really happened. It never makes up a person, a date, or a link.",
    how: "It reads your email, calendar, Teams chat, and meeting recaps. It drops the noise and puts first what matters most, not just what is unread.",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "Task list" },
    title: "Brief updates your task list",
    why: "Each thing you owe becomes one task, so nothing gets lost between runs.",
    how: "Tasks you finished stay finished. New commitments are added as new tasks.",
  },
  {
    event: {
      type: "helper_called",
      caller: "brief",
      helper: "image-prompt",
      use: "Pictures",
      calls: 3,
    },
    title: "Brief asks for three picture prompts",
    why: "Each task gets its own illustration. The brief never writes picture prompts itself.",
    how: "It asks the picture maker once for each task. This example has three tasks, so it asks three times.",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "Briefing image" },
    title: "Brief makes the briefing image",
    why: "The image shows your tasks at a glance.",
    how: "The three illustrations are joined into one page. If the image fails, the brief carries on without it and no email is sent.",
  },
  {
    event: {
      type: "helper_called",
      caller: "brief",
      helper: "motion",
      use: "App motion",
      calls: 1,
    },
    title: "Brief asks motion for the app",
    why: "Your ChiefOS app should move in the same calm way as every other ChiefOS page.",
    how: "Motion supplies the timing and the effects for the web. The brief never picks them itself.",
  },
  {
    event: {
      type: "helper_called",
      caller: "brief",
      helper: "design",
      use: "Colours, cards",
      calls: 1,
    },
    title: "Brief asks design for the look",
    why: "The app, the cards, and the email must look the same.",
    how: "Design supplies the colours and the card style. The email uses the same colours.",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "ChiefOS app" },
    title: "Brief publishes your ChiefOS app",
    why: "You read the briefing in the app and tick off tasks there.",
    how: "It finds your ChiefOS app, updates it with this run's tasks and image, and publishes it. It never makes a second copy.",
  },
  {
    event: { type: "artifact_saved", skill: "brief", artifact: "Summary email" },
    title: "Brief emails you a summary",
    why: "This is the only email that ChiefOS sends. It goes to you.",
    how: "The subject starts with Morning Brief and the date. The briefing image is attached. Drafts for other people are never sent.",
  },
  {
    event: { type: "skill_finished", skill: "brief" },
    title: "Brief reports the run",
    why: "You see what needs you, what was left out, and what is done.",
    how: "The report has three headings: For you to do, Not included, and Done. Done holds the link to your app.",
  },
];

const RUNS: Record<EntryId, FlowRun> = {
  schedule: {
    example: "Set 7:00 AM and 4:00 PM once, then see the 7:00 AM run that the schedule starts.",
    inputs: ["email", "calendar", "Teams chat", "meeting recaps"],
    artifacts: ["Daily schedule", "Task list", "Briefing image", "ChiefOS app", "Summary email"],
    steps: [
      {
        event: { type: "skill_started", skill: "schedule", by: "you" },
        title: "You enter /chief-os-schedule",
        why: "You want ChiefOS to run every day without being asked.",
        how: "Schedule sets up one daily schedule. Later, that schedule starts the daily brief for you.",
      },
      {
        event: {
          type: "helper_called",
          caller: "schedule",
          helper: "design",
          use: "Wording",
          calls: 1,
        },
        title: "Schedule asks design for the voice",
        why: "Every question and report to you uses the same plain words.",
        how: "Design only gives wording rules. It never does the work itself.",
      },
      {
        event: { type: "user_asked", skill: "schedule" },
        title: "Schedule asks one question",
        why: "It needs two times. It asks once and offers the usual ones first.",
        how: "The usual times are 7:00 AM and 4:00 PM. You can pick 8 or 9 AM for the morning, and 3 or 5 PM for the afternoon. Schedule waits for you.",
      },
      {
        event: { type: "user_answered", skill: "schedule" },
        title: "You answer: default",
        why: "The word default picks 7:00 AM and 4:00 PM.",
        how: "Your reply lets Schedule carry on. If your request already named both times, it would skip the question.",
      },
      {
        event: { type: "artifact_saved", skill: "schedule", artifact: "Daily schedule" },
        title: "Schedule saves one daily routine",
        why: "One schedule holds both times, so you get one daily rhythm.",
        how: "It is saved as Chief of Staff - Daily Assistant, so running Schedule again updates it instead of making another. At each time, it asks for the daily brief.",
      },
      {
        event: { type: "user_asked", skill: "schedule" },
        title: "Cowork asks for approvals up front",
        why: "A scheduled run happens while you are away. A question would stop it.",
        how: "It tries five actions once, such as saving to OneDrive and sending email, so that Cowork can ask about each one now.",
      },
      {
        event: { type: "user_answered", skill: "schedule" },
        title: "You choose always allow",
        why: "The choice lasts for this conversation only, and the schedule uses the same conversation.",
        how: "Each action shows as allowed or failed. If you skip one, the scheduled run waits at that action.",
      },
      {
        event: { type: "skill_finished", skill: "schedule" },
        title: "Schedule is done",
        why: "Nothing more happens until a run time arrives. Schedule never runs the brief itself.",
        how: "It reports your times and your time zone. It also tells you to delete the test email and the two drafts.",
      },
      {
        event: { type: "skill_started", skill: "brief", by: "schedule" },
        title: "7:00 AM: the schedule starts the brief",
        why: "This is how one skill starts another. The saved schedule asks for the brief.",
        how: "Before noon the brief makes a Morning Brief. At 4:00 PM it makes an Afternoon Recap. It runs in the same conversation, so your approvals still apply.",
      },
      ...BRIEF_BODY,
    ],
  },
  brief: {
    example: "A Morning Brief with three tasks, started by you.",
    inputs: ["email", "calendar", "Teams chat", "meeting recaps"],
    artifacts: ["Task list", "Briefing image", "ChiefOS app", "Summary email"],
    steps: [
      {
        event: { type: "skill_started", skill: "brief", by: "you" },
        title: "You enter /chief-os-brief",
        why: "You want a briefing now, or one part of it.",
        how: "The brief makes a Morning Brief before noon and an Afternoon Recap after. If you ask for one part, such as triaging your email, it does only that part.",
      },
      ...BRIEF_PERMISSIONS,
      ...BRIEF_BODY,
    ],
  },
  "visual-minutes": {
    example: "The Q4 budget review, with seven key moments and three follow-up actions.",
    inputs: ["recap", "transcript", "meeting chat"],
    artifacts: ["Meeting page"],
    steps: [
      {
        event: { type: "skill_started", skill: "visual-minutes", by: "you" },
        title: "You enter /chief-os-visual-minutes",
        why: "You want one meeting as one illustrated page.",
        how: "Name or attach the meeting, such as the Q4 budget review. It never mixes several meetings, and it never works from an invitation alone.",
      },
      {
        event: {
          type: "inputs_read",
          skill: "visual-minutes",
          inputs: ["recap", "transcript", "meeting chat"],
        },
        title: "It reads that meeting only",
        why: "Every moment and every action needs direct evidence.",
        how: "It reads the recap, the transcript, and the chat of that one meeting. It stops if the meeting has not ended or has none of the three.",
      },
      {
        event: {
          type: "helper_called",
          caller: "visual-minutes",
          helper: "design",
          use: "Wording",
          calls: 1,
        },
        title: "It asks design for the voice",
        why: "Every line in the chat summary and in the image uses the same plain words.",
        how: "It then picks out seven key moments in order, and three follow-up actions with owners and due dates. It tells you both in chat before it makes the image.",
      },
      {
        event: {
          type: "helper_called",
          caller: "visual-minutes",
          helper: "image-prompt",
          use: "Pictures",
          calls: 10,
        },
        title: "It asks for ten picture prompts",
        why: "Each moment and each action gets its own illustration.",
        how: "It asks the picture maker once for each item: seven moments, then three actions.",
      },
      {
        event: { type: "artifact_saved", skill: "visual-minutes", artifact: "Meeting page" },
        title: "It saves one page",
        why: "The page shows the key moments first, then the follow-up actions.",
        how: "The ten illustrations are joined into one page. If you make it again, the page is replaced, not copied.",
      },
      {
        event: { type: "skill_finished", skill: "visual-minutes" },
        title: "It reports the result",
        why: "You see the meeting, how many items are in each band, and the saved page.",
        how: "It also flags gaps, conflicts, and merged items. If it found nothing to show, it says so and stops.",
      },
    ],
  },
  powerpoint: {
    example: "A 12-slide Q4 budget review deck with four illustrations.",
    inputs: ["notes", "documents"],
    artifacts: ["Q4 budget deck"],
    steps: [
      {
        event: { type: "skill_started", skill: "powerpoint", by: "you" },
        title: "You enter /chief-os-powerpoint",
        why: "You want an editable deck from your notes, documents, or a briefing.",
        how: "Point to your files. It settles the audience, purpose, length, and sources. It asks one short question only if a missing answer would change the story.",
      },
      {
        event: { type: "inputs_read", skill: "powerpoint", inputs: ["notes", "documents"] },
        title: "It reads your files",
        why: "Every slide must rest on your content. It never makes up a number, a quote, or a date.",
        how: "It reads every file you point to, then plans the story. Each slide has one message, and the titles read as the whole story in order.",
      },
      {
        event: {
          type: "helper_called",
          caller: "powerpoint",
          helper: "design",
          use: "Colours, cards",
          calls: 1,
        },
        title: "It asks design for colours and cards",
        why: "Every deck uses the ChiefOS colours and card style. The layout stays free.",
        how: "Design supplies the colours and the card style, with a small set of card layouts to choose from.",
      },
      {
        event: {
          type: "helper_called",
          caller: "powerpoint",
          helper: "image-prompt",
          use: "Pictures",
          calls: 4,
        },
        title: "It asks for four picture prompts",
        why: "A slide with a picture needs one illustration each. Pictures go on at most half the slides.",
        how: "It asks the picture maker once for each picture, in slide order. The deck keeps one style, and each request lists what the earlier pictures show, so none repeat.",
      },
      {
        event: {
          type: "helper_called",
          caller: "powerpoint",
          helper: "motion",
          use: "Slide motion",
          calls: 1,
        },
        title: "It asks motion for the transitions",
        why: "The deck should move in the same calm way as the app, and still read fully with animation off.",
        how: "Motion supplies a gentle fade between slides and a few simple builds. The whole deck advances the same way.",
      },
      {
        event: { type: "artifact_saved", skill: "powerpoint", artifact: "Q4 budget deck" },
        title: "It checks and saves the deck",
        why: "No slide may ship with overlap, overflow, or a missing font.",
        how: "It renders every slide as an image, inspects each one, fixes any fault, and checks again. Then it saves one PowerPoint file named after the deck title.",
      },
      {
        event: { type: "skill_finished", skill: "powerpoint" },
        title: "It reports the deck",
        why: "You see what you still need to supply.",
        how: "The report lists the file, the slide count, the image style, and how to play the deck without animation.",
      },
    ],
  },
};

export { RUNS };
export type { FlowRun, FlowStep };
