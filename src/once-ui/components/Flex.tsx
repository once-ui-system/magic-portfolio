'use client';

import React, { CSSProperties, forwardRef } from 'react';
import classNames from 'classnames';

import { FlexProps, SpacingProps, SizeProps, StyleProps, CommonProps, DisplayProps, ConditionalProps } from '../interfaces';
import { TextVariant, SpacingToken, ColorScheme, ColorWeight } from '../types';

interface ComponentProps extends 
    FlexProps, 
    SpacingProps, 
    SizeProps, 
    StyleProps, 
    CommonProps, 
    DisplayProps, 
    ConditionalProps {}

const Flex = forwardRef<HTMLDivElement, ComponentProps>(({
    as: Component = 'div',
    direction,
    justifyContent,
    alignItems,
    wrap = false,
    flex,
    textVariant,
    textSize,
    textWeight,
    onBackground,
    onSolid,
    align,
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
    gap,
    position,
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
    tabletDirection,
    mobileDirection,
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

    if (onBackground && onSolid) {
        console.warn("You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied.");
    }

    if (background && solid) {
        console.warn("You cannot use both 'background' and 'solid' props simultaneously. Only one will be applied.");
    }

    const getVariantClasses = (variant: TextVariant) => {
        const [fontType, weight, size] = variant.split('-');
        return [`font-${fontType}`, `font-${weight}`, `font-${size}`];
    };

    const sizeClass = textSize ? `font-${textSize}` : '';
    const weightClass = textWeight ? `font-${textWeight}` : '';

    const variantClasses = textVariant ? getVariantClasses(textVariant) : [sizeClass, weightClass];

    let colorClass = '';
    if (onBackground) {
        const [scheme, weight] = onBackground.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-background-${weight}`;
    } else if (onSolid) {
        const [scheme, weight] = onSolid.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-solid-${weight}`;
    }

    const generateDynamicClass = (type: string, value: string | undefined) => {
        if (!value) return undefined;
        if (value === 'surface' || value === 'page' || value === 'transparent') {
            return `${value}-${type}`;
        }
        const [scheme, weight] = value.split('-') as [ColorScheme, ColorWeight];
        return `${scheme}-${type}-${weight}`;
    };

    const classes = classNames(
        'flex',
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
        direction === 'column' && 'flex-column',
        direction === 'row' && 'flex-row',
        tabletDirection === 'column' && 'm-flex-column',
        tabletDirection === 'row' && 'm-flex-row',
        mobileDirection === 'column' && 's-flex-column',
        mobileDirection === 'row' && 's-flex-row',
        borderStyle && `border-${borderStyle}`,
        radius === 'full' ? 'radius-full' : radius && `radius-${radius}`,
        hide === 's' && 's-flex-hide',
        hide === 'm' && 'm-flex-hide',
        hide === 'l' && 'l-flex-hide',
        show === 's' && 's-flex-show',
        show === 'm' && 'm-flex-show',
        show === 'l' && 'l-flex-show',
        shadow && `shadow-${shadow}`,
        colorClass,
        className,
        ...variantClasses,
    );

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

    const combinedStyle: CSSProperties = {
        justifyContent,
        alignItems,
        flexWrap: wrap ? 'wrap' : undefined,
        flex: flex !== undefined ? flex.toString() : undefined,
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
        textAlign: align,
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

Flex.displayName = 'Flex';

export { Flex };