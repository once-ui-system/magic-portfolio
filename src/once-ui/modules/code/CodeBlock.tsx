'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';

import '@/once-ui/modules/code/CodeHighlight.css';
import styles from '@/once-ui/modules/code/CodeBlock.module.scss';

import { Flex, Button, IconButton, DropdownWrapper } from '@/once-ui/components';

import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

type CodeInstance = {
    code: string;
    language: string;
    label: string;
};

type CodeBlockProps = {
    highlight?: string;
    codeInstances?: CodeInstance[];
    codePreview?: ReactNode;
    copyButton?: boolean;
    compact?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
    highlight,
    codeInstances = [],
    codePreview,
    copyButton = true,
    compact = false,
    className,
    style,
}) => {
    const codeRef = useRef<HTMLElement>(null);
    const preRef = useRef<HTMLPreElement>(null);
    const [selectedInstance, setSelectedInstance] = useState(0);

    const { code, language, label } = codeInstances[selectedInstance] || { code: '', language: '', label: 'Select Code' };

    const [copyIcon, setCopyIcon] = useState<string>('clipboard');

    useEffect(() => {
        if (codeRef.current && codeInstances.length > 0) {
            Prism.highlightAll();
        }
    }, [code, codeInstances.length]);

    const handleCopy = () => {
        if (codeInstances.length > 0) {
            navigator.clipboard.writeText(code)
                .then(() => {
                    setCopyIcon('check');

                    setTimeout(() => {
                        setCopyIcon('clipboard');
                    }, 5000);
                })
                .catch((err) => {
                    console.error('Failed to copy code: ', err);
                });
        }
    };

    const handleContent = (selectedLabel: string) => {
        const index = codeInstances.findIndex(instance => instance.label === selectedLabel);
        if (index !== -1) {
            setSelectedInstance(index);
        }
    };

    return (
        <Flex
            position="relative" zIndex={0}
            background="surface" radius="l" border="neutral-medium" borderStyle="solid-1"
            direction="column" justifyContent="center"
            fillWidth minHeight={3}
            className={className || ''}
            style={style}>
            {(codeInstances.length > 1 || copyButton && !compact) && (
                <Flex
                    style={{
                        borderBottom: '1px solid var(--neutral-border-medium)'
                    }}
                    zIndex={2}
                    fillWidth padding="8"
                    justifyContent="space-between">
                    {codeInstances.length > 1 ? (
                        <Flex>
                            <DropdownWrapper
                                dropdownOptions={codeInstances.map((instance, index) => ({
                                    label: instance.label,
                                    value: `${instance.label}-${index}`,
                                }))}
                                dropdownProps={{
                                    onOptionSelect: (option) => {
                                        const selectedLabel = option.value.split('-')[0];
                                        handleContent(selectedLabel);
                                    },
                                }}>
                                <Button
                                    size="s"
                                    label={label}
                                    suffixIcon="chevronDown"
                                    variant="tertiary"/>
                            </DropdownWrapper>
                        </Flex>
                    ) : <div/>}
                    {(copyButton && !compact) && 
                        <IconButton
                            tooltip="Copy"
                            variant="secondary"
                            onClick={handleCopy}
                            icon={copyIcon}/>
                    }
                </Flex>
            )}
            {codePreview && (
                <Flex
                    position="relative" zIndex={1}
                    fillHeight padding="l" minHeight={12}
                    justifyContent="center" alignItems="center">
                    {Array.isArray(codePreview)
                        ? codePreview.map((item, index) => (
                            <React.Fragment key={index}>
                                {item}
                            </React.Fragment>
                        ))
                        : codePreview}
                </Flex>
            )}
            {codeInstances.length > 0 && (
                <Flex
                    style={{
                        borderTop: (!compact && codePreview) ?
                        '1px solid var(--neutral-border-medium)' : 
                        'none'
                    }}
                    fillWidth padding="8"
                    position="relative" overflowY="auto">
                    {compact && copyButton &&
                        <Flex
                            zIndex={1}
                            style={{
                                right: 'var(--static-space-8)',
                                top: 'var(--static-space-8)',
                            }}
                            position="absolute">
                            <IconButton
                                aria-label="Copy code"
                                onClick={handleCopy}
                                icon={copyIcon}
                                size="m"
                                variant="secondary"/>
                        </Flex>
                    }
                    <pre
                        data-line={highlight}
                        ref={preRef}
                        className={`${styles.pre} language-${language}`}
                        tabIndex={-1}>
                        <code
                            ref={codeRef}
                            className={`${styles.code} ${`language-${language}`}`}>
                            {code}
                        </code>
                    </pre>
                </Flex>
            )}
        </Flex>
    );
};

export { CodeBlock };