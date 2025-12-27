import "./YoutubeProjects.css";
import { useRef, useEffect, useState } from "react";
import { youtubeProjects } from "../data/youtube";

function YoutubeProjects() {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollPos = 0;
    let animationFrame;

    const autoScroll = () => {
      if (isAutoScrolling && scrollContainer) {
        scrollPos += 0.5;
        scrollContainer.scrollTop = scrollPos;
        
        if (scrollPos >= scrollContainer.scrollHeight / 2) {
          scrollPos = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoScrolling]);

  const handleScroll = () => {
    setIsAutoScrolling(false);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const timeout = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 10000);

    setScrollTimeout(timeout);
  };

  const handleVideoClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section className="youtube-section">
      <div className="youtube-container">
        <h2 className="section-title">
          <span className="youtube-word">YOUTUBE</span> ПРОЕКТИ
        </h2>

        <svg className="dashed-border" width="100%" height="100%">
          <rect 
            x="1" 
            y="1" 
            width="calc(100% - 2px)" 
            height="calc(100% - 2px)" 
            rx="25" 
            fill="none" 
            stroke="rgba(255,255,255,0.12)" 
            strokeWidth="2"
            strokeDasharray="18 28"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="92"
              dur="10s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        
        <div className="youtube-scroll" ref={scrollRef} onScroll={handleScroll}>
          {[...youtubeProjects, ...youtubeProjects, ...youtubeProjects].map((project, i) => (
            <div 
              key={i} 
              className="youtube-card"
              onClick={() => handleVideoClick(project.videoUrl)}
            >
              <img src={project.thumbnail} alt={project.title} />
              <div className="play-overlay">▶</div>
            </div>
          ))}
        </div>

        <div className="fade-top"></div>
        <div className="fade-bottom"></div>
      </div>
    </section>
  );
}

export default YoutubeProjects;