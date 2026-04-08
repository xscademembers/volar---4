import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Activity, 
  Cpu, 
  Database, 
  Drone as DroneIcon, 
  Layers, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  ArrowRight,
  Globe,
  BarChart3,
  Bot
} from 'lucide-react';
import LenisProvider from './components/LenisProvider';
import DigitalTwin from './components/DigitalTwin';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const opportunityRef = useRef<HTMLDivElement>(null);
  const whatYouGetRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Scroll Choreography
    const ctx = gsap.context(() => {
      // Hero Pinning
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".hero-content", {
            opacity: 1 - self.progress * 2,
            y: -self.progress * 100,
            overwrite: "auto"
          });
        }
      });

      // Opportunity Transitions - Camera Dolly Simulation
      gsap.fromTo(".opp-visual", 
        { scale: 1.5, filter: "blur(20px)", opacity: 0 },
        { 
          scale: 1, 
          filter: "blur(0px)", 
          opacity: 1,
          scrollTrigger: {
            trigger: opportunityRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          }
        }
      );

      // Timeline Ribbon Animation
      gsap.fromTo(".timeline-ribbon",
        { x: "100%" },
        {
          x: "-50%",
          scrollTrigger: {
            trigger: whyRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // What You Get - Module Assembly
      gsap.fromTo(".module-item",
        { scale: 0.8, opacity: 0, filter: "blur(10px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: whatYouGetRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: true,
          }
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <LenisProvider>
      <main ref={mainRef} className="relative bg-industrial-dark overflow-hidden">
        <DigitalTwin />
        
        {/* Neural Grid Overlay */}
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-20">
          <div className="absolute inset-0 industrial-grid" />
          <motion.div 
            animate={{ 
              background: [
                "radial-gradient(circle at 50% 50%, rgba(0,242,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(0,242,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(0,242,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(0,242,255,0.1) 0%, transparent 50%)"
              ] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-industrial-teal rounded-sm flex items-center justify-center">
              <Layers className="text-industrial-dark w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase">Volar Alta</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest opacity-70">
            <a href="#" className="hover:text-industrial-teal transition-colors">Platform</a>
            <a href="#" className="hover:text-industrial-teal transition-colors">Solutions</a>
            <a href="#" className="hover:text-industrial-teal transition-colors">Intelligence</a>
            <a href="#" className="hover:text-industrial-teal transition-colors">About</a>
          </div>
          <button className="px-5 py-2 bg-white text-industrial-dark text-xs font-bold uppercase tracking-widest rounded-full hover:bg-industrial-teal transition-all">
            Get Access
          </button>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-content text-center max-w-4xl z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-industrial-teal/30 bg-industrial-teal/5 text-industrial-teal text-[10px] font-mono uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-industrial-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-industrial-teal"></span>
              </span>
              Next-Gen Industrial Intelligence
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter">
              THE DIGITAL TWIN <br />
              <span className="text-industrial-teal italic">EVOLVED.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Autonomous robotic perception meets enterprise-grade AI cognition. 
              We don't just inspect; we predict the future of your assets.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="group relative px-8 py-4 bg-industrial-teal text-industrial-dark font-bold uppercase tracking-widest text-sm rounded-full flex items-center gap-2 hover:scale-105 transition-all overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Explore the System
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white/20 skew-x-12"
                />
              </button>
              <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/5 transition-all">
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Background Elements */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll to Initialize</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-industrial-teal to-transparent"></div>
          </div>
        </section>

        {/* Opportunity Section */}
        <section ref={opportunityRef} className="min-h-screen py-32 px-6 relative industrial-grid">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  FROM PHYSICAL CRACKS <br />
                  TO <span className="text-industrial-teal">PREDICTIVE MODELS.</span>
                </h2>
                <p className="text-lg text-white/50 mb-12 max-w-xl">
                  Traditional inspection is reactive. Volar Alta transforms raw robotic data into 
                  a living industrial nervous system, identifying anomalies before they become failures.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Activity, title: "Real-time Telemetry", desc: "Live data streams from autonomous crawlers and drones." },
                    { icon: ShieldCheck, title: "Anomaly Detection", desc: "AI models trained on 500k+ hours of industrial footage." },
                    { icon: Zap, title: "Instant Action", desc: "Automated work orders generated from predictive insights." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-lg bg-industrial-gray flex items-center justify-center group-hover:bg-industrial-teal/20 transition-colors">
                        <item.icon className="w-6 h-6 text-industrial-teal" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-white/40">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="opp-visual relative aspect-square">
                <div className="absolute inset-0 bg-industrial-teal/10 rounded-3xl border border-industrial-teal/20 overflow-hidden">
                  {/* Simulated Scan Pulse */}
                  <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-1 bg-industrial-teal/50 shadow-[0_0_20px_rgba(0,242,255,0.8)] z-10"
                  />
                  <img 
                    src="https://picsum.photos/seed/industrial/800/800" 
                    alt="Industrial Asset" 
                    className="w-full h-full object-cover grayscale opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-industrial-teal/30 rounded-full animate-pulse flex items-center justify-center">
                      <div className="w-48 h-48 border border-industrial-teal/20 rounded-full animate-ping" />
                    </div>
                  </div>
                </div>
                {/* Floating UI Elements */}
                <div className="absolute -top-6 -right-6 glass p-4 rounded-xl max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-industrial-teal animate-pulse" />
                    <span className="text-[10px] font-mono uppercase">System Healthy</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-industrial-teal" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Efficiency", value: "40%", label: "Reduction in downtime" },
                { title: "Safety", value: "100%", label: "Remote inspection coverage" },
                { title: "Cost", value: "3.5x", label: "ROI on maintenance spend" }
              ].map((stat, i) => (
                <div key={i} className="opp-card glass p-8 rounded-2xl border-l-4 border-l-industrial-teal">
                  <h3 className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">{stat.title}</h3>
                  <div className="text-5xl font-bold mb-2 text-glow">{stat.value}</div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section ref={whatYouGetRef} className="py-32 px-6 bg-industrial-gray/30">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">THE INTELLIGENCE STACK</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              A full-spectrum platform that bridges the gap between field robotics and executive decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Bot, title: "Autonomous Fleet", desc: "Proprietary drones and crawlers designed for extreme environments." },
              { icon: Cpu, title: "Edge Processing", desc: "Real-time AI inference at the point of inspection." },
              { icon: Database, title: "Digital Archive", desc: "Every asset, every inspection, searchable and version-controlled." },
              { icon: BarChart3, title: "Insight Engine", desc: "Advanced analytics that turn data into actionable maintenance plans." }
            ].map((module, i) => (
              <div key={i} className="module-item glass p-8 rounded-3xl hover:bg-white/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <module.icon className="w-7 h-7 text-industrial-teal" />
                </div>
                <h3 className="text-xl font-bold mb-4">{module.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Volar Alta - Timeline */}
        <section ref={whyRef} className="py-32 px-6 relative overflow-hidden">
          {/* Timeline Ribbon Background */}
          <div className="timeline-ribbon absolute top-1/2 left-0 w-[200%] h-32 bg-industrial-teal/5 border-y border-industrial-teal/10 -rotate-6 pointer-events-none flex items-center gap-20 whitespace-nowrap opacity-50">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-4xl font-display font-bold text-industrial-teal/20 uppercase tracking-tighter">
                Field-First Intelligence • 500,000+ Hours • Autonomous Perception • 
              </span>
            ))}
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              <div className="flex-1">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">6 YEARS OF <br />FIELD-FIRST AI.</h2>
                <div className="space-y-12 relative">
                  <div className="absolute left-0 top-0 w-[1px] h-full bg-white/10 ml-6" />
                  {[
                    { year: "2020", title: "Inception", desc: "Founded with a mission to digitize heavy industry." },
                    { year: "2022", title: "Scale", desc: "50+ facilities across India and Europe integrated." },
                    { year: "2024", title: "Intelligence", desc: "Launch of the Volar AI predictive engine." },
                    { year: "2026", title: "Future", desc: "Autonomous digital twins for global infrastructure." }
                  ].map((milestone, i) => (
                    <div key={i} className="relative pl-20 group">
                      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-industrial-dark border border-white/20 flex items-center justify-center z-10 group-hover:border-industrial-teal transition-colors">
                        <div className="w-2 h-2 rounded-full bg-industrial-teal" />
                      </div>
                      <span className="text-industrial-teal font-mono text-sm mb-2 block">{milestone.year}</span>
                      <h4 className="text-2xl font-bold mb-2">{milestone.title}</h4>
                      <p className="text-white/40">{milestone.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/ind1/400/600" alt="Field" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/ind2/400/400" alt="Field" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="h-48 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/ind3/400/400" alt="Field" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="h-64 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://picsum.photos/seed/ind4/400/600" alt="Field" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By - Logo Rail */}
        <section className="py-20 border-y border-white/5">
          <div className="px-6 mb-10 text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40">Trusted by Global Leaders</span>
          </div>
          <div className="flex overflow-hidden group">
            <div className="flex gap-20 animate-marquee group-hover:pause">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-full" />
                  <span className="font-display font-bold text-2xl uppercase tracking-tighter">Enterprise {i}</span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={`dup-${i}`} className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-white/10 rounded-full" />
                  <span className="font-display font-bold text-2xl uppercase tracking-tighter">Enterprise {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roundtable Section */}
        <section className="py-32 px-6 relative overflow-hidden bg-industrial-gray/20">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="glass p-12 md:p-20 rounded-[40px] border-industrial-teal/20 relative overflow-hidden">
              {/* Background Morphing Nodes */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-industrial-teal rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-industrial-teal rounded-full blur-[150px] animate-pulse delay-1000" />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                  <div className="inline-block px-4 py-1 rounded-full border border-industrial-teal/30 text-industrial-teal text-[10px] font-mono uppercase tracking-widest mb-8">
                    Executive Roundtable
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                    ECOSYSTEM INTELLIGENCE <br />
                    BEYOND THE <span className="text-industrial-teal italic">PRODUCT.</span>
                  </h2>
                  <p className="text-lg text-white/50 mb-10">
                    We bring together industry leaders, policy makers, and AI researchers to define 
                    the standards for autonomous industrial safety.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                      <Globe className="w-5 h-5 text-industrial-teal" />
                      <span className="text-sm font-bold">Mumbai Geo-Node</span>
                    </div>
                    <div className="px-6 py-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                      <Globe className="w-5 h-5 text-industrial-teal" />
                      <span className="text-sm font-bold">Station F, Paris</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="glass p-8 rounded-3xl border-l-4 border-l-industrial-teal">
                    <p className="text-xl italic mb-6 text-white/80">
                      "Volar Alta isn't just providing data; they're providing the cognitive layer 
                      our infrastructure has been missing for decades."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-industrial-teal/20" />
                      <div>
                        <div className="font-bold">Chief Technical Officer</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">Global Energy Corp</div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-4 border border-industrial-teal/30 rounded-2xl text-industrial-teal font-bold uppercase tracking-widest text-xs hover:bg-industrial-teal/10 transition-all flex items-center justify-center gap-2">
                    Download Policy Report <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter">
              READY TO ACTIVATE <br />
              <span className="text-industrial-teal">YOUR TWIN?</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
              Join the elite facilities already using Volar Alta to redefine industrial safety and efficiency.
            </p>
            <button className="px-12 py-6 bg-industrial-teal text-industrial-dark font-bold uppercase tracking-[0.2em] text-sm rounded-full hover:scale-110 transition-all shadow-[0_0_40px_rgba(0,242,255,0.3)]">
              Request a Consultation
            </button>
          </div>
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-industrial-teal rounded-sm flex items-center justify-center">
                <Layers className="text-industrial-dark w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tighter uppercase">Volar Alta</span>
            </div>
            <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest opacity-40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">
              © 2026 Volar Alta. All Rights Reserved.
            </div>
          </div>
        </footer>
      </main>
    </LenisProvider>
  );
}
