"use client"

import React from "react"

import { Flex, Heading } from "@/once-ui/components"

import styles from "./HeadingLink.module.scss"

interface HeadingLinkProps {
  id: string
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: React.ReactNode
  style?: React.CSSProperties
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({
  id,
  as,
  children,
  style,
}) => {
  const variantMap = {
    h1: "display-strong-xs",
    h2: "heading-strong-xl",
    h3: "heading-strong-l",
    h4: "heading-strong-m",
    h5: "heading-strong-s",
    h6: "heading-strong-xs",
  } as const

  const variant = variantMap[as]

  return (
    <Flex style={style} vertical='center' gap='8'>
      <Heading className={styles.text} id={id} variant={variant} as={as}>
        {children}
      </Heading>
    </Flex>
  )
}
