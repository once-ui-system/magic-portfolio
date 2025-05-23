import React from "react";
import { Column, Flex, Heading, Text } from "@/once-ui/components";
import styles from "./Pillars.module.scss";

export const Pillars = () => (
  <Flex className={styles.pillars} fillWidth gap="32" mobileDirection="column" horizontal="center">
    <Column gap="8" maxWidth="s" className={styles.pillar}>
      <Heading variant="display-strong-xs">Build</Heading>
      <Text onBackground="neutral-weak" wrap="balance" variant="body-default-l">
        From conception to code to commercialization - I've built AI systems that generated millions in pharmaceutical revenue.
      </Text>
    </Column>
    <Column gap="8" maxWidth="s" className={styles.pillar}>
      <Heading variant="display-strong-xs">Advise</Heading>
      <Text onBackground="neutral-weak" wrap="balance" variant="body-default-l">
        Helping pharmaceutical and AI companies navigate the complex intersection of drug development and artificial intelligence.
      </Text>
    </Column>
    <Column gap="8" maxWidth="s" className={styles.pillar}>
      <Heading variant="display-strong-xs">Inspire</Heading>
      <Text onBackground="neutral-weak" wrap="balance" variant="body-default-l">
        Speaking and writing about the future of AI-driven drug development and the systems thinking it requires.
      </Text>
    </Column>
  </Flex>
);
