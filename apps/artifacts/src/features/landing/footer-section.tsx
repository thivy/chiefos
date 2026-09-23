import { Text } from "../../components/text";

const FOOTER_LINK_CLASS =
  "rounded-xs text-sm font-[550] text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

function FooterSection() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8 lg:px-0">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}color.png`}
            alt=""
            width={192}
            height={192}
            loading="lazy"
            decoding="async"
            className="size-9 shrink-0"
          />
          <div className="flex flex-col">
            <Text as="span" variant="display-xs">
              ChiefOS
            </Text>
            <Text as="span" variant="caption">
              Your work, already triaged
            </Text>
          </div>
        </div>
        <nav aria-label="Footer links" className="flex items-center gap-5">
          <a href="#get-started" className={FOOTER_LINK_CLASS}>
            Get started
          </a>
          <a
            href="https://github.com/thivy/chiefos"
            target="_blank"
            rel="noreferrer"
            className={FOOTER_LINK_CLASS}
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}

export { FooterSection };
