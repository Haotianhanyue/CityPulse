import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { RouteCard } from "@/components/RouteCard";
import { mockRoutes } from "@/data/mock";

export default function RoutesPage() {
  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-lg">
        <div>
          <h1 className="font-headline-lg text-display-lg text-on-surface">
            发现路线
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
            探索城市中的独特漫步路线
          </p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-sm mb-lg overflow-x-auto hide-scrollbar">
        <Chip label="精选" active icon="auto_awesome" />
        <Chip label="城市漫步" icon="directions_walk" />
        <Chip label="文化探访" icon="museum" />
        <Chip label="美食之旅" icon="restaurant" />
        <Chip label="夜骑" icon="nights_stay" />
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-md bg-surface-container-low rounded-full px-md py-sm mb-lg">
        <span className="material-symbols-outlined text-on-surface-variant">
          search
        </span>
        <input
          type="text"
          placeholder="搜索路线、地点或社区成员..."
          className="flex-1 outline-none text-body-md font-body-md bg-transparent"
        />
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[20px]">
            tune
          </span>
        </button>
      </div>

      {/* Route cards */}
      <div className="space-y-lg">
        {mockRoutes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>

      {/* Load more */}
      <div className="mt-xl flex justify-center">
        <Button variant="ghost" icon="expand_more">
          加载更多
        </Button>
      </div>
    </div>
  );
}
