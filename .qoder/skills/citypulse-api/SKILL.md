# CityPulse API Skill

Generate Next.js API Route Handlers with validation and error handling.

## Instructions

When creating API endpoints:

1. Place in `src/app/api/[resource]/route.ts`
2. Use Zod for request validation
3. Always return wrapped responses `{ data, total, page, pageSize }`
4. Handle errors with appropriate HTTP status codes
5. Use TypeScript types from `@/types`

## Route Handler Template

```typescript
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Validation schema
const createSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  category: z.enum(["城市漫步", "夜骑", "文化探访", "美食之旅"]),
});

// GET /api/[resource]
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 20);

    // ... fetch data
    const data: unknown[] = [];

    return NextResponse.json({
      data,
      total: data.length,
      page,
      pageSize,
      hasMore: data.length > page * pageSize,
    });
  } catch (error) {
    console.error("GET /api/[resource] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/[resource]
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createSchema.parse(body);

    // ... create resource
    return NextResponse.json({ data: validated }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("POST /api/[resource] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

## Dynamic Route Handler

```typescript
// src/app/api/[resource]/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // ... fetch by id
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // ... update by id
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // ... delete by id
}
```

## Existing Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/explore` | POI discovery |
| GET | `/api/routes` | Route list |
| GET | `/api/feed` | Community feed |

## Common Query Params

- `page` / `pageSize` - Pagination
- `search` - Text search
- `category` - Filter by category
- `filter` - Special filters (trending, nearby)
- `lat` / `lng` - Location-based queries
