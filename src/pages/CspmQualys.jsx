import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CspmQualys() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const jalons = document.querySelectorAll('.cq-jalon');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = parseInt(e.target.dataset.delay) || 0;
          setTimeout(() => e.target.classList.add('visible'), d);
        }
      });
    }, { threshold: 0.15 });
    jalons.forEach(j => obs.observe(j));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="cq-page">
      <style>{`
        .cq-page { font-family:'Syne',sans-serif; background:#0b0d14; color:#e2e8f0; min-height:100vh; overflow-x:hidden; }
        .cq-page *, .cq-page *::before, .cq-page *::after { box-sizing:border-box; margin:0; padding:0; }

        .cq-grid-bg { position:fixed; inset:0; background-image:linear-gradient(rgba(66,133,244,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(66,133,244,0.02) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; z-index:0; }
        .cq-glow    { position:fixed; width:700px; height:700px; border-radius:50%; background:radial-gradient(circle,rgba(255,153,0,0.04),transparent 70%); top:-200px; right:-200px; pointer-events:none; z-index:0; }

        /* NAV */
        .cq-nav { padding:1.5rem 0; border-bottom:1px solid rgba(255,255,255,0.07); position:sticky; top:0; background:rgba(11,13,20,0.95); backdrop-filter:blur(12px); z-index:100; }
        .cq-nav-inner { max-width:1200px; margin:0 auto; padding:0 2rem; display:flex; align-items:center; justify-content:space-between; }
        .cq-nav-logo { font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#00e5ff; }
        .cq-nav-back { font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#64748b; background:none; border:none; cursor:pointer; transition:color 0.2s; }
        .cq-nav-back:hover { color:#00e5ff; }

        .cq-container { max-width:1200px; margin:0 auto; padding:0 2rem; position:relative; z-index:1; }

        /* TAGS */
        .tag { display:inline-flex; align-items:center; gap:0.4rem; padding:0.3rem 0.8rem; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
        .tag-cyan   { background:rgba(0,229,255,0.1);   color:#00e5ff; border:1px solid rgba(0,229,255,0.2); }
        .tag-green  { background:rgba(0,255,136,0.1);   color:#00ff88; border:1px solid rgba(0,255,136,0.2); }
        .tag-purple { background:rgba(168,85,247,0.15); color:#a855f7; border:1px solid rgba(168,85,247,0.3); }
        .tag-aws    { background:rgba(255,153,0,0.15);  color:#ff9900; border:1px solid rgba(255,153,0,0.3); }
        .tag-gcp    { background:rgba(66,133,244,0.15); color:#4285f4; border:1px solid rgba(66,133,244,0.3); }
        .tag-qualys { background:rgba(232,5,45,0.15);   color:#e8052d; border:1px solid rgba(232,5,45,0.3); }

        /* HERO */
        .cq-hero { padding:5rem 0 3rem; }
        .cq-hero-eyebrow { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; animation:cqFadeUp 0.6s ease both; }
        .cq-h1 { font-family:'Syne',sans-serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; animation:cqFadeUp 0.6s ease 0.1s both; }
        .cq-h1 .aws { color:#ff9900; }
        .cq-h1 .gcp { color:#4285f4; }
        .cq-subtitle { margin-top:1rem; font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#64748b; max-width:680px; line-height:1.7; animation:cqFadeUp 0.6s ease 0.2s both; }
        .cq-hero-meta { display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:2rem; animation:cqFadeUp 0.6s ease 0.3s both; }

        .cq-hr { border:none; border-top:1px solid rgba(255,255,255,0.07); margin:1rem 0; }
        .cq-section { padding:3rem 0; }
        .cq-section-label { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#00e5ff; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.75rem; }
        .cq-section-title { font-size:1.6rem; font-weight:700; margin-bottom:2.5rem; letter-spacing:-0.01em; }

        /* ── ARCH SCHEMA — structure identique SIEM ── */
        .arch-schema { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:2.5rem 2rem; position:relative; overflow:hidden; }
        .arch-schema::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 30% 50%,rgba(255,153,0,0.04),transparent 50%),radial-gradient(ellipse at 70% 50%,rgba(66,133,244,0.04),transparent 50%); pointer-events:none; }

        /* Desktop — grid 1fr auto 1fr auto 1fr comme SIEM */
        .arch-cols { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:1rem; align-items:center; }
        .arch-col { display:flex; flex-direction:column; gap:0.75rem; }
        .arch-col-title { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.12em; text-transform:uppercase; text-align:center; margin-bottom:0.25rem; }

        .arch-node { background:#141825; border-radius:10px; padding:0.85rem 1rem; border:1px solid rgba(255,255,255,0.07); text-align:center; transition:border-color 0.3s; }
        .arch-node:hover { border-color:rgba(0,229,255,0.3); }
        .n-icon  { font-size:1.4rem; display:block; margin-bottom:0.3rem; }
        .n-label { font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .n-sub   { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#64748b; display:block; line-height:1.4; }

        .n-aws    { border-color:rgba(255,153,0,0.4); }  .n-aws .n-label    { color:#ff9900; }
        .n-gcp    { border-color:rgba(66,133,244,0.4); } .n-gcp .n-label    { color:#4285f4; }
        .n-qualys { border-color:rgba(232,5,45,0.4); animation:pulseQualys 2.5s infinite; } .n-qualys .n-label { color:#e8052d; }
        .n-finding { border-color:rgba(255,71,87,0.4); } .n-finding .n-label { color:#ff4757; }
        .n-report  { border-color:rgba(0,255,136,0.4); } .n-report .n-label  { color:#00ff88; }
        @keyframes pulseQualys { 0%{box-shadow:0 0 0 0 rgba(232,5,45,0.4)} 70%{box-shadow:0 0 0 10px rgba(232,5,45,0)} 100%{box-shadow:0 0 0 0 rgba(232,5,45,0)} }

        /* Flèches desktop — style SIEM */
        .arch-arrow { display:flex; flex-direction:column; align-items:center; gap:0.3rem; padding:0 0.75rem; }
        .arrow-line { width:60px; height:2px; position:relative; }
        .arrow-line::after { content:'▶'; position:absolute; right:-8px; top:50%; transform:translateY(-50%); font-size:0.6rem; }
        .arrow-label { font-family:'JetBrains Mono',monospace; font-size:0.6rem; text-align:center; color:#64748b; white-space:nowrap; }
        .arr-aws .arrow-line { background:linear-gradient(to right,#ff9900,#e8052d); }
        .arr-aws .arrow-line::after { color:#e8052d; }
        .arr-gcp .arrow-line { background:linear-gradient(to right,#4285f4,#e8052d); }
        .arr-gcp .arrow-line::after { color:#e8052d; }

        /* Mobile — flèches masquées, mob-sep dans le flow */
        @media(max-width:700px) {
          .arch-cols { display:flex; flex-direction:column; gap:0; }
          .arch-col-title { display:none; }
          .arch-arrow { display:none; }

          .mob-sep { display:flex; flex-direction:row; align-items:center; gap:0.6rem; padding:0.4rem 0; }
          .mob-sep-line { width:2px; height:40px; flex-shrink:0; position:relative; }
          .mob-sep-line::after { content:'▼'; position:absolute; bottom:-8px; left:50%; transform:translateX(-50%); font-size:0.6rem; }
          .mob-sep-label { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748b; white-space:nowrap; }
          .mob-sep-aws .mob-sep-line { background:#ff9900; } .mob-sep-aws .mob-sep-line::after { color:#ff9900; }
          .mob-sep-gcp .mob-sep-line { background:#4285f4; } .mob-sep-gcp .mob-sep-line::after { color:#4285f4; }
          .mob-sep-wrap { display:flex; justify-content:flex-start; padding-left:2rem; width:100%; }
        }
        @media(min-width:701px) { .mob-sep-wrap { display:none; } }

        /* Colonne centrale — outputs en row */
        .arch-col-center { display:flex; flex-direction:column; align-items:center; gap:0.75rem; }
        .arch-row-outputs { display:flex; gap:0.5rem; width:100%; }
        .arch-row-outputs .arch-node { flex:1; }

        /* ── JALONS ── */
        .cq-jalons { display:flex; flex-direction:column; }
        .cq-jalon { display:grid; grid-template-columns:60px 1fr; gap:0 1.5rem; opacity:0; transform:translateX(-20px); transition:opacity 0.5s ease,transform 0.5s ease; }
        .cq-jalon.visible { opacity:1; transform:translateX(0); }
        .cq-jalon-left { display:flex; flex-direction:column; align-items:center; }
        .cq-jalon-num { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:0.95rem; font-weight:700; flex-shrink:0; position:relative; z-index:1; }
        .cq-jalon-num.anim::after { content:''; position:absolute; inset:-4px; border-radius:14px; border:1px dashed currentColor; opacity:0.3; animation:cqSpin 8s linear infinite; }
        .cq-jalon-line { width:2px; flex:1; min-height:40px; margin:4px 0; }
        .cq-jalon-body { padding-bottom:2.5rem; }
        .cq-jalon-phase { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.1em; margin-bottom:0.3rem; }
        .cq-jalon-title { font-size:1.15rem; font-weight:700; margin-bottom:0.5rem; }
        .cq-jalon-desc  { font-family:'JetBrains Mono',monospace; font-size:0.82rem; color:#94a3b8; line-height:1.7; margin-bottom:1rem; }
        .cq-tools { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .cq-tc { font-family:'JetBrains Mono',monospace; font-size:0.72rem; padding:0.25rem 0.65rem; border-radius:4px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07); color:#64748b; }
        .cj1 .cq-jalon-num { background:rgba(0,229,255,0.12);  border:1px solid rgba(0,229,255,0.4);  color:#00e5ff; } .cj1 .cq-jalon-line { background:linear-gradient(to bottom,rgba(0,229,255,0.5),rgba(255,153,0,0.5)); } .cj1 .cq-jalon-title { color:#00e5ff; }
        .cj2 .cq-jalon-num { background:rgba(255,153,0,0.12);  border:1px solid rgba(255,153,0,0.4);  color:#ff9900; } .cj2 .cq-jalon-line { background:linear-gradient(to bottom,rgba(255,153,0,0.5),rgba(66,133,244,0.5)); } .cj2 .cq-jalon-title { color:#ff9900; }
        .cj3 .cq-jalon-num { background:rgba(66,133,244,0.12); border:1px solid rgba(66,133,244,0.4); color:#4285f4; } .cj3 .cq-jalon-line { background:linear-gradient(to bottom,rgba(66,133,244,0.5),rgba(255,211,42,0.5)); } .cj3 .cq-jalon-title { color:#4285f4; }
        .cj4 .cq-jalon-num { background:rgba(255,211,42,0.12); border:1px solid rgba(255,211,42,0.4); color:#ffd32a; } .cj4 .cq-jalon-line { background:linear-gradient(to bottom,rgba(255,211,42,0.5),rgba(255,71,87,0.5)); } .cj4 .cq-jalon-title { color:#ffd32a; }
        .cj5 .cq-jalon-num { background:rgba(255,71,87,0.12);  border:1px solid rgba(255,71,87,0.4);  color:#ff4757; } .cj5 .cq-jalon-line { background:linear-gradient(to bottom,rgba(255,71,87,0.5),rgba(0,255,136,0.5)); } .cj5 .cq-jalon-title { color:#ff4757; }
        .cj6 .cq-jalon-num { background:rgba(0,255,136,0.1);   border:1px solid rgba(0,255,136,0.4);  color:#00ff88; } .cj6 .cq-jalon-title { color:#00ff88; }

        /* ── CIS TABLE ── */
        .cis-table { width:100%; border-collapse:collapse; font-family:'JetBrains Mono',monospace; font-size:0.75rem; }
        .cis-table th { padding:0.75rem 1rem; text-align:left; color:#64748b; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.07); font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase; }
        .cis-table td { padding:0.75rem 1rem; border-bottom:1px solid rgba(255,255,255,0.05); vertical-align:middle; }
        .cis-table tr:hover td { background:rgba(255,255,255,0.02); }
        .score-bar { display:flex; align-items:center; gap:0.75rem; }
        .score-track { flex:1; height:6px; background:rgba(255,255,255,0.07); border-radius:3px; max-width:120px; }
        .score-fill { height:100%; border-radius:3px; }
        .score-high   { background:linear-gradient(to right,#00ff88,#00e5ff); }
        .score-medium { background:linear-gradient(to right,#ffd32a,#ff6b35); }
        .score-low    { background:linear-gradient(to right,#ff4757,#a855f7); }
        .score-val { font-size:0.72rem; font-weight:700; white-space:nowrap; }
        .cloud-badge-aws { padding:0.1rem 0.4rem; border-radius:3px; font-size:0.65rem; background:rgba(255,153,0,0.15); color:#ff9900; border:1px solid rgba(255,153,0,0.3); }
        .cloud-badge-gcp { padding:0.1rem 0.4rem; border-radius:3px; font-size:0.65rem; background:rgba(66,133,244,0.15); color:#4285f4; border:1px solid rgba(66,133,244,0.3); }
        @media(max-width:700px) { .cis-table { font-size:0.65rem; } .cis-table th,.cis-table td { padding:0.5rem 0.6rem; } }

        /* ── FINDINGS ── */
        .findings-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1rem; margin-top:1.5rem; }
        .finding-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.25rem; transition:border-color 0.2s,transform 0.2s; }
        .finding-card:hover { border-color:rgba(232,5,45,0.3); transform:translateY(-2px); }
        .finding-card > div:first-child { display:flex; gap:0.5rem; align-items:center; margin-bottom:0.6rem; }
        .finding-cloud { font-family:'JetBrains Mono',monospace; font-size:0.62rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:3px; }
        .cloud-aws { background:rgba(255,153,0,0.15); color:#ff9900; border:1px solid rgba(255,153,0,0.3); }
        .cloud-gcp { background:rgba(66,133,244,0.15); color:#4285f4; border:1px solid rgba(66,133,244,0.3); }
        .finding-sev { font-family:'JetBrains Mono',monospace; font-size:0.62rem; font-weight:700; padding:0.15rem 0.5rem; border-radius:3px; }
        .sev-crit { background:rgba(255,71,87,0.2);   color:#ff4757; }
        .sev-high { background:rgba(255,107,53,0.2);  color:#ff6b35; }
        .finding-title { font-size:0.88rem; font-weight:700; margin-bottom:0.35rem; }
        .finding-desc  { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#64748b; line-height:1.6; }

        /* ── METRICS ── */
        .metrics-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1rem; margin-top:1.5rem; }
        .metric-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; text-align:center; transition:border-color 0.2s; }
        .metric-card:hover { border-color:rgba(66,133,244,0.3); }
        .metric-value { font-family:'JetBrains Mono',monospace; font-size:2rem; font-weight:700; color:#4285f4; display:block; margin-bottom:0.3rem; }
        .metric-label { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748b; }

        /* ── STACK ── */
        .stack-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:0.75rem; }
        .stack-item { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:1rem 1.2rem; display:flex; gap:0.85rem; align-items:center; transition:border-color 0.2s; }
        .stack-item:hover { border-color:rgba(66,133,244,0.25); }
        .stack-icon { font-size:1.4rem; flex-shrink:0; }
        .stack-name { font-size:0.85rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .stack-role { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; }

        @keyframes cqFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cqSpin   { to{transform:rotate(360deg)} }
      `}</style>

      <div className="cq-grid-bg" />
      <div className="cq-glow" />

      <nav className="cq-nav">
        <div className="cq-nav-inner">
          <span className="cq-nav-logo">KC // Project Reports</span>
          <button className="cq-nav-back" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>← Retour aux projets</button>
        </div>
      </nav>

      <main>
        <div className="cq-container">

          {/* HERO */}
          <section className="cq-hero">
            <div className="cq-hero-eyebrow">
              <span className="tag tag-qualys">🔎 CSPM</span>
              <span className="tag tag-aws">☁ AWS</span>
              <span className="tag tag-gcp">☁ GCP</span>
            </div>
            <h1 className="cq-h1">CSPM Qualys<br /><span className="aws">AWS</span> &amp; <span className="gcp">GCP</span></h1>
            <p className="cq-subtitle">
              Déploiement d'une solution CSPM Qualys on-premise surveillant des assets multi-cloud.<br />
              Détection de vulnérabilités cloud, conformité CIS Benchmarks et reporting centralisé sur AWS et GCP.
            </p>
            <div className="cq-hero-meta">
              <span className="tag tag-qualys">Qualys VMDR</span>
              <span className="tag tag-aws">AWS Security Hub</span>
              <span className="tag tag-gcp">GCP SCC</span>
              <span className="tag tag-cyan">CIS Benchmarks</span>
              <span className="tag tag-purple">Vulnerability Mgmt</span>
              <span className="tag tag-green">Cloud Compliance</span>
            </div>
          </section>

          <hr className="cq-hr" />

          {/* ARCHITECTURE */}
          <section className="cq-section">
            <div className="cq-section-label">// Architecture de surveillance multi-cloud</div>
            <div className="cq-section-title">Plateforme CSPM centralisée</div>
            <div className="arch-schema">
              <div className="arch-cols">

                {/* COL 1 — Cloud AWS */}
                <div className="arch-col">
                  <div className="arch-col-title">Cloud AWS</div>
                  <div className="arch-node n-aws">
                    <span className="n-icon">☁️</span>
                    <span className="n-label">AWS — EC2 / S3</span>
                    <span className="n-sub">IAM / RDS / Lambda</span>
                    <span className="n-sub">Security Hub activé</span>
                  </div>
                  <div className="arch-node n-aws" style={{borderColor:'rgba(255,153,0,0.2)'}}>
                    <span className="n-icon">🔑</span>
                    <span className="n-label">AWS IAM Role</span>
                    <span className="n-sub">ReadOnly cross-account</span>
                    <span className="n-sub">SecurityAudit Policy</span>
                  </div>
                </div>

                {/* FLÈCHE 1 — desktop */}
                <div className="arch-arrow arr-aws">
                  <div className="arrow-line" />
                  <div className="arrow-label">API AWS SDK</div>
                </div>

                {/* SÉPARATEUR MOBILE 1 */}
                <div className="mob-sep-wrap">
                  <div className="mob-sep mob-sep-aws">
                    <div className="mob-sep-line" />
                    <span className="mob-sep-label">API AWS SDK</span>
                  </div>
                </div>

                {/* COL 2 — Qualys On-Premise */}
                <div className="arch-col arch-col-center">
                  <div className="arch-col-title">Qualys On-Premise</div>
                  <div className="arch-node n-qualys">
                    <span className="n-icon">🔎</span>
                    <span className="n-label">Qualys VMDR</span>
                    <span className="n-sub">Virtual Scanner Appliance</span>
                    <span className="n-sub">Cloud Agent Connector</span>
                  </div>
                  <div className="arch-row-outputs">
                    <div className="arch-node n-finding">
                      <span className="n-label" style={{fontSize:'0.72rem'}}>Findings</span>
                      <span className="n-sub">CVEs / Misconfig</span>
                    </div>
                    <div className="arch-node n-report">
                      <span className="n-label" style={{fontSize:'0.72rem'}}>Reports</span>
                      <span className="n-sub">CIS / NIST</span>
                    </div>
                  </div>
                </div>

                {/* FLÈCHE 2 — desktop */}
                <div className="arch-arrow arr-gcp">
                  <div className="arrow-line" />
                  <div className="arrow-label">GCP APIs</div>
                </div>

                {/* SÉPARATEUR MOBILE 2 */}
                <div className="mob-sep-wrap">
                  <div className="mob-sep mob-sep-gcp">
                    <div className="mob-sep-line" />
                    <span className="mob-sep-label">GCP APIs</span>
                  </div>
                </div>

                {/* COL 3 — Cloud GCP */}
                <div className="arch-col">
                  <div className="arch-col-title">Cloud GCP</div>
                  <div className="arch-node n-gcp">
                    <span className="n-icon">☁️</span>
                    <span className="n-label">GCP — GCE / GCS</span>
                    <span className="n-sub">IAM / Cloud SQL / GKE</span>
                    <span className="n-sub">Security Command Center</span>
                  </div>
                  <div className="arch-node n-gcp" style={{borderColor:'rgba(66,133,244,0.2)'}}>
                    <span className="n-icon">🔐</span>
                    <span className="n-label">Service Account</span>
                    <span className="n-sub">SecurityReviewer role</span>
                    <span className="n-sub">Workload Identity</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <hr className="cq-hr" />

          {/* JALONS */}
          <section className="cq-section">
            <div className="cq-section-label">// Déroulement du projet</div>
            <div className="cq-section-title">Jalons — Étape par étape</div>
            <div className="cq-jalons">
              {[
                { cls:'cj1', delay:0,   phase:'PHASE 01 — DÉPLOIEMENT',  title:'Installation Qualys Virtual Scanner Appliance on-premise',          desc:"Déploiement du Qualys Virtual Scanner Appliance (VSA) sur hyperviseur on-premise (VMware ESXi). Configuration du réseau, enregistrement sur la plateforme Qualys Cloud Platform, activation des modules VMDR et Cloud Security. Définition des plages d'adresses et des option profiles de scan.", tools:['Qualys VSA','VMware ESXi','Qualys VMDR','Cloud Platform'] },
                { cls:'cj2', delay:150, phase:'PHASE 02 — AWS',          title:'Configuration connecteur AWS — IAM & Security Hub',                  desc:"Création d'un rôle IAM cross-account dédié Qualys avec politique SecurityAudit (ReadOnly). Configuration du connecteur AWS dans Qualys Cloud Security avec activation des régions cibles. Intégration AWS Security Hub pour centraliser les findings Qualys avec les alertes natives AWS (GuardDuty, Inspector, Macie).", tools:['AWS IAM Role','SecurityAudit Policy','AWS Security Hub','Qualys Connector'] },
                { cls:'cj3', delay:300, phase:'PHASE 03 — GCP',          title:'Configuration connecteur GCP — Service Account & SCC',               desc:"Création d'un Service Account GCP avec rôle SecurityReviewer sur les projets cibles. Configuration du Workload Identity Federation pour authentification sans clé statique. Intégration avec GCP Security Command Center pour enrichissement bidirectionnel des findings. Activation des APIs nécessaires (Asset Inventory, Cloud Audit Logs).", tools:['GCP Service Account','SecurityReviewer','Cloud SCC','Asset Inventory API'] },
                { cls:'cj4', delay:450, phase:'PHASE 04 — CONFORMITÉ',   title:'Déploiement des politiques CIS Benchmarks AWS & GCP',                desc:"Configuration des politiques de conformité CIS Benchmark AWS Foundations v2.0 et CIS Google Cloud Platform Foundation v2.0. Définition des contrôles obligatoires vs recommandés, création de la baseline de posture initiale. Paramétrage des exclusions légitimes pour réduire les faux positifs.", tools:['CIS AWS v2.0','CIS GCP v2.0','NIST 800-53','PCI-DSS'] },
                { cls:'cj5', delay:600, phase:'PHASE 05 — REMÉDIATION',  title:'Première évaluation & remédiation des findings critiques',           desc:"Première évaluation complète des deux environnements cloud. Priorisation des findings par criticité et exposition (CVSS + contexte cloud). Remédiation des findings critiques : correction des security groups ouverts (0.0.0.0/0), activation du MFA root AWS, désactivation des clés IAM inactives, correction des buckets S3 publics, activation des audit logs GCP.", tools:['CVSS Scoring','AWS Config','Terraform','gcloud CLI'] },
                { cls:'cj6', delay:750, phase:'PHASE 06 — REPORTING',    title:'Reporting KPIs & suivi continu de la posture',                       desc:"Mise en place du reporting automatique hebdomadaire et mensuel : score de posture cloud (0-100), évolution du nombre de findings par criticité, couverture CIS Benchmark par domaine, trending de remédiation. Alertes email sur nouveaux findings critiques. Dashboard exécutif et dashboard technique opérationnel.", tools:['Qualys Reports','CSV/PDF Export','Scheduled Scans','Email Alerts'] },
              ].map((j, i, arr) => (
                <div key={i} className={`cq-jalon ${j.cls}`} data-delay={j.delay}>
                  <div className="cq-jalon-left">
                    <div className="cq-jalon-num anim">{String(i+1).padStart(2,'0')}</div>
                    {i < arr.length - 1 && <div className="cq-jalon-line" />}
                  </div>
                  <div className="cq-jalon-body">
                    <div className="cq-jalon-phase">{j.phase}</div>
                    <div className="cq-jalon-title">{j.title}</div>
                    <div className="cq-jalon-desc">{j.desc}</div>
                    <div className="cq-tools">
                      {j.tools.map((t, k) => <span className="cq-tc" key={k}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="cq-hr" />

          {/* CIS TABLE */}
          <section className="cq-section">
            <div className="cq-section-label">// Conformité CIS Benchmark</div>
            <div className="cq-section-title">Scores de posture par domaine</div>
            <table className="cis-table">
              <thead>
                <tr>
                  <th>Domaine CIS</th>
                  <th>Cloud</th>
                  <th>Contrôles</th>
                  <th>Score posture</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { domain:'IAM — Identity & Access Management',  cloud:'AWS', badge:'aws', ctrl:'28/32', pct:87, scoreClass:'score-high',   valColor:'#00ff88', status:'✓ Conforme',     statusColor:'#00ff88' },
                  { domain:'Logging & Monitoring',                cloud:'AWS', badge:'aws', ctrl:'11/15', pct:73, scoreClass:'score-medium', valColor:'#ffd32a', status:'⚠ Partiel',      statusColor:'#ffd32a' },
                  { domain:'Networking',                          cloud:'AWS', badge:'aws', ctrl:'7/9',   pct:77, scoreClass:'score-high',   valColor:'#00ff88', status:'✓ Conforme',     statusColor:'#00ff88' },
                  { domain:'IAM — Service Accounts & Keys',       cloud:'GCP', badge:'gcp', ctrl:'16/22', pct:72, scoreClass:'score-medium', valColor:'#ffd32a', status:'⚠ Partiel',      statusColor:'#ffd32a' },
                  { domain:'Logging & Audit',                     cloud:'GCP', badge:'gcp', ctrl:'19/20', pct:95, scoreClass:'score-high',   valColor:'#00ff88', status:'✓ Conforme',     statusColor:'#00ff88' },
                  { domain:'Networking — Firewall Rules',         cloud:'GCP', badge:'gcp', ctrl:'4/8',   pct:50, scoreClass:'score-low',    valColor:'#ff4757', status:'✗ Non conforme', statusColor:'#ff4757' },
                ].map((r, i) => (
                  <tr key={i}>
                    <td>{r.domain}</td>
                    <td><span className={`cloud-badge-${r.badge}`}>{r.cloud}</span></td>
                    <td style={{color:'#64748b'}}>{r.ctrl}</td>
                    <td>
                      <div className="score-bar">
                        <div className="score-track"><div className={`score-fill ${r.scoreClass}`} style={{width:`${r.pct}%`}} /></div>
                        <span className="score-val" style={{color:r.valColor}}>{r.pct}%</span>
                      </div>
                    </td>
                    <td style={{color:r.statusColor, fontFamily:'monospace', fontSize:'0.72rem'}}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <hr className="cq-hr" />

          {/* FINDINGS */}
          <section className="cq-section">
            <div className="cq-section-label">// Findings détectés</div>
            <div className="cq-section-title">Vulnérabilités &amp; misconfigurations cloud</div>
            <div className="findings-grid">
              {[
                { cloud:'AWS', cloudCls:'cloud-aws', sev:'Critique', sevCls:'sev-crit', title:'Root account sans MFA activé',                desc:"Le compte root AWS n'a pas d'authentification multi-facteur configurée. Exposition maximale en cas de compromission des credentials root." },
                { cloud:'AWS', cloudCls:'cloud-aws', sev:'Critique', sevCls:'sev-crit', title:'Security Group — Port 22 ouvert (0.0.0.0/0)', desc:"3 Security Groups autorisent l'accès SSH depuis internet sans restriction IP. Surface d'attaque brute force exposée." },
                { cloud:'GCP', cloudCls:'cloud-gcp', sev:'Critique', sevCls:'sev-crit', title:'Règle firewall — RDP public (0.0.0.0/0)',      desc:"Règle de pare-feu GCP autorisant le port 3389 (RDP) depuis toutes les sources. Vecteur d'attaque critique pour les instances Windows." },
                { cloud:'AWS', cloudCls:'cloud-aws', sev:'Élevé',    sevCls:'sev-high', title:'Clés IAM actives non utilisées depuis 90 jours', desc:"7 paires de clés IAM actives sans utilisation depuis plus de 90 jours. Risque d'exploitation de credentials oubliés et non monitorés." },
                { cloud:'AWS', cloudCls:'cloud-aws', sev:'Élevé',    sevCls:'sev-high', title:'S3 Bucket avec accès public activé',            desc:"2 buckets S3 avec Block Public Access désactivé. Risque d'exposition involontaire de données si les ACL sont mal configurées." },
                { cloud:'GCP', cloudCls:'cloud-gcp', sev:'Élevé',    sevCls:'sev-high', title:'Service Account avec clé persistante',          desc:"4 Service Accounts utilisent des clés JSON persistantes au lieu de Workload Identity Federation. Risque de compromission longue durée." },
              ].map((f, i) => (
                <div className="finding-card" key={i}>
                  <div><span className={`finding-cloud ${f.cloudCls}`}>{f.cloud}</span><span className={`finding-sev ${f.sevCls}`}>{f.sev}</span></div>
                  <div className="finding-title">{f.title}</div>
                  <div className="finding-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="cq-hr" />

          {/* METRICS */}
          <section className="cq-section">
            <div className="cq-section-label">// Résultats &amp; métriques</div>
            <div className="cq-section-title">Impact opérationnel</div>
            <div className="metrics-grid">
              {[
                { value:'247',    label:'Assets surveillés' },
                { value:'83%',    label:'Score posture global' },
                { value:'-67%',   label:'Findings critiques après remédiation' },
                { value:'2',      label:'Clouds couverts' },
                { value:'CIS v2', label:'Benchmark appliqué' },
                { value:'24h',    label:'Cycle de scan' },
              ].map((m, i) => (
                <div className="metric-card" key={i}>
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="cq-hr" />

          {/* STACK */}
          <section className="cq-section">
            <div className="cq-section-label">// Stack technique</div>
            <div className="cq-section-title">Technologies utilisées</div>
            <div className="stack-grid">
              {[
                { icon:'🔎', name:'Qualys VMDR',     role:'CSPM — Vulnerability Management' },
                { icon:'☁️', name:'AWS Security Hub', role:'Centralisation findings AWS' },
                { icon:'🛡️', name:'GCP Security SCC', role:'Security Command Center' },
                { icon:'🔐', name:'AWS IAM / GCP IAM', role:'Accès ReadOnly sécurisé' },
                { icon:'📋', name:'CIS Benchmarks',   role:'AWS v2.0 & GCP v2.0' },
                { icon:'🏗️', name:'Terraform',        role:'Remédiation as Code' },
                { icon:'🖥️', name:'VMware ESXi',      role:'Hébergement VSA on-premise' },
                { icon:'📊', name:'Qualys Reports',   role:'KPIs & compliance dashboard' },
              ].map((s, i) => (
                <div className="stack-item" key={i}>
                  <span className="stack-icon">{s.icon}</span>
                  <div>
                    <span className="stack-name">{s.name}</span>
                    <span className="stack-role">{s.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
