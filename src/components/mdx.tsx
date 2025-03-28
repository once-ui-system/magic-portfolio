import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";

import { SmartImage, SmartLink, Text, Flex } from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules";
import { HeadingLink } from "@/components";

import { TextProps } from "@/once-ui/interfaces";
import { SmartImageProps } from "@/once-ui/components/SmartImage";

type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: SmartImageProps & { src: string }) {
  if (!src) {
    console.error("SmartImage requires a valid 'src' property.");
    return null;
  }

  return (
    <SmartImage
      className="my-20"
      enlarge
      radius="m"
      aspectRatio="16 / 9"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const CustomHeading = ({ children, ...props }: TextProps) => {
    const slug = slugify(children as string);
    const marginTop = level === 1 ? "40" : level === 2 ? "32" : "24";
    const marginBottom = level === 1 ? "20" : level === 2 ? "16" : "12";
    
    return (
      <HeadingLink
        style={{ 
          marginTop: `var(--static-space-${marginTop})`, 
          marginBottom: `var(--static-space-${marginBottom})`,
          fontWeight: level <= 2 ? "600" : "500",
          letterSpacing: level <= 2 ? "-0.02em" : "normal"
        }}
        level={level}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `Heading${level}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="16"
    >
      {children}
    </Text>
  );
}

function createUnorderedList({ children }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul style={{
      listStyleType: "disc",
      marginLeft: "var(--static-space-16)",
      marginTop: "var(--static-space-8)",
      marginBottom: "var(--static-space-16)",
    }}>
      {children}
    </ul>
  );
}

function createOrderedList({ children }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol style={{
      listStyleType: "decimal",
      marginLeft: "var(--static-space-16)",
      marginTop: "var(--static-space-8)",
      marginBottom: "var(--static-space-16)",
    }}>
      {children}
    </ol>
  );
}

function createListItem({ children }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li style={{
      marginBottom: "var(--static-space-4)",
      lineHeight: "175%",
    }}>
      <Text
        variant="body-default-m"
        onBackground="neutral-medium"
        as="span"
      >
        {children}
      </Text>
    </li>
  );
}

function createBlockquote({ children }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <Flex
      as="blockquote"
      marginY="24"
      paddingY="16"
      paddingX="20"
      style={{
        borderLeft: "4px solid var(--color-brand-normal)",
        backgroundColor: "var(--color-brand-lighter)",
        borderRadius: "var(--radius-m)",
      }}
    >
      <Text
        variant="body-default-m"
        onBackground="neutral-medium"
        style={{ fontStyle: "italic", lineHeight: "175%" }}
      >
        {children}
      </Text>
    </Flex>
  );
}

function createInlineCode({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      style={{
        fontFamily: "var(--fonts-mono)",
        backgroundColor: "var(--color-neutral-bg-subtle)",
        padding: "0.2em 0.4em",
        borderRadius: "var(--radius-s)",
        fontSize: "0.9em",
      }}
    >
      {children}
    </code>
  );
}

const components = {
  p: createParagraph as any,
  h1: createHeading(1) as any,
  h2: createHeading(2) as any,
  h3: createHeading(3) as any,
  h4: createHeading(4) as any,
  h5: createHeading(5) as any,
  h6: createHeading(6) as any,
  ul: createUnorderedList as any,
  ol: createOrderedList as any,
  li: createListItem as any,
  blockquote: createBlockquote as any,
  code: createInlineCode as any,
  img: createImage as any,
  a: CustomLink as any,
  Table,
  CodeBlock,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <div className="mdx-content">
      {/* @ts-ignore: Suppressing type error for MDXRemote usage */}
      <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
    </div>
  );
}
