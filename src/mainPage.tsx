import { useEffect, useRef, useState } from "react";
import hero from "./assets/hero.png";

type Vector = {
  x: number;
  y: number;
};

export function DvdLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const position = useRef<Vector>({ x: 50, y: 50 });
  const velocity = useRef<Vector>({ x: 120, y: 100 });

  const [pos, setPos] = useState(position.current);


  /*
    useEffect(() => {
      let animationFrame: number;
      let previousTime = performance.now();
  
      const animate = (time: number) => {
        const dt = (time - previousTime) / 1000;
        previousTime = time;
  
        const container = containerRef.current;
        const logo = logoRef.current;
  
        if (!container || !logo) {
          animationFrame = requestAnimationFrame(animate);
          return;
        }
  
        const maxX = container.clientWidth - logo.offsetWidth;
        const maxY = container.clientHeight - logo.offsetHeight;
  
        let { x, y } = position.current;
        let { x: vx, y: vy } = velocity.current;
  
        x += vx * dt;
        y += vy * dt;
  
        // Bounce horizontally
        if (x <= 0) {
          x = 0;
          vx = Math.abs(vx);
        } else if (x >= maxX) {
          x = maxX;
          vx = -Math.abs(vx);
        }
  
        // Bounce vertically
        if (y <= 0) {
          y = 0;
          vy = Math.abs(vy);
        } else if (y >= maxY) {
          y = maxY;
          vy = -Math.abs(vy);
        }
  
        position.current = { x, y };
        velocity.current = { x: vx, y: vy };
  
        setPos({ x, y });
  
        animationFrame = requestAnimationFrame(animate);
      };
  
      animationFrame = requestAnimationFrame(animate);
  
      return () => cancelAnimationFrame(animationFrame);
    }, []);
    */

  /*
  New 
  One improvement I'd recommend
  
  For a real app, I'd avoid calling React's setState on every animation frame. React doesn't need to re-render the component 60+ times per second for this. Instead, update the DOM directly through the ref:
  logo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  
  */
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

        logo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);



  return (
    <>
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
        <img
          ref={logoRef}
          src={hero}
          alt="DVD Video"
          style={{
            position: "absolute",
            border: "none",
            width: 160,
            left: 0,
            top: 0,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}

export default DvdLogo