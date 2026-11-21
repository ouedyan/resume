import type { Locale } from "../../lib/i18n/config";

export type YearMonth =
  `${number}-${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`;

export type LinkValue = {
  label: string;
  url: string;
};

export type ExperienceProject = {
  id: string;
  name: string;
  /** Omitted when the project has no public page worth linking. */
  website?: string;
  bullets: string[];
};

export type Experience = {
  id: string;
  company: string;
  location: string;
  website: string;
  role: string;
  startDate: YearMonth;
  endDate: YearMonth | null;
  summary: string;
  bullets?: string[];
  projects?: ExperienceProject[];
};

export type OpenSourceProject = {
  id: string;
  name: string;
  website: string;
  startYear: number;
  endYear: number;
  description: string;
};

export type SkillGroup = {
  id: string;
  name: string;
  skills: string[];
};

export type SpokenLanguage = {
  id: Locale;
  name: string;
  level: string;
};

export type ResumeContent = {
  locale: Locale;
  seo: {
    description: string;
  };
  sections: {
    workExperience: string;
    openSource: string;
    technicalSkills: string;
    languages: string;
  };
  actions: {
    downloadPdf: string;
    switchLanguage: string;
  };
  labels: {
    present: string;
  };
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
  projects: OpenSourceProject[];
  skillGroups: SkillGroup[];
  languages: SpokenLanguage[];
};
