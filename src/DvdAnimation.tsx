import { useEffect, useRef } from "react";
import dvdLogo from "./assets/dvd-logo.png";
import { useDvd } from "./DvdContext";

type Vector = {
  x: number;
  y: number;
};

export function DvdAnimation() {
  const { xVelocity, yVelocity, color } = useDvd();

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const position = useRef<Vector>({
    x: 50,
    y: 50,
  });

  const velocity = useRef<Vector>({
    x: xVelocity,
    y: yVelocity,
  });

  // Keep the animation's velocity in sync with the controls.
  useEffect(() => {
    velocity.current.x =
      Math.sign(velocity.current.x || 1) * Math.abs(xVelocity);
  }, [xVelocity]);

  useEffect(() => {
    velocity.current.y =
      Math.sign(velocity.current.y || 1) * Math.abs(yVelocity);
  }, [yVelocity]);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const animate = (now: number) => {
      const dt = (now - previous) / 1000;
      previous = now;

      const logo = logoRef.current;
      const container = containerRef.current;

      if (logo && container) {
        let { x, y } = position.current;
        let { x: vx, y: vy } = velocity.current;

        x += vx * dt;
        y += vy * dt;

        const maxX = container.clientWidth - logo.offsetWidth;
        const maxY = container.clientHeight - logo.offsetHeight;

        if (x <= 0 || x >= maxX) {
          x = Math.max(0, Math.min(x, maxX));
          vx *= -1;
        }

        if (y <= 0 || y >= maxY) {
          y = Math.max(0, Math.min(y, maxY));
          vy *= -1;
        }

        position.current = { x, y };
        velocity.current = { x: vx, y: vy };

        logo.style.transform =
          `translate3d(${x}px, ${y}px, 0)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#111",
      }}
    >
      <div
        ref={logoRef}
        style={{
          position: "absolute",

          width: 250,
          height: 117,

          backgroundColor: color,

          maskImage: `url(${dvdLogo})`,
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",

          WebkitMaskImage: `url(${dvdLogo})`,
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",

          left: 0,
          top: 0,

          willChange: "transform",
        }}
      />
    </div>
  );
}
