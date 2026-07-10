import { Column, Meta, Schema } from "@once-ui-system/core";
import { home, baseURL } from "@/resources";
import {
  Hero,
  Steps,
  FeaturesGrid,
  Widgets,
  Philosophy,
  FAQ,
  FinalCTA,
} from "@/components/landing";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center" gap="0">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: "StreakTap",
          url: baseURL,
        }}
      />

      <Column fillWidth horizontal="center" paddingX="24">
        <Column fillWidth className="streaktap-wide">
          <Hero />
        </Column>
      </Column>

      <Column
        id="how-it-works"
        fillWidth
        horizontal="center"
        paddingX="24"
        className="streaktap-section"
      >
        <Column fillWidth className="streaktap-wide">
          <Steps />
        </Column>
      </Column>

      <Column
        fillWidth
        horizontal="center"
        paddingX="24"
        className="streaktap-section"
      >
        <Column fillWidth className="streaktap-wide">
          <FeaturesGrid />
        </Column>
      </Column>

      <Column
        fillWidth
        horizontal="center"
        paddingX="24"
        className="streaktap-section"
      >
        <Column fillWidth className="streaktap-wide">
          <Widgets />
        </Column>
      </Column>

      <Column
        fillWidth
        horizontal="center"
        paddingX="24"
        className="streaktap-section"
      >
        <Column fillWidth className="streaktap-prose">
          <Philosophy />
        </Column>
      </Column>

      <Column
        fillWidth
        horizontal="center"
        paddingX="24"
        className="streaktap-section"
      >
        <Column fillWidth className="streaktap-prose">
          <FAQ />
        </Column>
      </Column>

      <Column
        fillWidth
        horizontal="center"
        paddingX="24"
        className="streaktap-section"
      >
        <Column fillWidth className="streaktap-prose">
          <FinalCTA />
        </Column>
      </Column>
    </Column>
  );
}
