import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    this.handleWebGLWarning = (event) => {
      if (event.message && event.message.includes("Too many active WebGL contexts")) {
        alert("Warning: Your device has reached its WebGL context limit. You may experience visual glitches.");
        this.setState({ hasError: true });
      }
    };

    window.addEventListener("error", this.handleWebGLWarning);
    window.addEventListener("warning", this.handleWebGLWarning);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleWebGLWarning);
    window.removeEventListener("warning", this.handleWebGLWarning);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>Please refresh the page to continue.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;