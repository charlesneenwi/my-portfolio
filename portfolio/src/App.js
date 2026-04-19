import { useState, useEffect, useRef } from "react";

// ─── Theme Tokens ─────────────────────────────────────────────────
const DARK = {
  bg: "#07070B",
  bgAlt: "#0C0C13",
  bgCard: "#111119",
  text: "#F5F0E8",
  textMuted: "rgba(245,240,232,0.52)",
  textFaint: "rgba(245,240,232,0.25)",
  accent: "#E8C97E",
  accentContrast: "#07070B",
  accentDim: "rgba(232,201,126,0.08)",
  border: "rgba(232,201,126,0.1)",
  borderHover: "rgba(232,201,126,0.38)",
  navBg: "rgba(7,7,11,0.93)",
  gridLine: "rgba(232,201,126,0.035)",
  glow: "rgba(232,201,126,0.12)",
  navLink: "rgba(255,255,255,0.55)",
  footerText: "rgba(255,255,255,0.18)",
  footerBorder: "rgba(255,255,255,0.05)",
  mobileMenu: "rgba(7,7,11,0.98)",
  skillTrack: "rgba(255,255,255,0.05)",
  tag: "rgba(232,201,126,0.07)",
};

const LIGHT = {
  bg: "#F8F5EF",
  bgAlt: "#EEEAE0",
  bgCard: "#FFFFFF",
  text: "#100F0C",
  textMuted: "rgba(16,15,12,0.56)",
  textFaint: "rgba(16,15,12,0.3)",
  accent: "#9A7118",
  accentContrast: "#FFFFFF",
  accentDim: "rgba(154,113,24,0.07)",
  border: "rgba(154,113,24,0.15)",
  borderHover: "rgba(154,113,24,0.45)",
  navBg: "rgba(248,245,239,0.93)",
  gridLine: "rgba(154,113,24,0.05)",
  glow: "rgba(154,113,24,0.1)",
  navLink: "rgba(16,15,12,0.5)",
  footerText: "rgba(16,15,12,0.3)",
  footerBorder: "rgba(16,15,12,0.07)",
  mobileMenu: "rgba(248,245,239,0.98)",
  skillTrack: "rgba(0,0,0,0.07)",
  tag: "rgba(154,113,24,0.07)",
};

// ─── Data ─────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "Tailwind CSS", level: 88 },
  { name: "HTML & CSS", level: 92 },
  { name: "Git & GitHub", level: 80 },
  { name: "REST APIs", level: 78 },
  { name: "Responsive Design", level: 90 },
  { name: "UI/UX Principles", level: 75 },
];

const PROJECTS = [
  {
    title: "AI Chat App",
    image: "/ai-chat.png",
    description: "A fully functional AI chat interface built with React and the Gemini API. Features real-time AI responses, conversation history, localStorage persistence, typing indicator, and timestamps. Built with a premium dark UI.",
    tags: ["React", "Vite", "Gemini API", "Tailwind CSS"],
    live: "https://ai-chat-app-lovat.vercel.app",
    github: "https://github.com/charlesneenwi/ai-chat-app",
    featured: true,
  },
  {
    title: "Scenixa — AI SaaS Landing Page",
    image: "/scenixa.png",
    description: "A seven-section SaaS landing page for an AI video generation platform. Features smooth animations, a pricing section, testimonials, and a fully responsive layout.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    live: "https://saas-landing-page-seven-zeta.vercel.app",
    github: "https://github.com/charlesneenwi/saas-landing-page",
    featured: false,
  },
  {
    title: "Recipe Finder App",
    image: "/recipe.png",
    description: "A full-featured recipe discovery app where users can search meals, view detailed instructions, and save favourites. Powered by TheMealDB API.",
    tags: ["React", "Tailwind CSS", "TheMealDB API"],
    live: "https://recipe-finder-react-nu.vercel.app/",
    github: "https://github.com/charlesneenwi",
    featured: false,
  },
];

// ─── Hook ─────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Icons ────────────────────────────────────────────────────────
const SunIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ResumeIcon = ({ color, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const ArrowIcon = ({ color, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── Navbar ───────────────────────────────────────────────────────
function Navbar({ T, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.4s ease", background: scrolled ? T.navBg : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${T.border}` : "none", padding: "0 2.5rem" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.1rem" }}>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.6rem", letterSpacing: "0.1em", color: T.text, lineHeight: 1 }}>CN</span>
          <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.6rem", color: T.accent, lineHeight: 1 }}>.</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {/* Desktop nav */}
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.navLink, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = T.accent}
                  onMouseLeave={e => e.target.style.color = T.navLink}
                >{link}</a>
              </li>
            ))}
          </ul>

          {/* Hire Me */}
          <a href="#contact"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: T.accent, color: T.accentContrast, padding: "0.5rem 1.25rem", textDecoration: "none", transition: "all 0.2s", boxShadow: `0 2px 16px ${T.glow}` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 24px ${T.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 16px ${T.glow}`; }}
          >Hire Me</a>

          {/* Theme toggle */}
          <button onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light mode" : "Dark mode"}
            style={{ background: T.accentDim, border: `1px solid ${T.border}`, borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = `${T.accent}18`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.accentDim; }}
          >
            {darkMode ? <SunIcon color={T.accent} /> : <MoonIcon color={T.accent} />}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 4 }}
            className="hamburger"
          >
            {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 1.5, background: T.accent, borderRadius: 1 }} />)}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: T.mobileMenu, padding: "1.5rem 2.5rem", borderTop: `1px solid ${T.border}` }}>
          {NAV_LINKS.map((link, i) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 0", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 500, color: T.textMuted, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: i < NAV_LINKS.length - 1 ? `1px solid ${T.border}` : "none" }}
            >
              {link}
              <ArrowIcon color={T.accent} size={14} />
            </a>
          ))}
          <a href="#contact"
            style={{ display: "block", marginTop: "1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: T.accent, color: T.accentContrast, padding: "0.85rem 1.5rem", textDecoration: "none", textAlign: "center" }}
          >Hire Me</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero({ T }) {
  const btn = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.9rem 2rem", textDecoration: "none", transition: "all 0.25s", display: "inline-flex", alignItems: "center", gap: "0.5rem" };

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 2.5rem", background: T.bg }}>
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${T.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${T.gridLine} 1px, transparent 1px)`, backgroundSize: "64px 64px", pointerEvents: "none" }} />
      {/* Glow orb */}
      <div style={{ position: "absolute", top: "15%", left: "0%", width: 640, height: 640, borderRadius: "50%", background: `radial-gradient(circle, ${T.glow} 0%, transparent 68%)`, pointerEvents: "none" }} />
      {/* Second subtle orb right */}
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${T.accentDim} 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "4rem" }}>

        {/* Available badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem", border: `1px solid ${T.border}`, padding: "0.4rem 1rem", animation: "fadeUp 0.7s ease both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5EE87A", display: "block", boxShadow: "0 0 6px #5EE87A" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: T.textMuted }}>Available for work</span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(4rem, 11vw, 9rem)", lineHeight: 0.92, letterSpacing: "0.03em", color: T.text, margin: 0, animation: "fadeUp 0.7s 0.1s ease both" }}>
          CHARLES<br />
          <span style={{ color: T.accent, textShadow: `0 0 80px ${T.glow}` }}>NEENWI</span>
        </h1>

        {/* Divider line */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "2rem", animation: "fadeUp 0.7s 0.2s ease both" }}>
          <div style={{ width: 48, height: 1, background: T.accent }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent }}>Frontend Engineer · React Developer</span>
        </div>

        {/* Bio */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.12rem)", color: T.textMuted, maxWidth: 540, lineHeight: 1.8, marginTop: "2rem", animation: "fadeUp 0.7s 0.3s ease both" }}>
          I build clean, modern web applications that solve real problems — using React, JavaScript, and scalable frontend architectures. Focused on performance, clean code, and delivering results.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", animation: "fadeUp 0.7s 0.4s ease both" }}>
          <a href="#projects" style={{ ...btn, background: T.accent, color: T.accentContrast, fontWeight: 700, boxShadow: `0 4px 24px ${T.glow}` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${T.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 24px ${T.glow}`; }}
          >
            View My Work <ArrowIcon color={T.accentContrast} size={13} />
          </a>
          <a href="/charles-neenwi-resume.pdf" target="_blank" rel="noreferrer"
            style={{ ...btn, background: "transparent", color: T.text, border: `1px solid ${T.border}` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
          >
            <ResumeIcon color="currentColor" /> Resume
          </a>
          <a href="#contact" style={{ ...btn, background: "transparent", color: T.text, border: `1px solid ${T.border}` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
          >
            Get In Touch
          </a>
        </div>

        {/* Bottom stats strip */}
        <div style={{ display: "flex", gap: "3rem", marginTop: "5rem", paddingTop: "2.5rem", borderTop: `1px solid ${T.border}`, animation: "fadeUp 0.7s 0.5s ease both", flexWrap: "wrap" }}>
          {[["ALX Certified", "FE Engineering"], ["React", "Primary Stack"], ["Port Harcourt", "Nigeria"]].map(([top, bot]) => (
            <div key={top}>
              <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.05rem", color: T.accent, margin: 0, letterSpacing: "0.1em" }}>{top}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: T.textFaint, margin: "0.2rem 0 0", letterSpacing: "0.06em" }}>{bot}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "3rem", animation: "fadeUp 0.7s 0.6s ease both" }}>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${T.accent}, transparent)` }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: T.textFaint }}>Scroll</span>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────
function About({ T }) {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ background: T.bgAlt, padding: "9rem 2.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.85s ease" }} className="about-grid">

        {/* Left */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 24, height: 1, background: T.accent }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent, margin: 0 }}>About Me</p>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: T.text, margin: "0 0 2rem", letterSpacing: "0.03em", lineHeight: 0.95 }}>
            CODE THAT<br />
            <span style={{ color: T.accent }}>MATTERS.</span>
          </h2>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: T.textMuted, lineHeight: 1.9, marginBottom: "1rem" }}>
            I'm a Frontend Engineer and ALX-certified React developer based in Port Harcourt, Nigeria. My focus is building web experiences that are not just visually polished — but genuinely useful to the people who use them.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: T.textMuted, lineHeight: 1.9 }}>
            I believe the best code solves real problems. Whether it's a consumer-facing web app or a complex dashboard, I bring the same attention to detail, clean architecture, and user-first thinking to every project.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap", paddingTop: "2rem", borderTop: `1px solid ${T.border}` }}>
            {[["ALX Certified", "FE Engineering"], ["React", "Primary Stack"], ["Port Harcourt", "Nigeria"]].map(([top, bot]) => (
              <div key={top}>
                <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.05rem", color: T.accent, margin: 0, letterSpacing: "0.1em" }}>{top}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: T.textFaint, margin: "0.2rem 0 0", letterSpacing: "0.06em" }}>{bot}</p>
              </div>
            ))}
          </div>

          <a href="/charles-neenwi-resume.pdf" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, textDecoration: "none", borderBottom: `1px solid ${T.border}`, paddingBottom: "0.2rem", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
          >
            <ResumeIcon color={T.accent} /> Download Resume
          </a>
        </div>

        {/* Right: Photo */}
        <div style={{ position: "relative" }}>
          <div style={{ width: "88%", margin: "0 auto", aspectRatio: "4/5", border: `1px solid ${T.border}`, overflow: "hidden", position: "relative" }}>
            <img src="/profile.jpg" alt="Charles Neenwi"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform 0.6s ease" }}
              onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            />
            {/* Strong dark gradient overlay bottom for readability */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: `linear-gradient(to top, rgba(7,7,11,0.92) 0%, rgba(7,7,11,0.5) 60%, transparent 100%)` }} />
            {/* Bottom accent line */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)` }} />
            {/* Name tag overlay — bold and clear */}
            <div style={{ position: "absolute", bottom: "1.75rem", left: "1.5rem" }}>
              <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.25rem", color: "#F5F0E8", margin: 0, letterSpacing: "0.1em", textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>CHARLES NEENWI</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: T.accent, margin: "0.2rem 0 0", letterSpacing: "0.14em", textTransform: "uppercase" }}>Frontend Engineer</p>
            </div>
          </div>
          {/* Offset decorative border */}
          <div style={{ position: "absolute", top: 18, left: "calc(6% + 18px)", right: -18, bottom: -18, border: `1px solid ${T.border}`, zIndex: -1, pointerEvents: "none" }} />
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────
function Skills({ T }) {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{ background: T.bg, padding: "9rem 2.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1140, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.85s ease" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 1, background: T.accent }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent, margin: 0 }}>Skills</p>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: T.text, margin: "0 0 4rem", letterSpacing: "0.03em", lineHeight: 0.95 }}>MY TOOLKIT</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem 3rem" }}>
          {SKILLS.map(({ name, level }, i) => (
            <div key={name} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(18px)", transition: `all 0.6s ${i * 0.07}s ease` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.7rem" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem", fontWeight: 600, color: T.text }}>{name}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: T.accent, letterSpacing: "0.04em" }}>{level}%</span>
              </div>
              <div style={{ height: 3, background: T.skillTrack, overflow: "hidden" }}>
                <div style={{ height: "100%", width: inView ? `${level}%` : "0%", background: `linear-gradient(90deg, ${T.accent}, ${T.accent}AA)`, transition: `width 1.4s ${i * 0.1}s cubic-bezier(0.4,0,0.2,1)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────
function Projects({ T }) {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ background: T.bgAlt, padding: "9rem 2.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1140, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.85s ease" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 1, background: T.accent }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent, margin: 0 }}>Projects</p>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", color: T.text, margin: "0 0 4rem", letterSpacing: "0.03em", lineHeight: 0.95 }}>WHAT I'VE BUILT</h2>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {PROJECTS.map((project, i) => (
            <div key={project.title}
              style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: "3rem", position: "relative", overflow: "hidden", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `all 0.7s ${i * 0.12}s ease` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.boxShadow = `0 8px 48px ${T.glow}`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent}, transparent)` }} />

              {project.featured && (
                <span style={{ position: "absolute", top: "2rem", right: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.accentContrast, background: T.accent, padding: "0.3rem 0.8rem" }}>
                  Featured
                </span>
              )}

              {/* Project Image */}
<div style={{ width: "100%", height: 220, overflow: "hidden", marginBottom: "2rem", border: `1px solid ${T.border}` }}>
  <img
    src={project.image}
    alt={project.title}
    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }}
    onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
    onMouseLeave={e => e.target.style.transform = "scale(1)"}
  />
</div>

<div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }} className="project-inner">
  <div>
    <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: T.text, margin: "0 0 0.75rem", letterSpacing: "0.04em" }}>{project.title}</h3>
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: T.textMuted, lineHeight: 1.8, margin: "0 0 1.5rem", maxWidth: 580 }}>{project.description}</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {project.tags.map(tag => (
        <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: T.accent, background: T.tag, border: `1px solid ${T.border}`, padding: "0.3rem 0.8rem" }}>{tag}</span>
      ))}
    </div>
  </div>

  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: 140 }}>
    <a href={project.live} target="_blank" rel="noreferrer"
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accentContrast, background: T.accent, padding: "0.75rem 1.5rem", textDecoration: "none", textAlign: "center", transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      Live Demo <ArrowIcon color={T.accentContrast} size={12} />
    </a>
    <a href={project.github} target="_blank" rel="noreferrer"
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.text, border: `1px solid ${T.border}`, padding: "0.75rem 1.5rem", textDecoration: "none", textAlign: "center", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
    >
      GitHub
    </a>
  </div>
</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: T.textFaint, marginTop: "2.5rem", fontStyle: "italic", letterSpacing: "0.02em" }}>
          — More projects in progress
        </p>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────
function Contact({ T }) {
  const [ref, inView] = useInView();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("charlesneenwi@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" style={{ background: T.bg, padding: "9rem 2.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1140, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: "all 0.85s ease" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 1, background: T.accent }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: T.accent, margin: 0 }}>Contact</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="contact-grid">
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(3rem, 6vw, 5.5rem)", color: T.text, margin: "0 0 1.5rem", letterSpacing: "0.03em", lineHeight: 0.92 }}>
              LET'S WORK<br />
              <span style={{ color: T.accent }}>TOGETHER</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: T.textMuted, lineHeight: 1.85, maxWidth: 420 }}>
              I'm open to frontend roles, freelance projects, and meaningful collaborations. If you're building something real, let's talk.
            </p>

            {/* Social links row */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/charles-neenwi-b908b6361/" },
                { label: "GitHub", href: "https://github.com/charlesneenwi" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.text, border: `1px solid ${T.border}`, padding: "0.9rem 2rem", textDecoration: "none", display: "inline-flex", alignItems: "center", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: action buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <button onClick={copyEmail}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: T.accent, color: T.accentContrast, padding: "1.15rem 2rem", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s", boxShadow: `0 4px 24px ${T.glow}` }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${T.glow}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 24px ${T.glow}`; }}
            >
              <span>{copied ? "Copied! ✓" : "charlesneenwi@gmail.com"}</span>
              {!copied && <ArrowIcon color={T.accentContrast} size={14} />}
            </button>

            <a href="/charles-neenwi-resume.pdf" target="_blank" rel="noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.text, border: `1px solid ${T.border}`, padding: "1.15rem 2rem", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; e.currentTarget.style.background = T.accentDim; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; e.currentTarget.style.background = "transparent"; }}
            >
              <span>View Resume</span>
              <ResumeIcon color="currentColor" size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer({ T }) {
  return (
    <footer style={{ background: T.bgAlt, borderTop: `1px solid ${T.footerBorder}`, padding: "1.75rem 2.5rem" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1rem", letterSpacing: "0.1em", color: T.footerText }}>
          CN<span style={{ color: T.accent }}>.</span>
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: T.footerText, letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Charles Neenwi · All Rights Reserved
        </span>
        <a href="#hero"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.footerText, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={e => e.target.style.color = T.accent}
          onMouseLeave={e => e.target.style.color = T.footerText}
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const T = darkMode ? DARK : LIGHT;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.bg}; color: ${T.text}; -webkit-font-smoothing: antialiased; transition: background 0.4s ease, color 0.4s ease; }
        ::selection { background: ${T.accent}33; color: ${T.text}; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .project-inner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .about-grid { gap: 2rem !important; }
        }
      `}</style>
      <Navbar T={T} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero T={T} />
      <About T={T} />
      <Skills T={T} />
      <Projects T={T} />
      <Contact T={T} />
      <Footer T={T} />
    </>
  );
}