import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useManifest } from "../lib/useManifest";
import { getAllMixedPhotos } from "../lib/images";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "HP Studio captured our wedding perfectly! Every photo feels like a movie scene. Absolutely stunning work.",
    name: "Rushi & Snehal",
    initial: "R",
    image: "/images/3.jpg",
  },
  {
    text: "The team at HP Studio made our baby photoshoot so special. They captured every little moment perfectly!",
    name: "Priya & Karan",
    initial: "P",
    image: "/images/2.jpg",
  },
  {
    text: "Professional, creative, and fun! Our corporate event photos exceeded all expectations.",
    name: "Ananya & Rohit",
    initial: "A",
    image: "/images/1.jpg",
  },
];

function ReviewForm({ onClose, modalRef }: { onClose: () => void; modalRef: React.RefObject<HTMLDivElement> }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    review: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello HP Studio!\n\nI'd like to share a review:\n\nName: ${formData.name}\nEmail: ${formData.email}\nRating: ${'⭐'.repeat(formData.rating)}\nReview: ${formData.review}\n\nPlease contact me for any details.`;
    const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          window.open(whatsappUrl, '_blank');
          onClose();
        }
      });
    } else {
      window.open(whatsappUrl, '_blank');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "#0d0d0d" }}>
          Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ borderColor: "#FFB936", focusRingColor: "#FFB936" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "#0d0d0d" }}>
          Email *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ borderColor: "#FFB936", focusRingColor: "#FFB936" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "#0d0d0d" }}>
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className="text-2xl"
              style={{ color: star <= formData.rating ? "#FFB936" : "#ddd" }}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "#0d0d0d" }}>
          Your Review *
        </label>
        <textarea
          required
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none"
          style={{ borderColor: "#FFB936", focusRingColor: "#FFB936" }}
          placeholder="Tell us about your experience..."
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 text-sm font-semibold uppercase rounded-full transition-all duration-300 hover:scale-105"
        style={{ backgroundColor: "#FFB936", color: "#0d0d0d" }}
      >
        Send via WhatsApp
      </button>
    </form>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const renderItem = (item: string) => {
    return item.split('&').map((part, i) => (
      i > 0 ? <span key={i}><span style={{ color: '#FFB936' }}>&</span>{part}</span> : part
    ));
  };
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && modalRef.current) {
      gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
    }
  }, [showForm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // ─── Parallax: card floats gently ───
  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { y: 40 }, {
        y: -20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);;

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: "#b8922e" }}>
            Testimonials
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            <span style={{ color: "#0d0d0d" }}>What Our </span>
            <span className="" style={{ color: "#FFB936" }}>Clients</span>
            <span style={{ color: "#0d0d0d" }}> Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          ref={cardRef}
          key={current}
          className="rounded-2xl overflow-hidden grid lg:grid-cols-2 gap-0 transition-all duration-500 animate-[fade-in_0.5s_ease-out] will-change-transform"
          style={{ backgroundColor: "#fdf5dc", boxShadow: "0 20px 60px -20px rgba(212,168,67,0.35)" }}
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-[400px] overflow-hidden">
            <img src={t.image || '/images/wedding-couple-By2WaDyA.jpg'} alt={t.name} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFB936">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ fontFamily: "var(--font-family-poppins)", color: "#333" }}>
              "{t.text}"
            </p>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold" style={{ backgroundColor: "#FFB936", color: "#0d0d0d" }}>
                {t.initial}
              </div>
              <span className="text-lg" style={{ fontFamily: "var(--font-family-poppins)", color: "#0d0d0d" }}>
                {renderItem(t.name)}
              </span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={
                i === current
                  ? { width: 32, height: 8, backgroundColor: "#FFB936" }
                  : { width: 8, height: 8, backgroundColor: "rgba(13,13,13,0.2)" }
              }
            />
          ))}
        </div>

        {/* Review buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-[0.15em] font-semibold uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#0d0d0d", color: "white" }}
          >
            <span className="mr-2">+</span>
            Add Your Review
          </button>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm tracking-[0.15em] font-semibold uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#0d0d0d", color: "white" }}
          >
            <span className="mr-2">G</span>
            Google Review
          </a>
        </div>

        {/* Review Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}>
                  Share Your Review
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <ReviewForm onClose={() => setShowForm(false)} modalRef={modalRef} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
