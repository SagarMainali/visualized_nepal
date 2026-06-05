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

export async function getVegetablesDataForDashboard() {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("daily_prices");

    const docs = await collection
        .find({})
        .sort({ date: -1 })
        .limit(2)
        .toArray();

    const latest = docs[0];
    const previous = docs[1];

    // calculate changes here
    const previousMap = new Map<string, number>(
        previous.vegetablesData.map((v: RangedDate_SingleVegetable_ForChartT) => [
            v.commodity,
            v.average
        ])
    );

    const changes = latest.vegetablesData
        .filter((v: RangedDate_SingleVegetable_ForChartT) => previousMap.has(v.commodity))
        .map((v: RangedDate_SingleVegetable_ForChartT) => {
            const oldPrice = previousMap.get(v.commodity)!;

            const change = v.average - oldPrice;
            const percent = (change / oldPrice) * 100;

            return {
                commodity: v.commodity,
                change,
                percent
            };
        });

    const topGainer = [...changes].sort(
        (a, b) => b.percent - a.percent
    )[0];

    const topLoser = [...changes].sort(
        (a, b) => a.percent - b.percent
    )[0];

    const totalCommodities = changes.length;

    return {
        totalCommodities,
        topGainer,
        topLoser
    };
}