import { NextRequest, NextResponse } from "next/server";
import { getParticularVegetableData } from "@/lib/vegetables";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ vegetableName: string }> }) {
    try {
        const { vegetableName } = await params;

        if (!vegetableName?.trim()) {
            return NextResponse.json(
                { message: "vegetableName is required" },
                { status: 400 }
            );
        }

        const data = await getParticularVegetableData(vegetableName);

        if (data.length === 0) {
            return NextResponse.json(
                { message: "Vegetable data not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Fetch error:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
