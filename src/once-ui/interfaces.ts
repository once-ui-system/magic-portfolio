import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import {
  ColorScheme,
  ColorWeight,
  flex,
  gridColumns,
  RadiusNest,
  RadiusSize,
  ShadowSize,
  SpacingToken,
  TextSize,
  TextType,
  TextVariant,
  TextWeight,
} from "./types";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: gridColumns;
  rows?: gridColumns;
  tabletColumns?: gridColumns;
  mobileColumns?: gridColumns;
  tabletRows?: gridColumns;
  mobileRows?: gridColumns;
}

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  tabletDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  mobileDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  horizontal?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  vertical?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch";
  center?: boolean;
  wrap?: boolean;
  flex?: flex;
}

export interface TextProps<T extends ElementType = "span"> extends HTMLAttributes<T> {
  as?: T;
  variant?: TextVariant;
  wrap?: CSSProperties["textWrap"];
  size?: TextSize;
  weight?: TextWeight;
}

export interface SizeProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | SpacingToken;
  height?: number | SpacingToken;
  maxWidth?: number | SpacingToken;
  minWidth?: number | SpacingToken;
  minHeight?: number | SpacingToken;
  maxHeight?: number | SpacingToken;
  fit?: boolean;
  fitWidth?: boolean;
  fitHeight?: boolean;
  fill?: boolean;
  fillWidth?: boolean;
  fillHeight?: boolean;
  aspectRatio?: CSSProperties["aspectRatio"];
}

export interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  padding?: SpacingToken;
  paddingLeft?: SpacingToken;
  paddingRight?: SpacingToken;
  paddingTop?: SpacingToken;
  paddingBottom?: SpacingToken;
  paddingX?: SpacingToken;
  paddingY?: SpacingToken;
  margin?: SpacingToken;
  marginLeft?: SpacingToken;
  marginRight?: SpacingToken;
  marginTop?: SpacingToken;
  marginBottom?: SpacingToken;
  marginX?: SpacingToken;
  marginY?: SpacingToken;
  gap?: SpacingToken | "-1";
  top?: SpacingToken;
  right?: SpacingToken;
  bottom?: SpacingToken;
  left?: SpacingToken;
}

export interface StyleProps extends HTMLAttributes<HTMLDivElement> {
  textVariant?: TextVariant;
  textSize?: TextSize;
  textType?: TextType;
  textWeight?: TextWeight;
  background?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | "surface"
    | "overlay"
    | "page"
    | "transparent";
  solid?: `${ColorScheme}-${ColorWeight}`;
  borderTop?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | "surface"
    | "transparent";
  borderRight?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | "surface"
    | "transparent";
  borderBottom?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | "surface"
    | "transparent";
  borderLeft?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | "surface"
    | "transparent";
  border?:
    | `${ColorScheme}-${ColorWeight}`
    | `${ColorScheme}-alpha-${ColorWeight}`
    | "surface"
    | "transparent";
  borderStyle?: "solid" | "dashed";
  borderWidth?: 1 | 2;
  topRadius?: RadiusSize;
  rightRadius?: RadiusSize;
  bottomRadius?: RadiusSize;
  leftRadius?: RadiusSize;
  topLeftRadius?: RadiusSize;
  topRightRadius?: RadiusSize;
  bottomLeftRadius?: RadiusSize;
  bottomRightRadius?: RadiusSize;
  radius?: RadiusSize | `${RadiusSize}-${RadiusNest}`;
  shadow?: ShadowSize;
  cursor?: CSSProperties["cursor"] | "interactive";
}

export interface ConditionalProps extends HTMLAttributes<HTMLDivElement> {
  hide?: "s" | "m" | "l";
  show?: "s" | "m" | "l";
}

export interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  inline?: boolean;
  pointerEvents?: "none" | "all" | "auto";
  position?: CSSProperties["position"];
  overflow?: CSSProperties["overflow"];
  overflowX?: CSSProperties["overflowX"];
  overflowY?: CSSProperties["overflowY"];
  transition?:
    | "micro-short"
    | "micro-medium"
    | "micro-long"
    | "macro-short"
    | "macro-medium"
    | "macro-long";
  opacity?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
  zIndex?: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface CommonProps extends HTMLAttributes<HTMLDivElement> {
  onBackground?: `${ColorScheme}-${ColorWeight}`;
  onSolid?: `${ColorScheme}-${ColorWeight}`;
  align?: CSSProperties["textAlign"];
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}
