import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * AuthLayout — lightweight layout wrapper for auth pages (Login, Register, ForgotPassword)
 * that provides immediate unmounting and smooth entrance transitions.
 */
export default function AuthLayout() {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="min-h-screen"
    >
      <Outlet />
    </motion.div>
  );
}

