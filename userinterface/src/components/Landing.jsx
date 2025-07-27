import Image from 'next/image';
import CryptoIcon from './CryptoIcon'; // Adjust the import path

const Landing = () => {
  return (
    <div className="relative h-[50vh] w-[98vw] flex items-center justify-center mt-4 bg-gradient-to-b from-blue-200 to-blue-500 rounded-2xl overflow-hidden">
      <Image
        src="/homePageImage.png"
        alt="LuckyChain Background"
        sizes="100vw"
        fill
        className="object-cover "
      />
      <div className="relative z-10 flex flex-col items-center text-white">
        <p className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm">
          Trusted by over 12,000 players
        </p>
        <h1 className="text-5xl font-bold text-center mt-4">
          First-ever blockchain <br />powered lottery platform
        </h1>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#ffffffeb] via-[#73C5FF] to-[#73C5FF] text-black rounded-full ">
          Buy your tickets
        </button>
      </div>
      {/* Dashed Lines and Icons */}
     <div className="absolute inset-0 pointer-events-none">
  {/* Vertical dashed lines with custom heights */}
  {[10, 17, 24, 31, 38, 95, 86, 77, 68].map((position, index) => {
    let height;
    let style = { left: `${position}%` };

    if (index < 5) {
      // First 5 lines: height up to 40% of parent (20vh)
      const heights1 = ['15%', '30%','35%','50%','20%']; // Small to large
      height = heights1[index];
    }
   else {
      // Last 3 lines: increase height, peaking at 50% (25vh)
      const heights = ['15%','20%', '50%', '30%']; // Small to large
      height = heights[index - 5];
    }

    return (
      <div
        key={position}
        className="absolute top-0 w-px border-l border-dashed border-white opacity-50"
        style={{ ...style, height }}
      ></div>
    );
  })}
</div>

      <div className="absolute top-10 left-10">
        <CryptoIcon type="btc" className="animate-float" />
      </div>
      <div className="absolute top-20 left-20">
        <CryptoIcon type="eth" className="animate-float" />
      </div>
      <div className="absolute top-30 right-60 z-20">
        <CryptoIcon type="" className="animate-float" />
      </div>
      <div className="absolute bottom-10 left-20">
        <CryptoIcon type="eth" className="animate-float" />
      </div>
      <div className="absolute bottom-10 right-60">
        <CryptoIcon type="btc" className="animate-float" />
      </div>
      <div className="absolute bottom-25 right-25 ">
        <CryptoIcon type="ethLogo" className="rotate-[100deg] opacity-50" width={120} height={120} />
      </div>
      <div className="absolute bottom-40 left-60">
        <CryptoIcon type="ethLogo" className="animate-float" width={150} height={150} />
      </div>
    </div>
  );
};

export default Landing;