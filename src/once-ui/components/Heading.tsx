'use client';

import React, { ElementType, ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';

import { TextProps, CommonProps, SpacingProps } from '../interfaces'
import { ColorScheme, ColorWeight, TextVariant, SpacingToken } from '../types';

type HeadingProps<T extends ElementType> = TextProps<T> & CommonProps & SpacingProps & ComponentPropsWithoutRef<T>;

const Heading = <T extends ElementType = 'h1'>({
    as,
    variant,
    size,
    weight,
    onBackground,
    onSolid,
    align,
    wrap,
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
    children,
    style,
    className,
    ...props
}: HeadingProps<T>) => {
    const Component = as || 'h1';

    if (variant && (size || weight)) {
        console.warn("When 'variant' is set, 'size' and 'weight' are ignored.");
    }

    if (onBackground && onSolid) {
        console.warn("You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied.");
    }

    const getVariantClasses = (variant: TextVariant) => {
        const [fontType, weight, size] = variant.split('-');
        return [`font-${fontType}`, `font-${weight}`, `font-${size}`];
    };

    const sizeClass = size ? `font-${size}` : 'font-m';
    const weightClass = weight ? `font-${weight}` : 'font-strong';

    const classes = variant
        ? getVariantClasses(variant)
        : [sizeClass, weightClass];

    let colorClass = 'neutral-on-background-strong';
    if (onBackground) {
        const [scheme, weight] = onBackground.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-background-${weight}`;
    } else if (onSolid) {
        const [scheme, weight] = onSolid.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-solid-${weight}`;
    }

    const generateClassName = (prefix: string, token: SpacingToken | undefined) => {
        return token ? `${prefix}-${token}` : undefined;
    };

    const combinedClasses = classNames(
        ...classes,
        colorClass,
        className,
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
    );

    return (
        <Component
            className={combinedClasses}
            style={{ textAlign: align, textWrap: wrap, ...style }}
            {...props}>
            {children}
        </Component>
    );
};

Heading.displayName = 'Heading';

export { Heading };