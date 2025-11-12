// Extend window interface for GSAP ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  }
}

export {};
