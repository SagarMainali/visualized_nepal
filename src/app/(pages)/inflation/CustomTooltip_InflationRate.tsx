import { getColor, getInflationLabel } from './getTooltipInfo';

export default function CustomTooltip_InflationRate({ active, payload }: CustomTooltipT) {

    if (!active || !payload || !payload.length) return null;

    const { year, value } = payload[0].payload;

    return (
        <div className="px-5 py-2 space-y-1 shadow-2xl rounded border border-light bg-white/10 backdrop-blur-md">
            <div className="font-semibold text-primary-gray">Year: {year}</div>
            <hr />
            <div>Inflation: {value}%</div>
            <div style={{ color: getColor(value) }}>
                Status: {getInflationLabel(value)}
            </div>
        </div>
    );
}
