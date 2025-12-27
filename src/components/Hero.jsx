import { useEffect, useState } from "react";
import "./hero.css";

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const maxScroll = 600;
  const progress = Math.min(scrollY / maxScroll, 1);

  const translateY = progress * -120;
  const scale = 1.25 - progress * 0.15;
  const opacity = 1 - progress * 0.5;
  const blur = progress * 10;

  return (
    <>
      <section
        id="hero"
        className="hero-fixed"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          filter: `blur(${blur}px)`,
          pointerEvents: progress > 0.8 ? 'none' : 'auto',
        }}
      >
        <div className="hero-inner">

          <div className="hero-video pop-video">
            <div className="video-frame">
              <video
                src="https://res.cloudinary.com/db0dkwbrh/video/upload/v1766835486/PROMO_1_aphj5f.mp4"
                controls
                preload="metadata"
              />
            </div>
          </div>

          <div className="hero-text pop-text">
            <div className="text-bg">
              <p className="hero-desc">
                СЬОГОДНІ МОНТАЖ — ЦЕ НЕ ПРОСТО СКЛЕЙКА КАДРІВ, А ІНСТРУМЕНТ,
                ЯКИЙ УТРИМУЄ УВАГУ, ФОРМУЄ ЕМОЦІЇ І НАПРЯМУ ВПЛИВАЄ НА РІСТ ПРОЄКТУ
              </p>

              <h2 className="hero-title">
                ПРАЦЮЮ В ТАКИХ НАПРЯМКАХ:
              </h2>

              <div className="hero-areas">
                <span>3D ГРАФІКА</span>
                <span className="dot">●</span>
                <span>АНІМАЦІЇ / ВІЗУАЛ</span>
                <span className="dot">●</span>
                <span>MOTION ДИЗАЙН</span>
                <span className="dot">●</span>
                <span>CGI</span>
              </div>
            </div>
          </div>

        </div>

        <div className="divider-line" />
      </section>

      <div style={{ height: '100vh' }} />
    </>
  );
}

export default Hero;