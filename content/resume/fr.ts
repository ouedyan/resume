import type { ResumeContent } from "./types";

export const frenchResume = {
  locale: "fr",
  seo: {
    description:
      "Ingénieur logiciel senior spécialisé en Flutter, sécurité Spring Boot, Next.js, Google Cloud et mise en production de plateformes fiables.",
  },
  sections: {
    workExperience: "Expérience professionnelle",
    openSource: "Projets open source sélectionnés",
    technicalSkills: "Compétences techniques",
    languages: "Langues",
  },
  actions: {
    downloadPdf: "Télécharger le CV en PDF",
    switchLanguage: "Changer la langue du CV",
  },
  labels: {
    present: "Aujourd’hui",
  },
  profile: {
    name: "Yan OUEDRAOGO",
    headline: "Ingénieur logiciel senior full-stack et plateforme",
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
      "Ingénieur logiciel senior et fondateur de SELINEXT, avec plus de cinq ans d’expérience dans la conception de produits web et mobiles, de backends sécurisés et de plateformes cloud. Les missions récentes couvrent l’optimisation d’applications Flutter, les architectures OAuth 2.0/OIDC avec Spring Boot, les interfaces Next.js et l’exploitation sur Google Cloud. Une expertise qui s’étend de l’architecture à la mise en production, avec une attention particulière portée à la sécurité, aux performances et à la fiabilité opérationnelle.",
    currentRole: "Fondateur et ingénieur logiciel principal",
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
      role: "Fondateur et ingénieur logiciel principal",
      startDate: "2024-09",
      endDate: null,
      summary:
        "Création et direction d’une société d’ingénierie logicielle qui accompagne des clients internationaux sur le développement produit, l’architecture, la sécurité applicative et l’infrastructure cloud.",
      projects: [
        {
          id: "coris-sic",
          name: "Plateforme de formation et d’évaluation Coris SIC",
          bullets: [
            "Pilotage de l’ingénierie de bout en bout avec Next.js, React, Spring Boot, Java, PostgreSQL, Nginx et Google Cloud Platform.",
            "Conception de l’architecture de sécurité OAuth 2.0/OIDC avec Spring Authorization Server, MFA, JWT, RBAC, renouvellement et déconnexion sécurisés, ainsi que des contrôles d’autorisation en temps réel.",
            "Mise en place des environnements bêta et production avec Docker, OpenTofu, Ansible, GitHub Actions, Workload Identity Federation, Google Cloud IAP et Cloudflare Tunnel.",
            "Industrialisation de la sécurité et de l’observabilité avec Semgrep, Trivy, génération de SBOM, contrôles bloquants, logs structurés, Google Cloud Ops Agent et CrowdSec.",
            "Modernisation vers Next.js 16, React 19, Tailwind CSS 4, Spring Boot 4, Spring Security 7 et Java 25, avec journal d’audit, reprise d’historique, localisation et tests automatisés.",
          ],
        },
        {
          id: "goldman-products",
          name: "Produits Goldman Yazılım — Elira, CCNews et MyNews",
          website: "https://www.linkedin.com/company/goldman-software-inc",
          bullets: [
            "Conception et livraison d’Elira, plateforme de trading de cryptomonnaies en Spring Boot et Next.js intégrant stratégies planifiées, traitement résilient des ordres, traçabilité des transactions et administration en temps réel.",
            "Modernisation de l’authentification Flutter de CCNews et MyNews, correction des incompatibilités de plateformes, maintien de la conformité des stores et suivi des versions mobiles.",
          ],
        },
      ],
    },
    {
      id: "simulon",
      company: "Simulon",
      location: "À distance",
      website: "https://www.simulon.com",
      role: "Ingénieur logiciel — mission contractuelle",
      startDate: "2025-08",
      endDate: "2026-01",
      summary:
        "Intervention sur les applications Flutter mobile, web et desktop de Simulon dédiées aux workflows 3D temps réel et aux effets visuels.",
      bullets: [
        "Refonte des flux d’assets et de publications, depuis une architecture GraphQL/Ferry/Hive historique vers des services REST réutilisables avec Riverpod, pagination infinie, cache Isar, politiques TTL et stale-while-revalidate, éviction LRU, entités normalisées et synchronisation SSE.",
        "Profilage et optimisation de workflows Flutter/Unity contraints en ressources : parallélisation du cache et du réseau, sortie des traitements non critiques du chemin principal, réduction des reconstructions et correction des saccades de rafraîchissement et états obsolètes.",
        "Mise en place de la synchronisation réactive des uploads, favoris, publications et traitements cloud, ainsi que du support Flutter Web/Desktop, des téléchargements, des parcours scène/prise/rendu et du diagnostic de l’intégration Blender.",
      ],
    },
    {
      id: "zalisoft",
      company: "Zalisoft",
      location: "Istanbul, Turquie",
      website: "https://www.zalisoft.com",
      role: "Lead technique frontend, développeur React et Flutter",
      startDate: "2021-09",
      endDate: "2024-09",
      summary:
        "Évolution du développement Flutter et React vers le pilotage technique frontend de produits e-commerce, d’agrégation d’actualités, de fintech et d’immobilier.",
      bullets: [
        "Direction de l’architecture et des livraisons frontend avec Next.js, React, Flutter, Tailwind CSS, SSR, gestion d’état, authentification, autorisation, internationalisation, revue de code et coordination des tâches.",
        "Réalisation du parcours de paiement web d’Anneler Satılıyor, du panier au 3-D Secure et au suivi de commande, puis refonte de la gestion d’état de l’application Flutter avec BLoC.",
        "Développement, pour MyNews et CCNews, de fonctions d’extraction et de traduction couvrant plus de 100 langues, avec lecture audio des écrans et clients web/mobile.",
        "Architecture du frontend de Yeniha.tr, incluant commande et paiement sécurisé, et réalisation d’interfaces complexes, d’animations, d’outils d’administration et d’optimisations SEO pour E-lira.",
        "Refonte du site institutionnel de Zalisoft, contribuant à une hausse de visibilité pouvant atteindre 50 %.",
      ],
    },
  ],
  projects: [
    {
      id: "flutter-template",
      name: "Template d’application mobile Flutter",
      website: "https://github.com/ouedyan/flutter-mobile-app-template",
      startYear: 2022,
      endYear: 2025,
      description:
        "Socle Flutter open source prêt pour la production, avec Riverpod, GoRouter, thèmes typés, internationalisation, infrastructure API, génération de code et outillage d’architecture propre.",
    },
    {
      id: "nextjs-template",
      name: "Template Next.js",
      website: "https://github.com/ouedyan/nextjs-template",
      startYear: 2022,
      endYear: 2024,
      description:
        "Socle Next.js open source orienté entreprise, fondé sur l’App Router, les React Server Components, TypeScript et un outillage complet pour faire évoluer les projets.",
    },
  ],
  skillGroups: [
    {
      id: "frontend-mobile",
      name: "Frontend et mobile",
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
      name: "Backend et sécurité",
      skills: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "OAuth 2.0 / OIDC",
        "JWT",
        "API REST",
        "PostgreSQL",
        "SSE",
      ],
    },
    {
      id: "cloud-platform",
      name: "Cloud et plateforme",
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
      name: "Qualité et opérations",
      skills: [
        "Vitest",
        "Playwright",
        "Testcontainers",
        "Storybook",
        "Semgrep",
        "Trivy",
        "SBOM",
        "Logs structurés",
      ],
    },
  ],
  languages: [
    { id: "fr", name: "Français", level: "Courant" },
    { id: "en", name: "Anglais", level: "Professionnel" },
    { id: "tr", name: "Turc", level: "Conversationnel" },
  ],
} satisfies ResumeContent;
