import { useState, useEffect } from "react";
import {
  ArrowRight,
  Github,
  Mail,
  Code2,
  Sparkles,
  Zap,
  Rocket,
  TrendingUp,
  Users,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "50K+", label: "Developers reached", icon: Users },
    { number: "120+", label: "In-depth articles", icon: BookOpen },
    { number: "4.9★", label: "Community rating", icon: Star },
  ];

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Rotate stats every 3 seconds
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(statInterval);
    };
  }, []);

  const floatingElements = [
    { icon: Code2, delay: 0, position: "top-8 left-16", color: "from-blue-500/20 to-cyan-500/20" },
    { icon: Zap, delay: 200, position: "top-16 right-20", color: "from-purple-500/20 to-pink-500/20" },
    { icon: Sparkles, delay: 400, position: "bottom-12 left-20", color: "from-yellow-500/20 to-orange-500/20" },
    { icon: TrendingUp, delay: 600, position: "bottom-8 right-16", color: "from-green-500/20 to-emerald-500/20" },
  ];

  return (
    <section className="relative h-[50vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Revolutionary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Floating elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <div
            key={index}
            className={cn(
              "absolute w-12 h-12 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-center",
              `bg-gradient-to-br ${element.color}`,
              element.position,
              isVisible && "animate-in fade-in-0 slide-in-from-bottom-8"
            )}
            style={{
              animationDelay: `${element.delay}ms`,
              animationDuration: "1000ms",
              transform: `translateY(${Math.sin((Date.now() + index * 1000) / 2000) * 6}px)`,
            }}
          >
            <Icon className="w-6 h-6 text-white/80" />
          </div>
        );
      })}

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Dynamic status badge */}
          <div
            className={cn(
              "inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20",
              isVisible && "animate-in fade-in-0 slide-in-from-top-4"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="transition-all duration-500">
              {stats[currentStat].number} {stats[currentStat].label}
            </span>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>

          {/* Magnetic headline */}
          <h1
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]",
              isVisible && "animate-in fade-in-0 slide-in-from-bottom-8"
            )}
            style={{ animationDelay: "400ms" }}
          >
            <span className="block text-white mb-2">
              Engineering<br />
              <span className="relative inline-block">
                
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <span className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mastery
                </span>
              </span>
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative">
              Starts Here
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transform scale-x-0 animate-[scale-x-100_1s_ease-out_1.2s_forwards]" />
            </span>
          </h1>

          {/* Killer subtitle */}
          <p
            className={cn(
              "text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed",
              isVisible && "animate-in fade-in-0 slide-in-from-bottom-8"
            )}
            style={{ animationDelay: "600ms" }}
          >
            Battle-tested Coding patterns, Javascript wizardry, System Design, Product Engineering & Management, and architectural secrets.
            <br /><br />
            <span className="font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              No fluff, just pure engineering excellence.
            </span>
            
          </p>

          {/* Social proof & links */}
          <div
            className={cn(
              "flex justify-center items-center gap-6",
              isVisible && "animate-in fade-in-0 slide-in-from-bottom-8"
            )}
            style={{ animationDelay: "1000ms" }}
          >
            {[
              {
                href: "https://github.com/spiderocious/",
                icon: Github,
                label: "GitHub",
              },
              {
                href: "mailto:devferanmi@gmail.com",
                icon: Mail,
                label: "Email",
              },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className={cn(
                  "group flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg"
                )}
                aria-label={social.label}
                style={{ animationDelay: `${1200 + index * 100}ms` }}
              >
                <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{social.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl animate-pulse" />
      <div
        className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-0 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </section>
  );
}