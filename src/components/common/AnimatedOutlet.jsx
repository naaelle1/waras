import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * AnimatedOutlet — replaces <Outlet> in layout components to add
 * smooth page transitions between routes using AnimatePresence.
 *
 * @param {object} props
 * @param {object} [props.context] - Outlet context to pass through
 * @param {boolean} [props.disabled] - If true, skip animation (e.g. AI page)
 */
export default function AnimatedOutlet({ context, disabled = false }) {
  const location = useLocation();
  const outlet = useOutlet(context);

  if (disabled) {
    return outlet;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: "transform, opacity" }}
        className="w-full"
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}

