import type { ResumeContent } from "./types";

export const turkishResume = {
  locale: "tr",
  seo: {
    description:
      "Flutter, Spring Boot güvenliği, Next.js, Google Cloud ve üretim sistemlerinde uzman kıdemli full-stack ve platform mühendisi.",
  },
  sections: {
    workExperience: "İş Deneyimi",
    openSource: "Seçilmiş Açık Kaynak Projeleri",
    technicalSkills: "Teknik Yetkinlikler",
    languages: "Diller",
  },
  actions: {
    downloadPdf: "PDF özgeçmişi indir",
    switchLanguage: "Özgeçmiş dilini değiştir",
  },
  labels: {
    present: "Halen",
  },
  profile: {
    name: "Yan OUEDRAOGO",
    headline: "Kıdemli Full-Stack ve Platform Mühendisi",
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
      "Web, mobil, backend ve bulut sistemlerinin tesliminde 5 yılı aşkın deneyime sahip kıdemli full-stack ve platform mühendisi; SELINEXT’in kurucusu. Son dönemde yüksek performanslı Flutter uygulamaları, Spring Boot tabanlı OAuth 2.0/OIDC platformları, Next.js ürünleri ve Google Cloud üzerindeki üretim altyapıları üzerinde çalıştı. Yazılım mimarisi, uygulama güvenliği, performans optimizasyonu, DevSecOps ve ürünün uçtan uca hayata geçirilmesi konularında deneyimli.",
    currentRole: "Kurucu ve Baş Yazılım Mühendisi",
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
      role: "Kurucu ve Baş Yazılım Mühendisi",
      startDate: "2024-09",
      endDate: null,
      summary:
        "Uluslararası müşterilere ürün geliştirme, yazılım mimarisi, uygulama güvenliği ve bulut altyapısı hizmetleri sunan mühendislik şirketini kurdu ve teknik liderliğini yürütüyor.",
      projects: [
        {
          id: "coris-sic",
          name: "Coris SIC eğitim ve değerlendirme platformu",
          website: "https://sic.selinext.dev",
          bullets: [
            "Next.js, React, Spring Boot, Java, PostgreSQL, Nginx ve Google Cloud Platform kullanılan ürünün uçtan uca mühendislik sorumluluğunu üstlendi.",
            "Spring Authorization Server, MFA, JWT, RBAC, güvenli token yenileme/çıkış akışları ve canlı yetkilendirme kontrolleriyle OAuth 2.0/OIDC güvenlik mimarisini tasarladı.",
            "Docker, OpenTofu, Ansible, GitHub Actions, Workload Identity Federation, Google Cloud IAP ve Cloudflare Tunnel ile beta ve üretim altyapılarını kurdu.",
            "Semgrep, Trivy, SBOM üretimi, güvenlik kapıları, yapılandırılmış loglama, Google Cloud Ops Agent ve CrowdSec ile DevSecOps ve gözlemlenebilirlik süreçlerini oluşturdu.",
            "Teknoloji yığınını Next.js 16, React 19, Tailwind CSS 4, Spring Boot 4, Spring Security 7 ve Java 25’e taşıdı; denetim günlüğü, geçmiş veri tamamlama, yerelleştirme ve otomatik testler geliştirdi.",
          ],
        },
        {
          id: "goldman-products",
          name: "Goldman Yazılım ürünleri — Elira, CCNews ve MyNews",
          website: "https://www.linkedin.com/company/goldman-software-inc",
          bullets: [
            "Zamanlanmış stratejiler, dayanıklı emir işleme, işlem kayıtları ve gerçek zamanlı yönetim özelliklerine sahip Spring Boot ve Next.js tabanlı Elira kripto para işlem platformunu tasarlayıp teslim etti.",
            "CCNews ve MyNews’in Flutter kimlik doğrulama akışını yeniledi; platform uyumluluk sorunlarını giderdi, mağaza kurallarına uyumu sürdürdü ve mobil sürümleri yönetti.",
          ],
        },
      ],
    },
    {
      id: "simulon",
      company: "Simulon",
      location: "Uzaktan",
      website: "https://www.simulon.com",
      role: "Sözleşmeli Yazılım Mühendisi",
      startDate: "2025-08",
      endDate: "2026-01",
      summary:
        "Simulon’un gerçek zamanlı 3D ve görsel efekt iş akışlarını destekleyen Flutter mobil, web ve masaüstü ürünlerinde görev aldı.",
      bullets: [
        "Varlık ve yayın akışlarını eski GraphQL/Ferry/Hive yapısından; Riverpod, sonsuz sayfalama, Isar önbelleği, TTL ve stale-while-revalidate politikaları, LRU tahliyesi, normalize edilmiş varlıklar ve SSE senkronizasyonu kullanan yeniden kullanılabilir REST mimarisine taşıdı.",
        "Kaynakları sınırlı Flutter/Unity iş akışlarını profilleyip optimize etti; önbellek ve ağ isteklerini paralelleştirdi, kritik olmayan işleri ana akıştan çıkardı, gereksiz yeniden oluşturmaları azalttı ve yenileme takılmalarıyla eski durum sorunlarını çözdü.",
        "Yüklemeler, favoriler, yayınlar ve bulut işleri için reaktif senkronizasyon geliştirdi; Flutter Web/Masaüstü desteği, indirmeler, sahne/çekim/render akışları ve Blender entegrasyonu hata ayıklama çalışmalarını tamamladı.",
      ],
    },
    {
      id: "zalisoft",
      company: "Zalisoft",
      location: "İstanbul, Türkiye",
      website: "https://www.zalisoft.com",
      role: "Frontend Web Teknik Lideri, React ve Flutter Geliştiricisi",
      startDate: "2021-09",
      endDate: "2024-09",
      summary:
        "Flutter ve React geliştirme görevlerinden; e-ticaret, haber toplama, fintech ve gayrimenkul ürünlerinde frontend teknik liderliğine ilerledi.",
      bullets: [
        "Next.js, React, Flutter, Tailwind CSS, SSR, durum yönetimi, kimlik doğrulama, yetkilendirme ve uluslararasılaştırma kullanılan projelerde frontend mimarisine ve teslim süreçlerine liderlik etti; kod inceleme ve görev koordinasyonunu yürüttü.",
        "Anneler Satılıyor’un sepetten 3-D Secure ve sipariş takibine uzanan web ödeme akışını geliştirdi; Flutter uygulamasının durum yönetimini BLoC ile yeniden tasarladı.",
        "MyNews ve CCNews için 100’den fazla dili destekleyen içerik çıkarma ve çeviri özellikleri, ekran seslendirme yeteneği ve web/mobil istemciler geliştirdi.",
        "Sipariş ve güvenli ödeme dahil Yeniha.tr frontend mimarisini kurdu; E-lira için karmaşık arayüzler, animasyonlar, yönetim araçları ve SEO çalışmaları gerçekleştirdi.",
        "Zalisoft kurumsal sitesini yenileyerek görünürlükte %50’ye varan artışa katkı sağladı.",
      ],
    },
  ],
  projects: [
    {
      id: "flutter-template",
      name: "Flutter Mobil Uygulama Şablonu",
      website: "https://github.com/ouedyan/flutter-mobile-app-template",
      startYear: 2022,
      endYear: 2025,
      description:
        "Riverpod, GoRouter, tip güvenli tema sistemi, uluslararasılaştırma, API altyapısı, kod üretimi ve temiz mimari araçları içeren, üretime hazır açık kaynak Flutter başlangıç projesi.",
    },
    {
      id: "nextjs-template",
      name: "Next.js Şablonu",
      website: "https://github.com/ouedyan/nextjs-template",
      startYear: 2022,
      endYear: 2024,
      description:
        "App Router, React Server Components, TypeScript ve ölçeklenebilir geliştirme araçlarıyla kurumsal projelere yönelik açık kaynak Next.js başlangıç projesi.",
    },
  ],
  skillGroups: [
    {
      id: "frontend-mobile",
      name: "Frontend ve Mobil",
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
      name: "Backend ve Güvenlik",
      skills: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "OAuth 2.0 / OIDC",
        "JWT",
        "REST API’leri",
        "PostgreSQL",
        "SSE",
      ],
    },
    {
      id: "cloud-platform",
      name: "Bulut ve Platform",
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
      name: "Kalite ve Operasyon",
      skills: [
        "Vitest",
        "Playwright",
        "Testcontainers",
        "Storybook",
        "Semgrep",
        "Trivy",
        "SBOM",
        "Yapılandırılmış loglama",
      ],
    },
  ],
  languages: [
    { id: "fr", name: "Fransızca", level: "Akıcı" },
    { id: "en", name: "İngilizce", level: "Profesyonel" },
    { id: "tr", name: "Türkçe", level: "Konuşma düzeyi" },
  ],
} satisfies ResumeContent;
