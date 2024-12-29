import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-white text-[18px] text-center px-4">
            Sorry, cannot load this model due to your device capabilities
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;