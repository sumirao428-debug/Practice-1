"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  speed?: number;
  imgStyle?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.22,
  imgStyle,
  priority,
  sizes = "100vw",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const el = ref.current;
      if (!el) { ticking = false; return; }
      const section = el.parentElement!;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${rect.top * speed}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    // 外層：absolute 讓視差位移超出父容器邊界
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: "-18% 0",
        willChange: "transform",
      }}
    >
      {/* 內層：relative 讓 Next.js Image fill 正確定位 */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover", ...imgStyle }}
        />
      </div>
    </div>
  );
}
