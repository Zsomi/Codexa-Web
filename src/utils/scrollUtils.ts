// Utility function for smooth scrolling with custom animation
export const smoothScrollToSection = (sectionId: string, duration: number = 800) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  
  const navbarHeight = 80;
  const targetPosition = element.offsetTop - navbarHeight;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let start: number | null = null;

  function animation(currentTime: number) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Responsive easing function (ease-in-out)
  function ease(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
};