import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccessibility } from "../../context/AccessibilityContext";

/**
 * AnimatedOutlet — replaces <Outlet> in layout components.
 * Immediately unmounts previous page content (no lingering exit animation)
 * and smoothly enters the new page at the top.
 *
 * @param {object} props
 * @param {object} [props.context] - Outlet context to pass through
 * @param {boolean} [props.disabled] - If true, skip animation (e.g. AI page)
 */
export default function AnimatedOutlet({ context, disabled = false }) {
  const location = useLocation();
  const outlet = useOutlet(context);
  const { reducedMotion } = useAccessibility();

  if (disabled || reducedMotion) {
    return outlet;
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
    >
      {outlet}
    </motion.div>
  );
}

