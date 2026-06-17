type PopUpType = {
  selectBiomeName: string;
  effectColor: string;
  x: number;
  clickX: number;
  y: number;
  position: 'top' | 'bottom' | 'left-side' | 'right-side';
  onClose: () => void;
}


export const PopUp = ({ selectBiomeName, effectColor, x, clickX, y, position, onClose }: PopUpType) => {
  const popupWidth = 289;
  const popupHalfWidth = popupWidth / 2;

  const offsetFromCenter = clickX - x;
  const relativeArrowLeft = 50 + (offsetFromCenter / popupHalfWidth) * 50;
  const arrowLeftPercent = Math.max(12, Math.min(88, relativeArrowLeft));


  let transformStyle = 'translate(-50%, -100%)';
  let marginStyle = { marginTop: '-14px', marginLeft: '0px', marginRight: '0px' };

  if (position === 'bottom') {
    transformStyle = 'translate(-50%, 0%)';
    marginStyle = { marginTop: '14px', marginLeft: '0px', marginRight: '0px' };
  } else if (position === 'right-side') {
    transformStyle = 'translate(0%, -50%)';
    marginStyle = { marginTop: '0px', marginLeft: '14px', marginRight: '0px' };
  } else if (position === 'left-side') {
    transformStyle = 'translate(-100%, -50%)';
    marginStyle = { marginTop: '0px', marginLeft: '0px', marginRight: '14px' };
  }

  return (
    <div
      className='absolute shadow-2xl hidden lg:block shadow-black/5 max-w-72.25 w-full z-50 transition-all duration-250'
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: transformStyle,
        ...marginStyle
      }}
    >
      <div className='relative w-full overflow-hidden px-2.5 py-4 bg-white rounded-3xl flex flex-col gap-6'>

        <div
          className={`absolute w-full left-0 h-1.5 ${position === 'bottom' ? 'bottom-0 rounded-b-3xl' : 'top-0 rounded-t-3xl'}`}
          style={{ backgroundColor: effectColor }}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 '>
            <span
              className='w-3.5 h-3.5 rounded-full shrink-0'
              style={{ backgroundColor: effectColor }}
            />
            <span className='text-[14px] leading-6.5 font-semibold'>
              {selectBiomeName}
            </span>
          </div>
          <button onClick={onClose} className='text-center w-6 h-6 cursor-pointer font-bold text-gray-400 hover:text-black'>
            X
          </button>
        </div>

        <button
          className='py-3.25 cursor-pointer w-full rounded-xl text-white font-medium flex justify-center items-center gap-1'
          style={{ backgroundColor: effectColor }}
        >
          <span>ბიომის გვერდი</span>
          <span className='text-white'>
            <img src="/icons/white_arrow.svg" className="w-3 h-3" />
          </span>
        </button>
      </div>


      {position === 'top' && (
        <div
          className="absolute w-6.25 h-4.5 bg-white [clip-path:polygon(50%_0%,0%_100%,100%_100%)] translate-x-[-50%] rotate-180 -bottom-3.5 transition-all duration-150"
          style={{ left: `${arrowLeftPercent}%` }}
        />
      )}
      {position === 'bottom' && (
        <div
          className="absolute w-6.25 h-4.5 bg-white [clip-path:polygon(50%_0%,0%_100%,100%_100%)] translate-x-[-50%] rotate-0 -top-3.5 transition-all duration-150"
          style={{ left: `${arrowLeftPercent}%` }}
        />
      )}
      {position === 'right-side' && (
        <div
          className="absolute w-4.5 h-6.25 bg-white [clip-path:polygon(0%_50%,100%_0%,100%_100%)] -translate-y-1/2 -left-3.5 top-1/2 transition-all duration-150"
        />
      )}
      {position === 'left-side' && (
        <div
          className="absolute w-4.5 h-6.25 bg-white [clip-path:polygon(100%_50%,0%_0%,0%_100%)] -translate-y-1/2 -right-3.5 top-1/2 transition-all duration-150"
        />
      )}
    </div>
  );
};
