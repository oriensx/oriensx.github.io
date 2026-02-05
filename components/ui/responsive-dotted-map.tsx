"use client";

import * as React from "react";
import { DottedMap, DottedMapProps } from "./dotted-map";

interface ResponsiveDotRadius {
  sm?: number;  // < 640px
  md?: number;  // 640px - 1024px
  lg?: number;  // > 1024px
}

interface ResponsiveDottedMapProps extends Omit<DottedMapProps, "dotRadius"> {
  dotRadius?: ResponsiveDotRadius;
}

export function ResponsiveDottedMap({
  dotRadius = { sm: 0.2, md: 0.12, lg: 0.08 },
  ...props
}: ResponsiveDottedMapProps) {
  const [currentRadius, setCurrentRadius] = React.useState(dotRadius.md ?? 0.06);

  React.useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentRadius(dotRadius.sm ?? 0.04);
      } else if (width < 1024) {
        setCurrentRadius(dotRadius.md ?? 0.06);
      } else {
        setCurrentRadius(dotRadius.lg ?? 0.08);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [dotRadius]);

  return <DottedMap dotRadius={currentRadius} {...props} />;
}
