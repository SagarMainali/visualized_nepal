import { getParticularVegetableData } from "@/lib/vegetables";
import VegetableDataDisplay from "./VegetablesDataDisplay";

export default async function VegetablePage() {
    try {
        const initialVegetableData = await getParticularVegetableData('Tomato Big(Nepali)');

        return (
            <VegetableDataDisplay initialVegetableData={initialVegetableData} />
        )
    } catch (error) {
        console.error("Failed to fetch vegetable data:", error);

        return (
            <div className="p-4 border border-red-500 rounded bg-red-50 text-red-700">
                <p>Unable to load live vegetable data right now. Please try again later.</p>
            </div>
        );

    }
}