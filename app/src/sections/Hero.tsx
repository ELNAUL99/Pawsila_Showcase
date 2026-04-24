import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pawRef = useRef<SVGSVGElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Paw animation
    const pads = pawRef.current?.querySelectorAll("circle");
    if (pads) {
      gsap.set(pads, { scale: 0, transformOrigin: "center" });
      tl.to(pads, {
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Continuous pulse after load
    tl.to(
      pawRef.current,
      {
        scale: 1.05,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      },
      "+=0.2"
    );

    // H1 words stagger
    const words = h1Ref.current?.querySelectorAll("span");
    if (words) {
      gsap.set(words, { y: 30, opacity: 0 });
      tl.to(
        words,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
        },
        "-=1.2"
      );
    }

    // Subtitle
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      tl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
        },
        "-=0.8"
      );
    }

    // CTAs
    const ctaButtons = ctaRef.current?.querySelectorAll("button");
    if (ctaButtons) {
      gsap.set(ctaButtons, { y: 15, opacity: 0 });
      tl.to(
        ctaButtons,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.5"
      );
    }

    // Phones
    if (phoneLeftRef.current) {
      gsap.set(phoneLeftRef.current, { opacity: 0, scale: 0.9 });
      tl.to(
        phoneLeftRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "-=0.4"
      );
    }
    if (phoneRightRef.current) {
      gsap.set(phoneRightRef.current, { opacity: 0, scale: 0.9 });
      tl.to(
        phoneRightRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "-=0.6"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--cream)" }}
    >
      {/* Floating phone left */}
      <div
        ref={phoneLeftRef}
        className="absolute hidden lg:block animate-float-left"
        style={{
          left: "8%",
          top: "18%",
          width: "260px",
          height: "520px",
          borderRadius: "32px",
          border: "8px solid #1A1208",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(26, 61, 43, 0.2)",
          zIndex: 1,
        }}
      >
        <img
          src="/mockup-home.jpg"
          alt="Pawsila Home Screen"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating phone right */}
      <div
        ref={phoneRightRef}
        className="absolute hidden lg:block animate-float-right"
        style={{
          right: "8%",
          bottom: "12%",
          width: "260px",
          height: "520px",
          borderRadius: "32px",
          border: "8px solid #1A1208",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(26, 61, 43, 0.2)",
          zIndex: 1,
        }}
      >
        <img
          src="/mockup-health.jpg"
          alt="Pawsila Health Screen"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Animated Paw */}
        <svg
          ref={pawRef}
          width="80"
          height="80"
          viewBox="0 0 40 40"
          fill="none"
          className="mb-6"
        >
          <circle cx="20" cy="24" r="10" fill="#2D6A4F" />
          <circle cx="10" cy="14" r="5" fill="#2D6A4F" />
          <circle cx="20" cy="8" r="5" fill="#2D6A4F" />
          <circle cx="30" cy="14" r="5" fill="#2D6A4F" />
        </svg>

        {/* H1 */}
        <h1
          ref={h1Ref}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--green-deep)",
          }}
        >
          <span className="inline-block">The</span>{" "}
          <span className="inline-block">Pet</span>{" "}
          <span className="inline-block">Ownership</span>{" "}
          <span className="inline-block">OS</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
          }}
        >
          A full-stack mobile application for health records, reminders, and
          document management — built with React Native, Expo, and Supabase.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollTo("overview")}
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: "var(--amber)",
              color: "white",
              fontFamily: "var(--font-body)",
            }}
          >
            View Case Study
          </button>
          <button
            onClick={() => scrollTo("features")}
            className="px-8 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "var(--green-dark)",
              color: "var(--green-dark)",
              fontFamily: "var(--font-body)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--green-pale)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Explore Features
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
        >
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border-2 flex justify-center pt-1"
          style={{ borderColor: "var(--text-muted)" }}
        >
          <div
            className="w-1.5 h-3 rounded-full animate-bounce"
            style={{ background: "var(--green-mid)" }}
          />
        </div>
      </div>
    </section>
  );
}
