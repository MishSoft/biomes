import { useEffect, useRef, useState } from 'react';
import { biomesData } from './data/biomes';
import './App.css';
import gsap from "gsap";

const GRAY = '#b0b7c3';

export default function App() {
  const [activeBiomes, setActiveBiomes] = useState<Record<string, boolean>>({});

  const mapRef = useRef<SVGSVGElement>(null);

  const toggle = (id: string) => {
    setActiveBiomes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "center center"
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="app-container">
      <div className="map-wrapper">
        <svg
          ref={mapRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 100 3180 1460"
          className="interactive-map"
        >
          <g>
            {biomesData.map((biome) => {
              const isActive = !!activeBiomes[biome.id];

              return (
                <path
                  key={biome.id}
                  id={biome.id}
                  d={biome.d}
                  style={{
                    fill: isActive ? biome.fill : GRAY,
                    transition: 'fill 0.3s ease'
                  }}
                  className="map-path"
                  onClick={() => toggle(biome.id)}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
