import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AccessibilityProvider, useAccessibility } from "./context/AccessibilityContext";
import { MotionConfig } from "framer-motion";

function AppMotionContainer({ children }) {
  const { reducedMotion } = useAccessibility();
  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AppMotionContainer>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AppMotionContainer>
    </AccessibilityProvider>
  );
}