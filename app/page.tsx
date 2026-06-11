import type { Metadata } from "next";
import Link from "next/link";
import resumeDataJson from "./resume-data.json";

type LinkValue = {
  label: string;
  url: string;
};

type Project = {
  name: string;
  website?: string;
  bullets: string[];
};

type Experience = {
  company: string;
  location: string;
  website?: string;
  role: string;
  startDate: string;
  endDate: string;
  summary: string;
  bullets?: string[];
  projects?: Project[];
};

type ResumeData = {
  profile: {
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    linkedin: LinkValue;
    github: LinkValue;
    summary: string;
    currentRole: string;
    currentOrganization: {
      name: string;
      url: string;
    };
  };
  experience: Experience[];
  projects: Array<{
    name: string;
    website: string;
    dates: string;
    description: string;
  }>;
  skillGroups: Array<{
    name: string;
    skills: string[];
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
};

const resumeData = resumeDataJson as ResumeData;
const { profile } = resumeData;

export const metadata: Metadata = {
  alternates: {
    canonical: "https://resume.ouedyan.dev",
  },
  title: `${profile.name} | ${profile.headline}`,
  description: profile.summary,
};

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
}

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

export default function ResumePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://resume.ouedyan.dev/#person",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://resume.ouedyan.dev",
    },
    name: profile.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ouagadougou",
      addressCountry: "Burkina Faso",
    },
    email: profile.email,
    telephone: profile.phone,
    jobTitle: profile.currentRole,
    worksFor: {
      "@type": "Organization",
      name: profile.currentOrganization.name,
      url: profile.currentOrganization.url,
    },
    sameAs: [profile.linkedin.url, profile.github.url],
    url: "https://resume.ouedyan.dev",
  };

  return (
    <main className="min-h-screen bg-resume-background-main print:bg-white">
      <div className="max-w-[1084px] mx-auto px-0 lg:px-[42px] lg:pb-[42px] print:max-w-full print:p-0">
        <div className="flex justify-end items-center px-4 lg:px-0 min-h-0 lg:min-h-[42px] print:hidden">
          <a
            title="Download PDF resume"
            aria-label="Download PDF resume"
            download="Yan_OUEDRAOGO_Resume.pdf"
            href="/api/pdf"
            className="inline-flex p-[6px] bg-white my-3 rounded-full font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              strokeWidth="2"
              className="stroke-black/60"
              aria-hidden="true"
            >
              <path d="M10.6667 14.6667L16 20.0001L21.3333 14.6667M16 5V19.5M25.5 23V26.4999H6.5L6.5 23" />
            </svg>
          </a>
        </div>

        <article className="w-full max-w-[1000px] mx-auto bg-resume-background-card overflow-hidden print:max-w-full">
          <div className="w-full max-w-[800px] mx-auto px-6 py-10 md:px-[60px] md:py-[60px] print:max-w-full print:p-0">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(personJsonLd),
              }}
            />

            <header className="resume-header">
              <div className="absolute top-0 left-0 md:top-[-12px] md:left-[-80px] print:top-0 print:left-0">
                <div className="bg-resume-accent h-[50px] w-[40px] py-[6px]">
                  <div className="text-sm text-black leading-[19px] text-center font-semibold font-lft">
                    Y
                  </div>
                  <div className="text-sm text-black leading-[19px] text-center font-semibold font-lft">
                    O
                  </div>
                </div>
              </div>

              <h1 className="font-lft font-semibold text-resume-text-primary uppercase [font-size:28px] [line-height:1] tracking-name mb-5 md:pt-0 pt-[86px] print:pt-[86px]">
                {profile.name}
              </h1>

              <div className="resume-headline">{profile.headline}</div>

              <address className="resume-contact">
                <span>{profile.location}</span>
                <span className="resume-contact-separator"> | </span>
                <ExternalLink href={profile.linkedin.url}>
                  {profile.linkedin.label}
                </ExternalLink>
                <span className="resume-contact-separator"> | </span>
                <ExternalLink href={profile.github.url}>
                  {profile.github.label}
                </ExternalLink>
                <span className="resume-contact-separator"> | </span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <span className="resume-contact-separator"> | </span>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  {profile.phone}
                </a>
              </address>

              <p className="resume-summary">{profile.summary}</p>
            </header>

            <section className="resume-section">
              <h2 className="resume-section-title">Work Experience</h2>

              {resumeData.experience.map((experience) => (
                <div key={experience.company} className="resume-entry">
                  <h3 className="resume-entry-title">
                    {experience.website ? (
                      <ExternalLink
                        href={experience.website}
                        className="text-inherit"
                      >
                        {experience.company} ({experience.location})
                      </ExternalLink>
                    ) : (
                      <>
                        {experience.company} ({experience.location})
                      </>
                    )}
                  </h3>

                  <div className="resume-entry-subtitle">
                    {experience.role}
                    <span className="hidden sm:inline"> | </span>
                    <br className="inline sm:hidden print:hidden" />
                    <span>
                      {experience.startDate} - {experience.endDate}
                    </span>
                  </div>

                  <p className="resume-text">{experience.summary}</p>

                  {experience.projects?.map((project) => (
                    <div key={project.name} className="resume-project">
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
              <h2 className="resume-section-title">Selected Open Source</h2>

              {resumeData.projects.map((project) => (
                <div key={project.name} className="resume-entry compact">
                  <h3 className="resume-entry-title">
                    <ExternalLink
                      href={project.website}
                      className="text-inherit"
                    >
                      {project.name}
                    </ExternalLink>
                  </h3>
                  <div className="resume-entry-subtitle">{project.dates}</div>
                  <p className="resume-text">{project.description}</p>
                </div>
              ))}
            </section>

            <section className="resume-section break-inside-avoid">
              <h2 className="resume-section-title">Technical Skills</h2>

              <div className="resume-skills-container">
                {resumeData.skillGroups.map((group) => (
                  <div key={group.name} className="resume-skill-group">
                    <h3 className="resume-skill-title">{group.name}</h3>
                    <p className="resume-skill-list">
                      {group.skills.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-section break-inside-avoid">
              <h2 className="resume-section-title">Languages</h2>
              <ul className="list-none m-0 p-0">
                {resumeData.languages.map((language) => (
                  <li key={language.name} className="resume-skill-tag">
                    {language.name} - {language.level}
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
