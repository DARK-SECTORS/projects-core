import "./Portfolio.css";
import { useState, useEffect, useRef } from "react";
import { portfolio } from "../data/portfolio";

function Portfolio() {
  const [pausedRows, setPausedRows] = useState({
    row1: true,
    row2: true,
    row3: true
  });

  const [timers, setTimers] = useState({
    row1: null,
    row2: null,
    row3: null
  });

  const [activeVideo, setActiveVideo] = useState(null);
  const scrollRefs = useRef({});

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setPausedRows({
        row1: false,
        row2: false,
        row3: false
      });
    }, 3000);

    return () => clearTimeout(startTimer);
  }, []);

  const handleScroll = (rowId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wrapper = e.currentTarget;
    wrapper.scrollLeft += e.deltaY * 0.5;

    setPausedRows(prev => ({ ...prev, [rowId]: true }));

    if (timers[rowId]) {
      clearTimeout(timers[rowId]);
    }

    const timer = setTimeout(() => {
      if (!activeVideo || !activeVideo.includes(rowId)) {
        setPausedRows(prev => ({ ...prev, [rowId]: false }));
      }
    }, 3000);

    setTimers(prev => ({ ...prev, [rowId]: timer }));
  };

  // Для вертикальної колонки дублюємо більше разів
  const duplicateItems = (items, times = 2) => {
    const result = [];
    for (let i = 0; i < times; i++) {
      result.push(...items);
    }
    return result;
  };

  const centerVideo = (videoElement, rowId) => {
    const wrapper = scrollRefs.current[rowId];
    if (!wrapper) return;

    const itemRect = videoElement.parentElement.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    
    const scrollLeft = wrapper.scrollLeft + itemRect.left - wrapperRect.left - (wrapperRect.width / 2) + (itemRect.width / 2);
    
    wrapper.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  const handleVideoClick = (videoId, videoElement, rowId) => {
    if (activeVideo === videoId) {
      videoElement.pause();
      videoElement.muted = true;
      videoElement.currentTime = 0;
      setActiveVideo(null);
      
      setTimeout(() => {
        setPausedRows(prev => ({ ...prev, [rowId]: false }));
      }, 3000);
      return;
    }

    if (activeVideo) {
      const prevVideo = document.querySelector(`[data-video-id="${activeVideo}"]`);
      if (prevVideo) {
        prevVideo.pause();
        prevVideo.muted = true;
        prevVideo.currentTime = 0;
      }
    }

    setPausedRows(prev => ({ ...prev, [rowId]: true }));
    centerVideo(videoElement, rowId);

    setTimeout(() => {
      videoElement.muted = false;
      videoElement.play();
      setActiveVideo(videoId);
    }, 300);
  };

  const handleVideoEnded = (rowId) => {
    setActiveVideo(null);
    
    setTimeout(() => {
      setPausedRows(prev => ({ ...prev, [rowId]: false }));
    }, 3000);
  };

  // Блокування середньої кнопки миші
  const handleMouseDown = (e) => {
    if (e.button === 1) {
      e.preventDefault();
    }
  };

  return (
    <section className="portfolio-section">
      <h2 className="portfolio-main-title">PORTFOLIO</h2>
      
      <div className="portfolio-bg">
        
        {/* 3D Graphics */}
        <div className="portfolio-row">
          <h3 className="row-title">3D GRAPHICS</h3>
          <div className="scroll-container">
            <div 
              className="scroll-wrapper" 
              ref={el => scrollRefs.current['row1'] = el}
              onWheel={(e) => handleScroll('row1', e)}
              onMouseDown={handleMouseDown}
            >
              <div className={`portfolio-scroll scroll-left ${pausedRows.row1 ? 'paused' : ''}`}>
                {duplicateItems(portfolio.graphics3d).map((item, i) => {
                  const videoId = `3d-${i}`;
                  const isActive = activeVideo === videoId;
                  
                  return (
                    <div 
                      key={i} 
                      className={`portfolio-item ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (!isActive) {
                          const video = e.currentTarget.querySelector('video');
                          handleVideoClick(videoId, video, 'row1');
                        }
                      }}
                    >
                      <video 
                        data-video-id={videoId}
                        src={item.video} 
                        loop={false}
                        muted 
                        playsInline
                        preload="metadata"
                        controls={isActive}
                        onEnded={() => handleVideoEnded('row1')}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Video Editing */}
        <div className="portfolio-row">
          <h3 className="row-title">VIDEO EDITING</h3>
          <div className="scroll-container">
            <div 
              className="scroll-wrapper"
              ref={el => scrollRefs.current['row2'] = el}
              onWheel={(e) => handleScroll('row2', e)}
              onMouseDown={handleMouseDown}
            >
              <div className={`portfolio-scroll scroll-right ${pausedRows.row2 ? 'paused' : ''}`}>
                {duplicateItems(portfolio.videoEditing).map((item, i) => {
                  const videoId = `video-${i}`;
                  const isActive = activeVideo === videoId;
                  
                  return (
                    <div 
                      key={i} 
                      className={`portfolio-item ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (!isActive) {
                          const video = e.currentTarget.querySelector('video');
                          handleVideoClick(videoId, video, 'row2');
                        }
                      }}
                    >
                      <video 
                        data-video-id={videoId}
                        src={item.video} 
                        loop={false}
                        muted 
                        playsInline
                        preload="metadata"
                        controls={isActive}
                        onEnded={() => handleVideoEnded('row2')}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical */}
        <div className="portfolio-row portfolio-row-vertical">
          <h3 className="row-title">VERTICAL</h3>
          <div className="scroll-container">
            <div 
              className="scroll-wrapper"
              ref={el => scrollRefs.current['row3'] = el}
              onWheel={(e) => handleScroll('row3', e)}
              onMouseDown={handleMouseDown}
            >
              <div className={`portfolio-scroll scroll-left ${pausedRows.row3 ? 'paused' : ''}`}>
                {duplicateItems(portfolio.vertical, 4).map((item, i) => {
                  const videoId = `vertical-${i}`;
                  const isActive = activeVideo === videoId;
                  
                  return (
                    <div 
                      key={i} 
                      className={`portfolio-item vertical ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (!isActive) {
                          const video = e.currentTarget.querySelector('video');
                          handleVideoClick(videoId, video, 'row3');
                        }
                      }}
                    >
                      <video 
                        data-video-id={videoId}
                        src={item.video} 
                        loop={false}
                        muted 
                        playsInline
                        preload="metadata"
                        controls={isActive}
                        onEnded={() => handleVideoEnded('row3')}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Portfolio;