import { NextResponse } from "next/server";
import { getGoldRates } from "@/lib/getGoldRates";

export const runtime = "nodejs";

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