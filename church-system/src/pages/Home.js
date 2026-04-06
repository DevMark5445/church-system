import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════
   GLOBAL STYLES — injected once into <head>
══════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Lato', sans-serif;
    background: #f7f4ee;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }

  :root {
    --navy:        #14213d;
    --navy-mid:    #1e3160;
    --navy-light:  #2a4480;
    --gold:        #c9a84c;
    --gold-light:  #e8c876;
    --gold-pale:   rgba(201,168,76,0.12);
    --cream:       #f7f4ee;
    --cream-dark:  #ede9e0;
    --text-body:   #5a6478;
    --text-light:  rgba(247,244,238,0.72);
    --white:       #ffffff;
    --nav-h:       72px;
    --ease:        cubic-bezier(0.4,0,0.2,1);
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  /* ── Scroll-reveal ── */
  .reveal {
    opacity:0;
    transform:translateY(22px);
    transition: opacity 0.65s var(--ease), transform 0.65s var(--ease);
  }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-d1 { transition-delay:.10s; }
  .reveal-d2 { transition-delay:.20s; }
  .reveal-d3 { transition-delay:.30s; }

  /* ── Container ── */
  .container {
    width: min(1160px, 100%);
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 5vw, 3rem);
  }

  /* ════════════════════════════════════
     NAVBAR
  ════════════════════════════════════ */
  .navbar {
    position: fixed;
    inset-block-start: 0;
    inset-inline: 0;
    z-index: 200;
    height: var(--nav-h);
    display: flex;
    align-items: center;
    background: var(--navy);
    border-top: 3px solid var(--gold);
    box-shadow: 0 2px 24px rgba(0,0,0,.28);
    background-image: linear-gradient(160deg, rgba(255,255,255,.03) 0%, transparent 55%);
    transition: background .25s var(--ease), box-shadow .25s var(--ease);
  }
  .navbar.scrolled {
    background: rgba(20,33,61,.96);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .navbar .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .nav-logo {
    display: flex; align-items: center; gap:.65rem; outline:none;
  }
  .nav-logo:focus-visible .logo-mark { box-shadow:0 0 0 3px var(--gold); }
  .logo-mark {
    width:36px; height:36px; border-radius:6px; flex-shrink:0;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    display:grid; place-items:center;
    transition: transform .23s var(--ease);
  }
  .nav-logo:hover .logo-mark { transform:rotate(8deg) scale(1.07); }
  .logo-mark svg { width:20px; height:20px; fill:var(--navy); }
  .logo-text { display:flex; flex-direction:column; line-height:1.1; }
  .logo-name {
    font-family:'Cinzel',serif; font-weight:700;
    font-size:clamp(.9rem,2vw,1.05rem); letter-spacing:.08em; color:#f7f4ee;
  }
  .logo-tagline {
    font-size:.58rem; font-weight:300; letter-spacing:.24em;
    text-transform:uppercase; color:var(--gold);
  }
  .nav-btn {
    display:flex; align-items:center; gap:.45rem;
    padding:.42rem 1.05rem .42rem .8rem;
    border-radius:6px; border:1.5px solid rgba(201,168,76,.4);
    background:transparent; cursor:pointer; outline:none;
    font-family:'Lato',sans-serif; font-size:.78rem; font-weight:400;
    letter-spacing:.1em; text-transform:uppercase;
    color:rgba(247,244,238,.65);
    transition: color .23s, border-color .23s, background .23s,
                box-shadow .23s, transform .23s;
  }
  .nav-btn svg {
    width:15px; height:15px; flex-shrink:0;
    stroke:var(--gold); fill:none; stroke-width:1.8;
    stroke-linecap:round; stroke-linejoin:round;
    transition: stroke .23s, transform .23s;
  }
  .nav-btn:hover {
    color:#f7f4ee; border-color:var(--gold);
    background:rgba(201,168,76,.1);
    box-shadow:0 0 18px rgba(201,168,76,.18);
    transform:translateY(-1px);
  }
  .nav-btn:hover svg { stroke:var(--gold-light); transform:translateX(2px); }
  .nav-btn:focus-visible { outline:2px solid var(--gold); outline-offset:3px; }
  .nav-btn:active { transform:translateY(0); }
  @media(max-width:480px) {
    :root { --nav-h:60px; }
    .nav-label { display:none; }
    .nav-btn { padding:.5rem; border-radius:50%; width:38px; height:38px; justify-content:center; }
    .logo-tagline { display:none; }
  }

  /* ════════════════════════════════════
     HERO
  ════════════════════════════════════ */
  .hero {
    position:relative; overflow:hidden;
    padding-block-start: calc(var(--nav-h) + clamp(4rem,10vw,7rem));
    padding-block-end: clamp(5rem,12vw,9rem);
    background: linear-gradient(175deg, var(--navy) 0%, var(--navy-mid) 55%, var(--navy-light) 100%);
  }
  .hero-glow-a {
    position:absolute; width:700px; height:700px; border-radius:50%;
    top:-200px; right:-150px; pointer-events:none;
    background:radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 70%);
  }
  .hero-glow-b {
    position:absolute; width:500px; height:500px; border-radius:50%;
    bottom:-180px; left:-100px; pointer-events:none;
    background:radial-gradient(circle, rgba(42,68,128,.6) 0%, transparent 70%);
  }
  .hero .container { position:relative; z-index:1; }
  .hero-divider {
    position:absolute; bottom:-1px; left:0; right:0;
    height:clamp(48px,6vw,80px); fill:var(--cream);
  }
  .eyebrow {
    display:inline-flex; align-items:center; gap:.5rem;
    margin-block-end:1.5rem; padding:.3rem .9rem;
    border-radius:100px; border:1px solid rgba(201,168,76,.35);
    background:rgba(201,168,76,.08);
    font-size:.7rem; font-weight:400; letter-spacing:.22em;
    text-transform:uppercase; color:var(--gold-light);
    animation: fadeIn .7s ease both;
  }
  .eyebrow-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--gold); flex-shrink:0;
  }
  .hero-headline {
    font-family:'Cinzel',serif; font-weight:700;
    font-size:clamp(2.1rem,5.5vw,4rem); line-height:1.15;
    letter-spacing:-.01em; color:#f7f4ee; max-width:700px;
    animation: fadeUp .8s ease .1s both;
  }
  .hero-headline em {
    font-style:normal;
    background:linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .hero-sub {
    margin-block-start:1.4rem;
    font-size:clamp(.95rem,2vw,1.1rem); font-weight:300; line-height:1.75;
    color:var(--text-light); max-width:520px;
    animation: fadeUp .8s ease .22s both;
  }
  .hero-actions {
    margin-block-start:2.4rem; display:flex; align-items:center;
    gap:1rem; flex-wrap:wrap;
    animation: fadeUp .8s ease .34s both;
  }
  .hero-stats {
    display:flex; gap:clamp(1.5rem,4vw,3rem); flex-wrap:wrap;
    margin-block-start:4rem;
    animation: fadeUp .8s ease .46s both;
  }
  .stat { display:flex; flex-direction:column; gap:.2rem; }
  .stat + .stat {
    padding-inline-start:clamp(1.5rem,4vw,3rem);
    border-inline-start:1px solid rgba(201,168,76,.2);
  }
  .stat-num {
    font-family:'Cinzel',serif; font-weight:600;
    font-size:clamp(1.5rem,3vw,2rem); color:var(--gold-light);
  }
  .stat-label {
    font-size:.68rem; font-weight:300; letter-spacing:.18em;
    text-transform:uppercase; color:rgba(247,244,238,.5);
  }

  /* ── Primary CTA Button ── */
  .btn-primary {
    display:inline-flex; align-items:center; gap:.55rem;
    padding:.85rem 2rem; border-radius:6px; border:none; cursor:pointer; outline:none;
    background:linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color:var(--navy);
    font-family:'Lato',sans-serif; font-size:.88rem; font-weight:700;
    letter-spacing:.1em; text-transform:uppercase;
    box-shadow:0 4px 20px rgba(201,168,76,.35);
    transition: transform .23s var(--ease), box-shadow .23s var(--ease), filter .23s;
  }
  .btn-primary svg {
    width:15px; height:15px; flex-shrink:0;
    stroke:var(--navy); fill:none; stroke-width:2;
    stroke-linecap:round; stroke-linejoin:round;
    transition: transform .23s var(--ease);
  }
  .btn-primary:hover {
    transform:translateY(-2px);
    box-shadow:0 8px 30px rgba(201,168,76,.45);
    filter:brightness(1.05);
  }
  .btn-primary:hover svg { transform:translateX(3px); }
  .btn-primary:focus-visible { outline:2px solid var(--gold-light); outline-offset:3px; }
  .btn-primary:active { transform:translateY(0); }

  /* ════════════════════════════════════
     FEATURES
  ════════════════════════════════════ */
  .features {
    padding-block: clamp(4.5rem,8vw,7rem);
    background:var(--cream);
  }
  .section-label {
    display:block; text-align:center;
    font-size:.65rem; font-weight:400; letter-spacing:.28em;
    text-transform:uppercase; color:var(--gold);
    margin-block-end:.75rem;
  }
  .section-title {
    font-family:'Cinzel',serif; font-weight:600;
    font-size:clamp(1.6rem,3.5vw,2.4rem); text-align:center;
    color:var(--navy); line-height:1.25; letter-spacing:-.01em;
  }
  .section-sub {
    text-align:center; font-size:.95rem; font-weight:300;
    color:var(--text-body); max-width:480px; margin-inline:auto;
    margin-block-start:.85rem; line-height:1.7;
  }
  .features-grid {
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(min(100%,300px),1fr));
    gap:1.5rem; margin-block-start:3.5rem;
  }
  .feature-card {
    background:var(--white); border-radius:12px;
    padding:2.2rem 2rem 2rem;
    box-shadow:0 4px 32px rgba(20,33,61,.08), 0 1px 4px rgba(20,33,61,.06);
    border:1px solid rgba(20,33,61,.06);
    position:relative; overflow:hidden;
    transition: transform .23s var(--ease), box-shadow .23s var(--ease);
  }
  .feature-card::before {
    content:''; position:absolute;
    inset-block-start:0; inset-inline:0; height:3px;
    background:linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
    transform:scaleX(0); transform-origin:left;
    transition: transform .32s var(--ease);
  }
  .feature-card:hover { transform:translateY(-4px); box-shadow:0 12px 48px rgba(20,33,61,.14); }
  .feature-card:hover::before { transform:scaleX(1); }
  .card-icon {
    width:48px; height:48px; border-radius:10px;
    background:var(--gold-pale); display:grid; place-items:center;
    margin-block-end:1.4rem;
    transition: background .23s;
  }
  .feature-card:hover .card-icon { background:rgba(201,168,76,.2); }
  .card-icon svg {
    width:22px; height:22px; stroke:var(--gold); fill:none;
    stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round;
  }
  .card-title {
    font-family:'Cinzel',serif; font-size:1rem; font-weight:600;
    color:var(--navy); margin-block-end:.65rem; letter-spacing:.02em;
  }
  .card-body {
    font-size:.88rem; font-weight:300; line-height:1.75; color:var(--text-body);
  }

  /* ════════════════════════════════════
     ABOUT
  ════════════════════════════════════ */
  .about {
    padding-block:clamp(4rem,8vw,6.5rem);
    background:var(--cream-dark);
    position:relative; overflow:hidden;
  }
  .about::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,.05) 0%, transparent 70%);
  }
  .about .container { position:relative; z-index:1; }
  .about-inner { max-width:680px; margin-inline:auto; text-align:center; }
  .about-icon {
    width:56px; height:56px; border-radius:12px;
    background:linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    display:grid; place-items:center;
    margin-inline:auto; margin-block-end:1.75rem;
    box-shadow:0 8px 28px rgba(201,168,76,.3);
  }
  .about-icon svg { width:26px; height:26px; fill:var(--navy); }
  .about-body {
    margin-block-start:1.1rem;
    font-size:clamp(.95rem,1.8vw,1.05rem); font-weight:300;
    line-height:1.85; color:var(--text-body);
  }
  .about-divider {
    width:48px; height:2px; border-radius:2px;
    background:linear-gradient(90deg, var(--gold), var(--gold-light));
    margin:1.75rem auto 0;
  }

  /* ════════════════════════════════════
     CTA SECTION
  ════════════════════════════════════ */
  .cta-section {
    padding-block:clamp(4.5rem,9vw,7rem);
    background:linear-gradient(160deg, var(--navy) 0%, var(--navy-light) 100%);
    position:relative; overflow:hidden; text-align:center;
  }
  .cta-section::before {
    content:''; position:absolute; width:600px; height:600px; border-radius:50%;
    top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;
    background:radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 70%);
  }
  .cta-wave-top {
    position:absolute; top:-1px; left:0; right:0;
    fill:var(--cream-dark); height:clamp(40px,5vw,64px);
  }
  .cta-section .container { position:relative; z-index:1; }
  .cta-headline {
    font-family:'Cinzel',serif; font-size:clamp(1.7rem,4vw,2.8rem);
    font-weight:700; color:#f7f4ee; line-height:1.2;
    max-width:580px; margin-inline:auto;
  }
  .cta-headline em {
    font-style:normal;
    background:linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .cta-sub {
    margin-block:1.1rem 2.4rem;
    font-size:clamp(.9rem,1.8vw,1rem); font-weight:300;
    color:var(--text-light); max-width:420px;
    margin-inline:auto; line-height:1.75;
  }
  .cta-section .btn-primary { margin-inline:auto; }

  /* ════════════════════════════════════
     FOOTER
  ════════════════════════════════════ */
  .footer {
    background:var(--navy); padding-block:2rem;
    border-top:1px solid rgba(201,168,76,.15);
  }
  .footer .container {
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:.75rem;
  }
  .footer-logo { display:flex; align-items:center; gap:.5rem; }
  .footer-logo-mark {
    width:26px; height:26px; border-radius:4px;
    background:linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    display:grid; place-items:center;
  }
  .footer-logo-mark svg { width:14px; height:14px; fill:var(--navy); }
  .footer-logo-name {
    font-family:'Cinzel',serif; font-size:.85rem; font-weight:600;
    letter-spacing:.08em; color:#f7f4ee;
  }
  .footer-copy {
    font-size:.75rem; font-weight:300; letter-spacing:.04em;
    color:rgba(247,244,238,.4);
  }
  @media(max-width:540px) {
    .footer .container { flex-direction:column; align-items:center; text-align:center; }
  }
`;

/* ══════════════════════════════════════════════════
   SVG ATOMS
══════════════════════════════════════════════════ */
const CrossSvg = ({ size = 20 }) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: size, height: size }}>
    <rect x="8.5" y="1"   width="3"  height="18" rx="1" />
    <rect x="2"   y="6.5" width="16" height="3"  rx="1" />
  </svg>
);

const LoginSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const MembersSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FinanceSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="12" y1="1"  x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const EventsSvg = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2"  x2="16" y2="6" />
    <line x1="8"  y1="2"  x2="8"  y2="6" />
    <line x1="3"  y1="10" x2="21" y2="10" />
  </svg>
);

/* ══════════════════════════════════════════════════
   HOOK — scroll-reveal via IntersectionObserver
══════════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ══════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════ */

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-headline">
      <div className="hero-glow-a" aria-hidden="true" />
      <div className="hero-glow-b" aria-hidden="true" />

      <div className="container">
        <div className="eyebrow" aria-hidden="true">
          <span className="eyebrow-dot" />
          Church Management System
        </div>

        <h1 className="hero-headline" id="hero-headline">
          Serve Your <em>Community</em><br />With Clarity &amp; Care
        </h1>

        <p className="hero-sub">
          Westlands P.A.G brings your congregation together — from member records and giving
          history to events and communications — all in one secure, easy-to-use platform.
        </p>

        <div className="hero-actions">
          <a href="/login" className="btn-primary" aria-label="Login to GraceHub">
            <LoginSvg />
            Login to Westlands P.A.G
          </a>
        </div>

        <div className="hero-stats" role="list" aria-label="System statistics">
          {[
            { num: "500+",  label: "Members Managed" },
            { num: "100%",  label: "Secure & Private" },
            { num: "24 / 7", label: "Always Available" },
          ].map((s) => (
            <div key={s.label} className="stat" role="listitem">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg className="hero-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,80 L1440,0 L1440,80 Z" />
      </svg>
    </section>
  );
}

/* ── Feature Card ── */
function FeatureCard({ Icon, title, body, delay }) {
  const ref = useReveal();
  return (
    <article ref={ref} className={`feature-card reveal reveal-d${delay}`}>
      <div className="card-icon" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{body}</p>
    </article>
  );
}

/* ── Features Section ── */
function Features() {
  const labelRef  = useReveal();
  const titleRef  = useReveal();
  const subRef    = useReveal();

  const cards = [
    {
      Icon: MembersSvg,
      title: "Member Management",
      body:  "Maintain a complete directory with profiles, contact details, family linkages, and attendance history — searchable and easy to update.",
      delay: 1,
    },
    {
      Icon: FinanceSvg,
      title: "Financial Tracking",
      body:  "Record tithes, offerings, and donations with full transparency. Generate giving statements, track budgets, and produce financial reports in one click.",
      delay: 2,
    },
    {
      Icon: EventsSvg,
      title: "Event Management",
      body:  "Plan services, fellowship events, and outreach programmes. Track RSVPs, assign volunteers, and send reminders from one calendar view.",
      delay: 3,
    },
  ];

  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <div className="container">
        <span ref={labelRef} className="section-label reveal">What We Offer</span>
        <h2 ref={titleRef} className="section-title reveal reveal-d1" id="features-title">
          Everything Your Church Needs
        </h2>
        <p ref={subRef} className="section-sub reveal reveal-d2">
          Three powerful pillars designed to simplify administration so your team
          can focus on what truly matters — the people.
        </p>
        <div className="features-grid">
          {cards.map((c) => <FeatureCard key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  );
}

/* ── About Section ── */
function About() {
  const iconRef   = useReveal();
  const labelRef  = useReveal();
  const titleRef  = useReveal();
  const bodyRef   = useReveal();
  const divRef    = useReveal();

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-inner">
          <div ref={iconRef} className="about-icon reveal" aria-hidden="true">
            <CrossSvg size={26} />
          </div>
          <span ref={labelRef} className="section-label reveal">About Westlands P.A.G</span>
          <h2 ref={titleRef} className="section-title reveal reveal-d1" id="about-title">
            Built for the Church,<br />by Those Who Care
          </h2>
          <p ref={bodyRef} className="about-body reveal reveal-d2">
            Westlands P.A.G was created to remove the administrative burden from church leaders
            and staff. We believe every hour saved on paperwork is an hour returned to
            ministry. Our platform is secure, private, and designed with the values of
            community, stewardship, and service at its core.
          </p>
          <div ref={divRef} className="about-divider reveal reveal-d3" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ── */
function CtaSection() {
  const headRef = useReveal();
  const subRef  = useReveal();
  const btnRef  = useReveal();

  return (
    <section className="cta-section" aria-labelledby="cta-headline">
      <svg className="cta-wave-top" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z" />
      </svg>
      <div className="container">
        <h2 ref={headRef} className="cta-headline reveal" id="cta-headline">
          Ready to <em>Strengthen</em><br />Your Church Community?
        </h2>
        <p ref={subRef} className="cta-sub reveal reveal-d1">
          Log in now and experience a simpler way to manage your congregation,
          finances, and events.
        </p>
        <a
          ref={btnRef}
          href="/login"
          className="btn-primary reveal reveal-d2"
          aria-label="Login to GraceHub church management system"
        >
          <LoginSvg />
          Login to Westlands P.A.G
        </a>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-logo" aria-label="GraceHub">
          <div className="footer-logo-mark" aria-hidden="true">
            <CrossSvg size={14} />
          </div>
          <span className="footer-logo-name">Westlands P.A.G</span>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Westlands P.A.G Church Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════ */
export default function Home() {
  /* Inject global CSS once */
  useEffect(() => {
    const id = "gracehub-globals";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = GLOBAL_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <>
      <main>
        <Hero />
        <Features />
        <About />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}