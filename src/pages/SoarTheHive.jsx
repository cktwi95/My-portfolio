import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SoarTheHive() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const jalons = document.querySelectorAll('.soar-jalon');
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
    <div className="soar-page">
      <style>{`
        .soar-page { font-family:'Syne',sans-serif; background:#0b0d14; color:#e2e8f0; min-height:100vh; overflow-x:hidden; }
        .soar-page *, .soar-page *::before, .soar-page *::after { box-sizing:border-box; margin:0; padding:0; }

        .soar-grid-bg { position:fixed; inset:0; background-image:linear-gradient(rgba(99,102,241,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.02) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; z-index:0; }
        .soar-glow    { position:fixed; width:700px; height:700px; border-radius:50%; background:radial-gradient(circle,rgba(99,102,241,0.05),transparent 70%); top:-200px; right:-200px; pointer-events:none; z-index:0; }

        /* NAV */
        .soar-nav { padding:1.5rem 0; border-bottom:1px solid rgba(255,255,255,0.07); position:fixed; top:0; width:100%; background:rgba(11,13,20,0.95); backdrop-filter:blur(12px); z-index:100; }
        .soar-nav-inner { max-width:1200px; margin:0 auto; padding:0 2rem; display:flex; align-items:center; justify-content:space-between; }
        .soar-nav-logo { font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#00e5ff; }
        .soar-nav-back { font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#64748b; background:none; border:none; cursor:pointer; transition:color 0.2s; }
        .soar-nav-back:hover { color:#00e5ff; }

        .soar-container { max-width:1200px; margin:0 auto; padding:0 2rem; position:relative; z-index:1; }

        /* TAGS */
        .tag { display:inline-flex; align-items:center; gap:0.4rem; padding:0.3rem 0.8rem; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
        .tag-cyan   { background:rgba(0,229,255,0.1);   color:#00e5ff; border:1px solid rgba(0,229,255,0.2); }
        .tag-green  { background:rgba(0,255,136,0.1);   color:#00ff88; border:1px solid rgba(0,255,136,0.2); }
        .tag-purple { background:rgba(168,85,247,0.15); color:#a855f7; border:1px solid rgba(168,85,247,0.3); }
        .tag-hive   { background:rgba(249,115,22,0.15); color:#f97316; border:1px solid rgba(249,115,22,0.3); }
        .tag-misp   { background:rgba(225,29,72,0.15);  color:#e11d48; border:1px solid rgba(225,29,72,0.3); }
        .tag-octi   { background:rgba(99,102,241,0.15); color:#6366f1; border:1px solid rgba(99,102,241,0.3); }

        /* HERO */
        .soar-hero { padding:5rem 0 3rem; }
        .soar-hero-eyebrow { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; animation:soarFadeUp 0.6s ease both; }
        .soar-h1 { font-family:'Syne',sans-serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; animation:soarFadeUp 0.6s ease 0.1s both; }
        .soar-h1 span { color:#6366f1; }
        .soar-subtitle { margin-top:1rem; font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#64748b; max-width:680px; line-height:1.7; animation:soarFadeUp 0.6s ease 0.2s both; }
        .soar-hero-meta { display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:2rem; animation:soarFadeUp 0.6s ease 0.3s both; }

        .soar-hr { border:none; border-top:1px solid rgba(255,255,255,0.07); margin:1rem 0; }
        .soar-section { padding:3rem 0; }
        .soar-section-label { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#00e5ff; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.75rem; }
        .soar-section-title { font-size:1.6rem; font-weight:700; margin-bottom:2.5rem; letter-spacing:-0.01em; }

        /* TRINITY */
        .tools-trinity { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-bottom:2.5rem; }
        .tool-card { border-radius:16px; padding:2rem; border:1px solid rgba(255,255,255,0.07); position:relative; overflow:hidden; transition:transform 0.2s; }
        .tool-card:hover { transform:translateY(-3px); }
        .tool-card::before { content:''; position:absolute; top:-60px; right:-60px; width:160px; height:160px; border-radius:50%; pointer-events:none; }
        .tool-hive { background:linear-gradient(135deg,rgba(249,115,22,0.08),#10131e); border-color:rgba(249,115,22,0.2); }
        .tool-hive::before { background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 70%); }
        .tool-misp { background:linear-gradient(135deg,rgba(225,29,72,0.08),#10131e); border-color:rgba(225,29,72,0.2); }
        .tool-misp::before { background:radial-gradient(circle,rgba(225,29,72,0.1),transparent 70%); }
        .tool-octi { background:linear-gradient(135deg,rgba(99,102,241,0.08),#10131e); border-color:rgba(99,102,241,0.2); }
        .tool-octi::before { background:radial-gradient(circle,rgba(99,102,241,0.1),transparent 70%); }
        .tool-emoji { font-size:2.5rem; margin-bottom:1rem; display:block; }
        .tool-name  { font-size:1.2rem; font-weight:800; margin-bottom:0.3rem; }
        .tool-sub   { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#64748b; margin-bottom:1rem; }
        .tool-desc  { font-family:'JetBrains Mono',monospace; font-size:0.78rem; color:#94a3b8; line-height:1.7; }
        .tool-hive .tool-name { color:#f97316; }
        .tool-misp .tool-name { color:#e11d48; }
        .tool-octi .tool-name { color:#6366f1; }
        @media(max-width:768px) { .tools-trinity { grid-template-columns:1fr; } }

        /* FLUX SCHEMA */
        .flux-schema { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:2.5rem; position:relative; overflow:hidden; }
        .flux-schema::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.04),transparent 60%); pointer-events:none; }

        /* Desktop — inline flex, s'arrête à la dernière card */
        .flux-row { display:inline-flex; align-items:center; gap:0; }

        .flux-node { background:#141825; border-radius:12px; padding:1rem 1.2rem; border:1px solid rgba(255,255,255,0.07); text-align:center; min-width:120px; flex-shrink:0; transition:border-color 0.3s; }
        .flux-node:hover { border-color:rgba(99,102,241,0.4); }
        .fn-icon  { font-size:1.5rem; display:block; margin-bottom:0.3rem; }
        .fn-label { font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .fn-sub   { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#64748b; display:block; }
        .fn-wazuh   { border-color:rgba(0,196,255,0.4); }    .fn-wazuh .fn-label   { color:#00c4ff; }
        .fn-hive    { border-color:rgba(249,115,22,0.4); animation:pulseHive 2.5s infinite; } .fn-hive .fn-label { color:#f97316; }
        .fn-misp    { border-color:rgba(225,29,72,0.4); }    .fn-misp .fn-label    { color:#e11d48; }
        .fn-octi    { border-color:rgba(99,102,241,0.4); }   .fn-octi .fn-label    { color:#6366f1; }
        .fn-analyst { border-color:rgba(0,255,136,0.4); }    .fn-analyst .fn-label { color:#00ff88; }
        @keyframes pulseHive { 0%{box-shadow:0 0 0 0 rgba(249,115,22,0.4)} 70%{box-shadow:0 0 0 10px rgba(249,115,22,0)} 100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} }

        /* Flèches desktop */
        .flux-arrow { display:flex; flex-direction:column; align-items:center; gap:0.3rem; padding:0 0.6rem; flex-shrink:0; }
        .fa-line { height:2px; width:48px; position:relative; }
        .fa-line::after { content:'▶'; position:absolute; right:-8px; top:50%; transform:translateY(-50%); font-size:0.6rem; }
        .fa-label { font-family:'JetBrains Mono',monospace; font-size:0.58rem; color:#64748b; white-space:nowrap; text-align:center; }
        .arr-wazuh .fa-line,.arr-wazuh .fa-line::after { background:#00c4ff; color:#00c4ff; }
        .arr-hive  .fa-line,.arr-hive  .fa-line::after { background:#f97316; color:#f97316; }
        .arr-misp  .fa-line,.arr-misp  .fa-line::after { background:#e11d48; color:#e11d48; }
        .arr-octi  .fa-line,.arr-octi  .fa-line::after { background:#6366f1; color:#6366f1; }

        /* Mobile flux */
        .flux-mobile { display:none; }
        @media(max-width:700px) {
          .flux-row { display:none; }
          .flux-mobile {
            display:flex; flex-direction:column; align-items:center;
            gap:0; position:relative;
          }
          .flux-mob-node {
            background:#141825; border-radius:12px; padding:1rem 1.2rem;
            border:1px solid rgba(255,255,255,0.07); text-align:center;
            width:100%; max-width:280px; transition:border-color 0.3s;
            position:relative; z-index:1;
          }
          .flux-mob-arrow {
            display:flex; flex-direction:row;
            justify-content:flex-start; align-items:center;
            gap:0.75rem; padding:0.4rem 0;
            width:100%; max-width:280px;
          }
          .flux-mob-line {
            width:2px; height:40px; flex-shrink:0; position:relative;
            margin-left:2rem;
          }
          .flux-mob-line::after {
            content:'▼'; position:absolute; bottom:-8px; left:50%;
            transform:translateX(-50%); font-size:0.6rem;
          }
          .flux-mob-label {
            font-family:'JetBrains Mono',monospace; font-size:0.68rem;
            color:#64748b; white-space:nowrap; line-height:1.4;
          }
          .mob-arr-wazuh .flux-mob-line,.mob-arr-wazuh .flux-mob-line::after { background:#00c4ff; color:#00c4ff; }
          .mob-arr-hive  .flux-mob-line,.mob-arr-hive  .flux-mob-line::after { background:#f97316; color:#f97316; }
          .mob-arr-misp  .flux-mob-line,.mob-arr-misp  .flux-mob-line::after { background:#e11d48; color:#e11d48; }
          .mob-arr-octi  .flux-mob-line,.mob-arr-octi  .flux-mob-line::after { background:#6366f1; color:#6366f1; }
          .flux-mob-node.fn-wazuh   { border-color:rgba(0,196,255,0.4); }
          .flux-mob-node.fn-hive    { border-color:rgba(249,115,22,0.4); }
          .flux-mob-node.fn-misp    { border-color:rgba(225,29,72,0.4); }
          .flux-mob-node.fn-octi    { border-color:rgba(99,102,241,0.4); }
          .flux-mob-node.fn-analyst { border-color:rgba(0,255,136,0.4); }
        }
        @media(min-width:701px) { .flux-mobile { display:none; } }

        /* JALONS */
        .soar-jalons { display:flex; flex-direction:column; }
        .soar-jalon { display:grid; grid-template-columns:60px 1fr; gap:0 1.5rem; opacity:0; transform:translateX(-20px); transition:opacity 0.5s ease,transform 0.5s ease; }
        .soar-jalon.visible { opacity:1; transform:translateX(0); }
        .soar-jalon-left { display:flex; flex-direction:column; align-items:center; }
        .soar-jalon-num { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:0.95rem; font-weight:700; flex-shrink:0; position:relative; z-index:1; }
        .soar-jalon-num.anim::after { content:''; position:absolute; inset:-4px; border-radius:14px; border:1px dashed currentColor; opacity:0.3; animation:soarSpin 8s linear infinite; }
        .soar-jalon-line { width:2px; flex:1; min-height:40px; margin:4px 0; }
        .soar-jalon-body { padding-bottom:2.5rem; }
        .soar-jalon-phase { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.1em; margin-bottom:0.3rem; }
        .soar-jalon-title { font-size:1.15rem; font-weight:700; margin-bottom:0.5rem; }
        .soar-jalon-desc  { font-family:'JetBrains Mono',monospace; font-size:0.82rem; color:#94a3b8; line-height:1.7; margin-bottom:1rem; }
        .soar-tools { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .soar-tc { font-family:'JetBrains Mono',monospace; font-size:0.72rem; padding:0.25rem 0.65rem; border-radius:4px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07); color:#64748b; }
        .sj1 .soar-jalon-num { background:rgba(0,229,255,0.12);  border:1px solid rgba(0,229,255,0.4);  color:#00e5ff; } .sj1 .soar-jalon-line { background:linear-gradient(to bottom,rgba(0,229,255,0.5),rgba(249,115,22,0.5)); } .sj1 .soar-jalon-title { color:#00e5ff; }
        .sj2 .soar-jalon-num { background:rgba(249,115,22,0.12); border:1px solid rgba(249,115,22,0.4); color:#f97316; } .sj2 .soar-jalon-line { background:linear-gradient(to bottom,rgba(249,115,22,0.5),rgba(225,29,72,0.5)); } .sj2 .soar-jalon-title { color:#f97316; }
        .sj3 .soar-jalon-num { background:rgba(225,29,72,0.12);  border:1px solid rgba(225,29,72,0.4);  color:#e11d48; } .sj3 .soar-jalon-line { background:linear-gradient(to bottom,rgba(225,29,72,0.5),rgba(99,102,241,0.5)); } .sj3 .soar-jalon-title { color:#e11d48; }
        .sj4 .soar-jalon-num { background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.4); color:#6366f1; } .sj4 .soar-jalon-line { background:linear-gradient(to bottom,rgba(99,102,241,0.5),rgba(168,85,247,0.5)); } .sj4 .soar-jalon-title { color:#6366f1; }
        .sj5 .soar-jalon-num { background:rgba(168,85,247,0.12); border:1px solid rgba(168,85,247,0.4); color:#a855f7; } .sj5 .soar-jalon-line { background:linear-gradient(to bottom,rgba(168,85,247,0.5),rgba(0,255,136,0.5)); } .sj5 .soar-jalon-title { color:#a855f7; }
        .sj6 .soar-jalon-num { background:rgba(0,255,136,0.1);   border:1px solid rgba(0,255,136,0.4);  color:#00ff88; } .sj6 .soar-jalon-title { color:#00ff88; }

        /* INCIDENT FLOW */
        .incident-flow { display:flex; flex-direction:column; gap:0.6rem; }
        .inc-step { display:flex; gap:1rem; align-items:flex-start; padding:1rem 1.2rem; background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:10px; transition:border-color 0.2s; }
        .inc-step:hover { border-color:rgba(99,102,241,0.3); }
        .inc-num { width:28px; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:0.7rem; font-weight:700; flex-shrink:0; }
        .inc-title { font-size:0.88rem; font-weight:700; margin-bottom:0.2rem; }
        .inc-desc  { font-family:'JetBrains Mono',monospace; font-size:0.73rem; color:#64748b; line-height:1.6; }
        .inc-tool  { font-family:'JetBrains Mono',monospace; font-size:0.65rem; margin-top:0.3rem; }

        /* METRICS */
        .metrics-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1rem; margin-top:1.5rem; }
        .metric-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; text-align:center; transition:border-color 0.2s; }
        .metric-card:hover { border-color:rgba(99,102,241,0.3); }
        .metric-value { font-family:'JetBrains Mono',monospace; font-size:2rem; font-weight:700; color:#6366f1; display:block; margin-bottom:0.3rem; }
        .metric-label { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748b; }

        /* STACK */
        .stack-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:0.75rem; }
        .stack-item { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:1rem 1.2rem; display:flex; gap:0.85rem; align-items:center; transition:border-color 0.2s; }
        .stack-item:hover { border-color:rgba(99,102,241,0.25); }
        .stack-icon { font-size:1.4rem; flex-shrink:0; }
        .stack-name { font-size:0.85rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .stack-role { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; }

        @keyframes soarFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes soarSpin   { to{transform:rotate(360deg)} }
      `}</style>

      <div className="soar-grid-bg" />
      <div className="soar-glow" />

      <nav className="soar-nav">
        <div className="soar-nav-inner">
          <span className="soar-nav-logo">KC // Project Reports</span>
          <button className="soar-nav-back" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>← Retour aux projets</button>
        </div>
      </nav>

      <main>
        <div className="soar-container">

          {/* HERO */}
          <section className="soar-hero">
            <div className="soar-hero-eyebrow">
              <span className="tag tag-octi">⚡ SOAR</span>
              <span className="tag tag-hive">Incident Response</span>
              <span className="tag tag-misp">Threat Intelligence</span>
            </div>
            <h1 className="soar-h1">Build d'un SOAR<br /><span>TheHive · MISP · OpenCTI</span></h1>
            <p className="soar-subtitle">
              Orchestration complète de la réponse aux incidents via l'interconnexion de trois plateformes open-source.<br />
              De l'alerte Wazuh au cas TheHive enrichi par MISP et OpenCTI — flux automatisé end-to-end.
            </p>
            <div className="soar-hero-meta">
              <span className="tag tag-hive">TheHive 5</span>
              <span className="tag tag-misp">MISP</span>
              <span className="tag tag-octi">OpenCTI</span>
              <span className="tag tag-cyan">Cortex</span>
              <span className="tag tag-purple">IOC Enrichment</span>
              <span className="tag tag-green">Automation</span>
            </div>
          </section>

          <hr className="soar-hr" />

          {/* TRINITY */}
          <section className="soar-section">
            <div className="soar-section-label">// Les trois piliers du SOAR</div>
            <div className="soar-section-title">Présentation de la stack</div>
            <div className="tools-trinity">
              <div className="tool-card tool-hive">
                <span className="tool-emoji">🐝</span>
                <div className="tool-name">TheHive 5</div>
                <div className="tool-sub">Incident Response Platform</div>
                <div className="tool-desc">Plateforme centrale de gestion des incidents. Réception des alertes, création de cases, assignment aux analystes, suivi des tâches et timeline d'investigation. Cortex intégré pour l'analyse automatisée des observables.</div>
              </div>
              <div className="tool-card tool-misp">
                <span className="tool-emoji">🔴</span>
                <div className="tool-name">MISP</div>
                <div className="tool-sub">Malware Information Sharing Platform</div>
                <div className="tool-desc">Base de Threat Intelligence partagée. Stockage et partage d'IOCs (IPs, hashes, domaines, URLs). Corrélation automatique des observables des incidents avec les indicateurs connus. Feeds externes intégrés (CIRCL, abuse.ch, Feodo).</div>
              </div>
              <div className="tool-card tool-octi">
                <span className="tool-emoji">🌐</span>
                <div className="tool-name">OpenCTI</div>
                <div className="tool-sub">Open Cyber Threat Intelligence</div>
                <div className="tool-desc">Plateforme de Threat Intelligence structurée (STIX 2.1). Cartographie des acteurs de menace, TTPs, campagnes et infrastructure. Connecteurs vers MITRE ATT&amp;CK, VirusTotal, Shodan. Contexte stratégique pour les analystes.</div>
              </div>
            </div>
          </section>

          {/* FLUX */}
          <section className="soar-section">
            <div className="soar-section-label">// Flux d'orchestration</div>
            <div className="soar-section-title">Pipeline alerte → case → enrichissement → réponse</div>
            <div className="flux-schema">

              {/* DESKTOP */}
              <div className="flux-row">
                <div className="flux-node fn-wazuh">
                  <span className="fn-icon">🛡️</span>
                  <span className="fn-label">Wazuh</span>
                  <span className="fn-sub">Alerte niveau 10+</span>
                </div>
                <div className="flux-arrow arr-wazuh">
                  <div className="fa-line" /><div className="fa-label">Webhook<br />API</div>
                </div>
                <div className="flux-node fn-hive">
                  <span className="fn-icon">🐝</span>
                  <span className="fn-label">TheHive</span>
                  <span className="fn-sub">Création du case</span>
                  <span className="fn-sub">+ Observables</span>
                </div>
                <div className="flux-arrow arr-hive">
                  <div className="fa-line" /><div className="fa-label">IOC<br />lookup</div>
                </div>
                <div className="flux-node fn-misp">
                  <span className="fn-icon">🔴</span>
                  <span className="fn-label">MISP</span>
                  <span className="fn-sub">Corrélation IOCs</span>
                  <span className="fn-sub">Score de confiance</span>
                </div>
                <div className="flux-arrow arr-misp">
                  <div className="fa-line" /><div className="fa-label">TTP<br />context</div>
                </div>
                <div className="flux-node fn-octi">
                  <span className="fn-icon">🌐</span>
                  <span className="fn-label">OpenCTI</span>
                  <span className="fn-sub">Acteur de menace</span>
                  <span className="fn-sub">Campagne / TTPs</span>
                </div>
                <div className="flux-arrow arr-octi">
                  <div className="fa-line" /><div className="fa-label">Case<br />enrichi</div>
                </div>
                <div className="flux-node fn-analyst">
                  <span className="fn-icon">👤</span>
                  <span className="fn-label">Analyste SOC</span>
                  <span className="fn-sub">Case complet</span>
                  <span className="fn-sub">Décision éclairée</span>
                </div>
              </div>

              {/* MOBILE */}
              <div className="flux-mobile">
                <div className="flux-mob-node fn-wazuh">
                  <span className="fn-icon">🛡️</span>
                  <span className="fn-label">Wazuh</span>
                  <span className="fn-sub">Alerte niveau 10+</span>
                </div>
                <div className="flux-mob-arrow mob-arr-wazuh">
                  <div className="flux-mob-line" />
                  <span className="flux-mob-label">Webhook API</span>
                </div>
                <div className="flux-mob-node fn-hive">
                  <span className="fn-icon">🐝</span>
                  <span className="fn-label">TheHive</span>
                  <span className="fn-sub">Création du case + Observables</span>
                </div>
                <div className="flux-mob-arrow mob-arr-hive">
                  <div className="flux-mob-line" />
                  <span className="flux-mob-label">IOC lookup</span>
                </div>
                <div className="flux-mob-node fn-misp">
                  <span className="fn-icon">🔴</span>
                  <span className="fn-label">MISP</span>
                  <span className="fn-sub">Corrélation IOCs · Score de confiance</span>
                </div>
                <div className="flux-mob-arrow mob-arr-misp">
                  <div className="flux-mob-line" />
                  <span className="flux-mob-label">TTP context</span>
                </div>
                <div className="flux-mob-node fn-octi">
                  <span className="fn-icon">🌐</span>
                  <span className="fn-label">OpenCTI</span>
                  <span className="fn-sub">Acteur de menace · Campagne / TTPs</span>
                </div>
                <div className="flux-mob-arrow mob-arr-octi">
                  <div className="flux-mob-line" />
                  <span className="flux-mob-label">Case enrichi</span>
                </div>
                <div className="flux-mob-node fn-analyst">
                  <span className="fn-icon">👤</span>
                  <span className="fn-label">Analyste SOC</span>
                  <span className="fn-sub">Case complet · Décision éclairée</span>
                </div>
              </div>

            </div>
          </section>

          <hr className="soar-hr" />

          {/* JALONS */}
          <section className="soar-section">
            <div className="soar-section-label">// Déroulement du projet</div>
            <div className="soar-section-title">Jalons — Étape par étape</div>
            <div className="soar-jalons">
              {[
                { cls:'sj1', delay:0,   phase:'PHASE 01 — INFRASTRUCTURE',      title:'Déploiement des trois plateformes',                        desc:"Installation et configuration de TheHive 5 + Cortex, MISP et OpenCTI sur infrastructure dédiée (Docker Compose). Configuration des bases de données (Cassandra/Elasticsearch pour TheHive, MySQL pour MISP, Redis + Elasticsearch pour OpenCTI). Sécurisation des accès (HTTPS, authentification, reverse proxy Nginx).", tools:['Docker Compose','TheHive 5','Cortex','Nginx','Let\'s Encrypt'] },
                { cls:'sj2', delay:150, phase:'PHASE 02 — INTERCONNEXION',       title:'Configuration des connecteurs TheHive ↔ MISP ↔ OpenCTI',  desc:"Mise en place des intégrations bidirectionnelles : connecteur TheHive → MISP pour export des observables, connecteur MISP → TheHive pour import des IOCs connus, connecteur OpenCTI ↔ MISP pour synchronisation des feeds. Configuration de l'API Wazuh → TheHive pour création automatique de cases depuis les alertes SIEM.", tools:['TheHive API','MISP API','OpenCTI Connectors','Wazuh Webhook','Python'] },
                { cls:'sj3', delay:300, phase:'PHASE 03 — THREAT INTELLIGENCE',  title:'Configuration MISP — Feeds & IOCs',                       desc:"Intégration des feeds Threat Intelligence dans MISP : CIRCL OSINT Feed, abuse.ch URLhaus/Feodo Tracker, Malware Bazaar, AlienVault OTX. Configuration des taxonomies (TLP, PAP, MISP-galaxy). Mise en place de la synchronisation automatique des feeds et des règles de corrélation pour le scoring des observables.", tools:['CIRCL Feed','abuse.ch','AlienVault OTX','MISP Taxonomies','Cron Sync'] },
                { cls:'sj4', delay:450, phase:'PHASE 04 — THREAT INTELLIGENCE',  title:'Configuration OpenCTI — Acteurs & TTPs',                  desc:"Déploiement des connecteurs OpenCTI : MITRE ATT&CK (auto-import des techniques), VirusTotal pour enrichissement des hashes, Shodan pour contexte IP, connecteur MISP bidirectionnel. Création des entités STIX 2.1 : acteurs de menace, campagnes, infrastructure d'attaque. Dashboard analytique par secteur d'activité.", tools:['STIX 2.1','MITRE ATT&CK','VirusTotal','Shodan','OpenCTI Connectors'] },
                { cls:'sj5', delay:600, phase:'PHASE 05 — AUTOMATISATION',       title:"Playbooks d'enrichissement & réponse automatisée",         desc:"Développement des playbooks Cortex : analyse automatique des observables (IP, hash, domaine, URL) via les analyzers VirusTotal, AbuseIPDB, Shodan, MISP. Configuration des responders pour actions automatiques : blocage IP, notification Slack, création de ticket. Templates de cases par type d'incident (phishing, brute force, malware, exfiltration).", tools:['Cortex Analyzers','Cortex Responders','VirusTotal','AbuseIPDB','Slack'] },
                { cls:'sj6', delay:750, phase:'PHASE 06 — VALIDATION',           title:'Simulation d\'incident end-to-end',                        desc:"Test complet du pipeline sur un scénario réaliste : simulation d'un incident phishing avec pièce jointe malveillante. Vérification de chaque étape — alerte Wazuh → case TheHive → enrichissement MISP (hash connu) → contexte OpenCTI (campagne APT) → analyse Cortex → rapport d'incident automatisé. Mesure du MTTR et optimisation du pipeline.", tools:['Atomic Red Team','GoPhish','MTTR Measurement','Rapport IR'] },
              ].map((j, i, arr) => (
                <div key={i} className={`soar-jalon ${j.cls}`} data-delay={j.delay}>
                  <div className="soar-jalon-left">
                    <div className="soar-jalon-num anim">{String(i+1).padStart(2,'0')}</div>
                    {i < arr.length - 1 && <div className="soar-jalon-line" />}
                  </div>
                  <div className="soar-jalon-body">
                    <div className="soar-jalon-phase">{j.phase}</div>
                    <div className="soar-jalon-title">{j.title}</div>
                    <div className="soar-jalon-desc">{j.desc}</div>
                    <div className="soar-tools">
                      {j.tools.map((t, k) => <span className="soar-tc" key={k}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="soar-hr" />

          {/* INCIDENT SIMULATION */}
          <section className="soar-section">
            <div className="soar-section-label">// Simulation d'incident</div>
            <div className="soar-section-title">Scénario Phishing — Flux automatisé</div>
            <div className="incident-flow">
              {[
                { num:'01', color:'rgba(0,196,255,0.15)', textColor:'#00c4ff',  title:'Détection email phishing avec pièce jointe suspecte',  desc:"Wazuh détecte l'exécution d'un processus Office avec macro sur un endpoint Windows. Alerte niveau 12 déclenchée avec hash du fichier, nom du processus et utilisateur concerné.", tool:'→ Wazuh — Rule 100045 : Office Macro Execution' },
                { num:'02', color:'rgba(249,115,22,0.15)', textColor:'#f97316', title:'Création automatique du case TheHive',                 desc:'Le webhook Wazuh → TheHive crée un case "Phishing — Macro suspecte" avec les observables extraits : hash MD5/SHA256 du fichier, IP de destination, nom d\'utilisateur. Assignation automatique à l\'analyste de garde.', tool:'→ TheHive — Case #INC-2024-0142 créé en 3 secondes' },
                { num:'03', color:'rgba(225,29,72,0.15)',  textColor:'#e11d48', title:'Corrélation IOC dans MISP',                            desc:'Le hash du fichier est soumis à MISP via Cortex. Correspondance trouvée : le hash est référencé dans l\'event MISP "APT28 Campaign Q4-2024" avec score de confiance 95%. IOC partagé via TLP:AMBER.', tool:'→ MISP — Hash connu, APT28, confiance 95%' },
                { num:'04', color:'rgba(99,102,241,0.15)', textColor:'#6366f1', title:'Enrichissement contextuel OpenCTI',                   desc:'OpenCTI fournit le contexte complet : campagne "Sandworm Q4", TTPs utilisées (T1566.001 Spearphishing, T1059.001 PowerShell), infrastructure C2 connue. Le case TheHive est enrichi automatiquement avec ce contexte.', tool:'→ OpenCTI — APT28 / Sandworm, 4 TTPs MITRE identifiées' },
                { num:'05', color:'rgba(0,255,136,0.1)',   textColor:'#00ff88', title:'Réponse automatisée — Isolation & Rapport',           desc:"Cortex Responder déclenche l'isolation de l'endpoint via l'API Wazuh Active Response. Rapport d'incident automatique généré avec timeline, IOCs, TTPs et recommandations. Notification équipe sécurité via Slack. MTTR total : 4 minutes 32 secondes.", tool:'→ Endpoint isolé — Rapport IR généré — MTTR : 4m32s' },
              ].map((s, i) => (
                <div className="inc-step" key={i}>
                  <div className="inc-num" style={{background:s.color, color:s.textColor}}>{s.num}</div>
                  <div>
                    <div className="inc-title">{s.title}</div>
                    <div className="inc-desc">{s.desc}</div>
                    <div className="inc-tool" style={{color:s.textColor}}>{s.tool}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="soar-hr" />

          {/* METRICS */}
          <section className="soar-section">
            <div className="soar-section-label">// Résultats &amp; métriques</div>
            <div className="soar-section-title">Impact opérationnel</div>
            <div className="metrics-grid">
              {[
                { value:'4m32s', label:'MTTR moyen' },
                { value:'15+',   label:'Feeds TI intégrés' },
                { value:'8',     label:'Analyzers Cortex' },
                { value:'5',     label:'Templates de cases' },
                { value:'100%',  label:'Enrichissement auto' },
                { value:'3',     label:'Responders actifs' },
              ].map((m, i) => (
                <div className="metric-card" key={i}>
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="soar-hr" />

          {/* STACK */}
          <section className="soar-section">
            <div className="soar-section-label">// Stack technique</div>
            <div className="soar-section-title">Technologies utilisées</div>
            <div className="stack-grid">
              {[
                { icon:'🐝', name:'TheHive 5',      role:'IRP — Case management' },
                { icon:'⚙️', name:'Cortex',         role:'Analyzers & Responders' },
                { icon:'🔴', name:'MISP',           role:'IOC sharing platform' },
                { icon:'🌐', name:'OpenCTI',        role:'Threat Intelligence STIX' },
                { icon:'🛡️', name:'Wazuh',          role:"Source d'alertes SIEM" },
                { icon:'🐳', name:'Docker Compose', role:'Orchestration stack' },
                { icon:'🐍', name:'Python',         role:"Scripts d'intégration" },
                { icon:'🔍', name:'Elasticsearch',  role:'Stockage & recherche' },
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
