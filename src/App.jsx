import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Code, Network, Terminal, Mail, Linkedin, ChevronDown, Menu, X, Lock, Server, Bug, Eye, Send } from 'lucide-react';

export default function Portfolio() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const sectionLabels = {
  accueil: 'Accueil',
  competences: 'Compétences',
  experience: 'Expérience',
  projets: 'Projets',
  labs: 'Labs',
  contact: 'Contact'
};


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détection de la section visible avec Intersection Observer pour plus de précision
      const sections = ['accueil', 'competences', 'experience', 'projets', 'labs', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let currentSection = 'accueil';
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    // Détection initiale
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Envoi en cours...');
    
    // Configuration Web3Forms (gratuit, illimité)
    // Remplace par ta clé API de web3forms.com
    const accessKey = 'aaf60077-cad5-402e-9105-358e7a5e54fc'; // À obtenir sur web3forms.com
    
    const formDataToSend = new FormData();
    formDataToSend.append('access_key', accessKey);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('subject', `Nouveau message de ${formData.name} - Portfolio`);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus(' Message envoyé avec succès !');
        setTimeout(() => setFormStatus(''), 5000);
      } else {
        setFormStatus(' Erreur lors de l\'envoi. Réessayez.');
        setTimeout(() => setFormStatus(''), 5000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setFormStatus(' Erreur lors de l\'envoi. Réessayez.');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <div className="bg-slate-950 text-gray-100 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold">KC</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['accueil', 'competences', 'experience', 'projets', 'labs', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-cyan-400 transition-colors ${activeSection === section ? 'text-cyan-400' : ''}`}
                >
                {sectionLabels[section]}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['accueil', 'competences', 'experience', 'projets', 'labs', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 capitalize hover:bg-slate-800 rounded-md"
                >
                {sectionLabels[section]}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-slate-950 to-blue-900/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Khaireddine <span className="text-cyan-400">CHERIF</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
            Ingénieur en Cybersécurité
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Spécialisé en cybersécurité offensive et défensive, pentesting, et administration système. 
            4 années d'expérience dans la sécurisation des infrastructures et le traitement d'incidents.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <button onClick={() => scrollToSection('contact')} className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
              <Mail className="w-5 h-5" />
              <span>Me contacter</span>
            </button>
            <button onClick={() => scrollToSection('projets')} className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-6 py-3 rounded-lg transition-colors">
              Voir mes projets
            </button>
          </div>
          <button onClick={() => scrollToSection('competences')} className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-cyan-400 mx-auto" />
          </button>
        </div>
      </section>

      {/* Compétences Section */}
      <section id="competences" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Mes <span className="text-cyan-400">Compétences</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cybersécurité Offensive */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <Bug className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Cybersécurité Offensive</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Pentesting Web & Système</li>
                <li>• Reconnaissance & Énumération</li>
                <li>• Exploitation de vulnérabilités</li>
                <li>• Escalation de privilèges</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Metasploit</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Burp Suite</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Nmap</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Qualys</span>
              </div>
            </div>

            {/* Cybersécurité Défensive */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <Shield className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Cybersécurité Défensive</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Traitement d'incidents</li>
                <li>• Analyse forensique</li>
                <li>• SIEM/SOAR (ELK, QRadar)</li>
                <li>• EDR (SentinelOne, Cybereason)</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">TheHive</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">MISP</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Bloodhound</span>
              </div>
            </div>

            {/* Développement */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <Code className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Développement & Scripting</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Python</li>
                <li>• PowerShell</li>
                <li>• Bash</li>
                <li>• PHP</li>
              </ul>
            </div>


            {/* Systèmes */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <Server className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Systèmes</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Linux (Debian, Ubuntu, RHEL, Kali)</li>
                <li>• Windows Server 2003-2019</li>
                <li>• Active Directory / Azure AD</li>
                <li>• OpenLDAP</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">VMware</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Proxmox</span>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">Ansible</span>
              </div>
            </div>

            {/* Réseau */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <Network className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Réseau & Infrastructure</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Cisco Switch & Router</li>
                <li>• SD-Wan, HA, LB</li>
                <li>• Stormshield</li>
                <li>• Checkpoint/Fortinet</li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <Lock className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Certifications</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ CHFI Computer Hacking Forensic Investigator</li>
                <li>✓ CEH Certified Ethical Hacker</li>
                <li>✓ AWS Security Essentials</li>
                <li>🔄 OSCP En cours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expérience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Mon <span className="text-cyan-400">Expérience</span>
          </h2>

          <div className="space-y-8">
            {/* Expérience la plus récente - Cloud */}
            <div className="bg-slate-800/30 p-6 rounded-xl border-l-4 border-emerald-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-400">Consultant Cloud Sécurité - Reporting Vulnérabilités</h3>
                  <p className="text-xl text-gray-300">Groupe Énergétique International</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">Septembre 2025 - En cours</span>
              </div>
              <p className="text-gray-300 mb-4">CSPM & Reporting de vulnérabilités</p>
              <p className="text-gray-200 mb-4">Contexte anglophone</p>
              <ul className="space-y-2 text-gray-300">
                <li>• Reporting de vulnérabilités via CSPM (Cloud Security Posture Management)</li>
                <li>• AWS Security Hub - Analyse et remontée des findings</li>
                <li>• Google Cloud SCC (Security Command Center) - Monitoring et alerting</li>
                <li>• Reporting hebdomadaire et mensuel des métriques de sécurité</li>
                <li>• Définition et suivi de KPI de sécurité cloud</li>
                <li>• Gestion fonctionnelle et opérationnelle des processus de remédiation</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-emerald-900/30 text-emerald-300 px-3 py-1 rounded-full">AWS Security Hub</span>
                <span className="text-xs bg-emerald-900/30 text-emerald-300 px-3 py-1 rounded-full">Google Cloud SCC</span>
                <span className="text-xs bg-emerald-900/30 text-emerald-300 px-3 py-1 rounded-full">KPI/Metrics Google Data Studio</span>
              </div>
            </div>
            {/* Entreprise 1 */}
            <div className="bg-slate-800/30 p-6 rounded-xl border-l-4 border-cyan-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400">Consultant OpenLDAP</h3>
                  <p className="text-xl text-gray-300">Groupe Énergétique International</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">Mars 2024 - Septembre 2025</span>
              </div>
              <p className="text-gray-300 mb-4">Projet Refonte des annuaires</p>
              <ul className="space-y-2 text-gray-300">
                <li>• Surveillance quotidienne des annuaires OpenLDAP</li>
                <li>• Traitement d'incidents et suivi côté clients RUN</li>
                <li>• Traitement opérationnel des annuaires (ppolicy, ACLs)</li>
                <li>• Interface et intégration des annuaires dans le SOC</li>
                <li>• Accompagnement des équipes Cybersécurité</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full">OpenLDAP</span>
                <span className="text-xs bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full">RHEL Linux</span>
                <span className="text-xs bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full">Stormshield</span>
              </div>
            </div>

            {/* Entreprise 2 */}
            <div className="bg-slate-800/30 p-6 rounded-xl border-l-4 border-blue-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">Consultant en Cybersécurité Opérationnelle</h3>
                  <p className="text-xl text-gray-300">Multinationale Services Environnementaux</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">Février 2023 - Fevrier 2024</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Traitement d'incidents Cyber (Antivirus, EDR, SIEM)</li>
                <li>• Traitement d'alertes provenant d'un SOC</li>
                <li>• Conformité des environnements Infra/réseaux</li>
                <li>• Pilotage des projets Cybersécurité</li>
                <li>• Scans de vulnérabilités avec Qualys et Acunetix</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">Cybereason</span>
                <span className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">QRadar</span>
                <span className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">Qualys</span>
                <span className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full">AWS/Azure</span>
              </div>
            </div>

            {/* Entreprise 3 */}
            <div className="bg-slate-800/30 p-6 rounded-xl border-l-4 border-purple-500">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400">Ingénieur en Cybersécurité</h3>
                  <p className="text-xl text-gray-300">PME Technologique</p>
                </div>
                <span className="text-gray-400 mt-2 md:mt-0">Décembre 2022 - Décembre 2023</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li>• Gestion et Administration du SI</li>
                <li>• Migration vers le cloud</li>
                <li>• Intégration Cybersécurité dans le SI</li>
                <li>• Mise en place SentinelOne et segmentation des flux</li>
                <li>• Tests de pénétration et remédiation (AD, Linux, Bastion)</li>
                <li>• Étude d'intégration SIEM Wazuh/ELK</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">SentinelOne</span>
                <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">Azure AD</span>
                <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">Intune</span>
                <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">Kali Linux</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projets Section */}
      <section id="projets" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Mes <span className="text-cyan-400">Projets</span>
          </h2>
          <p className="text-center text-gray-400 mb-14 font-mono text-sm">
            Réalisations techniques — Offensive · Défensif · Infrastructure
          </p>

          {/* Catégorie : Pentest Offensif */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">// Pentest Offensif</span>
              <div className="flex-1 h-px bg-gradient-to-r from-red-500/30 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">

              {/* Pentest AD */}
              <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-red-500/50 transition-all hover:scale-[1.02] group">
                <div className="bg-gradient-to-br from-red-900/40 to-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Eye className="w-10 h-10 text-red-400" />
                    <span className="font-mono text-xs text-red-400 bg-red-900/30 border border-red-500/20 px-2 py-0.5 rounded">Active Directory</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Test d'Intrusion & Remédiation</h3>
                  <p className="text-gray-400 text-sm font-mono">Environnement de production</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Compromission complète d'un AD en production — de l'accès utilisateur au Domain Admin via LLMNR Poisoning, Pass-the-Hash et Kerberoasting.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-red-900/20 text-red-300 border border-red-500/20 px-2 py-0.5 rounded font-mono">Bloodhound</span>
                    <span className="text-xs bg-red-900/20 text-red-300 border border-red-500/20 px-2 py-0.5 rounded font-mono">Responder</span>
                    <span className="text-xs bg-red-900/20 text-red-300 border border-red-500/20 px-2 py-0.5 rounded font-mono">Mimikatz</span>
                    <span className="text-xs bg-red-900/20 text-red-300 border border-red-500/20 px-2 py-0.5 rounded font-mono">Impacket</span>
                  </div>
                  <button onClick={() => navigate('/projets/pentest-ad')} className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400 px-4 py-2 rounded-lg text-sm transition-all font-mono">
                    Découvrir le projet →
                  </button>
                </div>
              </div>

              {/* Pentest Web AWS */}
              <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all hover:scale-[1.02] group">
                <div className="bg-gradient-to-br from-orange-900/40 to-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Bug className="w-10 h-10 text-orange-400" />
                    <span className="font-mono text-xs text-orange-400 bg-orange-900/30 border border-orange-500/20 px-2 py-0.5 rounded">Web & AWS</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Test d'Intrusion Web & Cloud</h3>
                  <p className="text-gray-400 text-sm font-mono">Application en production</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Audit blackbox → greybox d'une application web. Découverte d'un sous-domaine exposé menant à la compromission complète de l'infrastructure AWS.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-orange-900/20 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded font-mono">Burp Suite</span>
                    <span className="text-xs bg-orange-900/20 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded font-mono">OWASP</span>
                    <span className="text-xs bg-orange-900/20 text-orange-300 border border-orange-500/20 px-2 py-0.5 rounded font-mono">AWS Takeover</span>
                  </div>
                  <button onClick={() => navigate('/projets/pentest-web-aws')} className="w-full border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 px-4 py-2 rounded-lg text-sm transition-all font-mono">
                    Découvrir le projet →
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Catégorie : Blue Team & SOC */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">// Blue Team & SOC</span>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">

              {/* SIEM Wazuh */}
              <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:scale-[1.02]">
                <div className="bg-gradient-to-br from-cyan-900/30 to-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">🛡️</span>
                    <span className="font-mono text-xs text-cyan-400 bg-cyan-900/30 border border-cyan-500/20 px-2 py-0.5 rounded">SIEM</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Build SIEM Wazuh complet</h3>
                  <p className="text-gray-400 text-sm font-mono">On-premise — Detection & Response</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Stack Wazuh from scratch — 47 règles custom MITRE ATT&CK, playbooks Active Response, alerting multicanal. Délai détection &lt; 60s.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-cyan-900/20 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">Wazuh</span>
                    <span className="text-xs bg-cyan-900/20 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">OpenSearch</span>
                    <span className="text-xs bg-cyan-900/20 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">MITRE ATT&CK</span>
                  </div>
                  <button onClick={() => navigate('/projets/siem-wazuh')} className="w-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-4 py-2 rounded-lg text-sm transition-all font-mono">
                    Découvrir le projet →
                  </button>
                </div>
              </div>

              {/* SOAR */}
              <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all hover:scale-[1.02]">
                <div className="bg-gradient-to-br from-indigo-900/30 to-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">⚡</span>
                    <span className="font-mono text-xs text-indigo-400 bg-indigo-900/30 border border-indigo-500/20 px-2 py-0.5 rounded">SOAR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">SOAR TheHive · MISP · OpenCTI</h3>
                  <p className="text-gray-400 text-sm font-mono">Orchestration & Threat Intelligence</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Pipeline alerte → case → enrichissement IOC → contexte ATT&CK → réponse automatisée. MTTR moyen : 4 minutes 32 secondes.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-indigo-900/20 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">TheHive</span>
                    <span className="text-xs bg-indigo-900/20 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">MISP</span>
                    <span className="text-xs bg-indigo-900/20 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">OpenCTI</span>
                  </div>
                  <button onClick={() => navigate('/projets/soar')} className="w-full border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 px-4 py-2 rounded-lg text-sm transition-all font-mono">
                    Découvrir le projet →
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Catégorie : Cloud & Infrastructure */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">// Cloud & Infrastructure</span>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">

              {/* CSPM */}
              <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all hover:scale-[1.02]">
                <div className="bg-gradient-to-br from-purple-900/30 to-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">🔎</span>
                    <div className="flex gap-1">
                      <span className="font-mono text-xs text-orange-400 bg-orange-900/20 border border-orange-500/20 px-2 py-0.5 rounded">AWS</span>
                      <span className="font-mono text-xs text-blue-400 bg-blue-900/20 border border-blue-500/20 px-2 py-0.5 rounded">GCP</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">CSPM Qualys Multi-Cloud</h3>
                  <p className="text-gray-400 text-sm font-mono">Cloud Security Posture Management</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Scanner Qualys on-premise surveillant 24/7 assets AWS & GCP. sur le référentiel CIS Benchmarks v2, détection de défauts de configurations cloud.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-900/20 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded font-mono">Qualys VMDR</span>
                    <span className="text-xs bg-purple-900/20 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded font-mono">CIS Benchmark</span>
                    <span className="text-xs bg-purple-900/20 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded font-mono">Terraform</span>
                  </div>
                  <button onClick={() => navigate('/projets/cspm-qualys')} className="w-full border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 px-4 py-2 rounded-lg text-sm transition-all font-mono">
                    Découvrir le projet →
                  </button>
                </div>
              </div>

              {/* OpenLDAP */}
              <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all hover:scale-[1.02]">
                <div className="bg-gradient-to-br from-green-900/30 to-slate-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">📁</span>
                    <span className="font-mono text-xs text-green-400 bg-green-900/20 border border-green-500/20 px-2 py-0.5 rounded">HA Cluster</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Annuaire OpenLDAP complet</h3>
                  <p className="text-gray-400 text-sm font-mono">15 000 entrées — SLA 99.9%</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Annuaire d'entreprise from scratch sur cahier des charges. Cluster 3 nœuds, LDAPS TLS 1.3, ppolicy, ACLs et 5 applicatifs raccordés. 512 req/s validé.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-green-900/20 text-green-300 border border-green-500/20 px-2 py-0.5 rounded font-mono">OpenLDAP 2.6</span>
                    <span className="text-xs bg-green-900/20 text-green-300 border border-green-500/20 px-2 py-0.5 rounded font-mono">HAProxy</span>
                    <span className="text-xs bg-green-900/20 text-green-300 border border-green-500/20 px-2 py-0.5 rounded font-mono">TLS 1.3</span>
                  </div>
                  <button onClick={() => navigate('/projets/openldap')} className="w-full border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-4 py-2 rounded-lg text-sm transition-all font-mono">
                    Découvrir le projet →
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Labs & Plateformes Section */}
      <section id="labs" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Labs & <span className="text-cyan-400">Plateformes</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 font-mono text-sm">
            Entraînement continu sur environnements réels — Easy · Medium · Realistic
          </p>

          {/* Plateformes CTF */}
          <div className="mb-6">
            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-6">// Plateformes CTF & Pentest Labs</p>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Root-Me */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-xl">⚡</div>
                  <div>
                    <div className="font-bold text-white">Root-Me</div>
                    <div className="text-xs font-mono text-gray-500">root-me.org</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-green-900/30 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono">Easy</span>
                  <span className="text-xs bg-yellow-900/30 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded font-mono">Medium</span>
                </div>
                <div className="mb-1 flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500">Activité</span>
                  <span className="text-xs font-mono text-yellow-400">30%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-1000" style={{width:'30%'}}></div>
                </div>
                <p className="text-xs text-gray-500 font-mono mt-3 leading-relaxed">Web, réseau, cryptographie, forensique — challenges progressifs multi-catégories.</p>
              </div>

              {/* HackTheBox */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center text-xl">🟩</div>
                  <div>
                    <div className="font-bold text-white">HackTheBox</div>
                    <div className="text-xs font-mono text-gray-500">hackthebox.com</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-green-900/30 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono">Easy</span>
                  <span className="text-xs bg-yellow-900/30 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded font-mono">Medium</span>
                  <span className="text-xs bg-red-900/30 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono">Realistic</span>
                </div>
                <div className="mb-1 flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500">Activité</span>
                  <span className="text-xs font-mono text-green-400">60%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000" style={{width:'60%'}}></div>
                </div>
                <p className="text-xs text-gray-500 font-mono mt-3 leading-relaxed">Machines Linux/Windows, Active Directory, pentest infrastructure — scénarios réalistes.</p>
              </div>

              {/* TryHackMe */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-xl">🔴</div>
                  <div>
                    <div className="font-bold text-white">TryHackMe</div>
                    <div className="text-xs font-mono text-gray-500">tryhackme.com</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-green-900/30 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono">Easy</span>
                  <span className="text-xs bg-yellow-900/30 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded font-mono">Medium</span>
                  <span className="text-xs bg-red-900/30 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-mono">Realistic</span>
                </div>
                <div className="mb-1 flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500">Activité</span>
                  <span className="text-xs font-mono text-red-400">75%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000" style={{width:'75%'}}></div>
                </div>
                <p className="text-xs text-gray-500 font-mono mt-3 leading-relaxed">Parcours guidés offensifs & défensifs, SOC, cloud security, red team paths.</p>
              </div>

            </div>
          </div>

          {/* Formations & Académies */}
          <div>
            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-6">// Formations & Académies spécialisées</p>
            <div className="grid md:grid-cols-3 gap-4">

              {/* PortSwigger */}
              <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:border-orange-500/40 transition-all flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-lg flex-shrink-0">🕷️</div>
                <div>
                  <div className="font-bold text-sm text-white mb-0.5">PortSwigger Academy</div>
                  <div className="text-xs font-mono text-orange-400/80 mb-2">portswigger.net/web-security</div>
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">Web app security — SQLi, XSS, SSRF, XXE, IDOR, OAuth, CORS, Business Logic.</p>
                </div>
              </div>

              {/* YesWeHack Dojo */}
              <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:border-purple-500/40 transition-all flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-lg flex-shrink-0">🥷</div>
                <div>
                  <div className="font-bold text-sm text-white mb-0.5">YesWeHack Dojo</div>
                  <div className="text-xs font-mono text-purple-400/80 mb-2">dojo.yeswehack.com</div>
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">Challenges orientés Bug Bounty — approche terrain, vulnérabilités réelles.</p>
                </div>
              </div>

              {/* Offensive Security */}
              <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:border-cyan-500/40 transition-all flex gap-4 items-start">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-lg flex-shrink-0">🎯</div>
                <div>
                  <div className="font-bold text-sm text-white mb-0.5">Offensive Security</div>
                  <div className="text-xs font-mono text-cyan-400/80 mb-2">offsec.com — Préparation OSCP</div>
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">PEN-200, labs PWK — exploitation, post-exploitation, pivoting, rapport pentest.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Contactez-<span className="text-cyan-400">moi</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 text-center">
            Discutons de vos projets en cybersécurité
          </p>

          {/* Formulaire de contact */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 mb-12">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-100"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-100"
                  placeholder="votre.email@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-100 resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Envoyer le message</span>
              </button>

              {formStatus && (
                <div className={`text-center p-4 rounded-lg ${
                  formStatus.includes('✅') 
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300' 
                    : formStatus.includes('❌')
                    ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                    : 'bg-slate-700/50 border border-slate-600 text-gray-300'
                }`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>

          {/* Email centré */}
          <div className="text-center mb-8">
            <a 
              href="mailto:khaireddine.cherif27@gmail.com" 
              className="inline-flex items-center space-x-3 text-cyan-400 hover:text-cyan-300 transition-colors text-lg"
            >
              <Mail className="w-6 h-6" />
              <span>khaireddine.cherif27@gmail.com</span>
            </a>
          </div>

          {/* Lien LinkedIn */}
          <div className="flex justify-center">
            <a 
              href="https://www.linkedin.com/in/khaireddine-cherif-myprofile/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center border border-slate-700 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2026 Khaireddine CHERIF - Ingénieur en Cybersécurité</p>
        </div>
      </footer>
    </div>
  );
}