import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("MONGODB_URI is not defined");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// check if cached connection exist, if not connect and store the connection in global caching
// this avoids creating connection on every request and using the cached connection, making the code efficient
if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
}
clientPromise = (global as any)._mongoClientPromise;

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("daily_prices");

        const docs = await collection.find({}).toArray();

        return NextResponse.json(docs, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unexpected error" },
            { status: 500 }
        );
    }
}
