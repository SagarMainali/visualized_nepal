// this endpoint acts as an internal webhook that purges the cache when called

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
    const { secret, tag } = await req.json();

    // secured with a key so random people can't wipe server cache by calling this api
    if (secret !== process.env.CACHE_REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!tag) {
        return NextResponse.json({ message: "Missing tag param" }, { status: 400 });
    }

    // doesn't hard wipe the cache - instead marks the cached data as stale, the next request gets this staled data but fetches fresh data
    // on the background and updates the cache slot with this fresh data.
    revalidateTag(tag, 'max');

    return NextResponse.json({ revalidated: true, now: Date.now() });
}
