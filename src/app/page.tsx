import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter, company } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: company.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          {home.featured && (
          <RevealFx fillWidth horizontal="start" paddingTop="16" paddingBottom="32" paddingLeft="12">
            <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
              href={home.featured.href}>
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              arrowIcon
            >
              <Flex gap="8" vertical="center">
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                了解更多
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      
      {/* 核心業務展示 */}
      <Column fillWidth gap="40" paddingTop="40">
        <Column maxWidth="s" horizontal="center">
          <Heading variant="display-strong-s" wrap="balance" align="center">
            核心業務與服務
          </Heading>
          <Text onBackground="neutral-weak" wrap="balance" align="center" paddingTop="12">
            提供全方位的科技解決方案
          </Text>
        </Column>
        
        <RevealFx translateY="16" delay={0.5}>
          <Projects range={[1, 3]} columns="3" />
        </RevealFx>
      </Column>

      {/* 最新消息 */}
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column" paddingTop="40">
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              最新消息與動態
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      
      {/* 公司優勢 */}
      <Column fillWidth gap="24" paddingTop="40" paddingBottom="40">
        <Heading variant="display-strong-s" align="center">
          為什麼選擇{company.name}？
        </Heading>
        <Column fillWidth gap="24" paddingTop="24">
          <Flex fillWidth gap="24" mobileDirection="column">
            <Column flex={1} gap="12" padding="24" background="surface" border="neutral-alpha-weak" radius="l">
              <Text variant="heading-strong-m">專業技術團隊</Text>
              <Text onBackground="neutral-weak">
                擁有豐富經驗的技術團隊，持續創新與研發，為客戶提供最優質的解決方案。
              </Text>
            </Column>
            <Column flex={1} gap="12" padding="24" background="surface" border="neutral-alpha-weak" radius="l">
              <Text variant="heading-strong-m">完整服務體系</Text>
              <Text onBackground="neutral-weak">
                從設計、製造到售後服務，提供一站式的完整服務，滿足客戶的各種需求。
              </Text>
            </Column>
            <Column flex={1} gap="12" padding="24" background="surface" border="neutral-alpha-weak" radius="l">
              <Text variant="heading-strong-m">品質保證</Text>
              <Text onBackground="neutral-weak">
                嚴格的品質控管流程，確保每一項產品都符合最高標準，值得您的信賴。
              </Text>
            </Column>
          </Flex>
        </Column>
      </Column>

      {/* 聯絡我們的呼籲行動 */}
      <Column fillWidth gap="24" horizontal="center" paddingTop="40" paddingBottom="80">
        <Heading variant="display-strong-s" align="center">
          準備開始合作了嗎？
        </Heading>
        <Text onBackground="neutral-weak" align="center" maxWidth="s">
          無論您需要機械設備、電子產品或軟體服務，我們都能為您提供最佳的解決方案。
        </Text>
        <Button
          href="/contact"
          variant="primary"
          size="l"
          arrowIcon
        >
          聯絡我們
        </Button>
      </Column>

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}