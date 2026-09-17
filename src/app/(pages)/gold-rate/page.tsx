import GoldDataDisplay from './GoldDataDisplay';
import { getGoldRates } from '@/lib/getGoldRates';

export default async function GoldRate() {
    try {
        const goldData = await getGoldRates();

        return (
            <GoldDataDisplay initialGoldData={goldData} />
        )
    } catch (error) {
        console.error("Failed to fetch gold rate:", error);

        return (
            <div className="p-4 border border-red-500 rounded bg-red-50 text-red-700">
                <p>Unable to load live gold rates right now. Please try again later.</p>
            </div>
        );
    }
}
