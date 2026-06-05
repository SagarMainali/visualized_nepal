import { dateFormatter, priceFormatter } from '@/helper/formatters';

export default function CustomTooltip_Vegetables({ active, payload }: CustomTooltipT) {
    if (!active || !payload || !payload.length) return null;

    const { date, maximum, minimum, average, unit, fluctuationValue, fluctuationPercentage, hasSignificantFluctuation } = payload[0].payload;

    const borderColor = hasSignificantFluctuation ? 'border-red-500' : 'border-green-500';

    const textColor = hasSignificantFluctuation ? 'text-red-500' : 'text-green-500';

    return (
        <div className={`py-4 px-6 shadow-lg rounded-lg border-l-6 text-sm font-medium bg-white ${borderColor}`}>
            <div className='flex flex-col gap-1 text-gray-700'>
                <span>
                    📅 Date: <span className='text-black font-semibold'>{dateFormatter(date, 'y-m-d')}</span>
                </span>

                <span>
                    ⚖️ Unit: <span className="text-black font-semibold">{unit}</span>
                </span>
            </div>

            <hr className="my-2" />

            <div className="flex flex-col gap-1 text-gray-700">
                <span className="flex items-center gap-2">
                    ⬇️ Minimum: <span className="text-black">{priceFormatter(minimum)}</span>
                </span>

                <span className="flex items-center gap-2">
                    ⬆️ Maximum: <span className="text-black">{priceFormatter(maximum)}</span>
                </span>

                <span className="flex items-center gap-2 text-black">
                    ➖ Average: <span className="text-black font-semibold">{priceFormatter(average)}</span>
                    {fluctuationValue > 0 ? '📈' : '📉'}
                </span>
            </div>

            <hr className="my-2" />

            <div className={`mt-1 text-sm font-semibold ${textColor}`}>
                Fluctuation: {priceFormatter(fluctuationValue)} ({fluctuationPercentage}%)
            </div>
        </div>
    );
}
