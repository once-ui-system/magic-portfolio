"use client";

import {
  Button,
  Column,
  Flex,
  Line,
  Logo,
  NavIcon,
  Option,
  Row,
  SmartLink,
  ToggleButton,
  UserMenu,
} from "@/once-ui/components";
import { usePathname } from "next/navigation";
import React from "react";

interface HeaderProps {
  authenticated: boolean;
  avatar?: string;
  name?: string;
  subline?: string;
}

const Header: React.FC<HeaderProps> = ({ authenticated, avatar, name, subline }) => {
  const pathname = usePathname() ?? "";

  return (
    <Row
      as="header"
      borderBottom="neutral-medium"
      fillWidth
      paddingX="m"
      height="56"
      alignItems="center"
      background="surface"
    >
      <Row hide="s">
        <Logo size="s"/>
      </Row>
      <Row show="s" gap="4" alignItems="center">
        <NavIcon />
        <Logo wordmark={false} />
      </Row>
      {authenticated ? (
        <Row fillWidth alignItems="center" justifyContent="space-between">
          <Row fillWidth>
            <Row hide="s" fillWidth gap="4" paddingX="l" alignItems="center">
              <ToggleButton selected={true} label="Dashboard" />
              <ToggleButton selected={pathname === "/apps"} label="Apps" />
              <ToggleButton selected={pathname === "/resources"} label="Resources" />
            </Row>
          </Row>
          <Row as="nav">
            <Row hide="s">
              <UserMenu
                name={name}
                subline={subline}
                avatarProps={{
                  empty: !avatar,
                  src: avatar,
                }}
                dropdown={
                  <Column padding="2" gap="2" minWidth={8}>
                    <Option label="Profile" value="profile" />
                    <Option label="Settings" value="settings" />
                    <Line/>
                    <Option label="Log out" value="logout" />
                  </Column>
                }
              />
            </Row>
            <Row show="s">
              <UserMenu
                avatarProps={{
                  empty: !avatar,
                  src: avatar,
                }}
                dropdown={
                  <>
                    <Option label="Profile" value="profile" />
                    <Option label="Settings" value="settings" />
                    <Option label="Log out" value="logout" />
                  </>
                }
              />
            </Row>
          </Row>
        </Row>
      ) : (
        <Row fillWidth alignItems="center" justifyContent="flex-end">
          <Row
            hide="s"
            textVariant="label-default-s"
            fillWidth
            gap="4"
            paddingX="l"
            alignItems="center"
          >
            <SmartLink href=" ">Home</SmartLink>
            <SmartLink href=" ">Product</SmartLink>
            <SmartLink href=" ">Solutions</SmartLink>
            <SmartLink href=" ">Pricing</SmartLink>
          </Row>
          <Row alignItems="center" gap="8">
            <Button size="s" variant="secondary" label="Login" href="" />
            <Button size="s" variant="primary" label="Sign up" href="" />
          </Row>
        </Row>
      )}
    </Row>
  );
};

Header.displayName = "Header";
export { Header };