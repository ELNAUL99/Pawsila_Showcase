import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: "React Native", icon: "⚛️" },
  { name: "Expo", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Supabase", icon: "S" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "RevenueCat", icon: "$" },
  { name: "Zustand", icon: "🐻" },
  { name: "Expo Router", icon: "◎" },
];

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badges stagger
      const badges = badgesRef.current?.querySelectorAll("div");
      if (badges) {
        gsap.from(badges, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // SVG draw-in
      const paths = diagramRef.current?.querySelectorAll("line, path");
      const nodes = diagramRef.current?.querySelectorAll("rect");
      if (paths) {
        paths.forEach((path) => {
          const length = (path as SVGGeometryElement).getTotalLength?.() || 200;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        });
      }
      if (nodes) {
        gsap.from(nodes, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: diagramRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "var(--green-deep)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cream)",
            }}
          >
            Technical Architecture
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(254, 250, 244, 0.7)",
            }}
          >
            A modern, type-safe stack designed for scale.
          </p>
        </div>

        {/* Tech badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-white/15 hover:border-white/40"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "default",
              }}
            >
              <span className="text-base">{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="flex justify-center overflow-x-auto">
          <svg
            ref={diagramRef}
            width="700"
            height="400"
            viewBox="0 0 700 400"
            fill="none"
            className="max-w-full"
          >
            {/* Device */}
            <rect x="40" y="160" width="120" height="80" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <text x="100" y="200" textAnchor="middle" fill="rgba(254,250,244,0.9)" fontSize="13" fontFamily="var(--font-body)">User Device</text>

            {/* Arrow to Expo Router */}
            <line x1="160" y1="200" x2="240" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <polygon points="240,200 232,196 232,204" fill="rgba(255,255,255,0.3)" />

            {/* Expo Router */}
            <rect x="240" y="160" width="120" height="80" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <text x="300" y="195" textAnchor="middle" fill="rgba(254,250,244,0.9)" fontSize="12" fontFamily="var(--font-body)">Expo Router</text>
            <text x="300" y="210" textAnchor="middle" fill="rgba(254,250,244,0.6)" fontSize="10" fontFamily="var(--font-body)">File-based</text>

            {/* Arrow to React Native */}
            <line x1="360" y1="200" x2="440" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <polygon points="440,200 432,196 432,204" fill="rgba(255,255,255,0.3)" />

            {/* React Native UI */}
            <rect x="440" y="160" width="120" height="80" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <text x="500" y="195" textAnchor="middle" fill="rgba(254,250,244,0.9)" fontSize="12" fontFamily="var(--font-body)">React Native</text>
            <text x="500" y="210" textAnchor="middle" fill="rgba(254,250,244,0.6)" fontSize="10" fontFamily="var(--font-body)">UI Layer</text>

            {/* Arrow down to Zustand */}
            <line x1="500" y1="240" x2="500" y2="280" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <polygon points="500,280 496,272 504,272" fill="rgba(255,255,255,0.3)" />

            {/* Zustand */}
            <rect x="440" y="280" width="120" height="50" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <text x="500" y="310" textAnchor="middle" fill="rgba(254,250,244,0.9)" fontSize="12" fontFamily="var(--font-body)">Zustand State</text>

            {/* Arrow left to Supabase */}
            <line x1="440" y1="305" x2="360" y2="305" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <polygon points="360,305 368,301 368,309" fill="rgba(255,255,255,0.3)" />

            {/* Supabase */}
            <rect x="240" y="280" width="120" height="50" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <text x="300" y="310" textAnchor="middle" fill="rgba(254,250,244,0.9)" fontSize="12" fontFamily="var(--font-body)">Supabase Client</text>

            {/* Arrow down to PostgreSQL */}
            <line x1="300" y1="330" x2="300" y2="360" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <polygon points="300,360 296,352 304,352" fill="rgba(255,255,255,0.3)" />

            {/* PostgreSQL */}
            <rect x="240" y="360" width="120" height="40" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <text x="300" y="385" textAnchor="middle" fill="rgba(254,250,244,0.8)" fontSize="11" fontFamily="var(--font-body)">PostgreSQL + RLS</text>

            {/* Arrow to RevenueCat */}
            <line x1="360" y1="200" x2="560" y2="100" stroke="rgba(233,146,10,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            <polygon points="560,100 552,102 554,94" fill="rgba(233,146,10,0.4)" />

            {/* RevenueCat */}
            <rect x="560" y="60" width="110" height="40" rx="8" fill="rgba(233,146,10,0.1)" stroke="rgba(233,146,10,0.5)" strokeWidth="1.5" />
            <text x="615" y="85" textAnchor="middle" fill="rgba(254,250,244,0.9)" fontSize="11" fontFamily="var(--font-body)">RevenueCat</text>

            {/* Arrow to Storage */}
            <line x1="560" y1="200" x2="620" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <polygon points="620,200 612,196 612,204" fill="rgba(255,255,255,0.3)" />

            {/* Supabase Storage */}
            <rect x="620" y="160" width="50" height="80" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <text x="645" y="195" textAnchor="middle" fill="rgba(254,250,244,0.8)" fontSize="10" fontFamily="var(--font-body)">Storage</text>
            <text x="645" y="210" textAnchor="middle" fill="rgba(254,250,244,0.6)" fontSize="9" fontFamily="var(--font-body)">Docs</text>
            <text x="645" y="225" textAnchor="middle" fill="rgba(254,250,244,0.6)" fontSize="9" fontFamily="var(--font-body)">Photos</text>

            {/* Notifications */}
            <rect x="40" y="60" width="120" height="40" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <text x="100" y="85" textAnchor="middle" fill="rgba(254,250,244,0.8)" fontSize="11" fontFamily="var(--font-body)">Push Notifications</text>
            <line x1="100" y1="100" x2="100" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
