// components/ClientErrorBoundary.tsx
"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default class ClientErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // You can log to a service here
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
