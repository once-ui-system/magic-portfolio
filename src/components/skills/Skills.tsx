import React from "react";
import {
  Column,
  Badge,
  Flex,
  Heading,
  Icon,
  RevealFx,
  Row,
  SmartLink,
  Text,
} from "@/once-ui/components";
import { getPosts } from "@/app/utils/utils";
import { baseURL, routes } from "@/app/resources";
import { person, skills } from "@/app/resources/content";
import OverviewSkillsChart from "@/components/skills/OverviewSkillsChart";

export function Skills({ data }: { data: { name: string; icon: string }[] }) {
 
  let allSkills = getPosts(["src", "app", "skill", "skills"]);

    return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
       {data.map((skill) => (
        <Badge key={skill.name} title={skill.name} icon={skill.icon} />
      ))}
      {routes["/skills"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              My Tech Skills
            </Heading>
          </Flex>
          <Flex flex={2} paddingX="20">
            <OverviewSkillsChart />
          </Flex>
        </Flex>
      )}
    </Column>
  );
}

