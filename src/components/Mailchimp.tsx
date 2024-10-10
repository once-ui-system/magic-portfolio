"use client";

import { mailchimp } from '@/app/resources'
import { Button, Flex, Heading, Input, Text } from '@/once-ui/components';
import { Background } from '@/once-ui/components/Background';
import { useState } from 'react';
import { useTranslations } from 'next-intl';


function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }) as T;
}

type NewsletterProps = {
    display: boolean;
    title: string | JSX.Element;
    description: string | JSX.Element;
}

export const Mailchimp = (
    { newsletter }: { newsletter: NewsletterProps}
) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);

    const t = useTranslations();

    const validateEmail = (email: string): boolean => {
        if (email === '') {
            return true;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (!validateEmail(value)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const debouncedHandleChange = debounce(handleChange, 2000);

    const handleBlur = () => {
        setTouched(true);
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
        }
    };

    return (
        <Flex
            style={{overflow: 'hidden'}}
            position="relative"
            fillWidth padding="l"  radius="l" marginBottom="m"
            direction="column" alignItems="center" align="center"
            background="surface" border="neutral-medium" borderStyle="solid-1">
            <Background
                position="absolute"
                gradient={mailchimp.effects.gradient}
                dots={mailchimp.effects.dots}
                lines={mailchimp.effects.lines}/>
            <Heading style={{position: 'relative'}}
                marginBottom="s"
                variant="display-strong-xs">
                {newsletter.title}
            </Heading>
            <Text
                style={{
                    position: 'relative',
                    maxWidth: 'var(--responsive-width-xs)'
                }}
                wrap="balance"
                marginBottom="l"
                onBackground="neutral-medium">
                {newsletter.description}
            </Text>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                action={mailchimp.action}
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form">
                <Flex id="mc_embed_signup_scroll"
                    fillWidth maxWidth={24} gap="8">
                    <Input
                        formNoValidate
                        labelAsPlaceholder
                        id="mce-EMAIL"
                        name="EMAIL"
                        type="email"
                        label="Email"
                        required
                        onChange={(e) => {
                            if (error) {
                                handleChange(e);
                            } else {
                                debouncedHandleChange(e);
                            }
                        }}
                        onBlur={handleBlur}
                        error={error}/>
                    <div style={{display: 'none'}}>
                        <input type="checkbox" readOnly name="group[3492][1]" id="mce-group[3492]-3492-0" value="" checked/>
                    </div>
                    <div id="mce-responses" className="clearfalse">
                        <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                        <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                    </div>
                    <div aria-hidden="true" style={{position: 'absolute', left: '-5000px'}}>
                        <input type="text" readOnly name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa" tabIndex={-1} value=""/>
                    </div>
                    <div className="clear">
                        <Flex
                            height="48" alignItems="center">
                            <Button
                                id="mc-embedded-subscribe"
                                value="Subscribe"
                                size="m"
                                fillWidth>
                                {t("newsletter.button")}
                            </Button>
                        </Flex>
                    </div>
                </Flex>
            </form>
        </Flex>
    )
}