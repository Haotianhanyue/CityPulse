"use client";
import { motion, useDragControls } from "framer-motion";
import { useRef } from "react";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";
import { useAppStore } from "@/store/useAppStore";

interface BottomSheetProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function BottomSheet({ children, title, className }: BottomSheetProps) {
  const { bottomSheetExpanded, toggleBottomSheet } = useAppStore();
  const dragRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <motion.div
      initial={false}
      animate={{
        height: bottomSheetExpanded ? "70vh" : "20vh",
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      drag="y"
      dragConstraints={{ top: -200, bottom: 0 }}
      dragElastic={0.2}
      dragControls={dragControls}
      onDragEnd={(_, info) => {
        if (info.offset.y > 50) useAppStore.setState({ bottomSheetExpanded: false });
        if (info.offset.y < -50) useAppStore.setState({ bottomSheetExpanded: true });
      }}
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-30 bg-surface-container-lowest rounded-t-3xl shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* Handle */}
      <div
        ref={dragRef}
        onClick={toggleBottomSheet}
        className="flex flex-col items-center pt-sm pb-sm cursor-grab active:cursor-grabbing"
      >
        <div className="w-10 h-1.5 bg-surface-dim rounded-full mb-sm" />
        {title && (
          <span className="text-body-lg font-headline-lg text-on-surface">
            {title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-margin-mobile pb-lg overflow-y-auto h-full">
        {children}
      </div>
    </motion.div>
  );
}
