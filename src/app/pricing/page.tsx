import { Column, Heading, Meta, Grid, Card, Text } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { PricingEstimator } from "@/components/marketing/PricingEstimator";

export async function generateMetadata() {
  return Meta.generate({
    title: "Pricing",
    description: "Engagement tiers and estimator",
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Pricing")}`,
    path: "/pricing",
  });
}

const PACKAGES = [
  {
    name: "Audit",
    price: "10–25K",
    duration: "2 weeks",
    points: ["Discovery sessions", "Ops + revenue audit", "Quick wins roadmap"],
  },
  {
    name: "Transformation",
    price: "50–150K",
    duration: "8–12 weeks",
    points: ["Systems architecture", "Build + integrate", "Agent automations"],
  },
  {
    name: "Partnership",
    price: "15–25K/mo or equity",
    duration: "Ongoing",
    points: ["Fractional exec", "Growth roadmap", "Data + ROI dashboards"],
  },
];

export default function PricingPage() {
  return (
    <Column maxWidth="s" gap="24">
      <Heading marginBottom="l" variant="display-strong-s">Pricing</Heading>
      <Grid columns="3" mobileColumns="1" gap="12">
        {PACKAGES.map((p) => (
          <Card key={p.name} padding="24" radius="l">
            <Column gap="8">
              <Heading as="h3" variant="heading-strong-l">{p.name}</Heading>
              <Text onBackground="neutral-strong">{p.price}</Text>
              <Text onBackground="neutral-weak">{p.duration}</Text>
              <ul>
                {p.points.map((pt, i) => <li key={i}><Text>{pt}</Text></li>)}
              </ul>
            </Column>
          </Card>
        ))}
      </Grid>
      <PricingEstimator />
    </Column>
  );
}

