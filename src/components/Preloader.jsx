import { useEffect, useState } from "react";

function Preloader() {
  const [merged, setMerged] = useState(false);
  const [scaled, setScaled] = useState(false);

  useEffect(() => {
    // 1 фаза — з'єднання в одну точку
    const mergeTimer = setTimeout(() => {
      setMerged(true);
    }, 1600);

    // 2 фаза — scale в 0
    const scaleTimer = setTimeout(() => {
      setScaled(true);
    }, 2000);

    return () => {
      clearTimeout(mergeTimer);
      clearTimeout(scaleTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#080808] z-50">
      <div
        className={`flex transition-all duration-500 ease-in-out ${
          merged ? "gap-0" : "gap-3"
        } ${scaled ? "scale-0" : "scale-100"}`}
      >
        <span
          className={`w-3 h-3 rounded-full bg-white/20 animate-bounce transition-transform duration-500 ${
            merged ? "translate-x-3" : ""
          }`}
        ></span>

        <span className="w-3 h-3 rounded-full bg-white/20 animate-bounce [animation-delay:-0.15s]"></span>

        <span
          className={`w-3 h-3 rounded-full bg-white/20 animate-bounce transition-transform duration-500 ${
            merged ? "-translate-x-3" : ""
          }`}
        ></span>
      </div>
    </div>
  );
}

export default Preloader;
