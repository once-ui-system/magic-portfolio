"use client";

import React, { useState, forwardRef } from "react";
import { Input, InputProps, IconButton } from ".";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      ref={ref}
      type={showPassword ? "text" : "password"}
      hasSuffix={
        <IconButton
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          variant="ghost"
          icon={showPassword ? "eyeOff" : "eye"}
          size="s"
          type="button"
        />
      }
    />
  );
});

PasswordInput.displayName = "PasswordInput";
