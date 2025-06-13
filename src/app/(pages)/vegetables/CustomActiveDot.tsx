export default function CustomActiveDot({ cx, cy, payload }: CustomActiveDropT) {

    const color = payload.hasSignificantFluctuation ? '#E02424' : '#057A55';

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