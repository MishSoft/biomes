import { useRef, useState, useEffect } from 'react';
import BiomesMap from './components/biomes/BiomesMap';
import { biomesInfo } from './data/biomesInfo';
import { PopUp } from './components/PopUp';

const App = () => {
  const allIds = biomesInfo.map(b => b.id);
  const [selectedBiomes, setSelectedBiomes] = useState<string[]>(allIds);
  const isAllSelected = selectedBiomes.length === biomesInfo.length;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosstion, setScrollPosition] = useState({ left: false, right: true });

  const [activeBiome, setActiveBiome] = useState<{
    name: string;
    color: string;
    x: number;
    clickX: number;
    y: number;
    position: 'top' | 'bottom' | 'left-side' | 'right-side'
  } | null>(null);

  const handleBiomeSelect = (id: string, e: React.MouseEvent | null = null) => {
    const biome = biomesInfo.find(item => item.id === id);

    if (biome) {
      if (activeBiome && activeBiome.name === biome.name && e !== null) {
        return;
      }

      const isButtonClick = document.activeElement?.tagName === 'BUTTON';
      if (activeBiome && activeBiome.name === biome.name && e === null && isButtonClick) {
        return;
      }

      setSelectedBiomes([id]);

      if (e) {
        const rect = e.currentTarget.closest('.relative-container')?.getBoundingClientRect();

        if (rect) {
          const rawX = e.clientX - rect.left;
          const rawY = e.clientY - rect.top;

          const popupHalfWidth = 145;
          const padding = 10;

          const isRightSide = rawX < popupHalfWidth + padding;
          const isLeftSide = rawX > rect.width - popupHalfWidth - padding;

          const position: 'top' | 'bottom' | 'left-side' | 'right-side' = isRightSide
            ? 'right-side'
            : isLeftSide
              ? 'left-side'
              : rawY < 160
                ? 'bottom'
                : 'top';

          const finalX = isRightSide ? rawX + 16 : isLeftSide ? rawX - 16 : rawX;

          setActiveBiome({
            name: biome.name,
            color: biome.color,
            x: finalX,
            clickX: rawX,
            y: rawY,
            position
          });
        }
      }
      else {
        const mapContainer = document.querySelector('.relative-container');
        const biomePaths = document.querySelectorAll(`#${id} path`);

        if (mapContainer && biomePaths.length > 0) {
          const containerRect = mapContainer.getBoundingClientRect();

          const randomIndex = Math.floor(Math.random() * biomePaths.length);
          const randomPath = biomePaths[randomIndex];
          const pathRect = randomPath.getBoundingClientRect();

          const pathCenterX = (pathRect.left + pathRect.width / 2) - containerRect.left;
          const pathCenterY = (pathRect.top + pathRect.height / 2) - containerRect.top;

          const popupHalfWidth = 145;
          const padding = 10;

          const isRightSide = pathCenterX < popupHalfWidth + padding;
          const isLeftSide = pathCenterX > containerRect.width - popupHalfWidth - padding;

          const position: 'top' | 'bottom' | 'left-side' | 'right-side' = isRightSide
            ? 'right-side'
            : isLeftSide
              ? 'left-side'
              : pathCenterY < 160
                ? 'bottom'
                : 'top';

          const finalX = isRightSide ? pathCenterX + 16 : isLeftSide ? pathCenterX - 16 : pathCenterX;

          setActiveBiome({
            name: biome.name,
            color: biome.color,
            x: finalX,
            clickX: pathCenterX,
            y: pathCenterY,
            position
          });
        }
      }
    }
  };

  useEffect(() => {
    if (!activeBiome) return;

    const handleResize = () => {
      const currentBiome = biomesInfo.find(b => b.name === activeBiome.name);
      if (currentBiome) {
        handleBiomeSelect(currentBiome.id, null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeBiome]);

  const handleAllSelectAll = () => {
    if (!isAllSelected) {
      setSelectedBiomes(allIds);
      setActiveBiome(null);
    }
  };

  const handleClosePopUp = () => {
    setSelectedBiomes(allIds);
    setActiveBiome(null);
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition({
        left: scrollLeft > 0,
        right: scrollLeft + clientWidth < scrollWidth - 1
      });
    }
  };

  const handleScrollUpdate = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setScrollPosition({
        left: scrollLeft > 0,
        right: scrollLeft + clientWidth < scrollWidth - 1
      });
    }
  };

  return (
    <div className="flex min-h-screen gap-0 bg-[#eeeeee] font-sans text-[#1a1a1a] overflow-x-hidden">
      <div className="flex-1 flex flex-col min-w-0 md:p-4 w-full box-border max-w-348 mx-auto">

        {/* რუკის კონტეინერი */}
        <div className="relative after:absolute after:w-full after:h-full mt-10 after:top-0 after:bg-transparent md:after:hidden relative-container w-full h-auto max-w-331 mx-auto [&_svg]:w-full [&_svg]:h-auto [&_svg]:block [&_g[id]]:transition-all [&_g[id]]:duration-250">
          <BiomesMap onBiomeSelect={(id, e) => handleBiomeSelect(id, e)} selectedBiomes={selectedBiomes} />

          {activeBiome && (
            <PopUp
              selectBiomeName={activeBiome.name}
              effectColor={activeBiome.color}
              onClose={handleClosePopUp}
              x={activeBiome.x}
              clickX={activeBiome.clickX}
              y={activeBiome.y}
              position={activeBiome.position}
            />
          )}

          {/* მობილურის ლინკი */}
          <div className='sm:hidden absolute right-4 z-50'>
            {activeBiome && (
              <a href='/' className='flex items-center gap-2 border border-[#E0E0E0] bg-white rounded-xl p-3'>
                <span className='flex items-center gap-2 leading-7.5 text-[13px] font-semibold'>ბიომის გვერდი
                  <img src="/icons/mobile_link_iconr.svg" alt="" className='w-3 h-3' />
                </span>
                <span className='w-1.75 h-1.75 rounded-full shrink-0'
                  style={{ backgroundColor: activeBiome.color }}
                ></span>
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center mt-5 w-full max-w-full box-border">
          <div className="py-2 pr-4 pl-4 lg:border-t lg:border-r border-gray-500 shrink-0">
            <button
              onClick={handleAllSelectAll}
              className={`w-18.25 h-9 ${selectedBiomes.length < allIds.length ? "bg-[#E6E6E6]" : "bg-[#008645]"} font-bold rounded-[100px] border-none outline-none text-white cursor-pointer flex justify-center items-center gap-1.5 `}
            >
              <span className={`w-2 h-2 rounded-[100px] ${selectedBiomes.length < allIds.length ? "bg-white opacity-70" : "bg-[#E6E6E6]"}`}></span>
              <span className={`${selectedBiomes.length < allIds.length ? "text-[#666666]" : "text-white"} text-[12px]`}>ყველა</span>
            </button>
          </div>

          <div className={`lg:relative flex-1 min-w-0 w-full max-w-full box-border lg:after:absolute after:content-[''] after:pointer-events-none after:z-40 lg:after:bg-linear-to-r ${scrollPosstion.left ? "after:from-[#F0F0EE]" : "after:from-transparent"} after:to-transparent after:w-10 after:h-full after:top-0 after:left-0 lg:before:absolute lg:before:content-[''] before:pointer-events-none before:z-40 lg:before:bg-linear-to-l ${scrollPosstion.right ? "before:from-[#F0F0EE]" : "before:from-transparent"} before:to-transparent before:w-10 before:h-full before:top-0 before:right-0`}>
            {scrollPosstion.left && (
              <button onClick={() => handleScroll("left")} className="absolute hidden left-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full w-7 h-7 lg:flex items-center justify-center cursor-pointer outline-none z-50 border-2 border-gray-100 shadow-md">
                <img src="/icons/arrow.svg" className="w-3 h-3 rotate-180" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={handleScrollUpdate}
              className="lg:overflow-x-auto relative snap-x snap-mandatory px-4 flex-wrap lg:flex-nowrap flex lg:items-center gap-2 lg:border-t border-gray-400 py-2 lg:px-4 scrollbar-none [&::-webkit-scrollbar]:hidden w-full max-w-full box-border"
            >
              {biomesInfo.map(biome => {
                const isSelectedBiome = selectedBiomes.includes(biome.id);
                return (
                  <button
                    key={biome.id}
                    className={`flex snap-center items-center gap-1.5 pl-1 pr-3 rounded-[20px] cursor-pointer font-medium transition-all duration-250 shadow-sm hover:border-[#aaa] hover:text-[#1a1a1a] hover:-translate-y-px hover:shadow-md text-[10px] md:text-[11px] py-1 md:px-2 ${isSelectedBiome ? 'border-transparent text-[#1a1a1a] font-semibold shadow-md' : 'bg-white border-[1.5px] border-[#e0e0e0] text-[#666666]'}`}
                    style={{
                      backgroundColor: isSelectedBiome ? `${biome.color}20` : "white",
                      border: isSelectedBiome ? `1px solid ${biome.color}` : "1px solid #A8A8A8"
                    }}
                    onClick={() => handleBiomeSelect(biome.id)}
                    title={biome.name}
                  >
                    <div className="w-7 h-7 flex items-center justify-center rounded-[100px]" style={{ backgroundColor: isSelectedBiome ? biome.color : "#A8A8A8" }}>
                      <img src={biome.image} className="w-3.5 h-3.5 " />
                    </div>
                    <span className='text-start lg:text-nowrap'>{biome.name}</span>
                  </button>
                );
              })}
            </div>

            {scrollPosstion.right && (
              <button onClick={() => handleScroll("right")} className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full w-7 h-7 hidden lg:flex items-center justify-center cursor-pointer outline-none z-50 border-2 border-gray-100 shadow-md">
                <img src="/icons/arrow.svg" className="w-3 h-3 rotate-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
