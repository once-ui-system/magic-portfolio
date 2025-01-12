"use client";

import { Column, Icon, IconButton, Line, Row, Tag, Text, ToggleButton } from "@/once-ui/components";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = ({}) => {
  const pathname = usePathname() ?? "";

  return (
    <Column
      maxWidth={16}
      fill
      paddingX="16"
      paddingY="32"
      gap="m"
      background="page"
      border="neutral-weak"
      radius="l"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Column fill paddingX="xs" gap="m">
        <Column fillWidth gap="4">
          <Text
            variant="body-default-xs"
            onBackground="neutral-weak"
            marginBottom="8"
            marginLeft="16"
          >
            Dashboard
          </Text>
          <ToggleButton fillWidth justifyContent="flex-start" selected={true}>
            <Row padding="4" alignItems="center" gap="12" textVariant="label-default-s">
              <Icon name="PiHouseDuotone" onBackground="neutral-weak" size="xs" />
              Home
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "analytics"}
          >
            <Row padding="4" alignItems="center" gap="12" textVariant="label-default-s">
              <Icon name="PiTrendUpDuotone" onBackground="neutral-weak" size="xs" />
              Analytics
            </Row>
          </ToggleButton>
          <ToggleButton
            style={{
              position: "relative",
            }}
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "reports"}
          >
            <Row padding="4" alignItems="center" gap="12" textVariant="label-default-s">
              <Icon name="PiNotebookDuotone" onBackground="neutral-weak" size="xs" />
              Reports
              <Tag
                variant="neutral"
                size="s"
                position="absolute"
                right="8">
                New
              </Tag>
            </Row>
          </ToggleButton>
        </Column>

        <Line/>

        <Column fillWidth gap="4">
          <Text variant="body-default-xs" onBackground="neutral-weak" marginY="8" marginLeft="16">
            Management
          </Text>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "users"}
          >
            <Row padding="4" gap="12" alignItems="center" textVariant="label-default-s">
            <Line width="16"/>
              Users
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "roles"}
          >
            <Row padding="4" alignItems="center" gap="12" textVariant="label-default-s">
            <Line width="16"/>
              Roles
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "permissions"}
          >
            <Row padding="4" gap="12" alignItems="center" textVariant="label-default-s">
            <Line width="16"/>
              Permissions
            </Row>
          </ToggleButton>
        </Column>

        <Line/>

        <Column fill gap="4">
          <Row
            fillWidth
            justifyContent="space-between"
            alignItems="center"
            paddingY="8"
            paddingX="16"
          >
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Projects
            </Text>
            <IconButton tooltip="Create" variant="secondary" icon="plus" size="s" />
          </Row>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "overview"}
          >
            <Row padding="4" gap="12" alignItems="center" textVariant="label-default-s">
            <Line width="16"/>
              Overview
            </Row>
          </ToggleButton>
          <ToggleButton
            fillWidth
            justifyContent="flex-start"
            selected={pathname === "projects"}
          >
            <Row padding="4" gap="12" alignItems="center" textVariant="label-default-s">
              <Line width="16"/>
              My projects
            </Row>
          </ToggleButton>
        </Column>
      </Column>
    </Column>
  );
};

Sidebar.displayName = "Sidebar";
export { Sidebar };