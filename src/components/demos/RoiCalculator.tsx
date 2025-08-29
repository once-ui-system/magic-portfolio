"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, Column, Grid, Heading, Input, Text } from "@once-ui-system/core";
import { track } from "@/lib/analytics/client";
import { trackFunnel } from "@/lib/analytics/funnel";

type RoiProps = {
  title?: string;
  unitLabel?: string;
};

export function RoiCalculator({ title = "ROI Calculator", unitLabel = "Units / month" }: RoiProps) {
  const [volume, setVolume] = useState(1000);
  const [minsPerUnit, setMinsPerUnit] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(30);
  const [automationRate, setAutomationRate] = useState(0.6); // 60%

  const savings = useMemo(() => {
    const hours = (volume * minsPerUnit) / 60;
    const automatable = hours * automationRate;
    const monthly = automatable * hourlyCost;
    return {
      hours: Math.round(automatable),
      monthly: Math.round(monthly),
      annual: Math.round(monthly * 12),
    };
  }, [volume, minsPerUnit, hourlyCost, automationRate]);

  useEffect(() => {
    track("demo_view", { demo: "roi" });
    trackFunnel({ funnel: "roi", step: "view" });
  }, []);

  useEffect(() => {
    const props = { volume, minsPerUnit, hourlyCost, automationRate };
    track("demo_use", { demo: "roi", ...props });
    trackFunnel({ funnel: "roi", step: "param_change", props });
  }, [volume, minsPerUnit, hourlyCost, automationRate]);

  return (
    <Card padding="24" radius="l">
      <Column gap="12">
        <Heading as="h3" variant="heading-strong-l">{title}</Heading>
        <Grid columns="2" mobileColumns="1" gap="12">
          <Input label={unitLabel} type="number" value={volume} onChange={(e: any) => setVolume(parseInt(e.target.value || "0", 10))} />
          <Input label="Minutes per unit" type="number" value={minsPerUnit} onChange={(e: any) => setMinsPerUnit(parseInt(e.target.value || "0", 10))} />
          <Input label="Hourly cost ($)" type="number" value={hourlyCost} onChange={(e: any) => setHourlyCost(parseInt(e.target.value || "0", 10))} />
          <Input label="Automation rate (0–1)" type="number" step="0.05" value={automationRate} onChange={(e: any) => setAutomationRate(parseFloat(e.target.value || "0"))} />
        </Grid>
        <Column gap="4" marginTop="12">
          <Text variant="body-strong-m">Time saved: {savings.hours} hours / month</Text>
          <Text variant="body-strong-m">Monthly savings: ${savings.monthly.toLocaleString()}</Text>
          <Text variant="body-strong-m">Annual savings: ${savings.annual.toLocaleString()}</Text>
        </Column>
      </Column>
    </Card>
  );
}
