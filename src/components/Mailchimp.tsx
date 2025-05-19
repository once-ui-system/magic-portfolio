"use client";

import { mailchimp } from "@/app/resources";
import { Button, Flex, Heading, Input, Text, Background, Column } from "@/once-ui/components";
import { opacity, SpacingToken } from "@/once-ui/types";
import { useState } from "react";

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
};

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (email && !validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    try {
      // Mostrar mensaje de éxito inmediatamente
      setIsSubmitted(true);
      setEmail("");
      setTouched(false);
      
      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
      // Enviar datos a Mailchimp manualmente
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch(mailchimp.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Importante para evitar problemas de CORS
      });
      
      // No podemos verificar la respuesta en modo 'no-cors', pero asumimos éxito
      console.log('Formulario enviado a Mailchimp');
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      // Aún así mostramos el mensaje de éxito para el usuario
    }
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Background
            position="absolute"
            mask={{
              x: mailchimp.effects.mask.x,
              y: mailchimp.effects.mask.y,
              radius: mailchimp.effects.mask.radius,
              cursor: mailchimp.effects.mask.cursor
            }}
            gradient={{
              display: mailchimp.effects.gradient.display,
              opacity: mailchimp.effects.gradient.opacity as opacity,
              x: mailchimp.effects.gradient.x,
              y: mailchimp.effects.gradient.y,
              width: mailchimp.effects.gradient.width,
              height: mailchimp.effects.gradient.height,
              tilt: mailchimp.effects.gradient.tilt,
              colorStart: mailchimp.effects.gradient.colorStart,
              colorEnd: mailchimp.effects.gradient.colorEnd,
            }}
            dots={{
              display: mailchimp.effects.dots.display,
              opacity: mailchimp.effects.dots.opacity as opacity,
              size: mailchimp.effects.dots.size as SpacingToken,
              color: mailchimp.effects.dots.color,
            }}
            grid={{
              display: mailchimp.effects.grid.display,
              opacity: mailchimp.effects.grid.opacity as opacity,
              color: mailchimp.effects.grid.color,
              width: mailchimp.effects.grid.width,
              height: mailchimp.effects.grid.height,
            }}
            lines={{
              display: mailchimp.effects.lines.display,
              opacity: mailchimp.effects.lines.opacity as opacity,
              size: mailchimp.effects.lines.size as SpacingToken,
              thickness: mailchimp.effects.lines.thickness,
              angle: mailchimp.effects.lines.angle,
              color: mailchimp.effects.lines.color,
            }}
          />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {newsletter.title}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {newsletter.description}
      </Text>
      <form
        style={{
          width: "100%",
          display: isSubmitted ? "none" : "flex",
          justifyContent: "center",
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Flex id="mc_embed_signup_scroll" fillWidth maxWidth={24} mobileDirection="column" gap="8">
          <Input
            labelAsPlaceholder
            id="mce-EMAIL"
            name="EMAIL"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              if (error) {
                handleChange(e);
              } else {
                debouncedHandleChange(e);
              }
            }}
            onBlur={handleBlur}
            errorMessage={touched ? error : ''}
          />
          <div style={{ display: "none" }}>
            <input
              type="checkbox"
              readOnly
              name="group[3492][1]"
              id="mce-group[3492]-3492-0"
              value=""
              checked
            />
          </div>
          <div id="mce-responses" className="clearfalse">
            <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
            <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>
          <div className="clear">
            <Flex height="48" vertical="center">
              <Button 
              id="mc-embedded-subscribe" 
              type="submit"
              value="Subscribe" 
              size="m" 
              fillWidth
              disabled={!email || !!error}
            >
              Subscribe
            </Button>
            </Flex>
          </div>
        </Flex>
      </form>
      {isSubmitted && (
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1.5rem',
          animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.875rem 1.25rem',
            backgroundColor: 'var(--color-success-background-strong)',
            color: 'var(--color-success-on-background-strong)',
            borderRadius: 'var(--radius-m)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '90%',
            width: 'fit-content',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1
          }}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                flexShrink: 0,
                animation: 'checkmark 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards'
              }}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <Text 
              style={{
                margin: 0,
                fontWeight: 500,
                fontSize: '0.95rem',
                lineHeight: '1.4'
              }}
            >
              Thanks for joining! I'll be sharing updates with you soon.
            </Text>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              animation: 'progress 4.5s linear forwards',
              animationDelay: '0.5s',
              transformOrigin: 'left',
              width: '100%',
              borderRadius: '0 0 0 3px',
              mixBlendMode: 'multiply'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                mixBlendMode: 'screen'
              }} />
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes progress {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
      `}</style>
    </Column>
  );
};