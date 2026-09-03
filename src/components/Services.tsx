"use client";

import { Flex, Heading, Text, Grid, Button } from "@once-ui-system/core";

const copy = {
  en: {
    heading: "What we ship",
    cards: [
      {
        title: "Wallet / snap-style integrations",
        description:
          "Connect, sign, and account flows for dApps on living chains. Packaged for grants and retainers, not a price list.",
      },
      {
        title: "DEX / on-chain indexer standup",
        description:
          "Self-hostable ingest, decode, TWAP and liquidity APIs. Same packaging: grants first, consulting to deliver.",
      },
    ],
    book: "Book a slot",
  },
  "pt-BR": {
    heading: "O que entregamos",
    cards: [
      {
        title: "Integrações de wallet / estilo snap",
        description:
          "Fluxos de conexão, assinatura e contas para dApps em chains vivas. Empacotado para grants e retainers, não uma tabela de preços.",
      },
      {
        title: "Standup de indexer DEX / on-chain",
        description:
          "Ingestão auto-hospedável, decode, TWAP e APIs de liquidez. Mesmo empacotamento: grants primeiro, consultoria para entregar.",
      },
    ],
    book: "Agende um horário",
  },
};

export const Services = ({ dict, locale = "en" }: { dict: any; locale?: string }) => {
  const bookHref = dict.about.calendar.link;
  const emailHref = "mailto:" + dict.person.email;
  const t = locale === "pt-BR" ? copy["pt-BR"] : copy.en;

  return (
    <Flex fillWidth paddingTop="64" paddingX="l" direction="column" horizontal="center" gap="l">
      <Heading as="h2" variant="display-default-s" marginBottom="m">
        {t.heading}
      </Heading>
      <Grid columns={2} m={{ columns: 1 }} s={{ columns: 1 }} fillWidth gap="24">
        {t.cards.map((card) => (
          <Flex
            key={card.title}
            fillWidth
            padding="l"
            border="neutral-medium"
            radius="l"
            direction="column"
            gap="m"
            background="surface"
          >
            <Heading as="h3" variant="display-default-xs">
              {card.title}
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {card.description}
            </Text>
            <Flex gap="8" wrap paddingTop="8">
              <Button href={bookHref} variant="primary" size="s" prefixIcon="calendar">
                {t.book}
              </Button>
              <Button href={emailHref} variant="secondary" size="s" prefixIcon="email">
                {dict.person.email}
              </Button>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};
