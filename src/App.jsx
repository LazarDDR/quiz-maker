import { AppRouter } from "./router";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import { ToastProvider } from "./shared/hooks/useToast";

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </ErrorBoundary>
  );
}
