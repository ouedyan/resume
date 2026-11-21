import type { ReactNode } from "react";

import type { ResumeContent } from "../../content/resume/types";
import {
  formatDateRange,
  pdfPath,
  type Locale,
} from "../../lib/i18n/config";
import { ExternalLink } from "./external-link";
import { LanguageSwitcher } from "./language-switcher";

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="resume-list">
      {bullets.map((bullet) => (
        <li key={bullet} className="resume-list-item">
          {bullet}
        </li>
      ))}
    </ul>
  );
}

function ContactItem({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="resume-contact-separator" aria-hidden="true">
        {" "}
        |{" "}
      </span>
      {children}
    </>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth="2"
      className="stroke-current"
      aria-hidden="true"
    >
      <path d="M10.6667 14.6667L16 20.0001L21.3333 14.6667M16 5V19.5M25.5 23V26.4999H6.5L6.5 23" />
    </svg>
  );
}

export function ResumePage({
  locale,
  resume,
}: {
  locale: Locale;
  resume: ResumeContent;
}) {
  const { profile } = resume;

  return (
    <main className="min-h-screen bg-resume-background-main print:bg-white">
      <div className="mx-auto max-w-[1084px] px-0 lg:px-[42px] lg:pb-[42px] print:max-w-full print:p-0">
        <div className="resume-toolbar">
          <LanguageSwitcher
            currentLocale={locale}
            label={resume.actions.switchLanguage}
          />
          <a
            title={resume.actions.downloadPdf}
            aria-label={resume.actions.downloadPdf}
            download={`Yan_OUEDRAOGO_Resume_${locale}.pdf`}
            href={pdfPath(locale)}
            className="resume-download-link"
          >
            <DownloadIcon />
          </a>
        </div>

        <article className="mx-auto w-full max-w-[1000px] overflow-hidden bg-resume-background-card print:max-w-full">
          <div className="mx-auto w-full max-w-[800px] px-6 py-10 md:px-[60px] md:py-[60px] print:max-w-full print:p-0">
            <header className="resume-header">
              <div className="absolute left-0 top-0 md:-left-20 md:-top-3 print:left-0 print:top-0">
                <div className="h-[50px] w-[40px] bg-resume-accent py-[6px]">
                  <div className="text-center font-lft text-sm font-semibold leading-[19px] text-black">
                    Y
                  </div>
                  <div className="text-center font-lft text-sm font-semibold leading-[19px] text-black">
                    O
                  </div>
                </div>
              </div>

              <h1 className="mb-5 pt-[86px] font-lft text-[28px] font-semibold uppercase leading-none tracking-name text-resume-text-primary md:pt-0 print:pt-[86px]">
                {profile.name}
              </h1>

              <p className="resume-headline">{profile.headline}</p>

              <address className="resume-contact">
                <span>{profile.location}</span>
                <ContactItem>
                  <ExternalLink href={profile.linkedin.url}>
                    {profile.linkedin.label}
                  </ExternalLink>
                </ContactItem>
                <ContactItem>
                  <ExternalLink href={profile.github.url}>
                    {profile.github.label}
                  </ExternalLink>
                </ContactItem>
                <ContactItem>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </ContactItem>
                <ContactItem>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                    {profile.phone}
                  </a>
                </ContactItem>
              </address>

              <p className="resume-summary">{profile.summary}</p>
            </header>

            <section className="resume-section">
              <h2 className="resume-section-title">
                {resume.sections.workExperience}
              </h2>

              {resume.experience.map((experience) => (
                <div key={experience.id} className="resume-entry">
                  <h3 className="resume-entry-title">
                    <ExternalLink
                      href={experience.website}
                      className="text-inherit"
                    >
                      {experience.company} ({experience.location})
                    </ExternalLink>
                  </h3>

                  <div className="resume-entry-subtitle">
                    {experience.role}
                    <span className="hidden sm:inline"> | </span>
                    <br className="inline sm:hidden print:hidden" />
                    <span>
                      {formatDateRange(
                        locale,
                        experience.startDate,
                        experience.endDate,
                        resume.labels.present,
                      )}
                    </span>
                  </div>

                  <p className="resume-text">{experience.summary}</p>

                  {experience.projects?.map((project) => (
                    <div key={project.id} className="resume-project">
                      <h4 className="resume-project-title">
                        {project.website ? (
                          <ExternalLink
                            href={project.website}
                            className="underline"
                          >
                            {project.name}
                          </ExternalLink>
                        ) : (
                          project.name
                        )}
                      </h4>
                      <BulletList bullets={project.bullets} />
                    </div>
                  ))}

                  {experience.bullets ? (
                    <BulletList bullets={experience.bullets} />
                  ) : null}
                </div>
              ))}
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">
                {resume.sections.openSource}
              </h2>

              {resume.projects.map((project) => (
                <div key={project.id} className="resume-entry compact">
                  <h3 className="resume-entry-title">
                    <ExternalLink
                      href={project.website}
                      className="text-inherit"
                    >
                      {project.name}
                    </ExternalLink>
                  </h3>
                  <div className="resume-entry-subtitle">
                    {project.startYear} – {project.endYear}
                  </div>
                  <p className="resume-text">{project.description}</p>
                </div>
              ))}
            </section>

            <section className="resume-section break-inside-avoid">
              <h2 className="resume-section-title">
                {resume.sections.technicalSkills}
              </h2>

              <div className="resume-skills-container">
                {resume.skillGroups.map((group) => (
                  <div key={group.id} className="resume-skill-group">
                    <h3 className="resume-skill-title">{group.name}</h3>
                    <p className="resume-skill-list">
                      {group.skills.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section break-inside-avoid">
              <h2 className="resume-section-title">
                {resume.sections.languages}
              </h2>
              <ul className="m-0 list-none p-0">
                {resume.languages.map((language) => (
                  <li key={language.id} className="resume-skill-tag">
                    {language.name} – {language.level}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
