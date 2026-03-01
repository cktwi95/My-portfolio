import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SiemWazuh() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const jalons = document.querySelectorAll('.jalon');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.15 });
    jalons.forEach(j => observer.observe(j));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sw-page">
      <style>{`
        .sw-page {
          font-family:'Syne',sans-serif;
          background:#0b0d14;
          color:#e2e8f0;
          min-height:100vh;
          overflow-x:hidden;
        }
        .sw-page *, .sw-page *::before, .sw-page *::after { box-sizing:border-box; margin:0; padding:0; }

        /* GRID BG */
        .sw-grid-bg { position:fixed; inset:0; background-image:linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; z-index:0; }
        .sw-glow-orb { position:fixed; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(0,196,255,0.04),transparent 70%); top:-100px; right:-100px; pointer-events:none; z-index:0; }

        /* NAV */
        .sw-nav { padding:1.5rem 0; border-bottom:1px solid rgba(255,255,255,0.07); position:sticky; top:0; background:rgba(11,13,20,0.95); backdrop-filter:blur(12px); z-index:100; }
        .sw-nav-inner { max-width:1200px; margin:0 auto; padding:0 2rem; display:flex; align-items:center; justify-content:space-between; }
        .sw-nav-logo { font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#00e5ff; }
        .sw-nav-back { display:flex; align-items:center; gap:0.5rem; font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#64748b; background:none; border:none; cursor:pointer; transition:color 0.2s; }
        .sw-nav-back:hover { color:#00e5ff; }

        /* CONTAINER */
        .sw-container { max-width:1200px; margin:0 auto; padding:0 2rem; position:relative; z-index:1; }

        /* TAGS */
        .tag { display:inline-flex; align-items:center; gap:0.4rem; padding:0.3rem 0.8rem; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
        .tag-cyan   { background:rgba(0,229,255,0.1);   color:#00e5ff; border:1px solid rgba(0,229,255,0.2); }
        .tag-green  { background:rgba(0,255,136,0.1);   color:#00ff88; border:1px solid rgba(0,255,136,0.2); }
        .tag-orange { background:rgba(255,107,53,0.15); color:#ff6b35; border:1px solid rgba(255,107,53,0.3); }
        .tag-red    { background:rgba(255,71,87,0.15);  color:#ff4757; border:1px solid rgba(255,71,87,0.3); }
        .tag-purple { background:rgba(168,85,247,0.15); color:#a855f7; border:1px solid rgba(168,85,247,0.3); }
        .tag-blue   { background:rgba(59,130,246,0.15); color:#3b82f6; border:1px solid rgba(59,130,246,0.3); }
        .tag-wazuh  { background:rgba(0,196,255,0.12);  color:#00c4ff; border:1px solid rgba(0,196,255,0.3); }

        /* HERO */
        .sw-hero { padding:5rem 0 3rem; }
        .sw-hero-eyebrow { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; animation:swFadeUp 0.6s ease both; }
        .sw-h1 { font-family:'Syne',sans-serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; animation:swFadeUp 0.6s ease 0.1s both; }
        .sw-h1 span { color:#00c4ff; }
        .sw-subtitle { margin-top:1rem; font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#64748b; max-width:640px; line-height:1.7; animation:swFadeUp 0.6s ease 0.2s both; }
        .sw-hero-meta { display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:2rem; animation:swFadeUp 0.6s ease 0.3s both; }

        /* DIVIDER */
        .sw-hr { border:none; border-top:1px solid rgba(255,255,255,0.07); margin:1rem 0; }

        /* SECTION */
        .sw-section { padding:3rem 0; }
        .sw-section-label { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#00e5ff; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.75rem; }
        .sw-section-title { font-size:1.6rem; font-weight:700; margin-bottom:2.5rem; letter-spacing:-0.01em; }

        /* ARCHITECTURE */
        .arch-schema { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:2.5rem 2rem; position:relative; overflow:hidden; }
        .arch-schema::before { content:''; position:absolute; top:-80px; right:-80px; width:300px; height:300px; background:radial-gradient(circle,rgba(0,196,255,0.06),transparent 70%); pointer-events:none; }
        .arch-cols { display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:1rem; align-items:center; }
        .arch-col { display:flex; flex-direction:column; gap:0.75rem; }
        .arch-col-title { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.12em; text-transform:uppercase; text-align:center; margin-bottom:0.25rem; }
        .arch-node { background:#141825; border-radius:10px; padding:0.85rem 1rem; border:1px solid rgba(255,255,255,0.07); text-align:center; transition:border-color 0.3s; }
        .arch-node:hover { border-color:rgba(0,229,255,0.3); }
        .node-icon { font-size:1.4rem; display:block; margin-bottom:0.3rem; }
        .node-label { font-size:0.8rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .node-sub { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#64748b; display:block; line-height:1.4; }
        .node-linux { border-color:rgba(255,107,53,0.3); } .node-linux .node-label { color:#ff6b35; }
        .node-win   { border-color:rgba(59,130,246,0.3); } .node-win .node-label   { color:#3b82f6; }
        .node-net   { border-color:rgba(20,184,166,0.3); } .node-net .node-label   { color:#14b8a6; }
        .node-wazuh { border-color:rgba(0,196,255,0.5); animation:pulseWazuh 2.5s infinite; } .node-wazuh .node-label { color:#00c4ff; }
        .node-index { border-color:rgba(0,196,255,0.25); } .node-index .node-label { color:#00e5ff; }
        .node-dash  { border-color:rgba(0,255,136,0.3); } .node-dash .node-label  { color:#00ff88; }
        .node-alert { border-color:rgba(255,71,87,0.4); } .node-alert .node-label { color:#ff4757; }
        .node-play  { border-color:rgba(168,85,247,0.4); } .node-play .node-label { color:#a855f7; }
        @keyframes pulseWazuh { 0%{box-shadow:0 0 0 0 rgba(0,196,255,0.4)} 70%{box-shadow:0 0 0 12px rgba(0,196,255,0)} 100%{box-shadow:0 0 0 0 rgba(0,196,255,0)} }

        /* FLÈCHES DESKTOP */
        .arch-arrow { display:flex; flex-direction:column; align-items:center; gap:0.3rem; padding:0 0.75rem; }
        .arrow-line { width:60px; height:2px; position:relative; }
        .arrow-line::after { content:'▶'; position:absolute; right:-8px; top:50%; transform:translateY(-50%); font-size:0.6rem; }
        .arrow-label { font-family:'JetBrains Mono',monospace; font-size:0.6rem; text-align:center; color:#64748b; white-space:nowrap; }
        .arr-ossec .arrow-line { background:#00e5ff; } .arr-ossec .arrow-line::after { color:#00e5ff; }
        .arr-api   .arrow-line { background:#00ff88; } .arr-api   .arrow-line::after { color:#00ff88; }

        /* MOBILE */
        @media(max-width:700px) {
          .arch-cols { display:flex; flex-direction:column; gap:0; }
          .arch-col-title { display:none; }
          .arch-arrow { display:none; }
          .mob-sep { display:flex; flex-direction:row; align-items:center; gap:0.6rem; padding:0.4rem 0; }
          .mob-sep-line { width:2px; height:40px; flex-shrink:0; position:relative; }
          .mob-sep-line::after { content:'▼'; position:absolute; bottom:-8px; left:50%; transform:translateX(-50%); font-size:0.6rem; }
          .mob-sep-label { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748b; white-space:nowrap; }
          .mob-sep-ossec .mob-sep-line { background:#00e5ff; } .mob-sep-ossec .mob-sep-line::after { color:#00e5ff; }
          .mob-sep-api   .mob-sep-line { background:#00ff88; } .mob-sep-api   .mob-sep-line::after { color:#00ff88; }
          .mob-sep-wrap { display:flex; justify-content:flex-start; padding-left:2rem; width:100%; }
        }
        @media(min-width:701px) { .mob-sep-wrap { display:none; } }

        /* JALONS */
        .jalons { display:flex; flex-direction:column; gap:0; }
        .jalon { display:grid; grid-template-columns:80px 1fr; gap:0 1.5rem; opacity:0; transform:translateX(-20px); transition:opacity 0.5s ease,transform 0.5s ease; }
        .jalon.visible { opacity:1; transform:translateX(0); }
        .jalon-left { display:flex; flex-direction:column; align-items:center; }
        .jalon-num { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:1rem; font-weight:700; flex-shrink:0; position:relative; z-index:1; }
        .jalon-num.animated::after { content:''; position:absolute; inset:-4px; border-radius:14px; border:1px dashed currentColor; opacity:0.3; animation:swSpin 8s linear infinite; }
        .jalon-line { width:2px; flex:1; min-height:40px; margin:4px 0; }
        .jalon-body { padding-bottom:2.5rem; }
        .jalon-phase { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.1em; margin-bottom:0.3rem; }
        .jalon-title { font-size:1.15rem; font-weight:700; margin-bottom:0.5rem; }
        .jalon-desc { font-family:'JetBrains Mono',monospace; font-size:0.82rem; color:#94a3b8; line-height:1.7; margin-bottom:1rem; }
        .jalon-tools { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .tool-chip { font-family:'JetBrains Mono',monospace; font-size:0.72rem; padding:0.25rem 0.65rem; border-radius:4px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07); color:#64748b; }
        .j1 .jalon-num { background:rgba(0,229,255,0.12);  border:1px solid rgba(0,229,255,0.4);  color:#00e5ff; } .j1 .jalon-line { background:linear-gradient(to bottom,rgba(0,229,255,0.5),rgba(255,107,53,0.5)); } .j1 .jalon-title { color:#00e5ff; }
        .j2 .jalon-num { background:rgba(255,107,53,0.15); border:1px solid rgba(255,107,53,0.4); color:#ff6b35; } .j2 .jalon-line { background:linear-gradient(to bottom,rgba(255,107,53,0.5),rgba(0,196,255,0.5)); } .j2 .jalon-title { color:#ff6b35; }
        .j3 .jalon-num { background:rgba(0,196,255,0.12);  border:1px solid rgba(0,196,255,0.4);  color:#00c4ff; } .j3 .jalon-line { background:linear-gradient(to bottom,rgba(0,196,255,0.5),rgba(255,211,42,0.5)); } .j3 .jalon-title { color:#00c4ff; }
        .j4 .jalon-num { background:rgba(255,211,42,0.12); border:1px solid rgba(255,211,42,0.4); color:#ffd32a; } .j4 .jalon-line { background:linear-gradient(to bottom,rgba(255,211,42,0.5),rgba(168,85,247,0.5)); } .j4 .jalon-title { color:#ffd32a; }
        .j5 .jalon-num { background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.4); color:#a855f7; } .j5 .jalon-line { background:linear-gradient(to bottom,rgba(168,85,247,0.5),rgba(0,255,136,0.5)); } .j5 .jalon-title { color:#a855f7; }
        .j6 .jalon-num { background:rgba(0,255,136,0.1);   border:1px solid rgba(0,255,136,0.4);  color:#00ff88; } .j6 .jalon-title { color:#00ff88; }

        /* CODE BLOCK */
        .code-block { background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.07); border-left:3px solid #00c4ff; border-radius:0 8px 8px 0; padding:0.75rem 1rem; font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#00c4ff; line-height:1.7; margin:0.75rem 0; white-space:pre-wrap; }
        .code-block .kw  { color:#00e5ff; }
        .code-block .str { color:#00ff88; }
        .code-block .cmt { color:#64748b; }

        /* RÈGLES */
        .regles-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1rem; margin-top:1.5rem; }
        .regle-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; transition:border-color 0.2s,transform 0.2s; }
        .regle-card:hover { border-color:rgba(0,196,255,0.4); transform:translateY(-2px); }
        .regle-header { display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; margin-bottom:0.75rem; }
        .regle-id { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; }
        .regle-sev { display:inline-flex; align-items:center; padding:0.15rem 0.5rem; border-radius:3px; font-family:'JetBrains Mono',monospace; font-size:0.62rem; font-weight:700; text-transform:uppercase; }
        .sev-12 { background:rgba(255,71,87,0.2);   color:#ff4757; }
        .sev-10 { background:rgba(255,107,53,0.2);  color:#ff6b35; }
        .sev-8  { background:rgba(255,211,42,0.15); color:#ffd32a; }
        .regle-title { font-size:0.9rem; font-weight:700; margin-bottom:0.4rem; }
        .regle-desc  { font-family:'JetBrains Mono',monospace; font-size:0.73rem; color:#64748b; line-height:1.6; }
        .regle-mitre { margin-top:0.75rem; display:flex; flex-wrap:wrap; gap:0.4rem; }
        .mitre-tag { font-family:'JetBrains Mono',monospace; font-size:0.6rem; padding:0.15rem 0.5rem; border-radius:3px; background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.2); color:#a855f7; }

        /* PLAYBOOKS */
        .playbook-list { display:flex; flex-direction:column; gap:0.75rem; }
        .playbook-item { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-left:3px solid #a855f7; border-radius:0 10px 10px 0; padding:1.1rem 1.3rem; display:flex; gap:1rem; align-items:flex-start; transition:border-color 0.2s; }
        .playbook-item:hover { border-color:#a855f7; }
        .playbook-icon { font-size:1.2rem; flex-shrink:0; margin-top:0.1rem; }
        .playbook-title { font-size:0.9rem; font-weight:700; margin-bottom:0.3rem; color:#a855f7; }
        .playbook-desc  { font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#64748b; line-height:1.6; }
        .playbook-steps { margin-top:0.5rem; display:flex; flex-wrap:wrap; gap:0.4rem; }
        .step-chip { font-family:'JetBrains Mono',monospace; font-size:0.65rem; padding:0.2rem 0.6rem; border-radius:4px; background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.2); color:#a855f7; }

        /* MÉTRIQUES */
        .metrics-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:1rem; margin-top:1.5rem; }
        .metric-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; text-align:center; transition:border-color 0.2s; }
        .metric-card:hover { border-color:rgba(0,196,255,0.3); }
        .metric-value { font-family:'JetBrains Mono',monospace; font-size:2rem; font-weight:700; color:#00c4ff; display:block; margin-bottom:0.3rem; }
        .metric-label { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#64748b; letter-spacing:0.05em; }

        /* STACK */
        .stack-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:0.75rem; }
        .stack-item { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:1rem 1.2rem; display:flex; gap:0.85rem; align-items:center; transition:border-color 0.2s; }
        .stack-item:hover { border-color:rgba(0,196,255,0.25); }
        .stack-icon { font-size:1.4rem; flex-shrink:0; }
        .stack-name { font-size:0.85rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .stack-role { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; }

        @keyframes swFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes swSpin   { to{transform:rotate(360deg)} }
      `}</style>

      <div className="sw-grid-bg" />
      <div className="sw-glow-orb" />

      <nav className="sw-nav">
        <div className="sw-nav-inner">
          <span className="sw-nav-logo">KC // Project Reports</span>
          <button className="sw-nav-back" onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>← Retour aux projets</button>
        </div>
      </nav>

      <main>
        <div className="sw-container">

          {/* HERO */}
          <section className="sw-hero">
            <div className="sw-hero-eyebrow">
              <span className="tag tag-wazuh">🛡️ SIEM</span>
              <span className="tag tag-blue">Blue Team</span>
              <span className="tag tag-orange">On-Premise</span>
            </div>
            <h1 className="sw-h1">Build d'un SIEM<br /><span>Wazuh Complet</span></h1>
            <p className="sw-subtitle">
              Déploiement from scratch d'une stack Wazuh en production — Manager, Indexer, Dashboard.<br />
              Règles de détection custom, playbooks de réponse automatisés et intégration alerting multicanal.
            </p>
            <div className="sw-hero-meta">
              <span className="tag tag-wazuh">Wazuh Manager</span>
              <span className="tag tag-cyan">OpenSearch</span>
              <span className="tag tag-green">Detection Rules</span>
              <span className="tag tag-purple">Playbooks</span>
              <span className="tag tag-orange">Alerting</span>
              <span className="tag tag-red">MITRE ATT&amp;CK</span>
            </div>
          </section>

          <hr className="sw-hr" />

          {/* ARCHITECTURE */}
          <section className="sw-section">
            <div className="sw-section-label">// Architecture déployée</div>
            <div className="sw-section-title">Stack Wazuh — Vue d'ensemble</div>
            <div className="arch-schema">
              <div className="arch-cols">

                {/* COL 1 */}
                <div className="arch-col">
                  <div className="arch-col-title">Sources / Agents</div>
                  <div className="arch-node node-linux">
                    <span className="node-icon">🐧</span>
                    <span className="node-label">Agents Linux</span>
                    <span className="node-sub">Ubuntu / Debian / CentOS</span>
                    <span className="node-sub">Syscalls, logs, FIM</span>
                  </div>
                  <div className="arch-node node-win">
                    <span className="node-icon">🪟</span>
                    <span className="node-label">Agents Windows</span>
                    <span className="node-sub">WinEvent / Sysmon</span>
                    <span className="node-sub">Registry, process</span>
                  </div>
                  <div className="arch-node node-net">
                    <span className="node-icon">🌐</span>
                    <span className="node-label">Sources Réseau</span>
                    <span className="node-sub">Syslog / Firewall</span>
                    <span className="node-sub">Suricata IDS</span>
                  </div>
                </div>

                {/* FLÈCHE 1 — desktop */}
                <div className="arch-arrow arr-ossec">
                  <div className="arrow-line" />
                  <div className="arrow-label">OSSEC Protocol</div>
                </div>

                {/* SÉPARATEUR MOBILE 1 */}
                <div className="mob-sep-wrap">
                  <div className="mob-sep mob-sep-ossec">
                    <div className="mob-sep-line" />
                    <span className="mob-sep-label">OSSEC Protocol</span>
                  </div>
                </div>

                {/* COL 2 */}
                <div className="arch-col">
                  <div className="arch-col-title">Core Wazuh</div>
                  <div className="arch-node node-wazuh">
                    <span className="node-icon">🛡️</span>
                    <span className="node-label">Wazuh Manager</span>
                    <span className="node-sub">Analyse &amp; corrélation</span>
                    <span className="node-sub">Rules engine</span>
                  </div>
                  <div className="arch-node node-index" style={{marginTop:'0.5rem'}}>
                    <span className="node-icon">🗄️</span>
                    <span className="node-label">Wazuh Indexer</span>
                    <span className="node-sub">OpenSearch</span>
                    <span className="node-sub">Stockage &amp; indexation</span>
                  </div>
                </div>

                {/* FLÈCHE 2 — desktop */}
                <div className="arch-arrow arr-api">
                  <div className="arrow-line" />
                  <div className="arrow-label">REST API</div>
                </div>

                {/* SÉPARATEUR MOBILE 2 */}
                <div className="mob-sep-wrap">
                  <div className="mob-sep mob-sep-api">
                    <div className="mob-sep-line" />
                    <span className="mob-sep-label">REST API</span>
                  </div>
                </div>

                {/* COL 3 */}
                <div className="arch-col">
                  <div className="arch-col-title">Outputs &amp; Actions</div>
                  <div className="arch-node node-dash">
                    <span className="node-icon">📊</span>
                    <span className="node-label">Dashboard</span>
                    <span className="node-sub">Wazuh UI / Kibana</span>
                    <span className="node-sub">Visualisation temps réel</span>
                  </div>
                  <div className="arch-node node-alert">
                    <span className="node-icon">🚨</span>
                    <span className="node-label">Alerting</span>
                    <span className="node-sub">Email / Slack / Webhook</span>
                    <span className="node-sub">Seuils configurables</span>
                  </div>
                  <div className="arch-node node-play">
                    <span className="node-icon">⚡</span>
                    <span className="node-label">Playbooks</span>
                    <span className="node-sub">Scripts de réponse</span>
                    <span className="node-sub">Isolation / Notification</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* JALONS */}
          <section className="sw-section">
            <div className="sw-section-label">// Déroulement du projet</div>
            <div className="sw-section-title">Jalons — Étape par étape</div>
            <div className="jalons">

              <div className="jalon j1" data-delay="0">
                <div className="jalon-left">
                  <div className="jalon-num animated">01</div>
                  <div className="jalon-line" />
                </div>
                <div className="jalon-body">
                  <div className="jalon-phase">PHASE 01 — INFRASTRUCTURE</div>
                  <div className="jalon-title">Architecture &amp; Déploiement de la stack</div>
                  <div className="jalon-desc">Dimensionnement de l'infrastructure selon la volumétrie cible (nombre d'agents, EPS attendus). Déploiement du Wazuh Manager, de l'Indexer OpenSearch et du Dashboard sur VM dédiées. Configuration du cluster, des certificats TLS inter-composants et des politiques de rétention des données.</div>
                  <div className="jalon-tools">
                    <span className="tool-chip">Wazuh 4.x</span>
                    <span className="tool-chip">OpenSearch</span>
                    <span className="tool-chip">Docker / VM</span>
                    <span className="tool-chip">TLS/SSL</span>
                    <span className="tool-chip">Ansible</span>
                  </div>
                </div>
              </div>

              <div className="jalon j2" data-delay="150">
                <div className="jalon-left">
                  <div className="jalon-num animated">02</div>
                  <div className="jalon-line" />
                </div>
                <div className="jalon-body">
                  <div className="jalon-phase">PHASE 02 — AGENTS</div>
                  <div className="jalon-title">Déploiement &amp; Configuration des agents</div>
                  <div className="jalon-desc">Installation des agents Wazuh sur les endpoints Linux (Ubuntu, CentOS) et Windows (Sysmon intégré). Configuration des modules de collecte : File Integrity Monitoring (FIM), surveillance des processus, logs système, audit des commandes sudo. Groupes d'agents par type de système pour application des politiques différenciées.</div>
                  <div className="jalon-tools">
                    <span className="tool-chip">Wazuh Agent</span>
                    <span className="tool-chip">Sysmon</span>
                    <span className="tool-chip">FIM</span>
                    <span className="tool-chip">Auditd</span>
                    <span className="tool-chip">osquery</span>
                  </div>
                </div>
              </div>

              <div className="jalon j3" data-delay="300">
                <div className="jalon-left">
                  <div className="jalon-num animated">03</div>
                  <div className="jalon-line" />
                </div>
                <div className="jalon-body">
                  <div className="jalon-phase">PHASE 03 — DÉTECTION</div>
                  <div className="jalon-title">Règles de détection custom — MITRE ATT&amp;CK</div>
                  <div className="jalon-desc">Développement de règles XML custom couvrant les techniques MITRE ATT&amp;CK prioritaires : brute force SSH/RDP, escalade de privilèges, lateral movement, persistence (crontab, scheduled tasks), exfiltration. Chaque règle mappée sur une technique ATT&amp;CK avec niveau de sévérité, description et référence. Réduction des faux positifs par whitelist contextuelle.</div>
                  <div className="code-block">
                    <span className="cmt">{'<!-- Règle custom : Brute Force SSH -->'}</span>{'\n'}
                    <span className="kw">{'<rule'}</span>{' id='}<span className="str">"100001"</span>{' level='}<span className="str">"12"</span><span className="kw">{'>'}</span>{'\n'}
                    {'  '}<span className="kw">{'<if_matched_sid>'}</span>5710<span className="kw">{'</if_matched_sid>'}</span>{'\n'}
                    {'  '}<span className="kw">{'<same_source_ip />'}</span>{'\n'}
                    {'  '}<span className="kw">{'<description>'}</span>SSH Brute Force - <span className="str">T1110.001</span><span className="kw">{'</description>'}</span>{'\n'}
                    {'  '}<span className="kw">{'<mitre><id>'}</span>T1110.001<span className="kw">{'</id></mitre>'}</span>{'\n'}
                    <span className="kw">{'</rule>'}</span>
                  </div>
                  <div className="jalon-tools">
                    <span className="tool-chip">XML Rules</span>
                    <span className="tool-chip">MITRE ATT&amp;CK</span>
                    <span className="tool-chip">Regex Decoder</span>
                    <span className="tool-chip">wazuh-logtest</span>
                  </div>
                </div>
              </div>

              <div className="jalon j4" data-delay="450">
                <div className="jalon-left">
                  <div className="jalon-num animated">04</div>
                  <div className="jalon-line" />
                </div>
                <div className="jalon-body">
                  <div className="jalon-phase">PHASE 04 — PLAYBOOKS</div>
                  <div className="jalon-title">Développement des playbooks de réponse</div>
                  <div className="jalon-desc">Création de playbooks de réponse automatisée déclenchés par les règles custom. Scripts d'isolation réseau (iptables/firewall), blocage d'IP sur le pare-feu, kill de processus suspects, notification multi-canal. Active Response Wazuh configuré pour exécution automatique ou semi-automatique selon la criticité de l'alerte.</div>
                  <div className="jalon-tools">
                    <span className="tool-chip">Active Response</span>
                    <span className="tool-chip">Bash Scripts</span>
                    <span className="tool-chip">Python</span>
                    <span className="tool-chip">iptables</span>
                    <span className="tool-chip">Webhook</span>
                  </div>
                </div>
              </div>

              <div className="jalon j5" data-delay="600">
                <div className="jalon-left">
                  <div className="jalon-num animated">05</div>
                  <div className="jalon-line" />
                </div>
                <div className="jalon-body">
                  <div className="jalon-phase">PHASE 05 — ALERTING</div>
                  <div className="jalon-title">Intégration alerting multicanal</div>
                  <div className="jalon-desc">Configuration des intégrations d'alerting : email SMTP pour les sévérités critiques, webhook Slack pour les alertes en temps réel, intégration PagerDuty pour l'astreinte. Définition des seuils de notification par niveau de sévérité (8-10 : Slack, 11-12 : email + Slack + appel), suppression des alertes en maintenance window.</div>
                  <div className="jalon-tools">
                    <span className="tool-chip">SMTP</span>
                    <span className="tool-chip">Slack API</span>
                    <span className="tool-chip">PagerDuty</span>
                    <span className="tool-chip">Webhook</span>
                    <span className="tool-chip">osTicket</span>
                  </div>
                </div>
              </div>

              <div className="jalon j6" data-delay="750">
                <div className="jalon-left">
                  <div className="jalon-num animated">06</div>
                </div>
                <div className="jalon-body">
                  <div className="jalon-phase">PHASE 06 — DASHBOARD &amp; RÉSULTATS</div>
                  <div className="jalon-title">Visualisation &amp; Validation opérationnelle</div>
                  <div className="jalon-desc">Création de dashboards Kibana/OpenSearch personnalisés : vue SOC temps réel, top alertes par source/type, suivi MITRE ATT&amp;CK coverage, métriques FIM. Validation end-to-end par simulation d'attaques (brute force, privilege escalation) et vérification de la chaîne détection → alerte → playbook → notification en moins de 60 secondes.</div>
                  <div className="jalon-tools">
                    <span className="tool-chip">Kibana</span>
                    <span className="tool-chip">OpenSearch Dashboards</span>
                    <span className="tool-chip">Atomic Red Team</span>
                    <span className="tool-chip">Caldera</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <hr className="sw-hr" />

          {/* RÈGLES */}
          <section className="sw-section">
            <div className="sw-section-label">// Règles développées</div>
            <div className="sw-section-title">Catalogue de détection custom</div>
            <div className="regles-grid">
              {[
                { id:'RULE-100001', title:'SSH Brute Force détecté',        sev:'sev-12', sevLabel:'Critique 12', desc:"Plus de 10 échecs d'authentification SSH depuis la même IP en moins de 60 secondes. Corrélation sur same_source_ip avec fenêtre temporelle.", mitre:['T1110.001','Credential Access'] },
                { id:'RULE-100002', title:'Escalade de privilèges sudo',     sev:'sev-12', sevLabel:'Critique 12', desc:"Exécution sudo par un utilisateur non autorisé ou hors des heures ouvrées. Détection via auditd + règle temporelle.", mitre:['T1548.003','Privilege Escalation'] },
                { id:'RULE-100003', title:'Modification crontab suspecte',   sev:'sev-10', sevLabel:'Élevé 10',   desc:"Création ou modification de crontab par un processus non interactif. Vecteur de persistence classique post-compromission.", mitre:['T1053.003','Persistence'] },
                { id:'RULE-100004', title:'Scan de ports interne détecté',   sev:'sev-10', sevLabel:'Élevé 10',   desc:"Connexions TCP vers plus de 20 hôtes distincts en moins de 30 secondes depuis un endpoint interne. Indicateur de reconnaissance réseau.", mitre:['T1046','Discovery'] },
                { id:'RULE-100005', title:'Exfiltration via DNS',            sev:'sev-10', sevLabel:'Élevé 10',   desc:"Volume anormal de requêtes DNS vers un domaine externe avec sous-domaines de longueur élevée. Pattern d'exfiltration DNS tunneling.", mitre:['T1048.003','Exfiltration'] },
                { id:'RULE-100006', title:'FIM — Fichier critique modifié',  sev:'sev-8',  sevLabel:'Moyen 8',    desc:"Modification d'un fichier système critique (/etc/passwd, /etc/shadow, sudoers) en dehors d'une fenêtre de maintenance autorisée.", mitre:['T1098','Account Manipulation'] },
              ].map((r, i) => (
                <div className="regle-card" key={i}>
                  <div className="regle-header">
                    <div>
                      <div className="regle-id">{r.id}</div>
                      <div className="regle-title">{r.title}</div>
                    </div>
                    <span className={`regle-sev ${r.sev}`}>{r.sevLabel}</span>
                  </div>
                  <div className="regle-desc">{r.desc}</div>
                  <div className="regle-mitre">
                    {r.mitre.map((m, j) => <span className="mitre-tag" key={j}>{m}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="sw-hr" />

          {/* PLAYBOOKS */}
          <section className="sw-section">
            <div className="sw-section-label">// Réponse automatisée</div>
            <div className="sw-section-title">Playbooks de réponse aux incidents</div>
            <div className="playbook-list">
              {[
                { icon:'🔒', title:'Playbook 01 — Isolation réseau automatique', desc:"Déclenchement sur alerte niveau 12+. Le script Active Response applique des règles iptables pour isoler l'endpoint du réseau tout en maintenant la connexion Wazuh. Notification simultanée à l'équipe SOC avec contexte de l'alerte.", steps:['1. Détection règle 12+','2. Active Response','3. iptables DROP all','4. Maintien agent','5. Alerte SOC'] },
                { icon:'🚫', title:'Playbook 02 — Blocage IP automatique (Brute Force)', desc:"Sur détection brute force SSH/RDP (règle 100001), ajout automatique de l'IP source dans la blacklist firewall via API. Durée de blocage configurable (24h par défaut), avec possibilité de whitelisting des IP internes.", steps:['1. Brute Force détecté','2. Extract source IP','3. API Firewall','4. Block 24h','5. Log ticket'] },
                { icon:'⚡', title:'Playbook 03 — Kill processus & forensique', desc:"Sur détection de processus malveillant (hash connu ou comportement suspect), kill automatique du processus et collecte forensique : dump mémoire partiel, liste des connexions réseau actives, fichiers ouverts. Archivage pour investigation post-incident.", steps:['1. Processus suspect','2. kill -9 PID','3. Forensic dump','4. Archive S3/NFS','5. Rapport IR'] },
              ].map((p, i) => (
                <div className="playbook-item" key={i}>
                  <div className="playbook-icon">{p.icon}</div>
                  <div>
                    <div className="playbook-title">{p.title}</div>
                    <div className="playbook-desc">{p.desc}</div>
                    <div className="playbook-steps">
                      {p.steps.map((s, j) => <span className="step-chip" key={j}>{s}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="sw-hr" />

          {/* MÉTRIQUES */}
          <section className="sw-section">
            <div className="sw-section-label">// Résultats &amp; métriques</div>
            <div className="sw-section-title">Impact opérationnel</div>
            <div className="metrics-grid">
              {[
                { value:'47',    label:'Règles custom créées' },
                { value:'12',    label:'Agents déployés' },
                { value:'3',     label:'Playbooks actifs' },
                { value:'<60s',  label:'Délai détection → alerte' },
                { value:'94%',   label:'Réduction faux positifs' },
                { value:'23',    label:'Techniques MITRE couvertes' },
              ].map((m, i) => (
                <div className="metric-card" key={i}>
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="sw-hr" />

          {/* STACK */}
          <section className="sw-section">
            <div className="sw-section-label">// Stack technique</div>
            <div className="sw-section-title">Technologies utilisées</div>
            <div className="stack-grid">
              {[
                { icon:'🛡️', name:'Wazuh 4.x',        role:'SIEM / HIDS / XDR' },
                { icon:'🔍', name:'OpenSearch',        role:'Indexation & stockage' },
                { icon:'📊', name:'Kibana / OSD',      role:'Dashboards SOC' },
                { icon:'🪟', name:'Sysmon',            role:'Télémétrie Windows' },
                { icon:'🔊', name:'Auditd',            role:'Audit Linux kernel' },
                { icon:'🐍', name:'Python / Bash',     role:'Scripts Active Response' },
                { icon:'🤖', name:'Ansible',           role:'Déploiement agents' },
                { icon:'🎯', name:'Atomic Red Team',   role:'Validation détection' },
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
