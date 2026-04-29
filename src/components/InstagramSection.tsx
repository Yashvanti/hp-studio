import { useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useManifest } from "../lib/useManifest";
import { getAllMixedPhotos } from "../lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function InstagramSection() {
  const manifest = useManifest();
  const items = useMemo(() => {
    const photos = getAllMixedPhotos(manifest).slice(0, 2).map((src, i) => ({
      type: 'image',
      src,
      label: ["Bridal Glow", "Pre-Wedding"][i] ?? "Moments",
      link: "https://instagram.com/hpstudio"
    }));
    const videos = [
      { type: 'video', src: "/videos/instagram1.mp4", label: "Reel", link: "https://www.instagram.com/reel/DW0SoQKjPoi/?igsh=MXVrdTQyOGNheHhicQ==" },
      { type: 'video', src: "/videos/instagram2.mp4", label: "Reel", link: "https://www.instagram.com/reel/DWRhODLk5KT/?igsh=NjExMGdhZTV4d2pw" }
    ];
    return [...photos, ...videos];
  }, [manifest]);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".insta-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Each card has a different parallax speed for a staggered depth effect
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? 1 : -1; // alternate up/down
        gsap.fromTo(card, { y: direction * 40 }, {
          y: direction * -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <section ref={sectionRef} className="pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#1f1f1f" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            <span className="text-white">On </span>
            <span className="" style={{ color: "#FFB936" }}>Instagram</span>
          </h2>
          <a
            href="https://instagram.com/hp_studio_07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-200"
            style={{ color: "#e4329fff" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            @hp_studio_07
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((item, i) => (
            <a
              key={`${item.src}-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-card group relative overflow-hidden rounded-xl block will-change-transform"
              style={{ aspectRatio: "3/4" }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-white text-base md:text-lg italic font-semibold" style={{ fontFamily: "var(--font-family-playfair)" }}>
                  {item.label}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "rgba(212,168,67,0.4)" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/hp_studio_07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-[0.15em] font-semibold uppercase border-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ borderColor: "#FFB936", color: "#FFB936" }}
          >
            Follow on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
