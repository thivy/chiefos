# Email Summary

Send the completed morning brief or afternoon recap to the signed-in user as one well-formed HTML email with the generated briefing image attached.

## Workflow

1. Use the final briefing JSON and `artifact-image.png` from the calling workflow.
2. Resolve the signed-in user's primary Outlook mailbox from Microsoft 365 profile data. Do not guess the address.
3. Read [email-html-design.md](email-html-design.md) in full, then generate the complete HTML email from it. Reading it is mandatory on every run; never assemble the body from memory or from a previous run. Every rule in it is a requirement, not a suggestion. Do not use any other HTML or CSS framework, formatting, visual language, or design system.
4. Include all content, in order: Overview, To Do, Email, Calendar, Teams Chat, and Meeting Recaps. Preserve item wording and order, omit absent fields, and show a concise empty state for an empty section.
5. Run the `Verify Before Output` checklist in [email-html-design.md](email-html-design.md) against the generated HTML, item by item. Repair and recheck any failure. Do not send while a check is failing, and report the checklist outcome with the send result in step 9.
6. Confirm `artifact-image.png` exists, is non-empty, and is the same readable PNG validated by `output-image.md` in the current run. Read its bytes without modifying or regenerating it, and prepare it as a regular file attachment named `artifact-image.png` with content type `image/png`. Do not embed it in the HTML or use a path, URL, or data URL as a substitute for the attachment bytes.
7. Before sending, verify the outgoing message has exactly one attachment, named `artifact-image.png`, with content type `image/png` and non-empty content. Stop with a `Failed` result if the image or attachment cannot be verified; never send the summary without it.
8. Send one email from the signed-in user to that same verified mailbox address. Use the subject `<Morning Brief|Afternoon Recap> | <local date>`.
9. Confirm the send result and that the accepted send request included the attachment. Report the send result together with the step 5 checklist outcome. Do not retry an unknown result because that could create a duplicate.

## References

- [email-html-design.md](email-html-design.md): strictly follow for visual language and HTML structure.
