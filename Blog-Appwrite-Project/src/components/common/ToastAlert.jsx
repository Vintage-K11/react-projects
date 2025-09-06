// src/components/common/ToastAlert.jsx
import React from "react";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner"; // your styled & themed toaster

// Component: put this once in MainLayout / App.jsx
function ToastAlert() {
  return (
    <Toaster
      position="top-right"
      expand
      richColors
      closeButton
    />
  );
}

// Wrapper functions for usage
const showSuccess = (message) => toast.success(message);
const showError = (message) => toast.error(message);
const showInfo = (message) => toast(message);
const showWarning = (message) => toast.warning(message);

export { ToastAlert, showSuccess, showError, showInfo, showWarning };
