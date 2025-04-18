import React, { forwardRef } from "react";
import styles from "./NavIcon.module.scss";
import { Flex } from ".";
import classNames from "classnames";

interface NavIconProps extends React.ComponentProps<typeof Flex> {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isActive: boolean;
}

const NavIcon = forwardRef<HTMLDivElement, Partial<NavIconProps>>(
  ({ className, isActive, style, onClick, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        tabIndex={0}
        radius="m"
        cursor="interactive"
        width="40"
        height="40"
        minHeight="40"
        minWidth="40"
        className={className}
        style={style}
        onClick={onClick}
        {...rest}
      >
        <div className={classNames(styles.line, isActive && styles.active)} />
        <div className={classNames(styles.line, isActive && styles.active)} />
      </Flex>
    );
  },
);

NavIcon.displayName = "NavIcon";

export { NavIcon };
