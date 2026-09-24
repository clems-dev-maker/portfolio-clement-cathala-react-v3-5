import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    id: "ecommerce",
    title: "E-Commerce Django",
    eyebrow: "Web · Backend · Paiement",
    description:
      "Boutique en ligne développée avec Django, Bootstrap et JavaScript, avec authentification, catalogue, panier, wishlist et intégration Stripe Checkout.",
    stack: ["Python", "Django", "Bootstrap 5", "JavaScript", "AJAX", "Stripe"],
    architecture: ["Navigateur", "Django", "SQLite", "Stripe"],
    github: "https://github.com/clems-dev-maker/django_ecommerce",
    accent: "django",
    category: "web",
    facts: [{ value: "Django", label: "Backend" }, { value: "Stripe", label: "Paiement" }, { value: "AJAX", label: "Interaction" }],
    screenshots: [
      { src: "/projects/ecommerce/home.webp", label: "Accueil", width: 1873, height: 829 },
      { src: "/projects/ecommerce/detail.webp", label: "Produit", width: 1894, height: 834 },
      { src: "/projects/ecommerce/cart.webp", label: "Panier", width: 1899, height: 819 }
    ],
    context:
      "Projet e-commerce construit pour mettre en pratique le développement d'une application web complète avec Django et une intégration de paiement.",
    details: [
      "Authentification et profil utilisateur",
      "Catalogue produits et gestion du stock",
      "Panier dynamique et wishlist",
      "Recherche et filtres",
      "Paiement avec Stripe Checkout",
      "Interface responsive Bootstrap"
    ],
    challenges: [
      "Structurer les modèles et les vues autour d'un parcours e-commerce cohérent.",
      "Connecter le panier et le paiement sans exposer de données sensibles côté frontend.",
      "Garder une interface simple tout en couvrant plusieurs parcours utilisateur."
    ],
    solutions: [
      "Organisation du projet autour des modèles, formulaires, vues, URLs et templates Django.",
      "Utilisation de variables d'environnement pour les informations sensibles liées à Stripe.",
      "Utilisation de Bootstrap et de JavaScript/AJAX pour fluidifier l'expérience utilisateur."
    ],
    skills: ["Django", "Modélisation", "Authentification", "API de paiement", "Frontend responsive"],
    result: "Un parcours e-commerce complet réunissant catalogue, compte utilisateur, panier et paiement dans une même application."
  },
  {
    id: "weather",
    title: "WeatherApp",
    eyebrow: "Mobile · API · TypeScript",
    description:
      "Application météo React Native / Expo utilisant OpenWeatherMap, avec géolocalisation, recherche de villes, prévisions sur 5 jours, favoris et historique.",
    stack: ["React Native", "Expo", "TypeScript", "Axios", "OpenWeatherMap", "AsyncStorage"],
    architecture: ["React Native", "Axios", "OpenWeatherMap", "AsyncStorage"],
    github: "https://github.com/clems-dev-maker/WeatherApp",
    accent: "weather",
    category: "mobile",
    facts: [{ value: "Expo", label: "Runtime" }, { value: "OpenWeatherMap", label: "API" }, { value: "AsyncStorage", label: "Persistance" }],
    screenshots: [
      { src: "/projects/weather/home.webp", label: "Écran principal", width: 1879, height: 835 },
      { src: "/projects/weather/forecast.webp", label: "Prévisions", width: 1372, height: 406 },
      { src: "/projects/weather/favorites.webp", label: "Favoris & historique", width: 1879, height: 829 }
    ],
    context:
      "Application mobile développée avec React Native et Expo pour travailler l'intégration d'une API météo, la géolocalisation et la persistance locale.",
    details: [
      "Géolocalisation automatique",
      "Recherche de villes",
      "Prévisions météo sur 5 jours",
      "Villes favorites persistantes",
      "Historique des recherches",
      "Gestion des erreurs et interface responsive"
    ],
    challenges: [
      "Gérer plusieurs sources de données : position, recherche, météo actuelle et prévisions.",
      "Conserver les favoris et l'historique entre les sessions.",
      "Construire une interface lisible sur différents formats d'écran."
    ],
    solutions: [
      "Centralisation des appels API dans un service dédié avec Axios.",
      "Persistance locale avec AsyncStorage pour les données utilisateur.",
      "Découpage en composants React Native réutilisables et adaptation responsive."
    ],
    skills: ["React Native", "TypeScript", "API REST", "Géolocalisation", "Stockage local"],
    result: "Une application mobile structurée autour d'un service météo, avec persistance locale et plusieurs parcours utilisateur."
  },
  {
    id: "portfolio",
    title: "Portfolio Intelligence v2.6",
    eyebrow: "Python · Desktop · Analytics",
    description:
      "Application desktop PySide6 orientée analyse et reporting de portefeuille, avec génération simultanée de rapports Excel et PDF.",
    stack: ["Python", "PySide6", "Excel", "PDF", "Risk", "Look-through"],
    architecture: ["Imports", "Analyse", "Dashboard", "Excel / PDF"],
    github: "https://github.com/clems-dev-maker/portfolio_v2_6",
    accent: "data",
    category: "python",
    facts: [{ value: "PySide6", label: "Desktop" }, { value: "Excel + PDF", label: "Reporting" }, { value: "Risk", label: "Analyse" }],
    screenshots: [
      { src: "/projects/portfolio/dashboard.webp", label: "Dashboard", width: 1905, height: 1003 },
      { src: "/projects/portfolio/excel.webp", label: "Rapport Excel", width: 1890, height: 978 },
      { src: "/projects/portfolio/pdf.webp", label: "Rapport PDF", width: 1878, height: 778 }
    ],
    context:
      "Application desktop dédiée à l'analyse et au reporting de portefeuille, avec un dashboard PySide6 et des exports Excel/PDF.",
    details: [
      "Dashboard desktop PySide6",
      "Analyse de performance",
      "Analyse du risque",
      "Allocations et look-through",
      "Stress tests",
      "Génération de rapports Excel et PDF"
    ],
    challenges: [
      "Transformer des imports de transactions et de valeur nette en indicateurs exploitables.",
      "Organiser plusieurs modules d'analyse dans une interface desktop cohérente.",
      "Produire des sorties Excel et PDF lisibles à partir d'une même analyse."
    ],
    solutions: [
      "Séparation des responsabilités entre import, analyse, dashboard et reporting.",
      "Structuration des modules Analytics, Performance, Risk et Look-through.",
      "Génération coordonnée des rapports Excel et PDF depuis le dashboard."
    ],
    skills: ["Python", "PySide6", "Data analysis", "Reporting", "Architecture modulaire"],
    result: "Une chaîne d'analyse complète allant des imports jusqu'aux rapports Excel et PDF générés depuis le dashboard."
  }
];

const skills = [
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "React Native", "TypeScript", "Bootstrap"] },
  { group: "Backend", items: ["Python", "Django", "API REST"] },
  { group: "Outils", items: ["Git", "GitHub", "VS Code", "Vite", "Axios"] },
  { group: "En formation", items: ["PHP", "Tests", "Déploiement", "UML"] }
];

const capabilities = [
  {
    title: "Frontend",
    kicker: "INTERFACES",
    description: "Construire des interfaces responsive, accessibles et structurées autour de composants réutilisables.",
    items: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Responsive UI"]
  },
  {
    title: "Backend",
    kicker: "LOGIQUE & DONNÉES",
    description: "Développer des applications Django, organiser les données et connecter des services via des API.",
    items: ["Python", "Django", "API REST", "Modèles", "Authentification"]
  },
  {
    title: "Mobile",
    kicker: "EXPÉRIENCE",
    description: "Développer des applications React Native / Expo capables de consommer des APIs et de conserver des données locales.",
    items: ["React Native", "Expo", "Axios", "Géolocalisation", "AsyncStorage"]
  },
  {
    title: "Projet & qualité",
    kicker: "DE BOUT EN BOUT",
    description: "Structurer un projet, documenter les choix techniques et vérifier les parcours avant la mise en ligne.",
    items: ["Git / GitHub", "Tests", "Documentation", "Build", "Déploiement"]
  }
];

const cvPath = "/cv/CV_Clement_Cathala_Developpeur_FullStack_2026.pdf";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio rendering error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page" role="alert">
          <div className="error-page-inner">
            <span className="section-kicker">ERREUR D’AFFICHAGE</span>
            <h1>Une erreur est survenue.</h1>
            <p>Le portfolio n’a pas pu afficher cette partie correctement. Recharge la page pour réessayer.</p>
            <button className="button primary" type="button" onClick={() => window.location.reload()}>Recharger</button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

function Icon({ name }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.8S18 0 15 2.1a13.4 13.4 0 0 0-6 0C6 0 4.7.8 4.7.8A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
    external: <><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") !== "light"; } catch { return true; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedShot, setSelectedShot] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const closeDialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.style.setProperty("--browser-theme", dark ? "#070912" : "#f6f7fb");
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#070912" : "#f6f7fb");
    try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      }),
      { threshold: 0.08 }
    );

    // Re-observe after changing the project filter. The filtered cards are
    // newly mounted by React; without this second observation they keep
    // the initial `.reveal { opacity: 0 }` state and appear to be missing.
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

    return () => reveal.disconnect();
  }, [projectFilter]);

  useEffect(() => {
    const sectionIds = ["top", "projets", "profil", "competences", "savoir-faire", "parcours", "apropos", "contact"];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    let frameId = 0;
    const updateScrollState = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        setShowTop(window.scrollY > 700);
      });
    };

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );

    sections.forEach(section => observer.observe(section));
    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollState);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (selectedShot && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        const currentProject = projects.find(project => project.title === selectedShot.project);
        if (currentProject) {
          const currentIndex = currentProject.screenshots.findIndex(shot => shot.src === selectedShot.src);
          const direction = event.key === "ArrowRight" ? 1 : -1;
          const nextIndex = (currentIndex + direction + currentProject.screenshots.length) % currentProject.screenshots.length;
          const next = currentProject.screenshots[nextIndex];
          setSelectedShot({ ...next, project: currentProject.title });
        }
        return;
      }
      if (event.key === "Escape") {
        setSelectedShot(null);
        setSelected(null);
        setMenuOpen(false);
        return;
      }
      if (event.key === "Tab" && (selected || selectedShot)) {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return;
        const focusable = dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedShot]);

  useEffect(() => {
    const locked = selected || selectedShot;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected, selectedShot]);

  useEffect(() => {
    const dialogOpen = Boolean(selected || selectedShot);
    if (!dialogOpen) {
      if (previouslyFocusedRef.current instanceof HTMLElement) previouslyFocusedRef.current.focus();
      previouslyFocusedRef.current = null;
      return;
    }
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.requestAnimationFrame(() => closeDialogRef.current?.focus());
  }, [selected, selectedShot]);

  const closeMenu = () => setMenuOpen(false);
  const visibleProjects = projectFilter === "all" ? projects : projects.filter(project => project.category === projectFilter);

  const copyEmail = async () => {
    const email = "clementcathala430@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const openShot = (shot, project) => {
    setSelectedShot({ ...shot, project: project.title });
  };

  const selectedGallery = useMemo(() => {
    if (!selectedShot) return null;
    const project = projects.find(item => item.title === selectedShot.project);
    if (!project) return null;
    const index = project.screenshots.findIndex(shot => shot.src === selectedShot.src);
    return { project, index };
  }, [selectedShot]);

  const navigateShot = (direction) => {
    if (!selectedGallery) return;
    const { project, index } = selectedGallery;
    const nextIndex = (index + direction + project.screenshots.length) % project.screenshots.length;
    const next = project.screenshots[nextIndex];
    setSelectedShot({ ...next, project: project.title });
  };

  return (
    <div className="site">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress / 100})` }} /></div>
      <header className="navbar">
        <a className="brand" href="#top" onClick={closeMenu}>CC<span>.</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} aria-controls="navigation-principale">
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav id="navigation-principale" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navigation principale">
          <a href="#projets" onClick={closeMenu} className={activeSection === "projets" ? "active" : ""} aria-current={activeSection === "projets" ? "location" : undefined}>Projets</a>
          <a href="#profil" onClick={closeMenu} className={activeSection === "profil" ? "active" : ""} aria-current={activeSection === "profil" ? "location" : undefined}>Profil</a>
          <a href="#competences" onClick={closeMenu} className={activeSection === "competences" ? "active" : ""} aria-current={activeSection === "competences" ? "location" : undefined}>Compétences</a>
          <a href="#savoir-faire" onClick={closeMenu} className={activeSection === "savoir-faire" ? "active" : ""} aria-current={activeSection === "savoir-faire" ? "location" : undefined}>Savoir-faire</a>
          <a href="#parcours" onClick={closeMenu} className={activeSection === "parcours" ? "active" : ""} aria-current={activeSection === "parcours" ? "location" : undefined}>Parcours</a>
          <a href="#apropos" onClick={closeMenu} className={activeSection === "apropos" ? "active" : ""} aria-current={activeSection === "apropos" ? "location" : undefined}>À propos</a>
          <a href="#contact" onClick={closeMenu} className={activeSection === "contact" ? "active" : ""} aria-current={activeSection === "contact" ? "location" : undefined}>Contact</a>
          <a className="nav-github" href="https://github.com/clems-dev-maker" target="_blank" rel="noopener noreferrer">GitHub <Icon name="external" /></a>
          <a className="nav-cv" href={cvPath} download>CV <Icon name="download" /></a>
          <button className="theme-toggle" type="button" onClick={() => setDark(!dark)} aria-label={`Activer le thème ${dark ? "clair" : "sombre"}`} aria-pressed={dark}>
            <Icon name={dark ? "sun" : "moon"} /><span>{dark ? "Clair" : "Sombre"}</span>
          </button>
        </nav>
      </header>

      <main id="top" tabIndex="-1">
        <span id="contenu" className="sr-only" aria-hidden="true"></span>
        <section className="hero container">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="status-dot" /> DÉVELOPPEUR WEB / FULL-STACK · TOULOUSE</div>
            <h1>Je construis des applications <span>web et mobiles</span> de bout en bout.</h1>
            <p className="hero-lead">
              Clément Cathala — développeur en formation, orienté <strong>Python / Django</strong> et <strong>React</strong>.
              Je transforme des idées en applications concrètes, de l'interface au backend et aux API.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projets">Voir mes projets <Icon name="arrow" /></a>
              <a className="button secondary" href={cvPath} download>Télécharger mon CV <Icon name="download" /></a>
              <a className="button ghost" href="#contact">Me contacter <Icon name="arrow" /></a>
            </div>
            <div className="hero-meta"><span>Python</span><span>Django</span><span>React</span><span>JavaScript</span><span>React Native</span></div>
            <div className="hero-availability"><span className="status-dot" /> Disponible pour une alternance · 12 mois · Toulouse / Castres / Albi</div>
          </div>

          <div className="hero-panel reveal">
            <div className="terminal">
              <div className="terminal-bar"><span></span><span></span><span></span><b>portfolio.py</b></div>
              <pre><code><em>class</em> Developer:
  focus = [
    <strong>"Python"</strong>,
    <strong>"Django"</strong>,
    <strong>"React"</strong>,
    <strong>"React Native"</strong>
  ]

  approach = <strong>"build • test • iterate"</strong>

  goal = <strong>"ship useful software"</strong></code></pre>
            </div>
            <div className="hero-card"><span>01</span><div><strong>Construire</strong><small>des projets concrets</small></div></div>
            <div className="hero-card"><span>02</span><div><strong>Comprendre</strong><small>l'architecture de bout en bout</small></div></div>
            <div className="hero-card"><span>03</span><div><strong>Améliorer</strong><small>par itérations et retours</small></div></div>
          </div>
        </section>

        <section id="profil" className="recruiter-overview section container">
          <div className="recruiter-overview-head reveal">
            <div><span className="section-kicker">PROFIL EXPRESS</span><h2>Les informations essentielles, en un coup d’œil.</h2></div>
            <p>Une synthèse pensée pour permettre à un recruteur de comprendre rapidement mon positionnement, ma stack principale et le cadre d’alternance recherché.</p>
          </div>
          <div className="recruiter-grid">
            <article className="recruiter-card reveal"><span>01</span><small>POSITIONNEMENT</small><strong>Développeur Web / Full-Stack</strong><p>Orientation Python / Django et React, avec des projets web, mobile et desktop.</p></article>
            <article className="recruiter-card reveal"><span>02</span><small>STACK PRINCIPALE</small><strong>Python · Django · React</strong><p>JavaScript, React Native, TypeScript et API REST complètent la stack.</p></article>
            <article className="recruiter-card reveal"><span>03</span><small>ALTERNANCE</small><strong>12 mois · contrat de professionnalisation</strong><p>Rythme recherché : 4 jours en entreprise et 1 jour en formation.</p></article>
            <article className="recruiter-card reveal"><span>04</span><small>ZONE & DISPONIBILITÉ</small><strong>Toulouse · Castres · Albi</strong><p>Disponible dès maintenant pour une alternance développeur.</p></article>
          </div>
          <div className="recruiter-actions reveal">
            <a className="button primary" href={cvPath} target="_blank" rel="noopener noreferrer">Lire mon CV <Icon name="external" /></a>
            <a className="button secondary" href="https://github.com/clems-dev-maker" target="_blank" rel="noopener noreferrer">Explorer GitHub <Icon name="external" /></a>
            <a className="button secondary" href="#contact">Me contacter <Icon name="arrow" /></a>
          </div>
        </section>

        <section id="projets" className="section container">
          <div className="section-heading reveal">
            <div><span className="section-kicker">01 / PROJETS</span><h2>Des projets qui montrent ce que je sais construire.</h2></div>
            <p>Trois projets complémentaires pour montrer mon approche du web, du mobile et de la data.</p>
          </div>

          <div className="project-toolbar reveal" aria-label="Filtrer les projets">
            <span className="toolbar-label">Explorer par domaine</span>
            <div className="filter-list" role="group" aria-label="Filtres de projets">
              {[
                ["all", "Tous"],
                ["web", "Web"],
                ["mobile", "Mobile"],
                ["python", "Python / Data"]
              ].map(([value, label]) => (
                <button key={value} type="button" className={projectFilter === value ? "filter-button active" : "filter-button"} onClick={() => setProjectFilter(value)} aria-pressed={projectFilter === value}>{label}</button>
              ))}
            </div>
            <span className="project-count" aria-live="polite">{visibleProjects.length} projet{visibleProjects.length > 1 ? "s" : ""}</span>
          </div>

          {visibleProjects.length === 0 ? (
            <div className="project-empty reveal is-visible" role="status">
              <strong>Aucun projet dans cette catégorie.</strong>
              <span>Revenir à « Tous » pour afficher l'ensemble des projets.</span>
              <button type="button" className="filter-button active" onClick={() => setProjectFilter("all")}>Voir tous les projets</button>
            </div>
          ) : (
            <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className={`project-card reveal accent-${project.accent}`} key={project.id}>
                <div className="project-visual">
                  <div className="visual-top"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.eyebrow}</span></div>
                  <div className="visual-title">{project.title}</div>
                  <div className="architecture">
                    {project.architecture.map((item, i) => <span key={item}>{item}{i < project.architecture.length - 1 && <b>→</b>}</span>)}
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-gallery">
                    {project.screenshots.map((shot) => (
                      <button className="shot-thumb" key={shot.src} onClick={() => openShot(shot, project)} aria-label={`Agrandir ${shot.label} — ${project.title}`}>
                        <img src={shot.src} alt={`${shot.label} — ${project.title}`} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
                        <span>{shot.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="project-eyebrow">{project.eyebrow}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-facts" aria-label={`Points techniques — ${project.title}`}>
                    {project.facts.map(fact => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
                  </div>
                  <div className="project-meta-row"><span>Projet personnel</span><span>Code source disponible</span></div>
                  <div className="project-actions">
                    <button className="text-button" onClick={() => setSelected(project)}>Étude du projet <Icon name="arrow" /></button>
                    <a className="icon-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Voir ${project.title} sur GitHub`}>GitHub <Icon name="external" /></a>
                  </div>
                </div>
              </article>
            ))}
            </div>
          )}
        </section>

        <section id="competences" className="section section-alt">
          <div className="container">
            <div className="section-heading reveal">
              <div><span className="section-kicker">02 / COMPÉTENCES</span><h2>Une stack orientée produit et apprentissage continu.</h2></div>
              <p>Des compétences développées principalement à travers des projets concrets et une formation full-stack.</p>
            </div>
            <div className="skills-grid">
              {skills.map(group => <div className="skill-group reveal" key={group.group}><span className="skill-index">{group.group}</span><div className="skill-list">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        <section id="savoir-faire" className="section container capability-section">
          <div className="section-heading reveal">
            <div><span className="section-kicker">03 / SAVOIR-FAIRE</span><h2>Des technologies traduites en capacités concrètes.</h2></div>
            <p>Au-delà des noms de technologies, voici ce que mes projets me permettent déjà de mettre en pratique.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <article className="capability-card reveal" key={capability.title}>
                <div className="capability-top"><span>{String(index + 1).padStart(2, "0")}</span><small>{capability.kicker}</small></div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div className="capability-tags">{capability.items.map(item => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="capability-note reveal">
            <span>LECTURE RECRUTEUR</span>
            <strong>Je privilégie les preuves concrètes : code, fonctionnalités, captures, architecture et documentation.</strong>
          </div>
        </section>

        <section id="parcours" className="section section-alt journey-section">
          <div className="container">
            <div className="section-heading reveal">
              <div><span className="section-kicker">04 / PARCOURS</span><h2>Une formation construite autour de la pratique.</h2></div>
              <p>Les principaux repères de mon parcours et de mon apprentissage technique, présentés de façon synthétique.</p>
            </div>
            <div className="journey-grid">
              <article className="journey-card reveal">
                <span className="journey-index">01</span><span className="journey-date">2026</span>
                <h3>Développeur d'application Full-stack</h3>
                <strong>OpenClassrooms · niveau 6</strong>
                <p>Formation orientée développement web full-stack, avec un travail pratique autour du frontend, du backend, des API, des tests, du déploiement et de la conception.</p>
              </article>
              <article className="journey-card reveal">
                <span className="journey-index">02</span><span className="journey-date">2016</span>
                <h3>BTS Management des Unités Commerciales</h3>
                <strong>Candidat libre</strong>
                <p>Parcours antérieur complétant aujourd'hui une reconversion vers le développement logiciel.</p>
              </article>
              <article className="journey-card reveal">
                <span className="journey-index">03</span><span className="journey-date">APPRENTISSAGE</span>
                <h3>Certifications & pratique</h3>
                <strong>Git · HTML/CSS · Python · JavaScript</strong>
                <p>Certifications et cours suivis sur Git/GitHub, HTML/CSS, programmation orientée objet en Python, algorithmes, Java et développement full-stack.</p>
              </article>
            </div>
            <div className="journey-meta reveal">
              <div><span>Langues</span><strong>Français · Anglais B1–B2</strong></div>
              <div><span>Orientation</span><strong>Python · Django · React</strong></div>
              <div><span>Approche</span><strong>Apprendre en construisant</strong></div>
            </div>
          </div>
        </section>

        <section id="apropos" className="section container about-grid">
          <div className="about-intro reveal"><span className="section-kicker">06 / À PROPOS</span><h2>Apprendre en construisant.</h2></div>
          <div className="about-body reveal">
            <p className="large">Je développe des applications web et mobiles pour consolider mes compétences et comprendre les problématiques techniques de bout en bout.</p>
            <p>Ma formation <strong>Développeur d'application Full-stack</strong> chez OpenClassrooms complète une démarche très pratique : concevoir une interface, structurer un backend, connecter des API, gérer les données et documenter un projet.</p>
            <div className="about-note reveal"><span>LECTURE RECRUTEUR</span><strong>Code, captures, architecture et parcours technique réunis au même endroit.</strong><p>Chaque projet peut être ouvert pour consulter ses fonctionnalités, son architecture, ses technologies et ses captures d’interface.</p></div>
            <div className="about-facts">
              <div><span>01</span><strong>12 mois</strong><small>Alternance recherchée</small></div>
              <div><span>02</span><strong>Python / Django</strong><small>Orientation backend</small></div>
              <div><span>03</span><strong>React</strong><small>Web & mobile</small></div>
            </div>
            <div className="recruiter-strip" aria-label="Informations clés pour un recruteur">
              <div><span>Rythme</span><strong>4 j. entreprise / 1 j. formation</strong></div>
              <div><span>Zone</span><strong>Toulouse · Castres · Albi</strong></div>
              <div><span>Disponibilité</span><strong>Dès maintenant</strong></div>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading reveal">
              <div><span className="section-kicker">05 / MÉTHODE</span><h2>Construire, comprendre, améliorer.</h2></div>
              <p>Une démarche simple : partir d'un besoin concret, structurer la solution puis itérer à partir des retours et des tests.</p>
            </div>
            <div className="process-grid">
              <article className="process-card reveal"><span>01</span><div><h3>Concevoir</h3><p>Clarifier le besoin, découper les fonctionnalités et choisir une architecture adaptée au projet.</p></div></article>
              <article className="process-card reveal"><span>02</span><div><h3>Développer</h3><p>Construire l'interface, le backend et les intégrations API en gardant une structure maintenable.</p></div></article>
              <article className="process-card reveal"><span>03</span><div><h3>Tester</h3><p>Vérifier les parcours principaux, corriger les erreurs et améliorer progressivement l'expérience.</p></div></article>
              <article className="process-card reveal"><span>04</span><div><h3>Documenter</h3><p>Présenter l'architecture, les choix techniques, l'installation et les limites connues du projet.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section availability">
          <div className="container availability-box reveal">
            <div><span className="section-kicker">DISPONIBILITÉ</span><h2>À la recherche d'une alternance développeur.</h2><p>Contrat de professionnalisation · 12 mois · Toulouse / Castres / Albi</p></div>
            <div className="availability-actions"><a className="button primary" href="#contact">Me contacter <Icon name="arrow" /></a><a className="button secondary" href={cvPath} download>Mon CV <Icon name="download" /></a></div>
          </div>
        </section>

        <section id="contact" className="section container contact-section">
          <div className="section-heading reveal"><div><span className="section-kicker">07 / CONTACT</span><h2>Parlons d'un projet, d'une alternance ou d'une opportunité.</h2></div></div>
          <div className="contact-grid">
            <div className="contact-card reveal contact-email-card">
              <a href="mailto:clementcathala430@gmail.com" className="contact-main-link" aria-label="Envoyer un email à Clément Cathala">
                <Icon name="mail" /><span>Email</span><strong>clementcathala430@gmail.com</strong>
              </a>
              <button className="copy-email" type="button" onClick={copyEmail} aria-label={emailCopied ? "Adresse email copiée" : "Copier l'adresse email"}>
                <Icon name={emailCopied ? "check" : "copy"} /> <span aria-live="polite">{emailCopied ? "Copié" : "Copier"}</span>
              </button>
            </div>
            <a className="contact-card reveal" href="https://www.linkedin.com/in/cl%C3%A9ment-cathala-900b30229/" target="_blank" rel="noopener noreferrer"><Icon name="linkedin" /><span>LinkedIn</span><strong>Mon profil professionnel</strong></a>
            <a className="contact-card reveal" href="https://github.com/clems-dev-maker" target="_blank" rel="noopener noreferrer"><Icon name="github" /><span>GitHub</span><strong>Mes projets et mon code</strong></a>
          </div>
          <div className="contact-resume reveal">
            <div><span className="section-kicker">DOCUMENT CANDIDAT</span><h3>Mon CV développeur Full-stack</h3><p>CV 2026 — Python, Django, React et projets réalisés.</p></div>
            <div className="resume-actions"><a className="button secondary" href={cvPath} target="_blank" rel="noopener noreferrer">Ouvrir le CV <Icon name="external" /></a><a className="button primary" href={cvPath} download>Télécharger <Icon name="download" /></a></div>
          </div>
        </section>
      </main>

      {showTop && <a className="back-to-top" href="#top" aria-label="Retour en haut de la page">↑</a>}

      <footer className="footer"><div className="container footer-inner"><span>© 2026 Clément Cathala</span><span>Développeur Web / Full-Stack</span><a href="#top">Retour en haut ↑</a></div></footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <div className="modal case-study" role="dialog" aria-modal="true" aria-labelledby="case-title" onClick={e => e.stopPropagation()}>
            <button ref={closeDialogRef} type="button" className="modal-close" onClick={() => setSelected(null)} aria-label="Fermer"><Icon name="close" /></button>
            <span className="section-kicker">{selected.eyebrow}</span>
            <h2 id="case-title">{selected.title}</h2>
            <p className="case-context">{selected.context}</p>
            <div className="case-facts">{selected.facts.map(fact => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
            <div className="case-block"><h4>Fonctionnalités</h4><ul>{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
            <div className="case-block"><h4>Architecture simplifiée</h4><div className="case-architecture">{selected.architecture.map((item, i) => <span key={item}>{item}{i < selected.architecture.length - 1 && <b>→</b>}</span>)}</div></div>
            <div className="case-block"><h4>Technologies</h4><div className="tags">{selected.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            <div className="case-two-columns">
              <div className="case-block"><h4>Problématiques travaillées</h4><ul>{selected.challenges.map(item => <li key={item}>{item}</li>)}</ul></div>
              <div className="case-block"><h4>Approche / solutions</h4><ul>{selected.solutions.map(item => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <div className="case-block"><h4>Compétences mobilisées</h4><div className="tags">{selected.skills.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            <div className="case-result"><span>CE QUE LE PROJET DÉMONTRE</span><strong>{selected.result}</strong></div>
            <div className="case-gallery">{selected.screenshots.map(shot => <button className="case-shot" key={shot.src} onClick={() => openShot(shot, selected)}><img src={shot.src} alt={`${shot.label} — ${selected.title}`} width={shot.width} height={shot.height} loading="lazy" decoding="async" /><span>{shot.label}</span></button>)}</div>
            <div className="case-takeaway"><span>FOCUS TECHNIQUE</span><strong>{selected.facts.map(f => f.value).join(" · ")}</strong><p>Une présentation volontairement centrée sur les choix techniques et les fonctionnalités réellement présentes dans le projet.</p></div>
            <a className="button primary modal-link" href={selected.github} target="_blank" rel="noopener noreferrer">Voir le dépôt GitHub <Icon name="external" /></a>
          </div>
        </div>
      )}

      {selectedShot && (
        <div className="modal-backdrop image-backdrop" role="presentation" onClick={() => setSelectedShot(null)}>
          <div className="image-modal" role="dialog" aria-modal="true" aria-labelledby="image-title" onClick={e => e.stopPropagation()}>
            <button ref={closeDialogRef} className="modal-close" onClick={() => setSelectedShot(null)} aria-label="Fermer"><Icon name="close" /></button>
            <button type="button" className="gallery-nav gallery-prev" onClick={() => navigateShot(-1)} aria-label="Capture précédente"><Icon name="chevronLeft" /></button>
            <img src={selectedShot.src} alt={`${selectedShot.label} — ${selectedShot.project}`} width={selectedShot.width} height={selectedShot.height} decoding="async" />
            <button type="button" className="gallery-nav gallery-next" onClick={() => navigateShot(1)} aria-label="Capture suivante"><Icon name="chevronRight" /></button>
            <div className="image-caption"><div><span>{selectedShot.project}</span><strong id="image-title">{selectedShot.label}</strong></div>{selectedGallery && <small>{selectedGallery.index + 1} / {selectedGallery.project.screenshots.length}</small>}</div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<ErrorBoundary><App /></ErrorBoundary>);
