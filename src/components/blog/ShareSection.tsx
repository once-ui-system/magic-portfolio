"use client";

import { Column, Row, Text, SmartLink, Icon } from "@once-ui-system/core";
import { socialSharing } from "@/resources";
import { CopyLinkButton } from "./CopyLinkButton";

interface ShareSectionProps {
  title: string;
  url: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  label: string;
  generateUrl: (title: string, url: string) => string;
}

const socialPlatforms: Record<string, SocialPlatform> = {
  x: {
    name: "x",
    icon: "twitter",
    label: "X",
    generateUrl: (title, url) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  linkedin: {
    name: "linkedin",
    icon: "linkedin",
    label: "LinkedIn",
    generateUrl: (title, url) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  facebook: {
    name: "facebook",
    icon: "facebook",
    label: "Facebook",
    generateUrl: (title, url) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  pinterest: {
    name: "pinterest",
    icon: "pinterest",
    label: "Pinterest",
    generateUrl: (title, url) => 
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  whatsapp: {
    name: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    generateUrl: (title, url) => 
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  reddit: {
    name: "reddit",
    icon: "reddit",
    label: "Reddit",
    generateUrl: (title, url) => 
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  telegram: {
    name: "telegram",
    icon: "telegram",
    label: "Telegram",
    generateUrl: (title, url) => 
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    name: "email",
    icon: "email",
    label: "Email",
    generateUrl: (title, url) => 
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this post: ${url}`)}`,
  },
};

export function ShareSection({ title, url }: ShareSectionProps) {
  // Don't render if sharing is disabled
  if (!socialSharing.enabled) {
    return null;
  }

  // Get enabled platforms
  const enabledPlatforms = Object.entries(socialSharing.platforms)
    .filter(([_, enabled]) => enabled && _ !== 'copyLink')
    .map(([platformKey]) => ({ key: platformKey, ...socialPlatforms[platformKey] }))
    .filter(platform => platform.name); // Filter out platforms that don't exist in our definitions

  return (
    <Column fillWidth horizontal="center" gap="16" marginTop="32" marginBottom="16">
      <Text variant="label-default-m" onBackground="neutral-medium">
        Share this post
      </Text>
      <Row gap="16" horizontal="center" wrap>
        {enabledPlatforms.map((platform) => (
          <SmartLink
            key={platform.key}
            href={platform.generateUrl(title, url)}
            target="_blank"
          >
            <Row
              gap="8"
              vertical="center"
              padding="12"
              radius="m"
              border="neutral-alpha-weak"
              background="surface"
              style={{ cursor: 'pointer' }}
            >
              <Icon name={platform.icon as any} size="s" />
              <Text variant="body-default-s">{platform.label}</Text>
            </Row>
          </SmartLink>
        ))}
        
        {socialSharing.platforms.copyLink && (
          <CopyLinkButton url={url} />
        )}
      </Row>
    </Column>
  );
}
