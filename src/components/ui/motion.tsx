import { motion, type HTMLMotionProps } from "framer-motion";

export const hoverLift = {
  initial: { y: 0, opacity: 1 },
  whileHover: { y: -2 },
  whileTap: { y: 0 },
  transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.15 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export function MotionCard(props: HTMLMotionProps<"div">) {
  return <motion.div {...hoverLift} {...props} />;
}

export function MotionFade(props: HTMLMotionProps<"div">) {
  return <motion.div {...fadeInUp} {...props} />;
}

export { motion };


