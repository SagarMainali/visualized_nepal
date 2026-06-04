import { NextResponse } from "next/server";
import { getInflationData } from "@/lib/getInflationData";

export async function GET() {
    try {
        const data = await getInflationData();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        const customMessage = "Unexpected error occured";
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