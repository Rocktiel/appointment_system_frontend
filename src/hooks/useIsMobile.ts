// import { useState, useEffect } from "react";

// export function useIsMobile(breakpoint = 768) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

//     const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
//       setIsMobile(e.matches);
//     };

//     // İlk değer
//     handleChange(mediaQuery);

//     // Event listener ekle
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [breakpoint]);

//   return isMobile;
// }
import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // SSR ortamında çalışmasın
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // İlk değer (mediaQuery.matches)
    handleChange(mediaQuery);

    // Event listener ekle
    mediaQuery.addEventListener("change", handleChange as EventListener);
    return () => {
      mediaQuery.removeEventListener("change", handleChange as EventListener);
    };
  }, [breakpoint]);

  return isMobile;
}
