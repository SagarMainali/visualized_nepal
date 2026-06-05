import clientPromise from '@/lib/database/dbConnect';

export async function getParticularVegetableData(vegetableName: string): Promise<RangedDate_SingleVegetable_ForChartT[]> {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("daily_prices");

    // select docs that has the given vegetable data in vegetablesData field(array) and from that field only include that particular vegetable data filtering others
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
    const refinedDocs = rawDocs.map(doc => {
        const selectedVegetableData = doc.vegetablesData[0];

        if (!selectedVegetableData) {
            throw new Error(
                `Expected vegetable data for "${vegetableName}" but none was found in matched document`
            );
        }

        return {
            date: doc.date,
            ...selectedVegetableData
        };
    });

    return refinedDocs;
}