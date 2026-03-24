import { Component } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "../../theme/colors";

/**
 * ErrorBoundary catches errors in child components and displays a fallback UI
 * instead of crashing the entire application.
 *
 * This prevents the dreaded "white screen of death" when errors occur.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, send to error tracking service)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload(); // Reload the page to reset state
  };

  render() {
    if (this.state.hasError) {
      // Show custom fallback or default error UI
      return (
        this.props.fallback ?? (
          <ErrorContainer>
            <ErrorContent>
              <ErrorTitle variant="h4">Oops! Something went wrong</ErrorTitle>
              <ErrorMessage variant="body1">
                {this.state.error?.message || "An unexpected error occurred"}
              </ErrorMessage>
              <ErrorDetails>Don't worry, your data is safe. Try refreshing the page.</ErrorDetails>
              <ResetButton variant="contained" onClick={this.handleReset}>
                Reload Page
              </ResetButton>
            </ErrorContent>
          </ErrorContainer>
        )
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ErrorContent = styled(Box)`
  background: ${COLORS.white};
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  text-align: center;
`;

const ErrorTitle = styled(Typography)`
  color: ${COLORS.redDanger};
  margin-bottom: 16px !important;
  font-weight: 700 !important;
`;

const ErrorMessage = styled(Typography)`
  color: ${COLORS.darkGray};
  margin-bottom: 12px !important;
  word-break: break-word;
`;

const ErrorDetails = styled(Typography)`
  color: ${COLORS.slate};
  margin-bottom: 24px !important;
  font-size: 0.875rem !important;
`;

const ResetButton = styled(Button)`
  background-color: ${COLORS.primaryBlue} !important;
  padding: 12px 32px !important;
  font-weight: 600 !important;
  text-transform: none !important;

  &:hover {
    background-color: ${COLORS.primaryBlueHover} !important;
  }
`;
