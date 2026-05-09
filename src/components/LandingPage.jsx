import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

/* ─────────── tiny hook: animate counter ─────────── */
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return count;
};

/* ─────────── stat item ─────────── */
const Stat = ({ value, suffix, label }) => {
  const n = useCounter(value);
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          background: "linear-gradient(135deg,#818cf8,#c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {n.toLocaleString()}
        {suffix}
      </p>
      <p style={{ color: "#94a3b8", marginTop: "4px", fontSize: "0.95rem" }}>
        {label}
      </p>
    </div>
  );
};

/* ─────────── feature card ─────────── */
const FeatureCard = ({ icon, title, desc, delay }) => (
  <div className="lp-card" style={{ animationDelay: delay }}>
    <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{icon}</div>
    <h3
      style={{
        fontSize: "1.15rem",
        fontWeight: 700,
        color: "#e2e8f0",
        marginBottom: "10px",
      }}
    >
      {title}
    </h3>
    <p style={{ color: "#94a3b8", lineHeight: 1.65, fontSize: "0.93rem" }}>
      {desc}
    </p>
  </div>
);

/* ─────────── testimonial card ─────────── */
const TestimonialCard = ({ name, role, text, avatar }) => (
  <div className="lp-tcard">
    <p
      style={{
        color: "#cbd5e1",
        lineHeight: 1.7,
        fontSize: "0.95rem",
        marginBottom: "20px",
      }}
    >
      "{text}"
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#6366f1,#a855f7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          color: "#fff",
          fontSize: "1rem",
        }}
      >
        {avatar}
      </div>
      <div>
        <p style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "0.9rem" }}>
          {name}
        </p>
        <p style={{ color: "#64748b", fontSize: "0.8rem" }}>{role}</p>
      </div>
    </div>
  </div>
);

/* ─────────── step item ─────────── */
const Step = ({ num, title, desc }) => (
  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
    <div
      style={{
        minWidth: 44,
        height: 44,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#6366f1,#a855f7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        color: "#fff",
        fontSize: "1.1rem",
        boxShadow: "0 0 20px rgba(99,102,241,0.4)",
      }}
    >
      {num}
    </div>
    <div>
      <h4 style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>
        {title}
      </h4>
      <p style={{ color: "#94a3b8", lineHeight: 1.65, fontSize: "0.93rem" }}>
        {desc}
      </p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════
   MAIN LANDING PAGE
═══════════════════════════════════════════════════ */
const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* ── global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .lp-root { font-family:'Inter',sans-serif; background:#080c14; color:#e2e8f0; min-height:100vh; overflow-x:hidden; }

        /* animated grid bg */
        .lp-grid-bg {
          position:fixed; inset:0; z-index:0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size:60px 60px;
          pointer-events:none;
        }

        /* glow orbs */
        .lp-orb1 { position:fixed; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%); top:-200px; left:-200px; pointer-events:none; z-index:0; }
        .lp-orb2 { position:fixed; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%); bottom:-150px; right:-100px; pointer-events:none; z-index:0; }

        .lp-content { position:relative; z-index:1; }

        /* navbar */
        .lp-nav { display:flex; align-items:center; justify-content:space-between; padding:20px 6%; backdrop-filter:blur(12px); background:rgba(8,12,20,0.7); border-bottom:1px solid rgba(99,102,241,0.12); position:sticky; top:0; z-index:100; }
        .lp-logo { font-size:1.4rem; font-weight:900; background:linear-gradient(135deg,#818cf8,#c084fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; letter-spacing:-0.5px; }
        .lp-nav-links { display:flex; gap:32px; }
        .lp-nav-links a { color:#94a3b8; text-decoration:none; font-size:0.9rem; font-weight:500; transition:color 0.2s; }
        .lp-nav-links a:hover { color:#e2e8f0; }
        .lp-btn-primary { background:linear-gradient(135deg,#6366f1,#a855f7); color:#fff; padding:10px 24px; border-radius:8px; font-weight:600; font-size:0.9rem; text-decoration:none; transition:transform 0.2s, box-shadow 0.2s; display:inline-block; border:none; cursor:pointer; }
        .lp-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(99,102,241,0.45); }
        .lp-btn-ghost { color:#e2e8f0; padding:10px 24px; border-radius:8px; font-weight:600; font-size:0.9rem; text-decoration:none; border:1px solid rgba(99,102,241,0.35); transition:all 0.2s; display:inline-block; }
        .lp-btn-ghost:hover { border-color:#818cf8; background:rgba(99,102,241,0.1); }

        /* inline sub-nav */
        .lp-subnav { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:16px 24px; padding:12px 16px; border-bottom:1px solid rgba(99,102,241,0.1); }
        .lp-hamburger { display:none; background:none; border:1px solid rgba(99,102,241,0.35); border-radius:8px; padding:6px 10px; cursor:pointer; color:#94a3b8; font-size:1.2rem; line-height:1; }
        .lp-subnav-links { display:flex; align-items:center; gap:28px; }
        @media(max-width:540px){
          .lp-subnav-links { display:none; width:100%; flex-direction:column; align-items:center; gap:12px; padding:8px 0; }
          .lp-subnav-links.open { display:flex; }
          .lp-hamburger { display:block; }
          .lp-subnav { flex-direction:column; align-items:flex-end; padding:10px 16px; }
        }

        /* hero */
        .lp-hero { padding:100px 6% 80px; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; max-width:1200px; margin:0 auto; }
        @media(max-width:768px){ .lp-hero { grid-template-columns:1fr; text-align:center; } }
        .lp-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.3); border-radius:50px; padding:6px 16px; font-size:0.8rem; color:#818cf8; font-weight:600; margin-bottom:24px; }
        .lp-badge-dot { width:6px; height:6px; border-radius:50%; background:#818cf8; animation:pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }
        .lp-h1 { font-size:clamp(2.5rem,5vw,3.8rem); font-weight:900; line-height:1.1; letter-spacing:-1.5px; margin-bottom:24px; }
        .lp-h1 span { background:linear-gradient(135deg,#818cf8 0%,#c084fc 50%,#f472b6 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .lp-hero-sub { color:#94a3b8; font-size:1.1rem; line-height:1.7; margin-bottom:40px; max-width:480px; }
        .lp-hero-cta { display:flex; gap:16px; flex-wrap:wrap; }
        .lp-hero-img { border-radius:20px; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.2); animation:float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .lp-hero-img img { width:100%; display:block; }

        /* section */
        .lp-section { padding:80px 6%; max-width:1200px; margin:0 auto; }
        .lp-section-label { text-align:center; color:#818cf8; font-size:0.8rem; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-bottom:14px; }
        .lp-section-title { text-align:center; font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:800; letter-spacing:-0.5px; margin-bottom:16px; }
        .lp-section-sub { text-align:center; color:#94a3b8; max-width:520px; margin:0 auto 60px; line-height:1.7; }

        /* divider */
        .lp-divider { height:1px; background:linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent); margin:0 6%; }

        /* stats */
        .lp-stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:40px; padding:60px 6%; max-width:900px; margin:0 auto; }

        /* feature grid */
        .lp-feature-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
        .lp-card { background:rgba(15,20,35,0.8); border:1px solid rgba(99,102,241,0.15); border-radius:16px; padding:32px; transition:all 0.3s; animation:fadeInUp 0.6s ease both; }
        .lp-card:hover { border-color:rgba(99,102,241,0.45); transform:translateY(-4px); box-shadow:0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.2); background:rgba(99,102,241,0.06); }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }

        /* how it works */
        .lp-steps { display:grid; grid-template-columns:1fr 1fr; gap:48px 80px; }
        @media(max-width:768px){ .lp-steps{grid-template-columns:1fr;} }

        /* testimonials */
        .lp-tgrid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
        .lp-tcard { background:rgba(15,20,35,0.8); border:1px solid rgba(99,102,241,0.15); border-radius:16px; padding:28px; transition:all 0.3s; }
        .lp-tcard:hover { border-color:rgba(168,85,247,0.4); box-shadow:0 12px 30px rgba(0,0,0,0.3); }

        /* CTA band */
        .lp-cta-band { margin:60px 6%; border-radius:24px; background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(168,85,247,0.15)); border:1px solid rgba(99,102,241,0.25); padding:70px 40px; text-align:center; position:relative; overflow:hidden; }
        @media(max-width:640px){ .lp-cta-band { margin:40px 4%; padding:48px 20px; } }
        .lp-cta-band::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%); }

        /* footer */
        .lp-footer { padding:40px 6%; border-top:1px solid rgba(99,102,241,0.1); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
        .lp-footer p { color:#475569; font-size:0.85rem; }
        .lp-footer-links { display:flex; gap:24px; flex-wrap:wrap; }
        .lp-footer-links a { color:#475569; text-decoration:none; font-size:0.85rem; transition:color 0.2s; }
        .lp-footer-links a:hover { color:#818cf8; }
        @media(max-width:540px){ .lp-footer { flex-direction:column; align-items:center; text-align:center; padding:32px 6%; } }

        /* tag chips */
        .lp-tags { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
        .lp-tag { background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-radius:50px; padding:5px 14px; font-size:0.78rem; color:#818cf8; font-weight:500; }
      `}</style>

      <div className="lp-root">
        <div className="lp-grid-bg" />
        <div className="lp-orb1" />
        <div className="lp-orb2" />

        <div className="lp-content">
          {/* ── inline nav links for landing-page anchors ── */}
          <div className="lp-subnav">
            <button
              className="lp-hamburger"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
            <div className={`lp-subnav-links${menuOpen ? " open" : ""}`}>
              {[
                ["#features", "Features"],
                ["#how", "How it works"],
                ["#testimonials", "Stories"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    fontFamily: "Inter,sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#e2e8f0")}
                  onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
                >
                  {label}
                </a>
              ))}
              <Link
                to="/login"
                className="lp-btn-primary"
                style={{ padding: "6px 18px", fontSize: "0.85rem" }}
              >
                Get started →
              </Link>
            </div>
          </div>

          {/* ══ HERO ══ */}
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="lp-hero">
              {/* left */}
              <div>
                <div className="lp-badge">
                  <span className="lp-badge-dot" />
                  Now in public beta — join 5,000+ developers
                </div>
                <h1 className="lp-h1">
                  Find your <span>perfect</span> dev partner
                </h1>
                <p className="lp-hero-sub">
                  DevMatch matches you with developers who share your stack,
                  vision, and ambition. Swipe, connect, and build something
                  extraordinary together.
                </p>
                <div className="lp-hero-cta">
                  <Link
                    to="/login"
                    className="lp-btn-primary"
                    style={{ fontSize: "1rem", padding: "14px 32px" }}
                  >
                    Start swiping free →
                  </Link>
                  <a
                    href="#how"
                    className="lp-btn-ghost"
                    style={{ fontSize: "1rem", padding: "14px 32px" }}
                  >
                    See how it works
                  </a>
                </div>
                <div className="lp-tags">
                  {[
                    "React",
                    "Node.js",
                    "Python",
                    "Rust",
                    "Go",
                    "DevOps",
                    "ML/AI",
                    "Open Source",
                  ].map((t) => (
                    <span key={t} className="lp-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* right */}
              <div className="lp-hero-img">
                <img src="/hero-illustration.png" alt="Developers connecting" />
              </div>
            </div>
          </div>

          {/* ══ STATS ══ */}
          <div className="lp-divider" />
          <div className="lp-stats">
            <Stat value={5000} suffix="+" label="Developers joined" />
            <Stat value={1200} suffix="+" label="Connections made" />
            <Stat value={340} suffix="+" label="Projects launched" />
            <Stat value={98} suffix="%" label="Satisfaction rate" />
          </div>
          <div className="lp-divider" />

          {/* ══ FEATURES ══ */}
          <section id="features" className="lp-section">
            <p className="lp-section-label">Features</p>
            <h2 className="lp-section-title">
              Everything you need to
              <br />
              find your co-founder
            </h2>
            <p className="lp-section-sub">
              We've built the tools developers actually need — not bloated
              social media, just pure signal.
            </p>
            <div className="lp-feature-grid">
              <FeatureCard
                delay="0s"
                icon="🎯"
                title="Smart Stack Matching"
                desc="Our algorithm pairs you with devs who complement your skills. React dev? We'll find your backend ninja. Solo hacker? Meet your designer."
              />
              <FeatureCard
                delay="0.1s"
                icon="⚡"
                title="Instant Connections"
                desc="No waiting, no cold emails. Send a connect request and start chatting the moment they accept. Real-time, zero friction."
              />
              <FeatureCard
                delay="0.2s"
                icon="🛡️"
                title="Verified Profiles"
                desc="Every profile is linked to GitHub. See real commits, real projects, real contributions — not just empty claims."
              />
              <FeatureCard
                delay="0.3s"
                icon="🔍"
                title="Deep Search Filters"
                desc="Filter by language, timezone, experience, and availability. Find developers who can actually work with you, right now."
              />
              <FeatureCard
                delay="0.4s"
                icon="🚀"
                title="Project Showcase"
                desc="Pin your projects to your profile. Let your work speak for itself and attract collaborators who get excited about what you're building."
              />
              <FeatureCard
                delay="0.5s"
                icon="🌐"
                title="Open Source First"
                desc="Built with open source values. Contribute to the platform, fork it, make it yours. We believe in transparency and community."
              />
            </div>
          </section>

          <div className="lp-divider" />

          {/* ══ HOW IT WORKS ══ */}
          <section id="how" className="lp-section">
            <p className="lp-section-label">How it works</p>
            <h2 className="lp-section-title">
              From stranger to co-founder
              <br />
              in four steps
            </h2>
            <p className="lp-section-sub">
              We stripped away everything unnecessary. Here's how you go from
              zero to building together.
            </p>
            <div className="lp-steps">
              <Step
                num="01"
                title="Create your profile"
                desc="Sign up with GitHub. Your profile is auto-populated with your languages, top repos, and contribution graph."
              />
              <Step
                num="02"
                title="Set your preferences"
                desc="Tell us what you're building, what skills you're looking for, and your availability. Takes 2 minutes."
              />
              <Step
                num="03"
                title="Swipe & discover"
                desc="Browse developer cards. Interested? Send a connection request. Not a fit? Move on — no awkwardness."
              />
              <Step
                num="04"
                title="Build together"
                desc="Once both of you connect, start chatting, share ideas, and launch your next big thing."
              />
            </div>
          </section>

          <div className="lp-divider" />

          {/* ══ TESTIMONIALS ══ */}
          <section id="testimonials" className="lp-section">
            <p className="lp-section-label">Stories</p>
            <h2 className="lp-section-title">Developers love DevMatch</h2>
            <p className="lp-section-sub">
              Real stories from real developers who found their match.
            </p>
            <div className="lp-tgrid">
              <TestimonialCard
                avatar="A"
                name="Arjun Mehta"
                role="Full-stack Dev · Bangalore"
                text="I was skeptical at first but within a week I found my co-founder for a SaaS I'd been sitting on for months. We shipped our MVP in 6 weeks."
              />
              <TestimonialCard
                avatar="S"
                name="Sarah Chen"
                role="ML Engineer · Remote"
                text="The stack-based matching is genuinely impressive. Every dev I connected with was actually relevant — no random DMs from people who can't code."
              />
              <TestimonialCard
                avatar="M"
                name="Marcus Webb"
                role="Open Source Contributor · Berlin"
                text="Finally a platform that treats developers like adults. No fluff, no engagement bait. Just real connections with people building real things."
              />
            </div>
          </section>

          {/* ══ CTA BAND ══ */}
          <div className="lp-cta-band">
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  color: "#818cf8",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Ready to ship?
              </p>
              <h2
                style={{
                  fontSize: "clamp(2rem,4vw,3rem)",
                  fontWeight: 900,
                  letterSpacing: "-1px",
                  marginBottom: "16px",
                }}
              >
                Your perfect dev partner
                <br />
                is already here.
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "36px",
                  maxWidth: "480px",
                  margin: "0 auto 36px",
                  lineHeight: 1.7,
                }}
              >
                Join thousands of developers who stopped building alone. It's
                free, it's fast, and your next great collaboration is one swipe
                away.
              </p>
              <Link
                to="/login"
                className="lp-btn-primary"
                style={{ fontSize: "1.05rem", padding: "16px 40px" }}
              >
                Create free account →
              </Link>
            </div>
          </div>

          {/* ══ FOOTER ══ */}
          <footer className="lp-footer">
            <span className="lp-logo" style={{ fontSize: "1.1rem" }}>
              ⚡ DevMatch
            </span>
            <p>© 2025 DevMatch. Built by developers, for developers.</p>
            <div className="lp-footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">GitHub</a>
              <a href="#">Twitter</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
