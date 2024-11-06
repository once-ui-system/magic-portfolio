import { renderContent } from "@/app/resources";
import { Flex, IconButton, SmartLink, Text } from "@/once-ui/components"
import { useTranslations } from "next-intl";
import styles from './Footer.module.scss'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const t = useTranslations();
    const { person, social } = renderContent(t);

    return (
        <Flex
            as="footer"
            position="relative"
            fillWidth padding="8"
            justifyContent="center" mobileDirection="column">
            <Flex
                className={styles.mobile}
                fillWidth maxWidth="m" paddingY="8" paddingX="16" gap="16"
                justifyContent="space-between" alignItems="center">
                <Text
                    variant="body-default-s"
                    onBackground="neutral-strong">
                    <Text
                        onBackground="neutral-weak">
                        © {currentYear} /
                    </Text>
                    <Text paddingX="4">
                        {person.name}
                    </Text>
                    <Text onBackground="neutral-weak">
                        {/* Usage of this template requires attribution. Please don't remove the link to Once UI. */}
                        / Build your portfolio with <SmartLink style={{marginLeft: '-0.125rem'}} href="https://once-ui.com/templates/magic-portfolio">Once UI</SmartLink>
                    </Text>
                </Text>
                <Flex
                    gap="16">
                    {social.map((item) => (
                        item.link && (
                            <IconButton
                                key={item.name}
                                href={item.link}
                                icon={item.icon}
                                tooltip={item.name}
                                size="s"
                                variant="ghost"/>
                        )
                    ))}
                </Flex>
            </Flex>
            <Flex height="80" show="s"></Flex>
        </Flex>
    )
}