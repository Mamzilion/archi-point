import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Ruler, 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Award, 
  ArrowRight, 
  X, 
  Calculator,
  Eye,
  Calendar,
  Send,
  Home,
  Check,
  Upload,
  Layers3,
  Sun,
  ShieldCheck,
  Users,
  Target,
  Trophy,
  Filter
} from 'lucide-react';

// --- BASE DE DONNÉES ENRICHIE DES PROJETS ---
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Villa Lumina",
    category: "residential",
    categoryLabel: "Résidentiel",
    location: "Bastos, Yaoundé",
    year: "2024",
    area: "450 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Une résidence contemporaine baignée de lumière naturelle, alliant baies vitrées, parements en pierres locales et structures en bois noble.",
    features: ["Piscine à débordement", "Autonomie solaire 80%", "Espaces ouverts", "Jardin bioclimatique"]
  },
  {
    id: 2,
    title: "Tour Horizon Business",
    category: "commercial",
    categoryLabel: "Tertiaire / Bureaux",
    location: "Bonanjo, Douala",
    year: "2023",
    area: "2 800 m²",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Immeuble tertiaire R+7 à l'architecture dynamique. Façade double peau ventilée pour une performance thermique et acoustique optimale.",
    features: ["Certification Éco-responsable", "Espaces Coworking", "Parking intelligent", "Terrasse panoramique"]
  },
  {
    id: 3,
    title: "Penthouse Ébène",
    category: "interior",
    categoryLabel: "Design d'Intérieur",
    location: "Golf, Yaoundé",
    year: "2024",
    area: "210 m²",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    description: "Aménagement d'intérieur de prestige jouant sur les tons clairs, les textures minérales et les éclairages architecturaux sur-mesure.",
    features: ["Domotique intégrée", "Cuisine en quartz", "Suite pad", "Bar en travertin"]
  },
  {
    id: 4,
    title: "Résidence Les Palmes",
    category: "residential",
    categoryLabel: "Résidentiel",
    location: "Kribi",
    year: "2023",
    area: "620 m²",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    description: "Villa de villégiature haut de gamme surplombant la côte, intégrant la brise marine dans sa conception aéraulique.",
    features: ["Ventilation traversante", "Énergie solaire", "Terrasse Teck", "Accès plage privatif"]
  },
  {
    id: 5,
    title: "Centre Médical Onambélé",
    category: "commercial",
    categoryLabel: "Tertiaire / Santé",
    location: "Odza, Yaoundé",
    year: "2022",
    area: "1 100 m²",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "Structure hospitalière moderne aux lignes apaisantes, conçue pour fluidifier le parcours patient et optimiser la lumière du jour.",
    features: ["Normes PMR", "Isolation acoustique haute", "Panneaux photovoltaïques", "Jardin thérapeutique"]
  },
  {
    id: 6,
    title: "Rendu 3D - Eco-Lodge Sawa",
    category: "3d",
    categoryLabel: "Modélisation 3D",
    location: "Limbe",
    year: "Conception 2024",
    area: "1 500 m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Modélisation hyperréaliste d'un complexe hôtelier éco-responsable intégrant matériaux bio-sourcés et géométrie organique.",
    features: ["Maquette BIM", "Rendus Photoréalistes 8K", "Animation 3D", "Visite VR"]
  },
  {
    id: 7,
    title: "Villa Monolithe",
    category: "residential",
    categoryLabel: "Résidentiel",
    location: "Santa Barbara, Yaoundé",
    year: "2024",
    area: "520 m²",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description: "Conception minimaliste aux lignes épurées et béton ciré apparent. Un volume sculptural parfaitement intégré au relief vertigineux du site.",
    features: ["Brise-soleil orientables", "Toiture végétalisée", "Domotique KNX", "Patio central"]
  },
  {
    id: 8,
    title: "Complexe Commercial Akwa",
    category: "commercial",
    categoryLabel: "Tertiaire / Commercial",
    location: "Akwa, Douala",
    year: "2023",
    area: "3 400 m²",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    description: "Espace marchand & show-room au design futuriste, maximisant le flux piéton et le confort thermique par perforation bioclimatique.",
    features: ["Façade Micro-perforée", "Atrium lumineux", "Boutiques modulables", "Efficacité énergétique A+"]
  },
  {
    id: 9,
    title: "Loft Minimaliste Bois & Verre",
    category: "interior",
    categoryLabel: "Design d'Intérieur",
    location: "Bonapriso, Douala",
    year: "2024",
    area: "180 m²",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    description: "Rénovation complète d'un plateau brut avec cloisons coulissantes en bois d'Iroko et baies panoramiques.",
    features: ["Eclairage indirect LED", "Mobilier sur mesure", "Traitement d'air intégré", "Isolations phoniques phares"]
  }
];

const SERVICES = [
  {
    icon: Compass,
    title: "Conception & Esquisses Bioclimatiques",
    description: "Analyse topographique, études d'ensoleillement et élaboration de concepts architecturaux novateurs adaptés à votre environnement.",
    tag: "Phase Initial"
  },
  {
    icon: Layers,
    title: "Plans Détaillés & Immersion 3D / VR",
    description: "Plans d'exécution d'une précision millimétrique, modélisation 3D photoréaliste et visites virtuelles immersives pour vos projets.",
    tag: "Visualisation"
  },
  {
    icon: Building2,
    title: "Permis de Construire & Conformité Urbanisme",
    description: "Constitution complète des dossiers réglementaires, suivi administratif et conformité rigoureuse aux règles d'urbanisme locales.",
    tag: "Administratif"
  },
  {
    icon: Ruler,
    title: "Pilotage & Supervision de Chantier",
    description: "Direction rigoureuse des travaux, coordination des corps d'état et contrôle qualité continu jusqu'à la remise des clés.",
    tag: "Livraison"
  }
];

const PROCESS_STEPS = [
  { step: "01", title: "Diagnostic & Vision", desc: "Échange approfondi, visite du site et cadrage du cahier des charges fonctionnel et budgétaire." },
  { step: "02", title: "Conception & Visualisation 3D", desc: "Création des esquisses et maquettes 3D interactives pour valider les volumes et les matériaux." },
  { step: "03", title: "Dossier Technique & Autorisations", desc: "Rédaction des plans de structure, devis quantitatifs et dépôt du permis de construire." },
  { step: "04", title: "Chantier & Clé en Main", desc: "Supervision hebdomadaire de la construction jusqu'à la livraison complète sans réserve." }
];

// --- COMPOSANT ANIMATION SCROLL ET PARALLAX ENTRÉE ---
const ScrollReveal = ({ children, className = "", delay = 0, scaleOnScroll = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(0.96);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      });
    }, { threshold: 0.15 });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [delay]);

  useEffect(() => {
    if (!scaleOnScroll) return;

    const handleScroll = () => {
      if (!domRef.current) return;
      const rect = domRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how close the element is to the screen center
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      const computedScale = 0.94 + progress * 0.08; // smooth growth up to 1.02
      setScaleFactor(computedScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleOnScroll]);

  return (
    <div
      ref={domRef}
      style={{
        transform: scaleOnScroll && isVisible 
          ? `scale(${scaleFactor}) translateY(${isVisible ? '0px' : '40px'})` 
          : `translateY(${isVisible ? '0px' : '40px'})`,
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [projectsList] = useState(PROJECTS_DATA);

  // Animation d'ouverture initiale (Convergence des blocs vers le centre)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Form State pour l'estimateur
  const [calcData, setCalcData] = useState({
    type: 'residential',
    surface: 200,
    services: ['plans', '3d'],
    location: 'Yaoundé'
  });

  const filteredProjects = activeFilter === 'all' 
    ? projectsList 
    : projectsList.filter(p => p.category === activeFilter);

  // Calcul d'honoraires
  const calculateEstimate = () => {
    let ratePerSqM = calcData.type === 'residential' ? 25000 : 35000;
    if (calcData.services.includes('suivi')) ratePerSqM += 15000;
    const base = calcData.surface * ratePerSqM;
    return base.toLocaleString('fr-FR');
  };

  const WHATSAPP_NUMBER = "237657572141";

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Bonjour ARCHI-POINT, je souhaite vous contacter au sujet d'un projet (${calcData.type === 'residential' ? 'Résidentiel' : 'Commercial'}) d'environ ${calcData.surface} m² situé à ${calcData.location}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-800 font-sans antialiased selection:bg-amber-600 selection:text-white overflow-x-hidden">
      
      {/* Dynamic CSS animations pour le background premium lumineux */}
      <style>{`
        @keyframes architecturalGrid {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 80px 80px, 40px 40px; }
        }

        @keyframes floatOrbs {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          33% { transform: translate(40px, -50px) scale(1.15); opacity: 0.7; }
          66% { transform: translate(-30px, 30px) scale(0.9); opacity: 0.4; }
        }

        @keyframes rotateDraft {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulseBeam {
          0%, 100% { opacity: 0.2; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.1); }
        }

        .animate-hero-bg {
          background-size: 60px 60px, 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(180, 150, 110, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(180, 150, 110, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(210, 190, 160, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(210, 190, 160, 0.08) 1px, transparent 1px);
          animation: architecturalGrid 25s linear infinite;
        }

        .animate-orb-1 { animation: floatOrbs 14s ease-in-out infinite; }
        .animate-orb-2 { animation: floatOrbs 18s ease-in-out infinite reverse; }
        .animate-spin-slow { animation: rotateDraft 60s linear infinite; }
        .animate-pulse-beam { animation: pulseBeam 4s ease-in-out infinite; }

        /* Animation d'ouverture : Rassemblement depuis les 4 angles vers le centre */
        .opening-fly-left {
          transform: ${isLoaded ? 'translateX(0) scale(1)' : 'translateX(-120px) scale(0.85)'};
          opacity: ${isLoaded ? 1 : 0};
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s ease-out;
        }

        .opening-fly-right {
          transform: ${isLoaded ? 'translateX(0) scale(1)' : 'translateX(120px) scale(0.85)'};
          opacity: ${isLoaded ? 1 : 0};
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s ease-out;
        }

        .opening-fly-top {
          transform: ${isLoaded ? 'translateY(0) scale(1)' : 'translateY(-80px) scale(0.9)'};
          opacity: ${isLoaded ? 1 : 0};
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out;
        }
      `}</style>

      {/* --- NAVBAR PALETTE CLAIRE --- */}
      <nav className={`fixed top-0 left-0 right-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200/80 shadow-sm opening-fly-top`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO LUXE LUMINOSITÉ */}
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="ARCHI-POINT" className="w-11 h-11 object-contain" />
            <div>
              <span className="font-black text-xl tracking-wider text-stone-900 uppercase block leading-tight">
                ARCHI<span className="text-amber-600">-</span>POINT
              </span>
              <span className="text-[9px] text-amber-700 font-bold tracking-widest uppercase block">Cabinet d'Architecture & Urbanisme</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
            <a href="#projets" className="hover:text-amber-600 transition-colors">Réalisations</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">À Propos</a>
            <a href="#expertise" className="hover:text-amber-600 transition-colors">Nos Services</a>
            <a href="#methode" className="hover:text-amber-600 transition-colors">Méthode</a>
            <a href="#estimer" className="hover:text-amber-600 transition-colors">Estimation</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowQuoteCalculator(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-amber-600/20 hover:scale-105 active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Estimer un projet</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION AVEC ANIMATION D'OUVERTURE ET CONVERGENCE --- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#F7F4EE] via-[#FBF9F5] to-white">
        
        {/* GRILLE ARCHITECTURALE DYNAMIQUE */}
        <div className="absolute inset-0 z-0 opacity-70 animate-hero-bg pointer-events-none"></div>

        {/* ORBES ANIMÉS PRONONCÉS EN ARRIÈRE-PLAN */}
        <div className="absolute -top-10 left-1/4 w-[450px] h-[450px] bg-amber-200/50 rounded-full blur-3xl pointer-events-none animate-orb-1"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-stone-300/40 rounded-full blur-3xl pointer-events-none animate-orb-2"></div>
        <div className="absolute -bottom-10 left-1/3 w-[350px] h-[350px] bg-amber-100/60 rounded-full blur-2xl pointer-events-none animate-pulse-beam"></div>

        {/* CERCLE GÉOMÉTRIQUE ARCHITECTURAL EN ROTATION EN FOND */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-amber-900/10 rounded-full pointer-events-none animate-spin-slow hidden lg:flex items-center justify-center">
          <div className="w-[480px] h-[480px] border border-dashed border-amber-800/15 rounded-full"></div>
          <div className="w-[320px] h-[320px] border border-stone-400/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* TEXTE VENANT DE LA GAUCHE (CONVERGENCE SUR L'OUVERTURE DU SITE) */}
            <div className={`lg:col-span-7 space-y-6 opening-fly-left`}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-900 text-xs font-bold shadow-sm backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
                <span>Cabinet d'Architecture de Prestige</span>
                <span className="text-amber-700 font-black border-l border-amber-300 pl-2">ARCHI-POINT</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
                Concevoir l'exception, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-stone-800">
                  façonner votre cadre de vie.
                </span>
              </h1>
              
              <p className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                De l'esquisse créative à la maîtrise d'ouvrage rigoureuse, <strong className="text-stone-900 font-semibold">ARCHI-POINT</strong> sublime vos espaces avec une architecture élégante, lumineuse, moderne et durable.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#projets"
                  className="bg-stone-900 hover:bg-stone-800 text-stone-100 font-bold px-7 py-4 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-stone-900/20 hover:scale-105 active:scale-95"
                >
                  <span>Nos Réalisations</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </a>

                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white hover:bg-stone-50 text-stone-900 font-bold px-6 py-4 rounded-xl text-sm border border-stone-300/80 shadow-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp : +237 6 57 57 21 41</span>
                </a>
              </div>

              {/* STATISTIQUES */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200 max-w-xl">
                <div>
                  <p className="text-3xl font-black text-amber-600">10+</p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">Ans d'Expertise</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-stone-900">50+</p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">Projets Livrés</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-stone-900">100%</p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">Sur-Mesure</p>
                </div>
              </div>

            </div>

            {/* BLOC IMAGE VENANT DE LA DROITE (CONVERGENCE DU SITE) */}
            <div className={`lg:col-span-5 relative opening-fly-right`}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-stone-400/20 rounded-3xl blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" 
                    alt="ARCHI-POINT Design" 
                    className="w-full h-[420px] object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent p-6 text-white">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Projet Phare</span>
                    <h3 className="text-xl font-extrabold text-white">Villa Lumina • Bastos</h3>
                    <p className="text-xs text-stone-200 mt-1">Conception bioclimatique & finitions de prestige</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- GALERIE PORTFOLIO AVEC AGRANDISSEMENT AU DÉFILEMENT ET 03 BOUTONS FILTRES ANIMÉS --- */}
      <section id="projets" className="py-24 bg-white border-t border-stone-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal scaleOnScroll={true}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center md:text-left">
              <div>
                <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Portfolio ARCHI-POINT</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">Nos Réalisations D'Exception</h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">Découvrez notre savoir-faire classé par typologie architecturales.</p>
              </div>

              {/* 03 BOUTONS DE FILTRES ANIMÉS (TOUS, RÉSIDENTIEL, TERTIAIRE / AUTRES) */}
              <div className="flex items-center justify-center gap-2 bg-[#F7F4EE] p-1.5 rounded-2xl border border-stone-300 shadow-inner">
                {[
                  { id: 'all', label: 'Tous les projets', count: projectsList.length },
                  { id: 'residential', label: 'Résidentiel', count: projectsList.filter(p=>p.category==='residential').length },
                  { id: 'commercial', label: 'Tertiaire & 3D', count: projectsList.filter(p=>p.category!=='residential').length },
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative overflow-hidden flex items-center gap-2 ${
                      activeFilter === filter.id 
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105' 
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeFilter === filter.id ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* GRILLE DES PROJETS AVEC EFFET D'AGRANDISSEMENT PROGRESSIF AU SCROLL */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal 
                key={project.id} 
                delay={idx * 100} 
                scaleOnScroll={true}
              >
                <div 
                  onClick={() => setSelectedProject(project)}
                  className="group bg-[#FBF9F5] rounded-2xl border border-stone-200 overflow-hidden cursor-pointer hover:border-amber-600/60 transition-all duration-500 hover:shadow-2xl flex flex-col h-full transform"
                >
                  <div className="relative h-64 overflow-hidden bg-stone-200">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-70"></div>
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-stone-900 border border-stone-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {project.categoryLabel}
                    </span>
                    <div className="absolute bottom-4 right-4 bg-white text-stone-900 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md transform group-hover:translate-y-0 translate-y-2">
                      <Eye className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {project.location} • {project.area}
                      </p>
                      <p className="text-stone-600 text-xs mt-3 line-clamp-2 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-amber-700">
                      <span>Détails & Spécifications</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION "À PROPOS DE NOUS" (SECTION DÉDIÉE) --- */}
      <section id="about" className="py-24 bg-gradient-to-b from-stone-900 to-stone-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal scaleOnScroll={true}>
                <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">À Propos De Le Cabinet</span>
                <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 leading-tight">
                  L'excellence architecturale dédiée à vos plus beaux projets.
                </h2>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-4">
                  Fondé sur des valeurs de créativité, de rigueur et d'intégration bioclimatique, <strong className="text-amber-400">ARCHI-POINT</strong> est un cabinet d'architecture moderne de référence. 
                </p>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Nous concevons des bâtiments qui ne se contentent pas d'occuper l'espace : ils le métamorphosent. En associant technologies 3D de pointe, écologie du bâti et maîtrise stricte des budgets, nous accompagnons particuliers, investisseurs et institutions.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700">
                    <Target className="w-6 h-6 text-amber-500 mb-2" />
                    <h4 className="font-bold text-sm text-white">Notre Vision</h4>
                    <p className="text-stone-400 text-xs mt-1">Créer des espaces durables, intelligents et esthétiquement intemporels.</p>
                  </div>
                  <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700">
                    <Trophy className="w-6 h-6 text-amber-500 mb-2" />
                    <h4 className="font-bold text-sm text-white">Engagements</h4>
                    <p className="text-stone-400 text-xs mt-1">Transparence totale sur les coûts et respect absolu des délais.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
              <ScrollReveal scaleOnScroll={true} delay={200}>
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-3xl opacity-30 blur-xl"></div>
                  <div className="relative rounded-2xl overflow-hidden border border-stone-700 bg-stone-900 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80" 
                      alt="Cabinet Archi-Point" 
                      className="w-full h-[450px] object-cover"
                    />
                    <div className="p-6 bg-stone-900/90 backdrop-blur-md border-t border-stone-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">
                          10+
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base">Années d'Expérience Continu</h4>
                          <p className="text-stone-400 text-xs">Yaoundé • Douala • Kribi • International</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES / EXPERTISE (BOUTIQUE & PREMIUM LIGHT) --- */}
      <section id="expertise" className="py-24 bg-[#F7F4EE] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal scaleOnScroll={true}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Nos Services Experts</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">Un accompagnement architectural global</h2>
              <p className="text-stone-600 text-sm mt-3">
                De l'analyse d'implantation jusqu'à la remise des clés de votre bâtiment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 150} scaleOnScroll={true}>
                  <div className="bg-white p-7 rounded-2xl border border-stone-200 hover:border-amber-500 transition-all duration-300 space-y-4 group shadow-sm hover:shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-700 border border-amber-200 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200">
                          {srv.tag}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors">{srv.title}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed mt-2">{srv.description}</p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-400 group-hover:text-amber-700">
                      <span>Service sur mesure</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- METHODE DE TRAVAIL --- */}
      <section id="methode" className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal scaleOnScroll={true}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Méthodologie Pro</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2">Notre Processus de Création en 4 Étapes</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, index) => (
              <ScrollReveal key={index} delay={index * 120} scaleOnScroll={true}>
                <div className="bg-[#FBF9F5] p-6 rounded-2xl border border-stone-200 relative space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-4xl font-black text-amber-600/30">{item.step}</span>
                  <h3 className="text-base font-bold text-stone-900">{item.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SIMULATEUR ESTIMATEUR DE BUDGET --- */}
      <section id="estimer" className="py-24 bg-gradient-to-br from-[#F7F4EE] via-[#FBF9F5] to-[#F2EDE4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal scaleOnScroll={true}>
            <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              
              <div className="text-center space-y-3 mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                  <Calculator className="w-3.5 h-3.5" />
                  Estimation Instantanée
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Estimez vos honoraires de conception</h2>
                <p className="text-xs sm:text-sm text-stone-600">Évaluez en quelques clics le coût des études architecturales pour votre projet.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">Type de Construction</label>
                    <select 
                      value={calcData.type}
                      onChange={(e) => setCalcData({...calcData, type: e.target.value})}
                      className="w-full bg-[#FBF9F5] border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-medium"
                    >
                      <option value="residential">Résidence Privée / Villa</option>
                      <option value="commercial">Immeuble Commercial / Bureaux</option>
                      <option value="interior">Rénovation & Architecture d'Intérieur</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-700 mb-2">
                      <span>Superficie du Projet :</span>
                      <span className="text-amber-700 font-black">{calcData.surface} m²</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="1000" 
                      step="10"
                      value={calcData.surface}
                      onChange={(e) => setCalcData({...calcData, surface: Number(e.target.value)})}
                      className="w-full accent-amber-600 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">Localisation du Projet</label>
                    <input 
                      type="text"
                      value={calcData.location}
                      onChange={(e) => setCalcData({...calcData, location: e.target.value})}
                      className="w-full bg-[#FBF9F5] border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-medium"
                      placeholder="Ville, Quartier..."
                    />
                  </div>
                </div>

                {/* ESTIMATION BOX */}
                <div className="bg-[#F7F4EE] p-6 sm:p-8 rounded-2xl border border-stone-300 flex flex-col justify-between space-y-6 text-center md:text-left shadow-inner">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Estimation Indicative ARCHI-POINT</span>
                    <div className="text-3xl sm:text-4xl font-black text-amber-700 mt-2">
                      ~ {calculateEstimate()} <span className="text-sm font-semibold text-stone-500">FCFA</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-2">
                      *Inclut plans d'exécution, images 3D et dossier technique.
                    </p>
                  </div>

                  <button 
                    onClick={handleWhatsAppContact}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Envoyer cette demande au +237 6 57 57 21 41</span>
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 border-t border-stone-800 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center font-black text-xs">
              A
            </div>
            <span className="font-bold text-white uppercase text-sm tracking-wider">ARCHI-POINT</span>
          </div>

          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} ARCHI-POINT Cabinet d'Architecture. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4 text-xs text-stone-300 font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Yaoundé / Douala</span>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-500" /> +237 6 57 57 21 41
            </a>
          </div>
        </div>
      </footer>

      {/* --- MODAL DETAIL PROJET --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col animate-fade-in">
            <div className="relative h-64 sm:h-80 bg-stone-200">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 text-stone-900 p-2 rounded-full hover:bg-white transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {selectedProject.categoryLabel}
                </span>
                <span className="text-xs text-stone-500 font-semibold">{selectedProject.year}</span>
              </div>

              <h2 className="text-2xl font-bold text-stone-900">{selectedProject.title}</h2>
              <p className="text-xs text-amber-700 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {selectedProject.location} • Superficie : {selectedProject.area}
              </p>

              <p className="text-stone-600 text-sm leading-relaxed">{selectedProject.description}</p>

              <div className="pt-4 border-t border-stone-200 space-y-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Atouts architecturaux</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.features.map((ft, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour ARCHI-POINT, je souhaite discuter d'un projet similaire à : ${selectedProject.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Demander une étude pour ce type de projet (+237 6 57 57 21 41)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CALCULATEUR --- */}
      {showQuoteCalculator && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setShowQuoteCalculator(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-700 font-bold">
              <Calculator className="w-5 h-5" />
              <h3 className="text-lg text-stone-900">Simulation Rapide ARCHI-POINT</h3>
            </div>

            <p className="text-xs text-stone-600">
              Ajustez la superficie globale pour estimer les honoraires d'études de conception.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-stone-700 font-bold block mb-1">Superficie projetée (m²)</label>
                <input 
                  type="number" 
                  value={calcData.surface} 
                  onChange={(e) => setCalcData({...calcData, surface: Number(e.target.value)})}
                  className="w-full bg-[#FBF9F5] border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-semibold"
                />
              </div>

              <div className="p-4 bg-[#F7F4EE] rounded-2xl border border-stone-300 text-center">
                <span className="text-[11px] text-stone-500 font-bold block">Honoraires estimatifs d'études</span>
                <span className="text-2xl font-black text-amber-700">{calculateEstimate()} FCFA</span>
              </div>

              <button 
                onClick={() => { setShowQuoteCalculator(false); handleWhatsAppContact(); }}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Confirmer cette estimation sur WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}