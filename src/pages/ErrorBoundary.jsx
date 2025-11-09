import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("🚨 Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h3>⚠️ Something went wrong. Please refresh.</h3>;
    }
    return this.props.children;
  }
}
