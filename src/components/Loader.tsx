import { motion, TargetAndTransition, Transition } from "framer-motion";

type LoaderVariant = "default" | "pulse" | "bounce" | "spinner";

interface LoaderProps {
  height?: string;
  width?: string;
  color?: string;
  variant?: LoaderVariant;
}

interface VariantConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
  style: React.CSSProperties;
}

const Loader = ({ 
  height = "40px", 
  width = "40px", 
  color = "#3b82f6", 
  variant = "default" 
}: LoaderProps) => {
  const loaderVariants: Record<LoaderVariant, VariantConfig> = {
    default: {
      initial: { rotate: 0 },
      animate: { rotate: 360 },
      transition: { duration: 1, repeat: Infinity, ease: "linear" },
      style: { borderRadius: "50%", backgroundColor: color },
    },
    pulse: {
      initial: { scale: 1 },
      animate: { scale: [1, 1.5, 1] },
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
      style: { borderRadius: "50%", backgroundColor: color },
    },
    bounce: {
      initial: { y: 0 },
      animate: { y: [-10, 0, -10] },
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" },
      style: { borderRadius: "10%", backgroundColor: color },
    },
    spinner: {
      initial: { rotate: 0 },
      animate: { rotate: 360 },
      transition: { duration: 0.6, repeat: Infinity, ease: "linear" },
      style: {
        border: `4px solid ${color}40`,
        borderTop: `4px solid ${color}`,
        borderRadius: "50%",
      },
    },
  };

  const selectedVariant = loaderVariants[variant];

  return (
    <div className="flex justify-center items-center">
      <motion.div
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        transition={selectedVariant.transition}
        style={{ height, width, ...selectedVariant.style }}
        className="flex justify-center items-center"
      />
    </div>
  );
};

export { Loader };