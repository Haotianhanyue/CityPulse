# CityPulse Route Skill

Generate route-related pages and components for CityPulse.

## Instructions

When building route features:

1. Use `<Timeline>` component for stop-by-stop display
2. Use `<RouteCard>` for route list items (horizontal or vertical)
3. Route data follows the `Route` interface from `@/types`
4. Include difficulty badges: 轻松 (green), 中等 (yellow), 挑战 (red)
5. Always show: distance, duration, difficulty, author info

## Route Detail Page Structure

```tsx
// src/app/routes/[id]/page.tsx
export default function RouteDetailPage() {
  return (
    <div className="flex flex-col md:flex-row gap-xl px-margin-mobile md:px-margin-desktop py-lg">
      {/* Main content */}
      <div className="flex-1">
        {/* Hero: title, category chip, stats */}
        {/* Author card */}
        {/* <Timeline stops={route.stops} /> */}
        {/* Action buttons: like, bookmark, share */}
        {/* Comments section */}
      </div>
      {/* Desktop sidebar: map + related routes */}
      <div className="hidden md:block w-80">
        {/* Map placeholder */}
        {/* Start navigation button */}
        {/* Related routes */}
      </div>
    </div>
  );
}
```

## Timeline Stop Component

```tsx
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.2, duration: 0.7 },
  }),
};

// Each stop: marker (Icon "place") + time + name + description + image + tips
// Use `timeline-line` CSS class for the dashed connector
```

## Route Card Variants

- **Horizontal** (default): Image left, info right - used in route list
- **Vertical**: Image top, info bottom - used in horizontal scroll sections (profile page)

## Route Data Model

```typescript
interface Route {
  id: string;
  title: string;
  subtitle: string;
  category: "城市漫步" | "夜骑" | "文化探访" | "美食之旅";
  location: string;
  distance: string;    // e.g. "3.2km"
  duration: string;    // e.g. "2.5h"
  difficulty: "轻松" | "中等" | "挑战";
  author: UserProfile;
  stops: RouteStop[];
  likes: number;
  bookmarks: number;
  comments: number;
  coverImage: string;
}
```
