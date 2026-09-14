import { NextResponse } from "next/server";
import { getGoldRates } from "@/lib/getGoldRates";

// export const runtime = "nodejs";
// runtime is nodejs by default in nextjs 16+ and also cannot be use alongside 'cacheComponents: true'

export async function GET() {
    try {
        const data = await getGoldRates();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        const customMessage = "Errored while scraping data"
        console.log(customMessage);
        return NextResponse.json({
            message: error instanceof Error
                ? error.message
                : customMessage
        },
            { status: 500 }
        );
    }
}