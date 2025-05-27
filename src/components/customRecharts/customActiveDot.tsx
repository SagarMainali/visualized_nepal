import { getColor } from "./helper/getColor";

export default function CustomActiveDot({ cx, cy, value }: CustomActiveDropT) {

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