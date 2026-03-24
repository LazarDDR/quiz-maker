import { useState, useCallback, createContext, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, severity = "info") => {
    setToast({ message, severity, id: Date.now() });
  }, []);

  const showError = useCallback((message) => showToast(message, "error"), [showToast]);

  const showSuccess = useCallback((message) => showToast(message, "success"), [showToast]);

  const showWarning = useCallback((message) => showToast(message, "warning"), [showToast]);

  const showInfo = useCallback((message) => showToast(message, "info"), [showToast]);

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, showError, showSuccess, showWarning, showInfo }}>
      {children}
      {toast && (
        <Snackbar
          open={true}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
