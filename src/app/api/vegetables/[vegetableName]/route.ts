import { NextRequest, NextResponse } from "next/server";
import clientPromise from '@/lib/dbConnect';

export async function GET(_request: NextRequest, { params }: { params: { vegetableName: string } }) {
    try {
        const { vegetableName } = await params;

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("daily_prices");

        // get docs that matches the vegetable name and only get the data(object) of particular vegetable
        const rawDocs = await collection.aggregate([
            {
                $match: {
                    "vegetablesData.commodity": vegetableName
                }
            },
            {
                $project: {
                    date: 1,
                    vegetablesData: {
                        $filter: {
                            input: "$vegetablesData",
                            as: "item",
                            cond: { $eq: ["$$item.commodity", vegetableName] }
                        }
                    }
                }
            }
        ]).toArray();

        // modify the rawDocs to send the appropriate data for rendering in chart
        const refinedDocs = rawDocs.map(singleDate_SelectedVegetable => {
            const { date, vegetablesData } = singleDate_SelectedVegetable;

            const selectedVegetableData = vegetablesData[0]; // this array only contains one obj

            return {
                date,
                ...selectedVegetableData
            }
        })

        return NextResponse.json(refinedDocs, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unexpected error" },
            { status: 500 }
        );
    }
}
