import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/dbConnect";

type UserData = {
    email: string;
    [key: string]: any;
}

export async function POST(request: NextRequest) {
    try {
        const userData: UserData = await request.json();

        // basic validation
        if (!userData?.email || typeof userData.email !== "string") {
            return NextResponse.json({ message: "Valid email is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("user_data");

        const emailMatch = await collection.findOne({ email: userData.email });

        if (emailMatch) {
            console.log("User registration failed. Email already exists");
            return NextResponse.json({ message: "The email you provided has already been registered by someone. Please use another email." }, { status: 400 })
        }

        const postedDocument = await collection.updateOne(
            { email: userData.email },
            { $set: userData },
            { upsert: true }
        );

        if (postedDocument.acknowledged) {
            console.log('New user has been added with email:', userData.email);
            return NextResponse.json({ message: "✅ You have been registered successfully. You will be notified in the registered email when there is significant fluctuation(±15%) on your selected vegetables." }, { status: 201 });
        } else {
            return NextResponse.json({ message: "User registration failed" }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unexpected error" },
            { status: 500 }
        );
    }
}
