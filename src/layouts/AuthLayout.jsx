import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const authPageVariants = {
  initial: {
    opacity: 0,
    y: 28,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * AuthLayout — lightweight layout wrapper for auth pages (Login, Register, ForgotPassword)
 * that provides smooth slide transitions between them.
 */
export default function AuthLayout() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={authPageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: "transform, opacity" }}
        className="min-h-screen"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

