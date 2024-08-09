"use client";

import React, { CSSProperties, forwardRef } from 'react';
import classNames from 'classnames';

import { GridProps, SpacingProps, SizeProps, StyleProps, CommonProps, DisplayProps, ConditionalProps } from '../interfaces';
import { SpacingToken, ColorScheme, ColorWeight } from '../types';

import styles from './Grid.module.scss';

interface ComponentProps extends 
    GridProps, 
    SpacingProps, 
    SizeProps, 
    StyleProps, 
    CommonProps, 
    DisplayProps, 
    ConditionalProps {}

const Grid = forwardRef<HTMLDivElement, ComponentProps>(({
    as: Component = 'div',
    columns,
    rows,
    gap,
    position,
    tabletColumns,
    mobileColumns,
    tabletRows,
    mobileRows,
    padding,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    paddingX,
    paddingY,
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginX,
    marginY,
    width,
    height,
    maxWidth,
    minWidth,
    minHeight,
    maxHeight,
    fillWidth = false,
    fillHeight = false,
    hide,
    show,
    background,
    solid,
    alpha,
    border,
    borderStyle,
    radius,
    overflowX,
    overflowY,
    zIndex,
    shadow,
    className,
    style,
    children,
    ...rest
}, ref) => {
    const generateClassName = (prefix: string, token: SpacingToken | undefined) => {
        return token ? `${prefix}-${token}` : undefined;
    };

    const generateDynamicClass = (type: string, value: string | undefined) => {
        if (!value) return undefined;
        if (value === 'surface' || value === 'page' || value === 'transparent') {
            return `${value}-${type}`;
        }
        const [scheme, weight] = value.split('-') as [ColorScheme, ColorWeight];
        return `${scheme}-${type}-${weight}`;
    };

    const parseDimension = (value: number | SpacingToken | undefined, type: 'width' | 'height'): string | undefined => {
        if (value === undefined) return undefined;
        if (typeof value === 'number') return `${value}rem`;
        if (['0', '1', '2', '4', '8', '12', '16', '20', '24', '32', '40', '48', '56', '64', '80', '104', '128', '160'].includes(value)) {
            return `var(--static-space-${value})`;
        }
        if (['xs', 's', 'm', 'l', 'xl'].includes(value)) {
            return `var(--responsive-${type}-${value})`;
        }
        return undefined;
    };

    const classes = classNames(
        styles.grid,
        className,
        fillWidth && styles.fillWidth,
        tabletColumns && styles[`tablet-${tabletColumns}`],
        mobileColumns && styles[`mobile-${mobileColumns}`],
        generateClassName('p', padding),
        generateClassName('pl', paddingLeft),
        generateClassName('pr', paddingRight),
        generateClassName('pt', paddingTop),
        generateClassName('pb', paddingBottom),
        generateClassName('px', paddingX),
        generateClassName('py', paddingY),
        generateClassName('m', margin),
        generateClassName('ml', marginLeft),
        generateClassName('mr', marginRight),
        generateClassName('mt', marginTop),
        generateClassName('mb', marginBottom),
        generateClassName('mx', marginX),
        generateClassName('my', marginY),
        generateClassName('g', gap),
        generateDynamicClass('background', background),
        generateDynamicClass('alpha', alpha),
        generateDynamicClass('solid', solid),
        generateDynamicClass('border', border),
        borderStyle && `border-${borderStyle}`,
        radius === 'full' ? 'radius-full' : radius && `radius-${radius}`,
        hide === 's' && 's-grid-hide',
        hide === 'm' && 'm-grid-hide',
        show === 's' && 's-grid-show',
        show === 'm' && 'm-grid-show',
        shadow && `shadow-${shadow}`,
    );

    const combinedStyle: CSSProperties = {
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
        gap,
        maxWidth: parseDimension(maxWidth, 'width'),
        minWidth: parseDimension(minWidth, 'width'),
        minHeight: parseDimension(minHeight, 'height'),
        maxHeight: parseDimension(maxHeight, 'height'),
        width: fillWidth ? '100%' : parseDimension(width, 'width'),
        height: fillHeight ? '100%' : parseDimension(height, 'height'),
        position,
        overflowX,
        overflowY,
        zIndex,
        ...style,
    };

    return (
        <Component
            ref={ref}
            className={classes}
            style={combinedStyle}
            {...rest}>
            {children}
        </Component>
    );
});

Grid.displayName = "Grid";

export { Grid };
export type { GridProps };