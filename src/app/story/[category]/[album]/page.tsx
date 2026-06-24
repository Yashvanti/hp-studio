"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../../../components/Navbar";

gsap.registerPlugin(ScrollTrigger);
import Footer from "../../../../components/Footer";
import WhatsAppButton from "../../../../components/WhatsAppButton";
import { useManifest } from "../../../../lib/useManifest";
import {
  CATEGORY_LABELS,
  PUBLIC_CATEGORIES,
  IMAGES_PER_PAGE,
  getAlbumDetails,
  albumDisplayName,
  type CategoryKey,
} from "../../../../lib/images";

export default function StoryPage() {
  const { category, album } = useParams() as { category: string; album: string };
  const manifest = useManifest();
  const cat = category as CategoryKey;
<<<<<<< HEAD
<<<<<<< HEAD
  const videoList = manifest.categories[cat]?.albums[album]?.videos || [];
  const videoSrc = videoList[0] || manifest.categories[cat]?.videos?.[0] || "/wedding-video.mp4";
  const videoIndex = videoList.indexOf(videoSrc);
=======
  const videoSrc = manifest.categories[cat]?.albums[album]?.video || manifest.categories[cat]?.video || "/wedding-video.mp4";
>>>>>>> b5905f9 (Fresh clean commit)
=======
  const videoList = manifest.categories[cat]?.albums[album]?.videos || [];
  const videoSrc = videoList[0] || manifest.categories[cat]?.videos?.[0] || "/wedding-video.mp4";
  const videoIndex = videoList.indexOf(videoSrc);
>>>>>>> 70848b6 (Update contact details, instagram, portfolio filters, add shweta-pranav pre-wedding photos, remove large video files from tracking)
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const albumDetails = useMemo(() => getAlbumDetails(manifest, cat, album), [manifest, cat, album]);
  const [activeEvent, setActiveEvent] = useState<string>("All");

<<<<<<< HEAD
  const renderItem = (item: string) => {
    return item.split('&').map((part, i) => (
      i > 0 ? <span key={i}><span style={{ color: '#FFB936' }}>&</span>{part}</span> : part
    ));
  };

=======
>>>>>>> b5905f9 (Fresh clean commit)
  const eventsList = useMemo(() => {
    if (!albumDetails?.events) return [];
    return Object.keys(albumDetails.events);
  }, [albumDetails]);

  const allPhotos = useMemo(() => {
    if (!albumDetails) return [];
    const photos: string[] = [];
    if (activeEvent === "All") {
<<<<<<< HEAD
      // For wedding category, prioritize "wedding" event photos
      if (cat === "wedding" && albumDetails.events) {
        const eventEntries = Object.entries(albumDetails.events);
        for (const [key, evphotos] of [...eventEntries.filter(([k]) => k.toLowerCase() === "wedding"),
            ...eventEntries.filter(([k]) => k.toLowerCase() !== "wedding")]) {
          photos.push(...evphotos);
        }
      } else {
        photos.push(...(albumDetails.photos || []));
        if (albumDetails.events) {
          for (const evphotos of Object.values(albumDetails.events)) {
            photos.push(...evphotos);
          }
        }
=======
      photos.push(...(albumDetails.photos || []));
      if (albumDetails.events) {
        for (const evphotos of Object.values(albumDetails.events)) {
          photos.push(...evphotos);
        }
>>>>>>> b5905f9 (Fresh clean commit)
      }
    } else if (albumDetails.events && albumDetails.events[activeEvent]) {
      photos.push(...albumDetails.events[activeEvent]);
    }
    return photos;
<<<<<<< HEAD
  }, [albumDetails, activeEvent, cat]);
=======
  }, [albumDetails, activeEvent]);
>>>>>>> b5905f9 (Fresh clean commit)

  const [page, setPage] = useState(1);
  const visiblePhotos = useMemo(
    () => allPhotos.slice(0, page * IMAGES_PER_PAGE),
    [allPhotos, page],
  );
  const hasMore = visiblePhotos.length < allPhotos.length;

  const displayName = useMemo(() => albumDisplayName(album, cat), [album, cat]);

  // Hero cover photos (up to 4 for the collage)
  const heroPhotos = useMemo(() => {
    if (!albumDetails) return [];
    const photos = [...(albumDetails.photos || [])];
    if (albumDetails.events) {
<<<<<<< HEAD
      // For wedding category, prioritize "wedding" event photos
      if (cat === "wedding") {
        const eventEntries = Object.entries(albumDetails.events);
        for (const [key, evphotos] of [...eventEntries.filter(([k]) => k.toLowerCase() === "wedding"),
            ...eventEntries.filter(([k]) => k.toLowerCase() !== "wedding")]) {
          photos.push(...evphotos);
        }
      } else {
        for (const evphotos of Object.values(albumDetails.events)) {
          photos.push(...evphotos);
        }
      }
    }
    return photos.slice(0, 4);
  }, [albumDetails, cat]);
=======
      for (const evphotos of Object.values(albumDetails.events)) {
        photos.push(...evphotos);
      }
    }
    return photos.slice(0, 4);
  }, [albumDetails]);
>>>>>>> b5905f9 (Fresh clean commit)

  // GSAP animations
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
<<<<<<< HEAD
      ); 
=======
      );
>>>>>>> b5905f9 (Fresh clean commit)
    }
  }, []);

  // Parallax Scroll Effect for Hero Background
  useEffect(() => {
    if (!sectionRef.current || !heroBgRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        scale: 1.15,
        yPercent: 5,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current && visiblePhotos.length) {
      const cards = gridRef.current.querySelectorAll(".photo-card");
      // Only animate newly added cards
      const startIdx = Math.max(0, (page - 1) * IMAGES_PER_PAGE);
      const newCards = Array.from(cards).slice(startIdx);
      if (newCards.length) {
        gsap.fromTo(
          newCards,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
        );
      }
    }
  }, [visiblePhotos.length, page]);

<<<<<<< HEAD
<<<<<<< HEAD
  const [lightbox, setLightbox] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const currentVideoSrc = videoList[currentVideo] || videoSrc;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoSrc]);

  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videoList.length);
  const prevVideo = () => setCurrentVideo((prev) => (prev - 1 + videoList.length) % videoList.length);

=======
  // Lightbox state
  const [lightbox, setLightbox] = useState<number | null>(null);

>>>>>>> b5905f9 (Fresh clean commit)
=======
  const [lightbox, setLightbox] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const currentVideoSrc = videoList[currentVideo] || videoSrc;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideoSrc]);

  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videoList.length);
  const prevVideo = () => setCurrentVideo((prev) => (prev - 1 + videoList.length) % videoList.length);

>>>>>>> 70848b6 (Update contact details, instagram, portfolio filters, add shweta-pranav pre-wedding photos, remove large video files from tracking)
  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: "#faf5eb" }}>
      <Navbar />

      {/* ─── Video Section ─── */}
      <section className="pt-20 md:pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="relative">
          <video
            ref={videoRef}
            className="w-full h-[600px] object-cover rounded-xl"
            src={currentVideoSrc}
            controls
            autoPlay
            muted
            playsInline
            poster="/images/wedding-couple-By2WaDyA.jpg"
            onError={() => console.log('Video failed to load:', currentVideoSrc)}
          />
            {videoList.length > 1 && (
              <>
                <button
                  onClick={prevVideo}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextVideo}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {videoList.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentVideo(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${i === currentVideo ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
=======
=======
          <div className="relative">
>>>>>>> 70848b6 (Update contact details, instagram, portfolio filters, add shweta-pranav pre-wedding photos, remove large video files from tracking)
          <video
            ref={videoRef}
            className="w-full h-[600px] object-cover rounded-xl"
            src={currentVideoSrc}
            controls
            autoPlay
            muted
            playsInline
            poster="/images/wedding-couple-By2WaDyA.jpg"
            onError={() => console.log('Video failed to load:', currentVideoSrc)}
          />
<<<<<<< HEAD
>>>>>>> b5905f9 (Fresh clean commit)
=======
            {videoList.length > 1 && (
              <>
                <button
                  onClick={prevVideo}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextVideo}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {videoList.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentVideo(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${i === currentVideo ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
>>>>>>> 70848b6 (Update contact details, instagram, portfolio filters, add shweta-pranav pre-wedding photos, remove large video files from tracking)
        </div>
      </section>

      {/* ─── Album Details Section ─── */}
      <section className="pt-4 md:pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "#b8922e" }}>
            {CATEGORY_LABELS[cat] ?? category}
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-family-playfair)", color: "#0d0d0d" }}
          >
<<<<<<< HEAD
            {renderItem(displayName)}
=======
            {displayName}
>>>>>>> b5905f9 (Fresh clean commit)
          </h1>

          {/* ─── Events Filter ─── */}
          {eventsList.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-4 mb-2">
              {["All", ...eventsList].map((ev) => (
                <button
                  key={ev}
                  onClick={() => { setActiveEvent(ev); setPage(1); }}
                  className="px-5 py-2 tracking-widest text-[10px] md:text-xs font-semibold uppercase border rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: activeEvent === ev ? "#FFB936" : "rgba(13,13,13,0.2)",
                    backgroundColor: activeEvent === ev ? "#FFB936" : "transparent",
                    color: activeEvent === ev ? "#0d0d0d" : "#555",
                  }}
                >
                  {ev === "All" ? "All Photos" : ev.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          )}

          <p className="mt-4 text-neutral-600 text-xs md:text-sm tracking-widest">
            {allPhotos.length} TOTAL PHOTOS
          </p>
        </div>
      </section>



      {/* ─── Photo Grid with Load More ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 pt-8">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {visiblePhotos.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="photo-card group relative overflow-hidden rounded-xl cursor-pointer will-change-transform"
              style={{ aspectRatio: "425/475", boxShadow: "0 4px 20px -8px rgba(0,0,0,0.15)" }}
              onClick={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 0.9,
                  duration: 0.2,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.inOut",
                  onComplete: () => setLightbox(i),
                });
              }}
            >
              <img
                src={src}
                alt={`${displayName} — photo ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {/* Zoom icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Load More button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-10 py-3 text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#0d0d0d",
                color: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Load More ({allPhotos.length - visiblePhotos.length} remaining)
            </button>
          </div>
        )}

        {allPhotos.length === 0 && manifest.total > 0 && (
          <p className="text-center text-neutral-500 py-12">
            No photos found for this album.
          </p>
        )}

        {/* Back to portfolio */}
        <div className="text-center mt-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm tracking-wider transition-colors duration-200"
            style={{ color: "#b8922e" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            onClick={() => setLightbox(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {lightbox < visiblePhotos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={visiblePhotos[lightbox]}
            alt={`${displayName} — photo ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wider">
            {lightbox + 1} / {visiblePhotos.length}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
