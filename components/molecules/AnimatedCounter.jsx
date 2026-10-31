"use client";

import * as React from "react";

export function AnimatedCounter({
  end,
  start = 0,
  duration = 1500,
  suffix = "",
  prefix = "",
  once = true,
}) {
  const [count, setCount] = React.useState(start);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let animationFrameId;
    let startTime = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOut =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOut * (end - start) + start);

            setCount(currentCount);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };

          animationFrameId = requestAnimationFrame(animate);

          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setCount(start);
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, start, duration, once]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
