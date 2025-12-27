import { useState, useEffect, useRef } from "react";
import { clients } from "../data/clients";
import "./Clients.css";

function Clients() {
  const [positions, setPositions] = useState({});
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // === INITIAL POSITIONS ===
  useEffect(() => {
    const newPositions = {};
    const centerX = 175;
    const centerY = 150;

    clients.forEach((client, index) => {
      const angle = (index / clients.length) * Math.PI * 2;
      const radius = 60 + Math.random() * 50;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      newPositions[client.id] = {
        x,
        y,
        baseX: x,
        baseY: y,
        distance: Math.hypot(x - centerX, y - centerY),
      };
    });

    setPositions(newPositions);
  }, []);

  // === WIGGLE ===
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => {
        const time = Date.now() / 1000;
        const updated = {};

        Object.entries(prev).forEach(([id, pos], i) => {
          updated[id] = {
            ...pos,
            x: pos.baseX + Math.sin(time + i) * 3,
            y: pos.baseY + Math.cos(time + i) * 3,
          };
        });

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // === DRAG ===
  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    setOffset(prev => ({
      x: Math.max(-150, Math.min(150, prev.x + e.movementX)),
      y: Math.max(-150, Math.min(150, prev.y + e.movementY)),
    }));
  };

  const handleMouseUp = () => {
    setDragging(false);

    const returnInterval = setInterval(() => {
      setOffset(prev => {
        const x = prev.x * 0.9;
        const y = prev.y * 0.9;

        if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5) {
          clearInterval(returnInterval);
          return { x: 0, y: 0 };
        }

        return { x, y };
      });
    }, 16);
  };

  // === SIZE BASED ON DISTANCE ===
  const getSize = (distance) => {
    const maxDistance = 120;
    const minSize = 50;
    const maxSize = 90;

    const t = Math.min(distance, maxDistance) / maxDistance;
    return maxSize - t * (maxSize - minSize);
  };

  return (
    <section className="clients-section">
      <div
        className="clients-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <h2 className="section-title">ЗАМОВНИКИ</h2>

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

        <div
          className="clients-grid"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
        >
          {clients.map(client => {
            const pos = positions[client.id];
            if (!pos) return null;

            const size = getSize(pos.distance);

            return (
              <a
                key={client.id}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="client-item"
                style={{
                  left: pos.x + "px",
                  top: pos.y + "px",
                  width: size + "px",
                  height: size + "px",
                }}
              >
                <img src={client.avatar} alt={client.name} />
                <span className="client-name">{client.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Clients;
