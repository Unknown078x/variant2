import { useState, useEffect, useRef } from "react";

// ─── COLOR TOKENS ─────────────────────────────────────────────────────────────
const C = {
  navy: "#0A1628",
  navyMid: "#112240",
  blue: "#1565C0",
  blueMid: "#1976D2",
  sky: "#29B6F6",
  skyLight: "#E3F2FD",
  orange: "#F57C00",
  orangeLight: "#FFE0B2",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  gray50: "#F0F4F8",
  gray100: "#E2E8F0",
  gray400: "#94A3B8",
  gray600: "#475569",
  gray800: "#1E293B",
  steel: "#B0BEC5",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "brands", label: "Brands" },
  { id: "locations", label: "Locations" },
  { id: "contact", label: "Contact" },
  { id: "quote", label: "Get Quote" },
];

const PRODUCTS = [
  {
    cat: "Power Tools",
    icon: "⚡",
    color: "#1565C0",
    items: [
      { name: "Angle Grinder 7\"", brand: "Bosch", desc: "Heavy-duty grinding for metal fabrication and cutting applications.", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80" },
      { name: "Cordless Drill 18V", brand: "Dewalt", desc: "High-torque brushless motor with 2-speed gearbox for precision.", img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&q=80" },
      { name: "Circular Saw 7.25\"", brand: "Stanley", desc: "Professional circular saw with laser guide and dust blower.", img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80" },
    ]
  },
  {
    cat: "Pneumatic Tools",
    icon: "🔧",
    color: "#0277BD",
    items: [
      { name: "Air Impact Wrench", brand: "Toku Pneumatics", desc: "1/2\" drive high-torque wrench for industrial fastening.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80" },
      { name: "Pneumatic Drill", brand: "Toku Pneumatics", desc: "Reversible air drill with variable speed for versatile use.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80" },
      { name: "Air Ratchet Wrench", brand: "Groz", desc: "Compact ratchet for tight spaces — 3/8\" square drive.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80" },
    ]
  },
  {
    cat: "Hand & Measuring Tools",
    icon: "📐",
    color: "#01579B",
    items: [
      { name: "Combination Plier Set", brand: "Groz", desc: "Chrome-vanadium steel precision pliers for industrial work.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&q=80" },
      { name: "Digital Vernier Caliper", brand: "Ozar", desc: "0.01mm accuracy stainless steel digital caliper.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&q=80" },
      { name: "Torque Wrench 1/2\"", brand: "Stanley", desc: "Click-type torque wrench 20–200 Nm, dual-scale reading.", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&q=80" },
    ]
  },
  {
    cat: "Safety Equipment",
    icon: "🦺",
    color: "#F57C00",
    items: [
      { name: "Safety Helmet ISI", brand: "Ozar", desc: "HDPE shell with 6-point suspension, ISI certified.", img: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=300&q=80" },
      { name: "Cut-Resistant Gloves", brand: "Groz", desc: "Level 5 ANSI cut resistance, oil-resistant palm coating.", img: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=300&q=80" },
      { name: "Industrial Safety Boots", brand: "Ozar", desc: "Steel toe cap, puncture-resistant sole, anti-static.", img: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=300&q=80" },
    ]
  },
  {
    cat: "Electrical Items",
    icon: "🔌",
    color: "#1565C0",
    items: [
      { name: "MCB & RCCB Panels", brand: "Authorized OEM", desc: "LT panel components — MCBs, RCCBs, isolators, bus bars.", img: "https://images.unsplash.com/photo-1508624217470-5ef0f947d8be?w=300&q=80" },
      { name: "Industrial Cable Lugs", brand: "Pidilite", desc: "Copper & aluminium lugs for high-current cable terminations.", img: "https://images.unsplash.com/photo-1508624217470-5ef0f947d8be?w=300&q=80" },
      { name: "Wire Rope & Slings", brand: "KITO", desc: "Lifting slings, hooks, and wire ropes for crane operations.", img: "https://images.unsplash.com/photo-1508624217470-5ef0f947d8be?w=300&q=80" },
    ]
  },
];

const BRANDS = [
  { name: "Bosch", tagline: "Invented for life", color: "#CE1126" },
  { name: "Groz", tagline: "Engineering Excellence", color: "#003087" },
  { name: "Toku Pneumatics", tagline: "Air Power Specialists", color: "#1565C0" },
  { name: "Ozar", tagline: "Safety & Precision", color: "#F57C00" },
  { name: "Stanley", tagline: "Tools for Pros", color: "#FFD700" },
  { name: "Dewalt", tagline: "Guaranteed Tough", color: "#FFCD11" },
  { name: "Pidilite", tagline: "Bonding for Life", color: "#E31837" },
  { name: "KITO", tagline: "Lifting Solutions", color: "#003366" },
];

const SERVICES = [
  {
    title: "LT Panel Manufacturing",
    icon: "⚡",
    desc: "Custom-designed Low Tension panels manufactured at our Bhiwadi facility. From MCC to PCC, we build to your exact specifications with full testing & certification.",
    features: ["MCC / PCC / APFC Panels", "ISI Certified Components", "Factory Testing & QC", "Custom Bus Bar Design"],
  },
  {
    title: "Electrical Contracting",
    icon: "🏗️",
    desc: "Government licensed electrical contractor with 17+ years of project execution across industrial, commercial, and infrastructure sectors.",
    features: ["HT/LT Installations", "Cable Laying & Termination", "Transformer Installation", "Govt Licensed (Class A)"],
  },
  {
    title: "Industrial Supply Solutions",
    icon: "📦",
    desc: "One-stop procurement partner for all industrial MRO needs. Authorized dealer network ensures genuine products with full warranty support.",
    features: ["Bulk Supply Contracts", "Annual Rate Contracts", "Just-in-Time Delivery", "Authorized Dealer Network"],
  },
  {
    title: "Installation & Maintenance",
    icon: "🔧",
    desc: "On-site installation, commissioning, and preventive maintenance services for electrical systems, panel boards, and industrial machinery.",
    features: ["Preventive Maintenance AMC", "Emergency Breakdown Support", "Panel Retrofitting", "Energy Audit Services"],
  },
];

const TESTIMONIALS = [
  { name: "Rajesh Sharma", company: "Maruti Ancillary, Bhiwadi", text: "Kumar Electricals has been our trusted partner for 8 years. Their LT panel quality and on-time delivery is unmatched in the region.", rating: 5 },
  { name: "Sunita Agarwal", company: "Honda Vendor, Tapukara", text: "Best source for Bosch and Dewalt tools in Rajasthan. Competitive pricing, genuine products, and prompt service.", rating: 5 },
  { name: "Vikram Singh", company: "Infrastructure Contractor, Neemrana", text: "Their electrical contracting team handled our 2MW plant hookup flawlessly. Professional, safe, and on schedule.", rating: 5 },
];

// ─── UTILITY ──────────────────────────────────────────────────────────────────
const useScrollY = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
};

const useFadeIn = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function AnimSection({ children, className = "" }) {
  const [ref, vis] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

function SectionHeader({ tag, title, sub }) {
  return (
    <AnimSection style={{ textAlign: "center", marginBottom: 48 }}>
      <div style={{ display: "inline-block", background: C.skyLight, color: C.blue, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", padding: "6px 18px", borderRadius: 20, marginBottom: 14, border: `1px solid ${C.sky}` }}>{tag}</div>
      <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: C.navy, margin: "0 0 12px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: -0.5 }}>{title}</h2>
      {sub && <p style={{ color: C.gray600, fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </AnimSection>
  );
}

function Button({ children, variant = "primary", onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  const base = { padding: "12px 28px", borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: 0.5, cursor: "pointer", transition: "all 0.2s ease", border: "none", fontFamily: "inherit", ...style };
  const styles = {
    primary: { background: hov ? C.blueMid : C.blue, color: C.white, boxShadow: hov ? "0 8px 24px rgba(21,101,192,0.4)" : "0 4px 12px rgba(21,101,192,0.25)", transform: hov ? "translateY(-2px)" : "none" },
    secondary: { background: "transparent", color: C.white, border: `2px solid rgba(255,255,255,0.7)`, backdropFilter: "blur(4px)", transform: hov ? "translateY(-2px)" : "none" },
    orange: { background: hov ? "#E65100" : C.orange, color: C.white, boxShadow: hov ? "0 8px 24px rgba(245,124,0,0.4)" : "0 4px 12px rgba(245,124,0,0.2)", transform: hov ? "translateY(-2px)" : "none" },
    outline: { background: "transparent", color: C.blue, border: `2px solid ${C.blue}`, transform: hov ? "translateY(-2px)" : "none" },
  };
  return <button style={{ ...base, ...styles[variant] }} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const scrollY = useScrollY();
  const [menu, setMenu] = useState(false);
  const scrolled = scrollY > 60;

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(10,22,40,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none", transition: "all 0.3s ease", padding: "0 24px" }}>
      <div style={{ width: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${C.blue}, ${C.sky})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: C.white, fontFamily: "'Barlow Condensed', sans-serif", boxShadow: "0 4px 12px rgba(21,101,192,0.4)" }}>KE</div>
          <div>
            <div style={{ color: C.white, fontWeight: 800, fontSize: 17, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, lineHeight: 1 }}>KUMAR ELECTRICALS</div>
            <div style={{ color: C.sky, fontSize: 9, letterSpacing: 2, fontWeight: 500, textTransform: "uppercase" }}>Industrial Solutions</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            l.id === "quote"
              ? <button key={l.id} onClick={() => setPage("quote")} style={{ background: C.orange, color: C.white, border: "none", padding: "8px 18px", borderRadius: 5, fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: 0.5, fontFamily: "inherit" }}>{l.label}</button>
              : <button key={l.id} onClick={() => setPage(l.id)} style={{ background: "none", border: "none", color: page === l.id ? C.sky : "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: page === l.id ? 700 : 500, cursor: "pointer", padding: "8px 12px", borderRadius: 4, fontFamily: "inherit", borderBottom: page === l.id ? `2px solid ${C.sky}` : "2px solid transparent", transition: "all 0.2s" }}>{l.label}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenu(!menu)} className="hamburger" style={{ background: "none", border: "none", color: C.white, fontSize: 24, cursor: "pointer", display: "none" }}>☰</button>
      </div>

      {/* Mobile menu */}
      {menu && (
        <div style={{ background: C.navyMid, borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 0" }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setMenu(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: l.id === "quote" ? C.orange : "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 600, padding: "12px 24px", cursor: "pointer", fontFamily: "inherit" }}>{l.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.navy, color: "rgba(255,255,255,0.7)", padding: "60px 24px 32px" }}>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ color: C.white, fontWeight: 800, fontSize: 20, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, marginBottom: 8 }}>KUMAR ELECTRICALS</div>
            <div style={{ color: C.sky, fontSize: 11, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Complete Industrial Solutions</div>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>17+ years of industrial excellence. Authorized dealers, manufacturers, and licensed contractors serving Rajasthan and Haryana.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["📘", "📸", "💼", "▶️"].map((s, i) => <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>{s}</div>)}
            </div>
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", marginBottom: 20 }}>Quick Links</div>
            {NAV_LINKS.map(l => <button key={l.id} onClick={() => setPage(l.id)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 14, cursor: "pointer", padding: "4px 0", textAlign: "left", fontFamily: "inherit", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = C.sky} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>{l.label}</button>)}
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", marginBottom: 20 }}>Our Locations</div>
            {[["📍 Bhiwadi (HQ)", "Plot 42, Industrial Area Phase-2, Bhiwadi, Rajasthan 301019"], ["📍 Rewari", "Near HSIIDC, Rewari, Haryana 123401"], ["📍 Neemrana", "Neemrana Industrial Zone, NH-48, Rajasthan"]].map(([loc, addr]) => (
              <div key={loc} style={{ marginBottom: 16 }}>
                <div style={{ color: C.sky, fontWeight: 600, fontSize: 13 }}>{loc}</div>
                <div style={{ fontSize: 12, lineHeight: 1.6 }}>{addr}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", marginBottom: 20 }}>Contact Us</div>
            {[["📞", "+91 98765 43210"], ["📞", "+91 94140 XXXXX"], ["✉️", "info@kumarelectricals.in"], ["🕒", "Mon–Sat: 9:00 AM – 7:00 PM"]].map(([icon, txt]) => (
              <div key={txt} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, fontSize: 14 }}>
                <span>{icon}</span><span>{txt}</span>
              </div>
            ))}
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: C.white, padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none", marginTop: 8 }}>💬 WhatsApp Us</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          <span>© 2024 Kumar Electricals. All rights reserved.</span>
          <span>GST: 08XXXXXXXXX1ZX | Govt Licensed Electrical Contractor</span>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const [hIdx, setHIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setHIdx(i => (i + 1) % 3), 4000); return () => clearInterval(t); }, []);

  const heroSlides = [
    { bg: "linear-gradient(135deg, #0A1628 0%, #112240 40%, #0D3B7A 100%)", headline: "Complete Industrial Solutions Under One Roof" },
    { bg: "linear-gradient(135deg, #0D2137 0%, #0A1628 50%, #1A237E 100%)", headline: "Authorized Dealers. Trusted Partners." },
    { bg: "linear-gradient(135deg, #0A1628 0%, #1A237E 60%, #0D3B7A 100%)", headline: "Manufacturing Excellence Since 2007" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "100vh", background: heroSlides[hIdx].bg, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 24px" }}>
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />
        {/* Circuit lines decoration */}
        <svg style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", opacity: 0.07 }} viewBox="0 0 600 800">
          <path d="M600 0 L400 0 L400 200 L200 200 L200 400 L0 400" stroke="#29B6F6" strokeWidth="2" fill="none"/>
          <path d="M600 200 L450 200 L450 350 L250 350 L250 600 L0 600" stroke="#29B6F6" strokeWidth="1.5" fill="none"/>
          <circle cx="400" cy="200" r="8" fill="#29B6F6"/>
          <circle cx="200" cy="400" r="8" fill="#1565C0"/>
          <circle cx="450" cy="350" r="6" fill="#29B6F6"/>
          <path d="M100 0 L100 150 L300 150 L300 300 L500 300 L500 600" stroke="#1565C0" strokeWidth="1" fill="none"/>
          <path d="M0 100 L150 100 L150 250 L350 250 L350 500 L600 500" stroke="#0277BD" strokeWidth="1" fill="none"/>
        </svg>

        {/* Glowing orb */}
        <div style={{ position: "absolute", right: "15%", top: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(41,182,246,0.15) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "5%", bottom: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(21,101,192,0.12) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />

        <div style={{ width: "100%", margin: "0 auto", zIndex: 1, padding: "120px 0 80px" }}>
          {/* Tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(41,182,246,0.15)", border: "1px solid rgba(41,182,246,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, background: C.sky, borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <span style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Est. 2007 · Bhiwadi, Rajasthan</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px,5.5vw,72px)", fontWeight: 900, color: C.white, maxWidth: 780, lineHeight: 1.1, margin: "0 0 24px", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: -1, transition: "opacity 0.5s" }}>
            {heroSlides[hIdx].headline}
          </h1>

          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(15px,2vw,18px)", maxWidth: 540, lineHeight: 1.8, marginBottom: 40 }}>
            Kumar Electricals — your single-source partner for power tools, pneumatic equipment, LT panel manufacturing, electrical contracting, and industrial safety supplies across Rajasthan & Haryana.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
            <Button variant="primary" onClick={() => setPage("products")} style={{ fontSize: 15, padding: "14px 32px" }}>View Products →</Button>
            <Button variant="secondary" onClick={() => setPage("quote")} style={{ fontSize: 15, padding: "14px 32px" }}>Get a Quote</Button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            {[["17+", "Years Experience"], ["500+", "Products Range"], ["3", "Locations"], ["8", "Premium Brands"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: C.sky, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, letterSpacing: 0.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
          {[0, 1, 2].map(i => <div key={i} onClick={() => setHIdx(i)} style={{ width: i === hIdx ? 24 : 8, height: 8, background: i === hIdx ? C.sky : "rgba(255,255,255,0.3)", borderRadius: 4, cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
      </section>

      {/* KEY HIGHLIGHTS BAR */}
      <section style={{ background: C.blue, padding: "20px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
          {[["⭐", "17+ Years Experience"], ["✅", "Government Licensed Contractor"], ["🏭", "Own Manufacturing Plant"], ["📍", "3 Strategic Locations"], ["🤝", "8 Authorized Brand Dealerships"]].map(([icon, txt]) => (
            <div key={txt} style={{ display: "flex", alignItems: "center", gap: 10, color: C.white }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{txt}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ background: C.offWhite, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Our Range" title="Featured Product Categories" sub="From precision hand tools to heavy-duty electrical systems — everything an industrial facility needs." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {PRODUCTS.map((p, i) => (
              <AnimSection key={p.cat}>
                <div onClick={() => setPage("products")} style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 28, textAlign: "center", cursor: "pointer", transition: "all 0.25s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(21,101,192,0.15)`; e.currentTarget.style.borderColor = C.sky; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = C.gray100; }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 6 }}>{p.cat}</div>
                  <div style={{ fontSize: 12, color: C.gray400 }}>{p.items.length} Products</div>
                  <div style={{ marginTop: 12, height: 3, background: p.color, borderRadius: 2 }} />
                </div>
              </AnimSection>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Button variant="primary" onClick={() => setPage("products")}>Browse All Products</Button>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section style={{ background: C.navy, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
          <SectionHeader tag="What We Do" title={<span style={{ color: C.white }}>Our Core Services</span>} sub={<span style={{ color: "rgba(255,255,255,0.6)" }}>End-to-end industrial solutions from procurement to project execution.</span>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title}>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 28, height: "100%", transition: "all 0.25s", backdropFilter: "blur(4px)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(21,101,192,0.2)"; e.currentTarget.style.borderColor = C.sky; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: C.white, marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif" }}>{s.title}</div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                  {s.features.map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.sky, marginBottom: 4 }}><span style={{ color: C.orange }}>›</span>{f}</div>)}
                </div>
              </AnimSection>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Button variant="secondary" onClick={() => setPage("services")}>Explore Services</Button>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section style={{ background: C.white, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Authorized Dealers" title="Premium Brands We Represent" sub="Genuine products, manufacturer warranty, and authorized service support." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16 }}>
            {BRANDS.map(b => (
              <AnimSection key={b.name}>
                <div style={{ background: C.gray50, border: `1px solid ${C.gray100}`, borderRadius: 10, padding: "20px 16px", textAlign: "center", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.skyLight; e.currentTarget.style.borderColor = C.sky; e.currentTarget.style.transform = "scale(1.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.gray50; e.currentTarget.style.borderColor = C.gray100; e.currentTarget.style.transform = "scale(1)"; }}>
                  <div style={{ width: 48, height: 48, background: b.color, borderRadius: 8, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 900, fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif" }}>{b.name.substring(0, 2).toUpperCase()}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: C.gray400, marginTop: 2 }}>{b.tagline}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: C.gray50, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Client Feedback" title="What Our Customers Say" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <AnimSection key={t.name}>
                <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 28, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                  <div style={{ color: C.orange, fontSize: 20, marginBottom: 14 }}>{"★".repeat(t.rating)}</div>
                  <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ borderTop: `1px solid ${C.gray100}`, paddingTop: 16 }}>
                    <div style={{ fontWeight: 700, color: C.navy, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: C.gray400, fontSize: 12 }}>{t.company}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.navyMid})`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: C.white, fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to Power Your Operations?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 32 }}>Talk to our industrial supply specialists — same-day quote for bulk orders.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="orange" onClick={() => setPage("quote")} style={{ fontSize: 15, padding: "14px 32px" }}>Request a Quote</Button>
            <a href="tel:+919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: C.white, padding: "14px 28px", borderRadius: 6, fontWeight: 700, fontSize: 15, textDecoration: "none", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)" }}>📞 Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
          <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>About Kumar Electricals</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif", maxWidth: 700, lineHeight: 1.1 }}>17 Years of Industrial Excellence</h1>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ background: C.white, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="two-col">
          <AnimSection>
            <div style={{ color: C.sky, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Our Story</div>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 800, color: C.navy, lineHeight: 1.2, marginBottom: 20, fontFamily: "'Barlow Condensed', sans-serif" }}>A Legacy Built on Trust & Technical Excellence</h2>
            <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>Founded in 2007 in Bhiwadi — the heart of Rajasthan's industrial corridor — Kumar Electricals began as a specialized trading firm catering to the rapidly growing automobile and manufacturing sector.</p>
            <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.9, marginBottom: 24 }}>Over 17 years, we have evolved into a fully integrated industrial solutions company: manufacturing LT panels, executing electrical contracts, and supplying premium tools from the world's top brands.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button variant="primary" onClick={() => setPage("products")}>Our Products</Button>
              <Button variant="outline" onClick={() => setPage("contact")}>Contact Us</Button>
            </div>
          </AnimSection>
          <AnimSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["2007", "Founded in Bhiwadi"], ["500+", "Products Stocked"], ["17+", "Years of Trust"], ["3", "Branch Offices"]].map(([n, l]) => (
                <div key={l} style={{ background: C.gray50, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: C.blue, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{n}</div>
                  <div style={{ color: C.gray600, fontSize: 13, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ background: C.gray50, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Our Business" title="Three Pillars of Operation" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: "🏭", title: "Manufacturing", color: C.blue, desc: "Our Bhiwadi facility houses a dedicated LT Panel manufacturing unit with modern CNC equipment, welding stations, and testing rigs. Each panel is built, tested, and certified before dispatch." },
              { icon: "🛒", title: "Trading & Supply", color: "#0277BD", desc: "Authorized dealer for Bosch, Groz, Dewalt, Stanley, Toku Pneumatics, Ozar, Pidilite, and KITO. All products are sourced directly from principals with full warranty support." },
              { icon: "⚡", title: "Electrical Contracting", color: C.orange, desc: "Government licensed electrical contractor (Class A). Executing HT/LT installation projects for industrial plants, commercial complexes, and public infrastructure across NCR region." },
            ].map(card => (
              <AnimSection key={card.title}>
                <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 32, height: "100%", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", borderTop: `4px solid ${card.color}` }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>{card.title}</h3>
                  <p style={{ color: C.gray600, fontSize: 14, lineHeight: 1.8 }}>{card.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="two-col">
          {[
            { label: "Our Mission", icon: "🎯", text: "To be the most reliable industrial supply and contracting partner in Rajasthan & Haryana — delivering genuine products, precision manufacturing, and expert project execution with zero compromise on quality or safety." },
            { label: "Our Vision", icon: "🔭", text: "To expand India's industrial supply network by becoming the preferred one-stop source for MRO, electrical contracting, and LT panel solutions across North India's fastest-growing industrial corridor." },
          ].map(item => (
            <AnimSection key={item.label}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ color: C.sky, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{item.label}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.8 }}>{item.text}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section style={{ background: C.white, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Infrastructure" title="Our Bhiwadi Manufacturing Plant" sub="A fully equipped facility designed for precision LT panel fabrication and quality testing." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              ["🏗️", "5,000 sq.ft", "Manufacturing Floor"],
              ["⚙️", "CNC Bending", "Precision Sheet Metal"],
              ["🔌", "Panel Testing", "Full Load Testing Bay"],
              ["🚛", "Logistics Hub", "Pan-North India Delivery"],
              ["🔬", "QC Lab", "ISO-Aligned Testing"],
              ["👷", "40+ Staff", "Skilled Workforce"],
            ].map(([icon, val, lab]) => (
              <AnimSection key={lab}>
                <div style={{ background: C.gray50, border: `1px solid ${C.gray100}`, borderRadius: 10, padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: C.blue, fontFamily: "'Barlow Condensed', sans-serif" }}>{val}</div>
                  <div style={{ fontSize: 13, color: C.gray600, marginTop: 4 }}>{lab}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({ setPage }) {
  const [activeCat, setActiveCat] = useState("All");
  const cats = ["All", ...PRODUCTS.map(p => p.cat)];

  const allItems = PRODUCTS.flatMap(p => p.items.map(i => ({ ...i, cat: p.cat })));
  const filtered = activeCat === "All" ? allItems : allItems.filter(i => i.cat === activeCat);

  return (
    <div style={{ paddingTop: 68 }}>
      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, #0D3B7A)`, padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ width: "100%", margin: "0 auto", position: "relative", textAlign: "center" }}>
          <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Product Catalog</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif" }}>Industrial Products & Equipment</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>500+ SKUs across tools, safety, electrical, and pneumatics.</p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section style={{ background: C.white, borderBottom: `1px solid ${C.gray100}`, padding: "20px 24px", position: "sticky", top: 68, zIndex: 100, overflowX: "auto" }}>
        <div style={{ width: "100%", margin: "0 auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ padding: "8px 18px", borderRadius: 20, border: `1.5px solid ${activeCat === c ? C.blue : C.gray100}`, background: activeCat === c ? C.blue : C.white, color: activeCat === c ? C.white : C.gray600, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s" }}>{c}</button>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section style={{ background: C.offWhite, padding: "60px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map((item, i) => (
              <AnimSection key={`${item.name}-${i}`}>
                <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}>
                  <div style={{ height: 180, overflow: "hidden", position: "relative", background: C.gray50 }}>
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                    <div style={{ position: "absolute", top: 10, left: 10, background: C.blue, color: C.white, fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 10px", borderRadius: 20 }}>{item.brand}</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, color: C.gray400, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{item.cat}</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>{item.name}</div>
                    <p style={{ color: C.gray600, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{item.desc}</p>
                    <Button variant="primary" onClick={() => setPage("contact")} style={{ width: "100%", fontSize: 13, padding: "10px 0" }}>Enquire Now</Button>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
          <AnimSection>
            <div style={{ textAlign: "center", marginTop: 48, padding: "32px", background: C.skyLight, borderRadius: 12, border: `1px dashed ${C.sky}` }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>📋</div>
              <div style={{ fontWeight: 700, color: C.navy, fontSize: 18, marginBottom: 8 }}>Can't find what you need?</div>
              <p style={{ color: C.gray600, fontSize: 14, marginBottom: 20 }}>Our catalog has 500+ products. Contact us for custom sourcing or bulk enquiries.</p>
              <Button variant="primary" onClick={() => setPage("contact")}>Contact Our Team</Button>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, padding: "80px 24px 60px" }}>
        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>What We Offer</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif" }}>Our Services</h1>
        </div>
      </section>
      <section style={{ background: C.offWhite, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          {SERVICES.map((s, i) => (
            <AnimSection key={s.title}>
              <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 16, padding: "40px 40px", marginBottom: 28, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "start", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }} className="service-row">
                <div style={{ width: 72, height: 72, background: i % 2 === 0 ? C.blue : C.navyMid, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800, color: C.navy, marginBottom: 10, fontFamily: "'Barlow Condensed', sans-serif" }}>{s.title}</h3>
                  <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {s.features.map(f => <span key={f} style={{ background: C.skyLight, color: C.blue, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: `1px solid ${C.sky}` }}>{f}</span>)}
                  </div>
                </div>
                <Button variant="primary" onClick={() => setPage("quote")} style={{ flexShrink: 0, fontSize: 13 }}>Get Quote</Button>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: C.navy, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Our Edge" title={<span style={{ color: C.white }}>Why Choose Kumar Electricals?</span>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              ["⭐", "17+ Years", "Deep domain expertise in industrial supply & contracting"],
              ["🏛️", "Govt Licensed", "Class A Licensed Electrical Contractor — certified and compliant"],
              ["✅", "Genuine Products", "100% authorized with manufacturer warranty and traceability"],
              ["⚡", "Fast Turnaround", "Same-day quotes, quick dispatch from warehouse stock"],
              ["🗺️", "Local Presence", "3 offices across Bhiwadi, Rewari & Neemrana for fast support"],
              ["🤝", "Long-term AMC", "Annual maintenance contracts for peace of mind"],
            ].map(([icon, title, desc]) => (
              <AnimSection key={title}>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontWeight: 700, color: C.sky, fontSize: 15, marginBottom: 6 }}>{title}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7 }}>{desc}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── BRANDS PAGE ──────────────────────────────────────────────────────────────
function BrandsPage() {
  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, padding: "80px 24px 60px" }}>
        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Authorized Partners</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif" }}>Brands We Deal In</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginTop: 12 }}>Direct dealerships with the world's leading industrial tool & equipment manufacturers.</p>
        </div>
      </section>
      <section style={{ background: C.white, padding: "80px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {BRANDS.map(b => (
              <AnimSection key={b.name}>
                <div style={{ border: `1px solid ${C.gray100}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}>
                  <div style={{ background: b.color, padding: "32px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ color: C.white, fontWeight: 900, fontSize: 32, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2 }}>{b.name}</div>
                  </div>
                  <div style={{ padding: "20px 24px", background: C.white }}>
                    <div style={{ fontWeight: 700, color: C.navy, fontSize: 16, marginBottom: 6 }}>{b.tagline}</div>
                    <div style={{ display: "inline-block", background: C.skyLight, color: C.blue, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20, border: `1px solid ${C.sky}` }}>Authorized Dealer</div>
                    <p style={{ color: C.gray600, fontSize: 13, lineHeight: 1.7, marginTop: 12 }}>Genuine products with full manufacturer warranty and technical support. Contact us for pricing and availability.</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
      {/* Partnership CTA */}
      <section style={{ background: C.gray50, padding: "60px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, color: C.navy, marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>Looking for a Specific Brand?</h2>
          <p style={{ color: C.gray600, fontSize: 16, marginBottom: 28 }}>We are constantly expanding our authorized dealership network. If you need a product from a brand not listed, we'll source it for you.</p>
          <Button variant="primary" onClick={() => window.open("mailto:info@kumarelectricals.in")}>Enquire About a Brand</Button>
        </div>
      </section>
    </div>
  );
}

// ─── LOCATIONS PAGE ───────────────────────────────────────────────────────────
function LocationsPage() {
  const [activeLocation, setActiveLocation] = useState(0);
  const LOCS = [
    { name: "Bhiwadi (HQ + Manufacturing)", short: "Bhiwadi", addr: "Plot 42, Industrial Area Phase-2, Bhiwadi, Rajasthan 301019", phone: "+91 98765 43210", email: "bhiwadi@kumarelectricals.in", hours: "Mon–Sat: 9:00 AM – 7:00 PM", desc: "Our headquarters and manufacturing facility. Houses the LT panel production line, main warehouse, and corporate offices.", lat: 28.2183, lng: 76.8622, mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=76.8422%2C28.1983%2C76.8822%2C28.2383&layer=mapnik&marker=28.2183%2C76.8622" },
    { name: "Rewari Branch", short: "Rewari", addr: "Near HSIIDC Industrial Estate, Rewari, Haryana 123401", phone: "+91 94140 XXXXX", email: "rewari@kumarelectricals.in", hours: "Mon–Sat: 9:00 AM – 6:30 PM", desc: "Serving the Rewari-Dharuhera industrial belt with tools, safety equipment, and electrical items.", lat: 28.1941, lng: 76.6201, mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=76.6001%2C28.1741%2C76.6401%2C28.2141&layer=mapnik&marker=28.1941%2C76.6201" },
    { name: "Neemrana Branch", short: "Neemrana", addr: "Neemrana Industrial Zone, NH-48, Rajasthan 301705", phone: "+91 98290 XXXXX", email: "neemrana@kumarelectricals.in", hours: "Mon–Sat: 9:30 AM – 6:00 PM", desc: "Strategically located to serve the Japanese Zone and Japanese companies in Neemrana's growing industrial corridor.", lat: 27.9845, lng: 76.3876, mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=76.3676%2C27.9645%2C76.4076%2C28.0045&layer=mapnik&marker=27.9845%2C76.3876" },
  ];
  const loc = LOCS[activeLocation];

  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, padding: "80px 24px 60px" }}>
        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Find Us</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif" }}>Our Locations</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginTop: 12 }}>Three strategic locations covering the NCR industrial corridor.</p>
        </div>
      </section>

      <section style={{ background: C.white, padding: "60px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          {/* Location tabs */}
          <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
            {LOCS.map((l, i) => (
              <button key={l.short} onClick={() => setActiveLocation(i)} style={{ padding: "10px 24px", borderRadius: 8, border: `2px solid ${activeLocation === i ? C.blue : C.gray100}`, background: activeLocation === i ? C.blue : C.white, color: activeLocation === i ? C.white : C.gray600, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
                📍 {l.short}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 32, alignItems: "start" }} className="two-col">
            {/* Info */}
            <AnimSection>
              <div style={{ background: C.gray50, borderRadius: 16, padding: 32, border: `1px solid ${C.gray100}` }}>
                <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{activeLocation === 0 ? "Headquarters & Manufacturing" : "Branch Office"}</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" }}>{loc.name}</h2>
                <p style={{ color: C.gray600, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{loc.desc}</p>
                {[["📍", "Address", loc.addr], ["📞", "Phone", loc.phone], ["✉️", "Email", loc.email], ["🕒", "Hours", loc.hours]].map(([icon, label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: C.gray400, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
                      <div style={{ color: C.gray800, fontSize: 14, fontWeight: 500 }}>{val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                  <a href={`tel:${loc.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.blue, color: C.white, padding: "10px 18px", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>📞 Call</a>
                  <a href={`https://wa.me/919876543210`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25D366", color: C.white, padding: "10px 18px", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>💬 WhatsApp</a>
                  <a href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.gray50, color: C.navy, padding: "10px 18px", borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: "none", border: `1px solid ${C.gray100}` }}>🗺 Get Directions</a>
                </div>
              </div>
            </AnimSection>

            {/* Map */}
            <AnimSection>
              <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.gray100}`, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", height: 420 }}>
                <iframe
                  title={`Map - ${loc.name}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0, display: "block" }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${loc.lng - 0.02}%2C${loc.lat - 0.02}%2C${loc.lng + 0.02}%2C${loc.lat + 0.02}&layer=mapnik&marker=${loc.lat}%2C${loc.lng}`}
                  allowFullScreen
                />
              </div>
              <div style={{ marginTop: 12, textAlign: "center" }}>
                <a href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`} target="_blank" rel="noreferrer" style={{ color: C.blue, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>↗ Open in Google Maps</a>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* All locations mini-cards */}
      <section style={{ background: C.gray50, padding: "60px 24px" }}>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <SectionHeader tag="Coverage" title="Serving the Industrial Corridor" sub="Strategically positioned across NH-48 to serve Bhiwadi, Dharuhera, Rewari, Neemrana and surrounding areas." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {LOCS.map((l, i) => (
              <AnimSection key={l.short}>
                <div onClick={() => setActiveLocation(i)} style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 12, padding: 24, cursor: "pointer", transition: "all 0.2s", borderLeft: `4px solid ${i === 0 ? C.orange : C.blue}` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontWeight: 700, color: C.navy, fontSize: 16, marginBottom: 4 }}>📍 {l.short}</div>
                  {i === 0 && <span style={{ background: C.orange, color: C.white, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Headquarters</span>}
                  <div style={{ color: C.gray600, fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{l.addr}</div>
                  <div style={{ color: C.blue, fontWeight: 600, fontSize: 13, marginTop: 6 }}>{l.phone}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage({ setPage }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.phone) return alert("Please fill in your name and phone number.");
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, padding: "80px 24px 60px" }}>
        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.sky, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Reach Out</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif" }}>Contact Us</h1>
        </div>
      </section>

      <section style={{ background: C.offWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }} className="two-col">
          {/* Left */}
          <div>
            <AnimSection>
              <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: C.navy, marginBottom: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>Let's Talk</h2>
              <p style={{ color: C.gray600, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>Whether you need a product quote, project consultation, or want to become a channel partner — our team is ready to help.</p>
            </AnimSection>
            {[["📞", "Call Us", "+91 98765 43210\n+91 94140 XXXXX"], ["✉️", "Email", "info@kumarelectricals.in"], ["📍", "Head Office", "Plot 42, Industrial Area Phase-2\nBhiwadi, Rajasthan 301019"], ["🕒", "Business Hours", "Monday – Saturday\n9:00 AM – 7:00 PM"]].map(([icon, label, val]) => (
              <AnimSection key={label}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
                  <div style={{ width: 48, height: 48, background: C.skyLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.navy, fontSize: 14, marginBottom: 2 }}>{label}</div>
                    <div style={{ color: C.gray600, fontSize: 14, whiteSpace: "pre-line", lineHeight: 1.7 }}>{val}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
            <AnimSection>
              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: C.white, padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>💬 WhatsApp Us</a>
                <a href="tel:+919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.blue, color: C.white, padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>📞 Call Now</a>
              </div>
            </AnimSection>
          </div>

          {/* Form */}
          <AnimSection>
            <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 16, padding: 36, boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <div style={{ fontWeight: 800, color: C.navy, fontSize: 22, marginBottom: 8 }}>Message Received!</div>
                  <p style={{ color: C.gray600, fontSize: 15 }}>Our team will reach out within 2 business hours.</p>
                  <Button variant="primary" onClick={() => setSent(false)} style={{ marginTop: 20 }}>Send Another</Button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontWeight: 800, color: C.navy, fontSize: 20, marginBottom: 24, fontFamily: "'Barlow Condensed', sans-serif" }}>Send Us a Message</h3>
                  {[["Name *", "name", "text", "Your full name"], ["Phone Number *", "phone", "tel", "+91 XXXXX XXXXX"], ["Email", "email", "email", "your@email.com"]].map(([label, key, type, ph]) => (
                    <div key={key} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.gray600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                      <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                        style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.gray100}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.navy, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.gray100} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.gray600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>Your Requirement</label>
                    <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder="Describe your requirement..." rows={4}
                      style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.gray100}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.navy, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                      onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.gray100} />
                  </div>
                  <Button variant="primary" onClick={submit} style={{ width: "100%", fontSize: 15, padding: "14px" }}>Send Message →</Button>
                </>
              )}
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}

// ─── QUOTE PAGE ───────────────────────────────────────────────────────────────
function QuotePage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", product: "", qty: "", notes: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!form.name || !form.phone || !form.product) return alert("Please fill in your name, phone, and product selection.");
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <section style={{ background: `linear-gradient(135deg, ${C.navy}, #0D3B7A)`, padding: "80px 24px 60px" }}>
        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Fast Quotes</div>
          <h1 style={{ color: C.white, fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif" }}>Request a Quote</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 12 }}>Submit your requirement and receive a detailed quote within 2 hours during business hours.</p>
        </div>
      </section>

      <section style={{ background: C.offWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          {/* Promise bar */}
          <AnimSection>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 48 }}>
              {[["⚡", "2-Hour Quote"], ["✅", "Best Price Guaranteed"], ["📦", "Bulk Discounts Available"], ["🔒", "Secure Inquiry"]].map(([icon, txt]) => (
                <div key={txt} style={{ display: "flex", alignItems: "center", gap: 8, background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 24, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: C.navy }}>
                  <span>{icon}</span><span>{txt}</span>
                </div>
              ))}
            </div>
          </AnimSection>

          {sent ? (
            <AnimSection>
              <div style={{ background: C.white, borderRadius: 16, padding: "60px 40px", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <div style={{ fontWeight: 900, color: C.navy, fontSize: 28, marginBottom: 8, fontFamily: "'Barlow Condensed', sans-serif" }}>Quote Request Submitted!</div>
                <p style={{ color: C.gray600, fontSize: 16, marginBottom: 8 }}>Our team will contact you at <strong>{form.phone}</strong> within 2 business hours.</p>
                <p style={{ color: C.gray400, fontSize: 13, marginBottom: 28 }}>For urgent requirements, WhatsApp us directly.</p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: C.white, padding: "12px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>💬 WhatsApp for Urgent</a>
                  <Button variant="outline" onClick={() => setSent(false)}>Submit Another</Button>
                </div>
              </div>
            </AnimSection>
          ) : (
            <AnimSection>
              <div style={{ background: C.white, border: `1px solid ${C.gray100}`, borderRadius: 16, padding: "40px 36px", boxShadow: "0 8px 32px rgba(0,0,0,0.07)" }}>
                <h3 style={{ fontWeight: 800, color: C.navy, fontSize: 22, marginBottom: 28, fontFamily: "'Barlow Condensed', sans-serif" }}>Fill in Your Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="form-grid">
                  {[["Full Name *", "name", "text", "Your name"], ["Phone Number *", "phone", "tel", "+91 XXXXX XXXXX"], ["Email Address", "email", "email", "your@email.com"], ["Company / Organisation", "company", "text", "Optional"]].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.gray600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
                      <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={ph}
                        style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.gray100}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.navy, outline: "none", boxSizing: "border-box" }}
                        onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.gray100} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.gray600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>Product / Service Required *</label>
                  <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.gray100}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: form.product ? C.navy : C.gray400, outline: "none", background: C.white, boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.gray100}>
                    <option value="">Select product or service category...</option>
                    <optgroup label="Product Categories">
                      {PRODUCTS.map(p => <option key={p.cat} value={p.cat}>{p.cat}</option>)}
                    </optgroup>
                    <optgroup label="Services">
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </optgroup>
                    <option value="Other / Custom Requirement">Other / Custom Requirement</option>
                  </select>
                </div>
                <div style={{ marginTop: 18 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.gray600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>Quantity / Requirement</label>
                  <input type="text" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} placeholder="e.g. 10 units, 2 panels, bulk supply..."
                    style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.gray100}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.navy, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.gray100} />
                </div>
                <div style={{ marginTop: 18, marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.gray600, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>Additional Notes / Specifications</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any specific brand, model, specifications, or project details..." rows={4}
                    style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.gray100}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.navy, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = C.blue} onBlur={e => e.target.style.borderColor = C.gray100} />
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Button variant="orange" onClick={submit} style={{ fontSize: 15, padding: "14px 36px", flex: 1, minWidth: 200 }}>Submit Quote Request →</Button>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: C.white, padding: "14px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>💬 WhatsApp Instead</a>
                </div>
              </div>
            </AnimSection>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = { home: <HomePage setPage={navigate} />, about: <AboutPage setPage={navigate} />, products: <ProductsPage setPage={navigate} />, services: <ServicesPage setPage={navigate} />, brands: <BrandsPage />, locations: <LocationsPage />, contact: <ContactPage setPage={navigate} />, quote: <QuotePage /> };

  return (
    <div style={{ fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: "100vh", background: C.offWhite }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .service-row { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .service-row > *:last-child { display: none; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f4f8; }
        ::-webkit-scrollbar-thumb { background: #1565C0; border-radius: 3px; }
        a:hover { opacity: 0.9; }
      `}</style>

      <Navbar page={page} setPage={navigate} />
      <main>{pages[page] || pages.home}</main>
      <Footer setPage={navigate} />

      {/* WhatsApp FAB */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: 28, right: 28, width: 56, height: 56, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 4px 20px rgba(37,211,102,0.5)", zIndex: 999, textDecoration: "none", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        💬
      </a>
    </div>
  );
}

