import { getTourismData } from '@/lib/getTourismData';
import Barchart_Tourism from './Barchart_Tourism';

export default function TourismPage() {
    const tourismData = getTourismData();

    return (
        <div className='h-auto w-full flex flex-col items-center'>
            <Barchart_Tourism tourismData={tourismData} />
        </div>
    )
}