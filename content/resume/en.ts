import type { ResumeContent } from "./types";

export const englishResume = {
  locale: "en",
  seo: {
    description:
      "Senior full-stack and platform engineer specializing in Flutter, Spring Boot security, Next.js, Google Cloud, and production delivery.",
  },
  sections: {
    workExperience: "Work Experience",
    openSource: "Selected Open Source",
    technicalSkills: "Technical Skills",
    languages: "Languages",
  },
  actions: {
    downloadPdf: "Download PDF resume",
    switchLanguage: "Change resume language",
  },
  labels: {
    present: "Present",
  },
  profile: {
    name: "Yan OUEDRAOGO",
    headline: "Senior Full-Stack & Platform Engineer",
    location: "Ouagadougou, Burkina Faso",
    email: "yanouedraogo5@gmail.com",
    phone: "+226 56 71 06 42",
    linkedin: {
      label: "linkedin.com/in/ouedyan",
      url: "https://www.linkedin.com/in/ouedyan",
    },
    github: {
      label: "github.com/ouedyan",
      url: "https://github.com/ouedyan",
    },
    summary:
      "Senior full-stack and platform engineer with 5+ years of experience delivering web, mobile, backend, and cloud systems. Founder of SELINEXT, with recent work spanning high-performance Flutter applications, Spring Boot OAuth/OIDC platforms, Next.js products, and production infrastructure on Google Cloud. Experienced in software architecture, application security, performance optimization, DevSecOps, and end-to-end product delivery.",
    currentRole: "Founder & Principal Software Engineer",
    currentOrganization: {
      name: "SELINEXT",
      url: "https://www.selinext.com",
    },
  },
  experience: [
    {
      id: "selinext",
      company: "SELINEXT",
      location: "Ouagadougou, Burkina Faso",
      website: "https://www.selinext.com",
      role: "Founder & Principal Software Engineer",
      startDate: "2024-09",
      endDate: null,
      summary:
        "Founded and lead a software engineering company delivering product development, architecture, security, and cloud infrastructure for international clients.",
      projects: [
        {
          id: "coris-sic",
          name: "Coris SIC training and evaluation platform",
          bullets: [
            "Lead end-to-end engineering across Next.js, React, Spring Boot, Java, PostgreSQL, Nginx, and Google Cloud Platform.",
            "Designed the OAuth 2.0/OIDC security architecture with Spring Authorization Server, MFA, JWT, RBAC, secure refresh/logout flows, and live authorization checkpoints.",
            "Built beta and production infrastructure with Docker, OpenTofu, Ansible, GitHub Actions, Workload Identity Federation, Google Cloud IAP, and Cloudflare Tunnel.",
            "Established DevSecOps and observability pipelines with Semgrep, Trivy, SBOM generation, security gates, structured logging, Google Cloud Ops Agent, and CrowdSec.",
            "Modernized the stack to Next.js 16, React 19, Tailwind CSS 4, Spring Boot 4, Spring Security 7, and Java 25; implemented audit journaling, historical backfill, localization, and automated tests.",
          ],
        },
        {
          id: "goldman-products",
          name: "Goldman Yazılım products — Elira, CCNews, and MyNews",
          website: "https://www.linkedin.com/company/goldman-software-inc",
          bullets: [
            "Designed and delivered Elira, a Spring Boot and Next.js cryptocurrency trading platform with scheduled strategies, resilient order processing, transaction logging, and real-time administration.",
            "Modernized the CCNews and MyNews Flutter authentication flow, resolved platform compatibility issues, maintained store compliance, and managed ongoing mobile releases.",
          ],
        },
      ],
    },
    {
      id: "simulon",
      company: "Simulon",
      location: "Remote",
      website: "https://www.simulon.com",
      role: "Contract Software Engineer",
      startDate: "2025-08",
      endDate: "2026-01",
      summary:
        "Contributed across Simulon's Flutter mobile, web, and desktop products for real-time 3D and visual-effects workflows.",
      bullets: [
        "Modernized asset and publication feeds from legacy GraphQL/Ferry/Hive flows to a reusable REST architecture using Riverpod, infinite pagination, Isar caching, TTL and stale-while-revalidate policies, LRU eviction, normalized entities, and SSE synchronization.",
        "Profiled and optimized resource-constrained Flutter/Unity workflows by parallelizing cache and network fetches, moving noncritical work off the critical path, reducing rebuilds, and resolving refresh jank and stale-state issues.",
        "Built reactive synchronization for uploads, favorites, publications, and cloud jobs, plus Flutter Web and Desktop support, downloads, scene/take/render workflows, and Blender integration debugging.",
      ],
    },
    {
      id: "zalisoft",
      company: "Zalisoft",
      location: "Istanbul, Türkiye",
      website: "https://www.zalisoft.com",
      role: "Frontend Web Tech Lead, React & Flutter Developer",
      startDate: "2021-09",
      endDate: "2024-09",
      summary:
        "Progressed from Flutter and React development into frontend technical leadership across e-commerce, news aggregation, fintech, and real-estate products.",
      bullets: [
        "Led frontend architecture and delivery with Next.js, React, Flutter, Tailwind CSS, SSR, state management, authentication, authorization, internationalization, code review, and task coordination.",
        "Built Anneler Satılıyor's web payment flow from basket through 3-D Secure and order tracking, and re-architected the Flutter application's state management with BLoC.",
        "Developed MyNews and CCNews content extraction and translation capabilities supporting 100+ languages, audio screen reading, and web/mobile clients.",
        "Architected Yeniha.tr's frontend, including ordering and secure payment, and delivered complex UI, animation, administration, and SEO work for E-lira.",
        "Renewed Zalisoft's corporate website, contributing to an increase of up to 50% in visibility.",
      ],
    },
  ],
  projects: [
    {
      id: "flutter-template",
      name: "Flutter Mobile App Template",
      website: "https://github.com/ouedyan/flutter-mobile-app-template",
      startYear: 2022,
      endYear: 2025,
      description:
        "Open-source, production-ready Flutter starter with Riverpod, GoRouter, type-safe theming, internationalization, API infrastructure, code generation, and clean-architecture tooling.",
    },
    {
      id: "nextjs-template",
      name: "Next.js Template",
      website: "https://github.com/ouedyan/nextjs-template",
      startYear: 2022,
      endYear: 2024,
      description:
        "Open-source, enterprise-oriented Next.js starter with App Router, React Server Components, TypeScript, and a comprehensive scalable-development toolchain.",
    },
  ],
  skillGroups: [
    {
      id: "frontend-mobile",
      name: "Frontend & Mobile",
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "Flutter",
        "Dart",
        "Tailwind CSS",
        "Riverpod",
        "BLoC",
        "SurveyJS",
      ],
    },
    {
      id: "backend-security",
      name: "Backend & Security",
      skills: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "OAuth 2.0 / OIDC",
        "JWT",
        "REST APIs",
        "PostgreSQL",
        "SSE",
      ],
    },
    {
      id: "cloud-platform",
      name: "Cloud & Platform",
      skills: [
        "Google Cloud Platform",
        "Docker",
        "Nginx",
        "OpenTofu / Terraform",
        "Ansible",
        "GitHub Actions",
        "Cloudflare",
      ],
    },
    {
      id: "quality-operations",
      name: "Quality & Operations",
      skills: [
        "Vitest",
        "Playwright",
        "Testcontainers",
        "Storybook",
        "Semgrep",
        "Trivy",
        "SBOM",
        "Structured logging",
      ],
    },
  ],
  languages: [
    { id: "fr", name: "French", level: "Fluent" },
    { id: "en", name: "English", level: "Professional" },
    { id: "tr", name: "Turkish", level: "Conversational" },
  ],
} satisfies ResumeContent;
