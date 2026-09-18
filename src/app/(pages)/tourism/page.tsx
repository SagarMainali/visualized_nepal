import { getTourismData } from '@/lib/getTourismData';
import Barchart_Tourism from './Barchart_Tourism';

export default function TourismPage() {
    const tourismData = getTourismData();

    return (
        <Barchart_Tourism tourismData={tourismData} />
    )
}