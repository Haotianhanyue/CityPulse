"use client";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import type { RouteStop } from "@/types";

interface TimelineProps {
  stops: RouteStop[];
}

const timelineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
  }),
};

export function Timeline({ stops }: TimelineProps) {
  return (
    <div className="space-y-lg">
      {stops.map((stop, i) => (
        <motion.div
          key={stop.order}
          custom={i}
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative pl-xl pb-lg group"
        >
          {/* Dashed line */}
          {i < stops.length - 1 && <div className="timeline-line" />}

          {/* Marker */}
          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-container flex items-center justify-center shadow-md">
            <Icon name="place" filled size={16} className="text-primary" />
          </div>

          {/* Time */}
          <div className="mb-sm text-caption font-caption text-on-surface-variant">
            {stop.time}
          </div>

          {/* Title */}
          <h3 className="font-headline-md text-headline-lg-mobile md:text-headline-lg mb-sm">
            {stop.name}
          </h3>
          {stop.nameEn && (
            <p className="text-caption font-caption text-on-surface-variant mb-sm">
              {stop.nameEn}
            </p>
          )}

          {/* Description */}
          <p className="text-body-md font-body-md text-on-surface-variant mb-md">
            {stop.description}
          </p>

          {/* Image */}
          {stop.images.length > 0 && (
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-surface-variant">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stop.images[0]}
                alt={stop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Tips */}
          {stop.tips && (
            <div className="mt-sm flex items-center gap-sm bg-secondary-container/20 rounded-lg p-sm">
              <Icon name="lightbulb" size={20} className="text-secondary" />
              <span className="text-caption font-caption text-secondary">
                {stop.tips}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
