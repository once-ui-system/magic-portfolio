"use client";

import { Row, Text, Icon, useToast } from "@once-ui-system/core";

interface CopyLinkButtonProps {
  url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const { addToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      addToast({
        variant: "success",
        message: "Link copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      addToast({
        variant: "danger",
        message: "Failed to copy link",
      });
    }
  };

  return (
    <Row 
      gap="8" 
      vertical="center" 
      padding="12" 
      radius="m" 
      border="neutral-alpha-weak"
      background="surface"
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      className="copy-link-button"
      onClick={handleCopy}
    >
      <Icon name="openLink" size="s" />
      <Text variant="body-default-s">Copy Link</Text>
    </Row>
  );
}
