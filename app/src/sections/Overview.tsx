import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "45+", label: "Commits", icon: "🌿" },
    { number: "31", label: "PRs Merged", icon: "🔀" },
    { number: "12", label: "Screens Built", icon: "📱" },
  ];

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "var(--cream-alt)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column */}
        <div ref={leftRef}>
          <span
            className="text-xs uppercase tracking-[2px] font-semibold mb-4 block"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--green-mid)",
            }}
          >
            Case Study
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--green-deep)",
            }}
          >
            Every pet deserves organized care
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-primary)",
            }}
          >
            Pawsila is a mobile operating system for pet owners. It centralizes
            health records, vaccination schedules, vet visit logs, and document
            storage into one secure, shareable hub. I designed and built the
            entire stack — from the React Native interface to the Supabase
            backend with Row-Level Security.
          </p>

          {/* Stats */}
          <div className="flex gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--cream)",
                  border: "1px solid var(--border-color)",
                  minWidth: "100px",
                }}
              >
                <span className="text-2xl mb-1">{stat.icon}</span>
                <span
                  className="text-2xl md:text-3xl font-extrabold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--green-deep)",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-xs md:text-sm mt-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-muted)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Phone Mockup */}
        <div ref={rightRef} className="relative flex justify-center">
          <div
            className="relative"
            style={{
              width: "300px",
              height: "600px",
              borderRadius: "36px",
              border: "10px solid #1A1208",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(26, 61, 43, 0.25)",
            }}
          >
            <img
              src="/mockup-onboarding.jpg"
              alt="Pawsila Onboarding"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating notification card */}
          <div
            className="absolute -bottom-4 -right-4 md:right-8 p-4 rounded-xl shadow-lg"
            style={{
              background: "var(--green-pale)",
              border: "1px solid var(--green-mid)",
              minWidth: "180px",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--amber)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--green-dark)" }}
              >
                Reminder
              </span>
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--green-deep)" }}
            >
              Rabies vaccine due in 14 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
