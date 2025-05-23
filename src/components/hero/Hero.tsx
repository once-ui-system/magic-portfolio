"use client";
import React from "react";
import { Heading, Text } from "@/once-ui/components";
import { Button } from "@/once-ui/components";
import { BlurIn } from "./BlurIn";
import { Particles } from "./Particles";
import { BorderBeam } from "./BorderBeam";
import { ShimmerButton } from "./ShimmerButton";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Particles className={styles.particles} quantity={50} />
      <BorderBeam className={styles.beam} />
      <div className={styles.network}>
        <svg viewBox="0 0 200 200" className={styles.svg}>
          <circle cx="100" cy="100" r="30" className={styles.nodeCenter} />
          <text x="100" y="105" textAnchor="middle" className={styles.labelCenter}">AI</text>
          <circle cx="100" cy="30" r="16" className={styles.node} />
          <text x="100" y="35" textAnchor="middle" className={styles.label}">Discovery</text>
          <circle cx="170" cy="100" r="16" className={styles.node} />
          <text x="170" y="105" textAnchor="middle" className={styles.label}">Development</text>
          <circle cx="100" cy="170" r="16" className={styles.node} />
          <text x="100" y="175" textAnchor="middle" className={styles.label}">Clinical</text>
          <circle cx="30" cy="100" r="16" className={styles.node} />
          <text x="30" y="105" textAnchor="middle" className={styles.label}">Commercial</text>
          <line x1="100" y1="70" x2="100" y2="46" className={styles.line} />
          <line x1="126" y1="100" x2="154" y2="100" className={styles.line} />
          <line x1="100" y1="130" x2="100" y2="154" className={styles.line} />
          <line x1="74" y1="100" x2="46" y2="100" className={styles.line} />
        </svg>
      </div>
      <div className={styles.content}>
        <BlurIn>
          <Heading variant="display-strong-l" wrap="balance">
            I believe the future of pharmaceutical innovation lies in AI systems that think across the entire drug development lifecycle, not just in narrow slices of it.
          </Heading>
        </BlurIn>
        <BlurIn delay={0.2}>
          <Text variant="heading-default-xl" wrap="balance" onBackground="neutral-weak">
            After building and scaling AI solutions at Johnson & Johnson and founding BioPhy, I've seen what works, what doesn't, and what's possible when we think bigger. I'm Dave Latshaw II, and I'm working to accelerate the emergence of truly intelligent pharmaceutical systems.
          </Text>
        </BlurIn>
        <BlurIn delay={0.4}>
          <ShimmerButton className={styles.cta} size="m" variant="secondary">
            Explore My Vision
          </ShimmerButton>
        </BlurIn>
      </div>
    </section>
  );
};
