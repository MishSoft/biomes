import { useRef, useState } from 'react';
import BiomesMap from './components/biomes/BiomesMap';
import { biomesInfo } from './data/biomesInfo';

const App = () => {
  const allIds = biomesInfo.map(b => b.id);
  const [selectedBiomes, setSelectedBiomes] = useState<string[]>(allIds);
  const isAllSelected = selectedBiomes.length === biomesInfo.length;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosstion, setScrollPosition] = useState({
    left: false,
    right: true
  });

  const handleBiomeSelect = (id: string) => {
    setSelectedBiomes(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleAllSelectAll = () => {
    if (isAllSelected) {
      setSelectedBiomes([]);
    } else {
      setSelectedBiomes(allIds);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });

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

      <div className="flex-1 flex flex-col
       min-w-0 md:p-4 w-full box-border max-w-348 mx-auto">

        <div className="w-full h-auto max-w-331 mx-auto [&_svg]:w-full [&_svg]:h-auto [&_svg]:block [&_g[id]]:transition-all [&_g[id]]:duration-250">
          <BiomesMap onBiomeSelect={handleBiomeSelect} selectedBiomes={selectedBiomes} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center mt-5 w-full max-w-full box-border">

          <div className="py-2 pr-4 pl-4  lg:border-t lg:border-r border-gray-500 shrink-0">
            <button
              onClick={handleAllSelectAll}
              className={`w-18.25  h-9 ${selectedBiomes.length < allIds.length ? "bg-[#E6E6E6]" : "bg-[#008645]"} font-bold rounded-[100px] border-none outline-none color-white cursor-pointer flex justify-center items-center gap-1.5 `}
            >
              <span className={`w-2 h-2 rounded-[100px] ${selectedBiomes.length < allIds.length ? "bg-white opacity-70" : "bg-[#E6E6E6]"}  `}></span>
              <span className={`${selectedBiomes.length < allIds.length ? "text-[#666666]" : "text-white"} text-[12px]`}>ყველა</span>
            </button>
          </div>

          <div className={`lg:relative flex-1 min-w-0 w-full max-w-full box-border
            lg:after:absolute after:content-[''] after:pointer-events-none after:z-40
            lg:after:bg-linear-to-r ${scrollPosstion.left ? "after:from-[#F0F0EE]" : "after:from-transparent"} after:to-transparent after:w-10 after:h-full after:top-0 after:left-0
            lg:before:absolute lg:before:content-[''] before:pointer-events-none before:z-40
            lg:before:bg-linear-to-l ${scrollPosstion.right ? "before:from-[#F0F0EE]" : "before:from-transparent"} before:to-transparent before:w-10 before:h-full before:top-0 before:right-0`}>

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
                    className={`flex  snap-center items-center gap-1.5 pl-1 pr-3 rounded-[20px] cursor-pointer  font-medium transition-all duration-250 shadow-sm  hover:border-[#aaa] hover:text-[#1a1a1a] hover:-translate-y-px hover:shadow-md text-[10px] md:text-[11px] py-1 md:px-2
                    ${isSelectedBiome ? 'border-transparent text-[#1a1a1a] font-semibold shadow-md' : 'bg-white border-[1.5px] border-[#e0e0e0] text-[#666666]'}`}
                    style={{
                      backgroundColor: isSelectedBiome ? `${biome.color}20` : "white",
                      border: isSelectedBiome ? `1px solid ${biome.color}` : "1px solid #A8A8A8"
                    }}
                    onClick={() => handleBiomeSelect(biome.id)}
                    title={biome.name}
                  >
                    <div
                      className="w-7 h-7 flex items-center justify-center rounded-[100px]"
                      style={{ backgroundColor: isSelectedBiome ? biome.color : "#A8A8A8" }}
                    >
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
