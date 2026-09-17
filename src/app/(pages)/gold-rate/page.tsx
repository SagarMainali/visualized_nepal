import { getGoldRates } from '@/lib/getGoldRates';
import GoldDataDisplay from './GoldDataDisplay';

export default async function GoldRatePage() {
    try {
        const goldData = await getGoldRates();

        return (
            <GoldDataDisplay initialGoldData={goldData} />
        )
    } catch (error) {
        console.error("Failed to fetch gold rates data:", error);

        return (
            <div className="p-4 border border-red-500 rounded bg-red-50 text-red-700">
                <p>Unable to load live gold rates data right now. Please try again later.</p>
            </div>
        );
    }
}
