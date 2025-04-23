"use client";

import React, {
  ReactNode,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useState,
  useContext,
} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { Flex, Heading, IconButton, Text } from ".";
import styles from "./Dialog.module.scss";

interface DialogProps extends Omit<React.ComponentProps<typeof Flex>, "title"> {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode | string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  base?: boolean;
  stack?: boolean;
  onHeightChange?: (height: number) => void;
  minHeight?: number;
}

const DialogContext = React.createContext<{
  stackedDialogOpen: boolean;
  setStackedDialogOpen: (open: boolean) => void;
}>({
  stackedDialogOpen: false,
  setStackedDialogOpen: () => {},
});

export const DialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [stackedDialogOpen, setStackedDialogOpen] = useState(false);

  return (
    <DialogContext.Provider
      value={{
        stackedDialogOpen,
        setStackedDialogOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

const Dialog: React.FC<DialogProps> = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      stack,
      base,
      footer,
      onHeightChange,
      minHeight,
      ...rest
    },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);
    const { stackedDialogOpen, setStackedDialogOpen } = useContext(DialogContext);

    useEffect(() => {
      if (stack) {
        setStackedDialogOpen(isOpen);
      }
    }, [stack, isOpen, setStackedDialogOpen]);

    useEffect(() => {
      if (dialogRef.current && isVisible) {
        const height = dialogRef.current.offsetHeight;
        onHeightChange?.(height);
      }
    }, [isVisible, onHeightChange]);

    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        setTimeout(() => {
          setIsAnimating(true);
        }, 0);
      } else {
        setIsAnimating(false);
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }
    }, [isOpen]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape" && !base) {
          onClose();
        }
        if (event.key === "Tab" && dialogRef.current) {
          const focusableElements = dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      },
      [onClose, base],
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }
    }, [isOpen, handleKeyDown]);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        // Make everything outside the dialog inert
        document.body.childNodes.forEach((node) => {
          if (node instanceof HTMLElement && node !== document.getElementById("portal-root")) {
            node.inert = true;
          }
        });

        // If this is a stacked dialog, make the base dialog inert too
        if (stack) {
          const dialogs = document.querySelectorAll('[role="dialog"]');
          dialogs.forEach((dialog) => {
            if (dialog instanceof HTMLElement && !dialog.contains(dialogRef.current)) {
              dialog.inert = true;
            }
          });
        }
      } else {
        // If this is a stacked dialog closing, restore interactivity to base dialog
        if (stack) {
          const dialogs = document.querySelectorAll('[role="dialog"]');
          dialogs.forEach((dialog) => {
            if (dialog instanceof HTMLElement) {
              dialog.inert = false;
            }
          });
        } else {
          // If base dialog is closing, restore everything
          document.body.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              node.inert = false;
            }
          });
          document.body.style.overflow = "unset";
        }
      }
    }, [isOpen, stack]);

    useEffect(() => {
      if (isOpen && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        firstElement.focus();
      }
    }, [isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!dialogRef.current?.contains(event.target as Node)) {
          if (stack || !base) {
            onClose();
          }
        }
      };

      if (isVisible) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [isVisible, onClose, stack, base]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
      <Flex
        ref={ref}
        transition="macro-medium"
        background="overlay"
        position="fixed"
        zIndex={base ? 8 : 9}
        top="0"
        left="0"
        right="0"
        bottom="0"
        className={classNames(styles.overlay, {
          [styles.open]: isAnimating,
        })}
        center
        padding="l"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <Flex
          fill
          center
          transition="macro-medium"
          style={{
            transform: base ? "scale(0.94) translateY(-1.25rem)" : "",
          }}
        >
          <Flex
            className={classNames(styles.dialog, {
              [styles.open]: isAnimating,
            })}
            style={{
              minHeight: minHeight ? `${minHeight}px` : undefined,
            }}
            ref={dialogRef}
            fillWidth
            transition="macro-medium"
            shadow="xl"
            radius="xl"
            border="neutral-medium"
            background="neutral-weak"
            direction="column"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                const focusableElements = Array.from(
                  dialogRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                  ) || [],
                );

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstElement) {
                  e.preventDefault();
                  lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                  e.preventDefault();
                  firstElement.focus();
                }
              }
            }}
            {...rest}
          >
            <Flex
              as="header"
              direction="column"
              paddingX="24"
              paddingTop="24"
              paddingBottom="s"
              gap="4"
            >
              <Flex fillWidth horizontal="space-between" gap="8">
                {typeof title === "string" ? (
                  <Heading id="dialog-title" variant="heading-strong-l">
                    {title}
                  </Heading>
                ) : (
                  title
                )}
                <IconButton
                  icon="close"
                  size="m"
                  variant="tertiary"
                  tooltip="Close"
                  onClick={onClose}
                />
              </Flex>
              {description && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {description}
                </Text>
              )}
            </Flex>
            <Flex
              as="section"
              paddingX="24"
              paddingBottom="24"
              flex={1}
              overflowY="auto"
              direction="column"
            >
              {children}
            </Flex>
            {footer && (
              <Flex borderTop="neutral-medium" as="footer" horizontal="end" padding="12" gap="8">
                {footer}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>,
      document.body,
    );
  },
);

Dialog.displayName = "Dialog";

export { Dialog };
