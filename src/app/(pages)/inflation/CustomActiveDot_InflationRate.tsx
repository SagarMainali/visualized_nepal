import { getColor } from "./getColor";

export default function CustomActiveDot_InflationRate({ cx, cy, value }: CustomActiveDropT) {

    const color = getColor(value!);

    return (
        <circle
            cx={cx}
            cy={cy}
            r={4}
            fill={color}
            stroke={color}
            strokeWidth={12}
            strokeOpacity={0.3}
        />
    );
};