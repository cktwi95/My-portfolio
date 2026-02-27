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
  contact: 'Contact'
};


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détection de la section visible avec Intersection Observer pour plus de précision
      const sections = ['accueil', 'competences', 'experience', 'projets', 'contact'];
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
              {['accueil', 'competences', 'experience', 'projets', 'contact'].map((section) => (
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
              {['accueil', 'competences', 'experience', 'projets', 'contact'].map((section) => (
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
          <h2 className="text-4xl font-bold mb-12 text-center">
            Mes <span className="text-cyan-400">Projets</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Projet 1 */}
            <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-900/50 to-slate-800 p-6">
                <Eye className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Test d'Intrusion & Remédiation</h3>
                <p className="text-gray-400">Active Directory - Environnement de production</p>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Audit de sécurité complet d'un environnement Active Directory en production avec identification des vulnérabilités et plan d'action de remédiation.
                </p>
                <ul className="space-y-2 text-sm text-gray-300 mb-4">
                  <li>• Reconnaissance et énumération</li>
                  <li>• Exploitation des vulnérabilités identifiées</li>
                  <li>• Rapport détaillé des failles de sécurité</li>
                  <li>• Plan d'action de remédiation priorisé</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-red-900/30 text-red-300 px-3 py-1 rounded-full">Active Directory</span>
                  <span className="text-xs bg-red-900/30 text-red-300 px-3 py-1 rounded-full">Pentesting</span>
                  <span className="text-xs bg-red-900/30 text-red-300 px-3 py-1 rounded-full">Bloodhound</span>
                </div>
                <button
                  onClick={() => navigate('/projets/pentest-ad')}
                  className="mt-4 w-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                >
                  Découvrir le projet →
                </button>
              </div>
            </div>

            {/* Projet 2 */}
            <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-orange-900/50 to-slate-800 p-6">
                <Bug className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Test d'Intrusion Web</h3>
                <p className="text-gray-400">Application Web - Environnement de production</p>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Audit de sécurité d'une application web en production avec identification des vulnérabilités OWASP Top 10.
                </p>
                <ul className="space-y-2 text-sm text-gray-300 mb-4">
                  <li>• Tests des vulnérabilités OWASP Top 10</li>
                  <li>• Injection SQL, XSS, CSRF</li>
                  <li>• Tests d'authentification et d'autorisation</li>
                  <li>• Rapport détaillé avec preuve de concept</li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-orange-900/30 text-orange-300 px-3 py-1 rounded-full">Web Security</span>
                  <span className="text-xs bg-orange-900/30 text-orange-300 px-3 py-1 rounded-full">Burp Suite</span>
                  <span className="text-xs bg-orange-900/30 text-orange-300 px-3 py-1 rounded-full">OWASP</span>
                </div>
                <button
                  onClick={() => navigate('/projets/pentest-web-aws')}
                  className="mt-4 w-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                >
                  Découvrir le projet →
                </button>
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