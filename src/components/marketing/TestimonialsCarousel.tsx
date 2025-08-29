"use client";
import { useEffect, useState } from "react";
import { Card, Column, Heading, Row, Text, Button } from "@once-ui-system/core";
import { testimonials as defaultTestimonials } from "@/resources";

export function TestimonialsCarousel({ testimonials = defaultTestimonials }: { testimonials?: { quote: string; author: string }[] }) {
  const [idx, setIdx] = useState(0);
  const n = testimonials.length || 0;
  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);
  if (n === 0) return null;
  const item = testimonials[idx];
  return (
    <Card padding="24" radius="l">
      <Column gap="8">
        <Heading as="h3" variant="heading-strong-l">What clients say</Heading>
        <Text variant="heading-default-m" wrap="balance">“{item.quote}”</Text>
        <Row horizontal="space-between" vertical="center">
          <Text onBackground="neutral-weak">— {item.author}</Text>
          {n > 1 && (
            <Row gap="8">
              <Button size="s" variant="tertiary" onClick={() => setIdx((idx - 1 + n) % n)}>Prev</Button>
              <Button size="s" variant="tertiary" onClick={() => setIdx((idx + 1) % n)}>Next</Button>
            </Row>
          )}
        </Row>
      </Column>
    </Card>
  );
}

