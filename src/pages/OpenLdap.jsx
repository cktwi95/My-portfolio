import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OpenLdap() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const jalons = document.querySelectorAll('.ol-jalon');
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
    <div className="ol-page">
      <style>{`
        .ol-page { font-family:'Syne',sans-serif; background:#0b0d14; color:#e2e8f0; min-height:100vh; overflow-x:hidden; }
        .ol-page *, .ol-page *::before, .ol-page *::after { box-sizing:border-box; margin:0; padding:0; }

        .ol-grid-bg { position:fixed; inset:0; background-image:linear-gradient(rgba(34,197,94,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.02) 1px,transparent 1px); background-size:40px 40px; pointer-events:none; z-index:0; }
        .ol-glow-1  { position:fixed; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(34,197,94,0.04),transparent 70%); top:-100px; left:-100px; pointer-events:none; z-index:0; }
        .ol-glow-2  { position:fixed; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.04),transparent 70%); bottom:-100px; right:-100px; pointer-events:none; z-index:0; }

        /* NAV */
        .ol-nav { padding:1.5rem 0; border-bottom:1px solid rgba(255,255,255,0.07); position:sticky; top:0; background:rgba(11,13,20,0.95); backdrop-filter:blur(12px); z-index:100; }
        .ol-nav-inner { max-width:1200px; margin:0 auto; padding:0 2rem; display:flex; align-items:center; justify-content:space-between; }
        .ol-nav-logo { font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#00e5ff; }
        .ol-nav-back { font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#64748b; background:none; border:none; cursor:pointer; transition:color 0.2s; }
        .ol-nav-back:hover { color:#00e5ff; }

        .ol-container { max-width:1200px; margin:0 auto; padding:0 2rem; position:relative; z-index:1; }

        /* TAGS */
        .tag { display:inline-flex; align-items:center; gap:0.4rem; padding:0.3rem 0.8rem; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
        .tag-cyan    { background:rgba(0,229,255,0.1);    color:#00e5ff; border:1px solid rgba(0,229,255,0.2); }
        .tag-green   { background:rgba(0,255,136,0.1);    color:#00ff88; border:1px solid rgba(0,255,136,0.2); }
        .tag-purple  { background:rgba(168,85,247,0.15);  color:#a855f7; border:1px solid rgba(168,85,247,0.3); }
        .tag-blue    { background:rgba(59,130,246,0.15);  color:#3b82f6; border:1px solid rgba(59,130,246,0.3); }
        .tag-ldap    { background:rgba(34,197,94,0.12);   color:#22c55e; border:1px solid rgba(34,197,94,0.25); }
        .tag-ssl     { background:rgba(245,158,11,0.15);  color:#f59e0b; border:1px solid rgba(245,158,11,0.3); }
        .tag-cluster { background:rgba(139,92,246,0.15);  color:#8b5cf6; border:1px solid rgba(139,92,246,0.3); }

        /* HERO */
        .ol-hero { padding:5rem 0 3rem; }
        .ol-hero-eyebrow { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; animation:olFadeUp 0.6s ease both; }
        .ol-h1 { font-family:'Syne',sans-serif; font-size:clamp(2.2rem,5vw,3.8rem); font-weight:800; line-height:1.1; letter-spacing:-0.02em; animation:olFadeUp 0.6s ease 0.1s both; }
        .ol-h1 span { color:#22c55e; }
        .ol-subtitle { margin-top:1rem; font-family:'JetBrains Mono',monospace; font-size:0.9rem; color:#64748b; max-width:680px; line-height:1.7; animation:olFadeUp 0.6s ease 0.2s both; }
        .ol-hero-meta { display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:2rem; animation:olFadeUp 0.6s ease 0.3s both; }

        .ol-hr { border:none; border-top:1px solid rgba(255,255,255,0.07); margin:1rem 0; }
        .ol-section { padding:3rem 0; }
        .ol-section-label { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#00e5ff; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:0.75rem; }
        .ol-section-title { font-size:1.6rem; font-weight:700; margin-bottom:2.5rem; letter-spacing:-0.01em; }

        /* SPECS */
        .specs-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; margin-bottom:2rem; }
        .spec-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.4rem; transition:border-color 0.2s; }
        .spec-card:hover { border-color:rgba(34,197,94,0.3); }
        .spec-icon   { font-size:1.6rem; margin-bottom:0.7rem; display:block; }
        .spec-label  { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.3rem; }
        .spec-value  { font-size:1.1rem; font-weight:700; color:#22c55e; margin-bottom:0.3rem; }
        .spec-detail { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#64748b; line-height:1.5; }

        /* ── DIT SCHEMA ──
           Fix mobile : overflow-x:auto + min-width sur le tree
           → structure PC préservée, scroll horizontal sur petits écrans */
        .dit-schema-wrap {
          background:#10131e; border:1px solid rgba(255,255,255,0.07);
          border-radius:16px; padding:2.5rem; position:relative;
          overflow-x:auto; /* scroll horizontal mobile */
        }
        .dit-schema-wrap::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%,rgba(34,197,94,0.04),transparent 60%); pointer-events:none; border-radius:16px; }
        .dit-root {
          display:flex; flex-direction:column; align-items:center;
          min-width:700px; /* empêche le collapse sur mobile */
          position:relative;
        }
        .dit-node { background:#141825; border-radius:10px; padding:0.7rem 1.2rem; border:1px solid rgba(255,255,255,0.07); text-align:center; font-family:'JetBrains Mono',monospace; font-size:0.78rem; font-weight:600; white-space:nowrap; transition:border-color 0.2s; display:inline-block; }
        .dit-node:hover { border-color:rgba(34,197,94,0.4); }
        .dn-dc    { border-color:rgba(34,197,94,0.5);  color:#22c55e; animation:pulseLdap 3s infinite; }
        .dn-ou    { border-color:rgba(0,229,255,0.3);  color:#00e5ff; }
        .dn-cn    { border-color:rgba(168,85,247,0.3); color:#a855f7; }
        .dn-app   { border-color:rgba(245,158,11,0.3); color:#f59e0b; }
        @keyframes pulseLdap { 0%{box-shadow:0 0 0 0 rgba(34,197,94,0.3)} 70%{box-shadow:0 0 0 8px rgba(34,197,94,0)} 100%{box-shadow:0 0 0 0 rgba(34,197,94,0)} }

        .dit-connector-v { width:2px; height:24px; background:linear-gradient(to bottom,rgba(34,197,94,0.4),rgba(0,229,255,0.4)); margin:0 auto; }
        .dit-children { display:flex; gap:2rem; justify-content:center; align-items:flex-start; position:relative; }
        .dit-children::before { content:''; position:absolute; top:0; left:10%; right:10%; height:2px; background:linear-gradient(to right,transparent,rgba(0,229,255,0.3),transparent); }
        .dit-child { display:flex; flex-direction:column; align-items:center; gap:0; }
        .dit-child-connector { width:2px; height:20px; background:rgba(0,229,255,0.3); margin:0 auto; }
        .dit-grandchildren { display:flex; gap:0.75rem; margin-top:0; }
        .dit-gc { display:flex; flex-direction:column; align-items:center; }
        .dit-gc-connector { width:2px; height:16px; background:rgba(168,85,247,0.3); margin:0 auto; }

        /* hint scroll sur mobile */
        .dit-scroll-hint { display:none; }
        @media(max-width:700px) {
          .dit-scroll-hint { display:block; font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; text-align:center; margin-bottom:0.75rem; }
        }

        /* ── JALONS ── */
        .ol-jalons { display:flex; flex-direction:column; }
        .ol-jalon { display:grid; grid-template-columns:60px 1fr; gap:0 1.5rem; opacity:0; transform:translateX(-20px); transition:opacity 0.5s ease,transform 0.5s ease; }
        .ol-jalon.visible { opacity:1; transform:translateX(0); }
        .ol-jalon-left { display:flex; flex-direction:column; align-items:center; }
        .ol-jalon-num { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:0.95rem; font-weight:700; flex-shrink:0; position:relative; z-index:1; }
        .ol-jalon-num.anim::after { content:''; position:absolute; inset:-4px; border-radius:14px; border:1px dashed currentColor; opacity:0.3; animation:olSpin 8s linear infinite; }
        .ol-jalon-line { width:2px; flex:1; min-height:40px; margin:4px 0; }
        .ol-jalon-body { padding-bottom:2.5rem; }
        .ol-jalon-phase { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.1em; margin-bottom:0.3rem; }
        .ol-jalon-title { font-size:1.15rem; font-weight:700; margin-bottom:0.5rem; }
        .ol-jalon-desc  { font-family:'JetBrains Mono',monospace; font-size:0.82rem; color:#94a3b8; line-height:1.7; margin-bottom:1rem; }
        .ol-tools { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem; }
        .ol-tc { font-family:'JetBrains Mono',monospace; font-size:0.72rem; padding:0.25rem 0.65rem; border-radius:4px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07); color:#64748b; }
        .oj1 .ol-jalon-num { background:rgba(34,197,94,0.12);  border:1px solid rgba(34,197,94,0.4);  color:#22c55e; } .oj1 .ol-jalon-line { background:linear-gradient(to bottom,rgba(34,197,94,0.5),rgba(0,229,255,0.5)); }  .oj1 .ol-jalon-title { color:#22c55e; }
        .oj2 .ol-jalon-num { background:rgba(0,229,255,0.12);  border:1px solid rgba(0,229,255,0.4);  color:#00e5ff; } .oj2 .ol-jalon-line { background:linear-gradient(to bottom,rgba(0,229,255,0.5),rgba(139,92,246,0.5)); }  .oj2 .ol-jalon-title { color:#00e5ff; }
        .oj3 .ol-jalon-num { background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.4); color:#8b5cf6; } .oj3 .ol-jalon-line { background:linear-gradient(to bottom,rgba(139,92,246,0.5),rgba(245,158,11,0.5)); } .oj3 .ol-jalon-title { color:#8b5cf6; }
        .oj4 .ol-jalon-num { background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.4); color:#f59e0b; } .oj4 .ol-jalon-line { background:linear-gradient(to bottom,rgba(245,158,11,0.5),rgba(255,71,87,0.5)); }  .oj4 .ol-jalon-title { color:#f59e0b; }
        .oj5 .ol-jalon-num { background:rgba(255,71,87,0.12);  border:1px solid rgba(255,71,87,0.4);  color:#ff4757; } .oj5 .ol-jalon-line { background:linear-gradient(to bottom,rgba(255,71,87,0.5),rgba(0,255,136,0.5)); }  .oj5 .ol-jalon-title { color:#ff4757; }
        .oj6 .ol-jalon-num { background:rgba(59,130,246,0.12); border:1px solid rgba(59,130,246,0.4); color:#3b82f6; } .oj6 .ol-jalon-line { background:linear-gradient(to bottom,rgba(59,130,246,0.5),rgba(0,255,136,0.5)); }  .oj6 .ol-jalon-title { color:#3b82f6; }
        .oj7 .ol-jalon-num { background:rgba(0,255,136,0.1);   border:1px solid rgba(0,255,136,0.4);  color:#00ff88; } .oj7 .ol-jalon-title { color:#00ff88; }

        /* CODE BLOCK */
        .code-block { background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.07); border-left:3px solid #22c55e; border-radius:0 8px 8px 0; padding:0.75rem 1rem; font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#94a3b8; line-height:1.8; margin:0.75rem 0; white-space:pre-wrap; }
        .kw   { color:#00e5ff; }
        .str  { color:#22c55e; }
        .cmt  { color:#64748b; }
        .attr { color:#f59e0b; }

        /* CLUSTER */
        .cluster-schema { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:2rem; }
        .cluster-row { display:flex; align-items:center; justify-content:center; gap:2rem; flex-wrap:wrap; }
        .cluster-node { background:#141825; border-radius:12px; padding:1.2rem 1.5rem; border:1px solid rgba(255,255,255,0.07); text-align:center; min-width:140px; transition:border-color 0.3s; }
        .cluster-node:hover { border-color:rgba(139,92,246,0.4); }
        .cn-icon  { font-size:1.8rem; display:block; margin-bottom:0.4rem; }
        .cn-label { font-size:0.85rem; font-weight:700; display:block; margin-bottom:0.2rem; }
        .cn-sub   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; display:block; line-height:1.4; }
        .cn-primary { border-color:rgba(34,197,94,0.5); animation:pulseLdap 2.5s infinite; } .cn-primary .cn-label { color:#22c55e; }
        .cn-replica { border-color:rgba(139,92,246,0.4); } .cn-replica .cn-label { color:#8b5cf6; }
        .cluster-arrow { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; text-align:center; }
        .cluster-arrow span { display:block; font-size:1.2rem; margin-bottom:0.2rem; }
        @media(max-width:700px) {
          .cluster-row { flex-direction:column; gap:0; align-items:center; }
          .cluster-arrow span { transform:rotate(90deg); }
        }

        /* APPS */
        .apps-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:1rem; }
        .app-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; transition:border-color 0.2s,transform 0.2s; }
        .app-card:hover { border-color:rgba(34,197,94,0.35); transform:translateY(-2px); }
        .app-header { display:flex; align-items:center; gap:0.85rem; margin-bottom:1rem; }
        .app-icon  { font-size:1.6rem; flex-shrink:0; }
        .app-name  { font-size:0.92rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .app-proto { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#f59e0b; }
        .app-attrs { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.75rem; }
        .attr-chip { font-family:'JetBrains Mono',monospace; font-size:0.65rem; padding:0.15rem 0.5rem; border-radius:3px; background:rgba(34,197,94,0.08); border:1px solid rgba(34,197,94,0.15); color:#22c55e; }
        .app-desc  { font-family:'JetBrains Mono',monospace; font-size:0.73rem; color:#64748b; line-height:1.6; }

        /* PERF TABLE */
        .perf-table { width:100%; border-collapse:separate; border-spacing:0; background:#10131e; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.07); }
        .perf-table th { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; letter-spacing:0.1em; text-transform:uppercase; padding:0.75rem 1rem; background:#141825; text-align:left; border-bottom:1px solid rgba(255,255,255,0.07); }
        .perf-table td { font-family:'JetBrains Mono',monospace; font-size:0.78rem; padding:0.75rem 1rem; border-bottom:1px solid rgba(255,255,255,0.04); color:#94a3b8; }
        .perf-table tr:last-child td { border-bottom:none; }
        .perf-table tr:hover td { background:rgba(255,255,255,0.02); }
        .result-ok   { color:#00ff88; font-weight:700; }
        .result-warn { color:#ffd32a; font-weight:700; }
        @media(max-width:700px) { .perf-table-wrap { overflow-x:auto; } }

        /* METRICS */
        .metrics-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1rem; }
        .metric-card { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:1.5rem; text-align:center; transition:border-color 0.2s; }
        .metric-card:hover { border-color:rgba(34,197,94,0.3); }
        .metric-value { font-family:'JetBrains Mono',monospace; font-size:2rem; font-weight:700; color:#22c55e; display:block; margin-bottom:0.3rem; }
        .metric-label { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#64748b; }

        /* STACK */
        .stack-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:0.75rem; }
        .stack-item { background:#10131e; border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:1rem 1.2rem; display:flex; gap:0.85rem; align-items:center; transition:border-color 0.2s; }
        .stack-item:hover { border-color:rgba(34,197,94,0.2); }
        .stack-icon { font-size:1.4rem; flex-shrink:0; }
        .stack-name { font-size:0.85rem; font-weight:700; display:block; margin-bottom:0.15rem; }
        .stack-role { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:#64748b; }

        @keyframes olFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes olSpin   { to{transform:rotate(360deg)} }
      `}</style>

      <div className="ol-grid-bg" />
      <div className="ol-glow-1" />
      <div className="ol-glow-2" />

      <nav className="ol-nav">
        <div className="ol-nav-inner">
          <span className="ol-nav-logo">KC // Project Reports</span>
          <button className="ol-nav-back" onClick={() => navigate('/#projets')}>← Retour aux projets</button>
        </div>
      </nav>

      <main>
        <div className="ol-container">

          {/* HERO */}
          <section className="ol-hero">
            <div className="ol-hero-eyebrow">
              <span className="tag tag-ldap">📁 Annuaire</span>
              <span className="tag tag-cluster">HA Cluster</span>
              <span className="tag tag-ssl">LDAPS / TLS</span>
            </div>
            <h1 className="ol-h1">Build OpenLDAP<br /><span>Annuaire d'entreprise complet</span></h1>
            <p className="ol-subtitle">
              Conception et déploiement d'un annuaire OpenLDAP from scratch sur cahier des charges réel.<br />
              Cluster haute disponibilité, politiques ppolicy, ACLs granulaires et raccordement SSL de 5 applicatifs métier.
            </p>
            <div className="ol-hero-meta">
              <span className="tag tag-ldap">OpenLDAP 2.6</span>
              <span className="tag tag-cluster">HA / Réplication</span>
              <span className="tag tag-ssl">LDAPS / TLS 1.3</span>
              <span className="tag tag-cyan">DIT Design</span>
              <span className="tag tag-purple">ppolicy / ACLs</span>
              <span className="tag tag-blue">Load Testing</span>
            </div>
          </section>

          <hr className="ol-hr" />

          {/* SPECS */}
          <section className="ol-section">
            <div className="ol-section-label">// Cahier des charges</div>
            <div className="ol-section-title">Exigences du projet</div>
            <div className="specs-grid">
              {[
                { icon:'👥', label:'Volumétrie utilisateurs', value:'15 000 entrées',  detail:'Utilisateurs actifs + comptes de service + groupes imbriqués' },
                { icon:'⚡', label:'Performance cible',       value:'500 req/sec',     detail:'Recherches simultanées en charge — temps de réponse < 10ms' },
                { icon:'🔄', label:'Disponibilité',           value:'99.9% SLA',       detail:'Cluster 1 primaire + 2 réplicas en Multi-Master Replication' },
                { icon:'🔌', label:'Applicatifs raccordés',   value:'5 services',      detail:'Authentification centralisée + consommation d\'attributs en LDAPS' },
                { icon:'🔐', label:'Chiffrement',             value:'TLS 1.3',         detail:'LDAPS port 636 — certificats Let\'s Encrypt / PKI interne' },
                { icon:'📋', label:'Politique de mots de passe', value:'ppolicy',      detail:'Complexité, historique, verrouillage, durée de validité par OU' },
              ].map((s, i) => (
                <div className="spec-card" key={i}>
                  <span className="spec-icon">{s.icon}</span>
                  <div className="spec-label">{s.label}</div>
                  <div className="spec-value">{s.value}</div>
                  <div className="spec-detail">{s.detail}</div>
                </div>
              ))}
            </div>
          </section>

          {/* DIT SCHEMA */}
          <section className="ol-section">
            <div className="ol-section-label">// Conception de l'annuaire</div>
            <div className="ol-section-title">Structure DIT — Directory Information Tree</div>

            {/* hint mobile */}
            <p className="dit-scroll-hint">← Faites glisser pour voir le schéma complet →</p>

            <div className="dit-schema-wrap">
              <div className="dit-root">
                {/* ROOT */}
                <div className="dit-node dn-dc">dc=entreprise,dc=local</div>
                <div className="dit-connector-v" />

                {/* LEVEL 1 */}
                <div className="dit-children">

                  {/* ou=Users */}
                  <div className="dit-child">
                    <div className="dit-node dn-ou">ou=Users</div>
                    <div className="dit-child-connector" />
                    <div className="dit-grandchildren">
                      {['ou=IT','ou=RH','ou=Finance'].map((n,i) => (
                        <div className="dit-gc" key={i}>
                          <div className="dit-gc-connector" />
                          <div className="dit-node dn-cn" style={{fontSize:'0.68rem',padding:'0.4rem 0.7rem'}}>{n}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ou=Groups */}
                  <div className="dit-child">
                    <div className="dit-node dn-ou">ou=Groups</div>
                    <div className="dit-child-connector" />
                    <div className="dit-grandchildren">
                      {['cn=Admins','cn=VPN'].map((n,i) => (
                        <div className="dit-gc" key={i}>
                          <div className="dit-gc-connector" />
                          <div className="dit-node dn-cn" style={{fontSize:'0.68rem',padding:'0.4rem 0.7rem'}}>{n}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ou=Services */}
                  <div className="dit-child">
                    <div className="dit-node dn-ou">ou=Services</div>
                    <div className="dit-child-connector" />
                    <div className="dit-grandchildren">
                      {['cn=gitlab-sa','cn=jenkins-sa'].map((n,i) => (
                        <div className="dit-gc" key={i}>
                          <div className="dit-gc-connector" />
                          <div className="dit-node dn-app" style={{fontSize:'0.68rem',padding:'0.4rem 0.7rem'}}>{n}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ou=Policies */}
                  <div className="dit-child">
                    <div className="dit-node dn-ou">ou=Policies</div>
                    <div className="dit-child-connector" />
                    <div className="dit-grandchildren">
                      {['cn=default','cn=admin-pol'].map((n,i) => (
                        <div className="dit-gc" key={i}>
                          <div className="dit-gc-connector" />
                          <div className="dit-node dn-cn" style={{fontSize:'0.68rem',padding:'0.4rem 0.7rem'}}>{n}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <hr className="ol-hr" />

          {/* JALONS */}
          <section className="ol-section">
            <div className="ol-section-label">// Déroulement du projet</div>
            <div className="ol-section-title">Jalons — Étape par étape</div>
            <div className="ol-jalons">
              {[
                { cls:'oj1', delay:0,   phase:'PHASE 01 — ANALYSE',           title:"Analyse du cahier des charges & design DIT",                  desc:"Analyse des exigences : volumétrie (15 000 entrées), SLA 99.9%, 5 applicatifs à raccorder, politiques de sécurité par département. Conception de l'arborescence DIT (Directory Information Tree) avec modélisation des OUs, classes d'objets, attributs custom (schéma maison). Choix des index LMDB pour optimiser les performances sur les attributs les plus requêtés (uid, mail, memberOf).", tools:['DIT Design','LDAP Schema','objectClass','LMDB Index'] },
                { cls:'oj2', delay:150, phase:'PHASE 02 — DÉPLOIEMENT',        title:"Installation OpenLDAP 2.6 & configuration de base",           desc:"Installation OpenLDAP 2.6 (slapd) sur Debian 12. Configuration du backend LMDB, définition du suffixe et du rootDN. Chargement des schémas standards (core, cosine, inetOrgPerson, ppolicy). Import initial des données via LDIF depuis l'annuaire legacy. Configuration des overlays : memberOf (groupes imbriqués), refint (intégrité référentielle).",
                  code:`# slapd.conf — extrait configuration
database    mdb
maxsize     10737418240  # 10GB
suffix      "dc=entreprise,dc=local"
rootdn      "cn=admin,dc=entreprise,dc=local"
index       uid,mail,cn         eq,pres
index       memberOf,objectClass  eq
overlay     memberof
overlay     refint`, tools:['slapd 2.6','LMDB','LDIF Import','memberOf overlay'] },
                { cls:'oj3', delay:300, phase:'PHASE 03 — HAUTE DISPONIBILITÉ', title:"Cluster Multi-Master Replication (N+2)",                      desc:"Déploiement d'un cluster 3 nœuds en Multi-Master Replication (MirrorMode + Syncrepl). Configuration de la réplication bidirectionnelle entre le nœud primaire et les 2 réplicas. Mise en place du load balancer HAProxy pour distribution des requêtes en lecture. Basculement automatique testé avec temps de reprise < 30 secondes.", tools:['Syncrepl','MirrorMode','HAProxy','Keepalived','VIP'] },
                { cls:'oj4', delay:450, phase:'PHASE 04 — SÉCURITÉ',            title:"TLS 1.3, ppolicy & ACLs granulaires",                         desc:"Activation LDAPS sur port 636 avec TLS 1.3 obligatoire (désactivation TLS 1.0/1.1). Génération et déploiement des certificats via PKI interne. Configuration ppolicy différenciée : utilisateurs standards (90j, 12 car, complexité, lockout 5 essais), comptes admin (60j, 20 car, MFA requis). ACLs granulaires : séparation lecture/écriture par OU, service accounts avec accès minimal aux seuls attributs nécessaires.",
                  code:`# ppolicy — politique admin
pwdMinLength:         20
pwdMaxAge:            5184000  # 60 jours
pwdMaxFailure:        3
pwdLockoutDuration:   1800     # 30 min
pwdInHistory:         24
pwdCheckQuality:      2        # enforce`, tools:['LDAPS','TLS 1.3','ppolicy overlay','ACLs slapd','PKI interne'] },
                { cls:'oj5', delay:600, phase:'PHASE 05 — INTÉGRATION',         title:"Raccordement des 5 applicatifs en LDAPS",                     desc:"Raccordement successif des 5 applicatifs métier : GitLab (SSO LDAP), Jenkins (authentification + groupes), Nextcloud (auth + attributs mail/displayName), OpenVPN (authentification + groupe VPN), Grafana (SSO + rôles par groupe LDAP). Pour chaque applicatif : création d'un service account dédié avec ACLs minimales, test d'authentification, validation des attributs consommés.", tools:['GitLab LDAP','Jenkins','Nextcloud','OpenVPN','Grafana'] },
                { cls:'oj6', delay:750, phase:'PHASE 06 — TESTS DE CHARGE',     title:"Validation volumétrie & tests de performance",                desc:"Import de 15 000 entrées de test (données anonymisées) pour validation de la volumétrie cible. Tests de charge via slamd et ldclt : 500 requêtes/seconde simultanées sur les recherches les plus fréquentes. Mesure des temps de réponse p50/p95/p99. Optimisation des index LMDB suite aux résultats. Validation du basculement cluster sous charge.", tools:['slamd','ldclt','ldapbench','p95 < 8ms'] },
                { cls:'oj7', delay:900, phase:'PHASE 07 — DOCUMENTATION',       title:"Documentation d'exploitation & runbook",                      desc:"Rédaction de la documentation complète : architecture technique, procédures d'administration (ajout utilisateur, reset mot de passe, onboarding applicatif), runbook opérationnel (basculement cluster, restauration sauvegarde, renouvellement certificats), guide de supervision (métriques slapd-monitor, alertes Prometheus/Grafana).", tools:['Confluence','slapd-monitor','Prometheus','Grafana','Runbook'] },
              ].map((j, i, arr) => (
                <div key={i} className={`ol-jalon ${j.cls}`} data-delay={j.delay}>
                  <div className="ol-jalon-left">
                    <div className="ol-jalon-num anim">{String(i+1).padStart(2,'0')}</div>
                    {i < arr.length - 1 && <div className="ol-jalon-line" />}
                  </div>
                  <div className="ol-jalon-body">
                    <div className="ol-jalon-phase">{j.phase}</div>
                    <div className="ol-jalon-title">{j.title}</div>
                    <div className="ol-jalon-desc">{j.desc}</div>
                    {j.code && (
                      <div className="code-block">
                        {j.code.split('\n').map((line, li) => {
                          const styled = line
                            .replace(/(database|maxsize|suffix|rootdn|index|overlay|pwdMinLength|pwdMaxAge|pwdMaxFailure|pwdLockoutDuration|pwdInHistory|pwdCheckQuality)/g, '<kw>$1</kw>')
                            .replace(/(mdb|"[^"]*"|\d{7,}|eq,pres|eq|memberof|refint|\d+)/g, '<str>$1</str>')
                            .replace(/(#.*)/g, '<cmt>$1</cmt>')
                            .replace(/(uid,mail,cn|memberOf,objectClass)/g, '<attr>$1</attr>');
                          return <div key={li} dangerouslySetInnerHTML={{__html: styled}} />;
                        })}
                      </div>
                    )}
                    <div className="ol-tools">
                      {j.tools.map((t, k) => <span className="ol-tc" key={k}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="ol-hr" />

          {/* CLUSTER */}
          <section className="ol-section">
            <div className="ol-section-label">// Architecture haute disponibilité</div>
            <div className="ol-section-title">Cluster Multi-Master — 3 nœuds</div>
            <div className="cluster-schema">
              <div className="cluster-row">
                <div className="cluster-node cn-primary">
                  <span className="cn-icon">🟢</span>
                  <span className="cn-label">ldap-01 (Primary)</span>
                  <span className="cn-sub">Lectures + Écritures</span>
                  <span className="cn-sub">192.168.10.11</span>
                </div>
                <div className="cluster-arrow">
                  <span>⟺</span>
                  <div style={{fontFamily:'monospace',fontSize:'0.6rem',color:'#64748b'}}>Syncrepl<br/>TLS</div>
                </div>
                <div className="cluster-node cn-replica">
                  <span className="cn-icon">🟣</span>
                  <span className="cn-label">ldap-02 (Replica)</span>
                  <span className="cn-sub">Lectures uniquement</span>
                  <span className="cn-sub">192.168.10.12</span>
                </div>
                <div className="cluster-arrow">
                  <span>⟺</span>
                  <div style={{fontFamily:'monospace',fontSize:'0.6rem',color:'#64748b'}}>Syncrepl<br/>TLS</div>
                </div>
                <div className="cluster-node cn-replica">
                  <span className="cn-icon">🟣</span>
                  <span className="cn-label">ldap-03 (Replica)</span>
                  <span className="cn-sub">Lectures uniquement</span>
                  <span className="cn-sub">192.168.10.13</span>
                </div>
              </div>
              <div style={{textAlign:'center',marginTop:'1.5rem',fontFamily:'monospace',fontSize:'0.72rem',color:'#64748b'}}>
                ↑ HAProxy VIP : 192.168.10.10:636 (LDAPS) — Distribution round-robin en lecture / Écriture vers Primary
              </div>
            </div>
          </section>

          <hr className="ol-hr" />

          {/* APPS */}
          <section className="ol-section">
            <div className="ol-section-label">// Intégrations applicatives</div>
            <div className="ol-section-title">5 applicatifs raccordés en LDAPS</div>
            <div className="apps-grid">
              {[
                { icon:'🦊', name:'GitLab',    proto:'LDAPS:636 — bind simple',            attrs:['uid','mail','displayName','memberOf'], desc:"SSO complet + synchronisation des groupes LDAP vers les groupes GitLab. Service account cn=gitlab-sa avec accès ReadOnly sur ou=Users et ou=Groups." },
                { icon:'⚙️', name:'Jenkins',   proto:'LDAPS:636 — LDAP Security Realm',    attrs:['uid','cn','memberOf'],                  desc:"Authentification centralisée + droits Jenkins basés sur les groupes LDAP (cn=Jenkins-Admins → admin, cn=Devs → developer)." },
                { icon:'☁️', name:'Nextcloud', proto:'LDAPS:636 — LDAP User/Group Backend', attrs:['uid','mail','displayName','jpegPhoto'],  desc:"Provisioning automatique des comptes Nextcloud depuis LDAP. Synchronisation des attributs profil (nom, email, avatar) et des groupes de partage." },
                { icon:'🔒', name:'OpenVPN',   proto:'LDAPS:636 — auth-ldap plugin',        attrs:['uid','memberOf'],                       desc:"Authentification VPN conditionnée à l'appartenance au groupe cn=VPN-Users. Refus automatique si l'utilisateur est hors du groupe ou si le compte est verrouillé." },
                { icon:'📊', name:'Grafana',   proto:'LDAPS:636 — LDAP Auth',              attrs:['uid','mail','cn'],                       desc:"SSO Grafana avec mapping de rôles : cn=Monitoring-Admins → Admin Grafana, cn=IT → Editor, autres → Viewer. Session synchronisée avec expiration LDAP." },
              ].map((a, i) => (
                <div className="app-card" key={i}>
                  <div className="app-header">
                    <span className="app-icon">{a.icon}</span>
                    <div><span className="app-name">{a.name}</span><span className="app-proto">{a.proto}</span></div>
                  </div>
                  <div className="app-attrs">{a.attrs.map((at,j) => <span className="attr-chip" key={j}>{at}</span>)}</div>
                  <div className="app-desc">{a.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <hr className="ol-hr" />

          {/* PERF TABLE */}
          <section className="ol-section">
            <div className="ol-section-label">// Tests de performance</div>
            <div className="ol-section-title">Résultats — Validation cahier des charges</div>
            <div className="perf-table-wrap">
              <table className="perf-table">
                <thead>
                  <tr><th>Test</th><th>Cible CdC</th><th>Résultat obtenu</th><th>p95</th><th>Statut</th></tr>
                </thead>
                <tbody>
                  {[
                    { test:'Recherche uid= (charge normale)',         target:'< 10ms',  result:'3.2ms moyen',   p95:'6.8ms',  ok:true,  okp95:true  },
                    { test:'500 requêtes/sec simultanées',            target:'500 req/s', result:'512 req/s',   p95:'9.4ms',  ok:true,  okp95:true  },
                    { test:'Recherche memberOf= (15k entrées)',       target:'< 20ms',  result:'11.7ms moyen',  p95:'18.2ms', ok:true,  okp95:true  },
                    { test:'Basculement cluster (failover)',          target:'< 30s',   result:'18 secondes',   p95:'—',      ok:true,  okp95:null  },
                    { test:'Connexion LDAPS (handshake TLS 1.3)',     target:'< 50ms',  result:'22ms moyen',    p95:'38ms',   ok:true,  okp95:true  },
                    { test:'Réplication inter-nœuds (lag)',          target:'< 1s',    result:'~200ms moyen',  p95:'850ms',  ok:true,  okp95:false },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td>{r.test}</td>
                      <td style={{color:'#64748b'}}>{r.target}</td>
                      <td className={r.ok ? 'result-ok' : 'result-warn'}>{r.result}</td>
                      <td className={r.okp95 === null ? '' : r.okp95 ? 'result-ok' : 'result-warn'}>{r.p95}</td>
                      <td className="result-ok">✓ Validé</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr className="ol-hr" />

          {/* METRICS */}
          <section className="ol-section">
            <div className="ol-section-label">// Résultats &amp; métriques</div>
            <div className="ol-section-title">Impact opérationnel</div>
            <div className="metrics-grid">
              {[
                { value:'15k',   label:'Entrées chargées' },
                { value:'512/s', label:'Requêtes/sec max' },
                { value:'3.2ms', label:'Temps de réponse moyen' },
                { value:'5',     label:'Applicatifs raccordés' },
                { value:'18s',   label:'Failover cluster' },
                { value:'99.9%', label:'SLA atteint' },
              ].map((m, i) => (
                <div className="metric-card" key={i}>
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="ol-hr" />

          {/* STACK */}
          <section className="ol-section">
            <div className="ol-section-label">// Stack technique</div>
            <div className="ol-section-title">Technologies utilisées</div>
            <div className="stack-grid">
              {[
                { icon:'📁', name:'OpenLDAP 2.6',          role:'slapd — Annuaire principal' },
                { icon:'🗄️', name:'LMDB',                  role:'Backend haute performance' },
                { icon:'🔄', name:'Syncrepl / MirrorMode', role:'Réplication Multi-Master' },
                { icon:'⚖️', name:'HAProxy',               role:'Load balancer LDAPS' },
                { icon:'🔐', name:'TLS 1.3 / PKI',         role:'Chiffrement LDAPS' },
                { icon:'📋', name:'ppolicy overlay',        role:'Politiques mot de passe' },
                { icon:'🔬', name:'ldclt / slamd',          role:'Tests de charge' },
                { icon:'📊', name:'slapd-monitor + Prometheus', role:'Supervision' },
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
