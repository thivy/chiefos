# ChiefOS

[Download the latest ChiefOS extension package](../../releases/latest/download/chief-os-latest.zip)

**A digital chief of staff for Microsoft 365. It reads your inbox, calendar, Teams
messages, and recent meeting recaps twice a day, tells you what actually matters, and
keeps your task list current so nothing important quietly slips.**

Most people start the day by scrolling. They open Outlook, skim thirty messages, glance
at the calendar, check Teams, reconstruct what recent meetings decided, and hope nothing
urgent is buried. It takes twenty minutes and still misses things.

This extension does that pass for you. At 7am it hands you a short briefing: what needs a
decision today, where your calendar conflicts, who is waiting on you, and what you should
do about each one. At 4pm it tells you what moved, what is still open, and what to
prepare for tomorrow.

---

## What you get

Twice a day, five things arrive together.

| Output               | What it is                                                                        |
| -------------------- | --------------------------------------------------------------------------------- |
| **The briefing**     | A one-page summary of your day, ranked by what needs you most                     |
| **Your task list**   | A running list of actions, carried forward until they are genuinely done          |
| **Draft replies**    | Outlook drafts prepared for the emails that need a response, saved but never sent |
| **A briefing image** | An illustrated poster of your day, one hand-drawn vignette per task               |
| **A summary email**  | The same briefing sent to you, so it is in your inbox wherever you are            |

### Morning Brief

Runs before noon. Answers: what needs a decision today, which meetings need preparation,
where the calendar clashes, what recent meetings committed you to, and who is waiting on
a reply.

### Afternoon Recap

Runs from noon onward. Answers: what got resolved, what is still open, what is now
overdue, what today's meetings changed, and what to prepare for tomorrow. It only surfaces
what changed, so it does not repeat the morning back at you.

---

## The four skills

The extension is deliberately small: four skills, each one something you would actually
ask for out loud.

| Skill                      | You would say                                   | What it does                                                                                                                                          |
| -------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chief-os-brief**         | "Give me my morning brief"                      | The whole daily routine, from reading your inbox to sending the summary email                                                                         |
| **chief-os-schedule**      | "Set up my daily runs"                          | Sets the two daily times. Run once, then forget about it                                                                                              |
| **chief-os-todo-complete** | "Tick off the tasks I finished"                 | Lists your active tasks, asks which ones are done, then refreshes the briefing and the image                                                          |
| **chief-os-image-prompt**  | "Write me an image prompt for a coastal sunset" | Composes an illustration prompt in a named style, Everyday Doodle or Scientific Editorial. It returns the prompt and never generates the image itself |

**chief-os-brief** is the one that does the work. The other three exist because they are
genuinely separate things you might want: setting your schedule happens once at setup,
closing out tasks happens whenever you finish something, and generating an image is
useful outside a briefing entirely.

You can also ask for one part on its own, such as "triage my email" or "what is on my
calendar", without running the full routine.

---

## How a run works

```mermaid
flowchart TD
  A["Read email, calendar, Teams,<br/>and recent meeting recaps"] --> B["Score every item on<br/>urgency, impact, and who owes what"]
    B --> C["Write the summary<br/>and rank what matters"]
    C --> D["Update your task list,<br/>carrying forward what is unfinished"]
    D --> E["Prepare Outlook drafts<br/>for the replies you owe"]
    E --> F["Build the briefing page"]
    F --> G["Illustrate each task<br/>as the briefing image"]
    G --> H["Check everything<br/>actually got produced"]
    H --> I["Send the summary<br/>to your inbox"]
```

The scoring in step two is the part that makes the output useful rather than just a list.
Every email, upcoming event, Teams thread, and completed-meeting outcome is scored on five
source-specific factors. Across them, the model looks for your relationship to the
outcome, business impact, time criticality, ownership, preparation, decisions, and risk.

The weighting differs by source because the sources do not behave the same way. For
email, who it is from carries the most weight. For upcoming meetings and Teams threads,
business impact does. Completed-meeting recaps prioritise verified decisions, actions,
risks, and who owns the next move.

Only evidence counts. A message is not important because the sender has a senior job
title or because the subject line says "URGENT". Scores decide the order only, and never
appear in anything you read.

---

## What it will never do

These are hard rules, not preferences. They hold on every run.

- **It never sends email on your behalf.** The only message it sends is the summary to
  you. Replies to other people are prepared as drafts and left in your Drafts folder for
  you to review, edit, and send.
- **Every draft is clearly marked.** Each one carries a bold, uppercase AI-generated
  notice at the top so it can never be mistaken for something you wrote.
- **It never invents anything.** If it cannot verify a recipient, a date, a commitment, a
  link, or your email signature, it skips the item and tells you, rather than guessing.
- **It never guesses your signature.** It reproduces your real one or leaves it out and
  flags it.
- **It never stores secrets.** Passwords, keys, tokens, and sensitive personal details are
  kept out of its memory file.
- **It never claims work it did not do.** Every step is verified before it is reported as
  complete.

---

## Your data

Your information stays inside your own Microsoft 365 environment. Nothing is copied out,
sold, used for advertising or profiling, or used to train models.

Four files are kept in your own working folder, `/output`, and you can read, edit, or
delete any of them at any time:

| File                 | What it holds                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `briefing.html`      | The current briefing                                                                                                  |
| `todo.md`            | Your running task list                                                                                                |
| `memory.md`          | Durable context that improves the triage over time, such as who your key contacts are and how you like to communicate |
| `artifact-image.png` | The illustrated version of the current task list                                                                      |

Each file is replaced in place on every run, so they never sprawl into dozens of dated
copies.

---

## Getting started

1. **Install the extension** in Microsoft 365 Copilot.
2. **Say "set up my daily runs".** You will be asked to pick a morning time (7am, 8am, or
   9am) and an afternoon time (3pm, 4pm, or 5pm). Defaults are 7am and 4pm, in your local
   time zone.
3. **That is it.** The briefing arrives at both times from the next day. To run one
   immediately, just ask for your morning brief.

Both runs continue in the same conversation, so the afternoon recap already knows what the
morning brief said.

To change your times later, ask to set up your daily runs again. It updates the existing
schedule rather than creating a second one.

---

## How it is put together

Worth understanding if you plan to change how the assistant behaves, because it is the
reason changes are cheap and safe to make.

The daily routine is written once, as a nine-step procedure in a single file. Each step
names the one document it consults. Those documents, called references, hold the detail:
how to score an email, how to extract verified meeting outcomes, how to word a draft, and
what the summary email should look like. They are read only at the step that needs them.

The practical effect: to change how upcoming meetings or completed meeting recaps are
prioritised, you edit their reference file. The routine itself does not change, and no
other step is affected.

```
chief-os-brief/
  SKILL.md      the nine-step routine and the safety rules
  references/   14 documents, grouped by what they govern
  assets/       the packaged briefing template, copied and populated during a run
```

References are grouped by prefix so the relevant one is easy to find.

| Group         | Documents                                                                                                     | Governs                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `triage-`     | `triage-contract`, `triage-scoring`, `triage-email`, `triage-calendar`, `triage-chat`, `triage-meeting-recap` | How each source is read, scored, and ranked                  |
| `output-`     | `output-briefing`, `output-image`, `output-todo`, `output-memory`                                             | The four things written to your OneDrive                     |
| `email-`      | `email-draft`, `email-html-design`, `email-send-summary`                                                      | Preparing drafts, and the one email that does get sent       |
| `conventions` | `conventions`                                                                                                 | Tone, wording, and date formatting across everything you see |

The order they are consulted during a run:

| Step | Reference consulted                                             | What it decides                                           |
| ---- | --------------------------------------------------------------- | --------------------------------------------------------- |
| 0    | `output-memory`, `output-todo`                                  | Loads your context and unfinished tasks                   |
| 1    | `triage-contract`, `triage-scoring`, then the four source files | What matters today, and in what order                     |
| 2    | none                                                            | Writes the executive summary                              |
| 3    | `output-todo`                                                   | Updates your task list                                    |
| 4    | `email-draft`                                                   | Prepares Outlook drafts                                   |
| 5    | `output-briefing`                                               | Builds the briefing page                                  |
| 6    | `output-image`, then `chief-os-image-prompt` once per task      | Creates the briefing image                                |
| 7    | `output-memory`                                                 | Verifies everything, and saves anything worth remembering |
| 8    | `email-send-summary`, `email-html-design`                       | Sends the summary to you                                  |

`conventions` applies at every step, which is why the tone stays consistent whether you
are reading the briefing, a draft reply, or the summary email.

---

## For developers

Requires [Bun](https://bun.sh).

Build and package the extension. The packaging script builds the briefing template from
`apps/artifacts`, so install that workspace first:

```bash
cd apps/artifacts
bun install

cd ../extension-package
bun install
bun index.ts
```

This builds the briefing template, copies it into the extension, bumps the version in
`extension/manifest.json`, and writes `chief-os-<version>.zip` ready to upload.

Every push to `main` that changes a file under `extension/` automatically publishes a
GitHub Release. The `Release extension` workflow derives a unique patch version from the
manifest version and workflow run number, builds `chief-os-<version>.zip`, creates the
matching release tag, and attaches the ZIP. No manual tag is required.

Work on the briefing template on its own:

```bash
cd apps/artifacts
bun install
bun run dev
```

| Path                      | Contents                                                              |
| ------------------------- | --------------------------------------------------------------------- |
| `extension/`              | The shipped extension: `manifest.json`, icons, and the skills         |
| `apps/artifacts/`         | React app that builds the single-file briefing template               |
| `apps/extension-package/` | Build script that packages `extension/` into `chief-os-<version>.zip` |

Skills are registered in the `agentSkills` array of
[extension/manifest.json](extension/manifest.json). Every folder listed there needs a
`SKILL.md` with `name` and `description` frontmatter.

- **Changing behaviour:** edit the relevant file under `references/`. Nothing else needs
  to change.
- **Adding a step:** add it to `SKILL.md`, name the reference it reads, and add a bullet
  to the References list at the bottom of `SKILL.md`.
- **Adding a skill:** create the folder with a `SKILL.md`, then register it in the
  manifest. A skill only earns its own folder if a user would ask for it directly.

The briefing template reads its data from a `daily-briefing-data` script element. The
shape of that payload is defined as TypeScript interfaces in
[output-briefing.md](extension/skills/chief-os-brief/references/output-briefing.md), which
mirror the ones in [App.tsx](apps/artifacts/src/App.tsx). Change both together.

House style for everything the user sees is set in
[conventions.md](extension/skills/chief-os-brief/references/conventions.md): Australian
English, no em dashes, concise and action-oriented, and dates written as
`Apr 12, Mon, 9:30am`.
