"use client";
import { useMemo, useState } from "react";
import { Card, Column, Grid, Heading, Input, Row, Select, Text } from "@once-ui-system/core";

type Tier = "audit" | "transformation" | "partnership";

const TIERS: Record<Tier, { label: string; weeks: number; notes: string }> = {
  audit: { label: "Audit (2 weeks)", weeks: 2, notes: "Discovery + quick wins roadmap" },
  transformation: { label: "Transformation (8–12 weeks)", weeks: 10, notes: "Build + integrate core systems" },
  partnership: { label: "Partnership (ongoing)", weeks: 24, notes: "Fractional exec + growth" },
};

export function PricingEstimator() {
  const [tier, setTier] = useState<Tier>("audit");
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [rate, setRate] = useState(300); // USD/hour
  const [estimatedMonthlySavings, setEstimatedMonthlySavings] = useState(15000);

  const { weeks, label, notes } = useMemo(() => ({ ...TIERS[tier], label: TIERS[tier].label, notes: TIERS[tier].notes }), [tier]);

  const totals = useMemo(() => {
    const totalHours = hoursPerWeek * weeks;
    const fees = totalHours * rate;
    const months = Math.max(1, Math.round(weeks / 4));
    const roi = estimatedMonthlySavings * months - fees;
    return { totalHours, fees, months, roi };
  }, [hoursPerWeek, weeks, rate, estimatedMonthlySavings]);

  return (
    <Card padding="24" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">Pricing & Engagement Estimator</Heading>
        <Grid columns="3" mobileColumns="1" gap="12">
          <Select label="Engagement" value={tier} onChange={(v: any) => setTier(v)} options={[{ label: TIERS.audit.label, value: "audit" }, { label: TIERS.transformation.label, value: "transformation" }, { label: TIERS.partnership.label, value: "partnership" }]} />
          <Input label="Hours / week" type="number" value={hoursPerWeek} onChange={(e: any) => setHoursPerWeek(parseInt(e.target.value || "0", 10))} />
          <Input label="Rate ($/hr)" type="number" value={rate} onChange={(e: any) => setRate(parseInt(e.target.value || "0", 10))} />
          <Input label="Est. monthly savings ($)" type="number" value={estimatedMonthlySavings} onChange={(e: any) => setEstimatedMonthlySavings(parseInt(e.target.value || "0", 10))} />
        </Grid>
        <Row gap="16" wrap>
          <Card padding="16" radius="m"><Text>Duration: {weeks} weeks (~{totals.months} months)</Text></Card>
          <Card padding="16" radius="m"><Text>Total hours: {totals.totalHours.toLocaleString()}</Text></Card>
          <Card padding="16" radius="m"><Text>Estimated fees: ${totals.fees.toLocaleString()}</Text></Card>
          <Card padding="16" radius="m"><Text>Projected ROI over engagement: ${totals.roi.toLocaleString()}</Text></Card>
        </Row>
        <Text onBackground="neutral-weak">{notes}</Text>
      </Column>
    </Card>
  );
}

