import { decimalFormatter, priceFormatter } from "@/helper/formatters";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  path: string;
  title: string;
  annotation?: string;
  icon: LucideIcon;
  iconColor: string;
  value: string;
  date: string;
  previousValue: string;
  percentChange: number;
  valueChange?: number;
  isRisingGood?: boolean;
};

export default function DashboardCard({
  path,
  title,
  annotation,
  icon: Icon,
  iconColor,
  value,
  date,
  previousValue,
  percentChange,
  valueChange,
  isRisingGood
}: Props) {

  const isRising = percentChange > 0;

  const trendClass =
    isRisingGood === undefined
      ? "bg-blue-100 text-blue-700"
      : isRising === isRisingGood
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";

  return (
    <Link href={`${path}`}>
      <div className="dashboard-card">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <Icon
            className={`w-8 h-8 ${iconColor}`}
          />
        </div>

        <div className="mt-4">
          <p className="text-4xl font-bold">
            {value} {annotation && <span className="text-xl text-gray-500 font-normal">{annotation}</span>}
          </p>

          <p className="text-sm text-gray-500">
            {date}
          </p>

          <p
            className={`inline-flex mt-3 rounded-full px-2 py-1 text-xs font-medium ${trendClass}`}
          >
            {percentChange > 0
              ? <span className="-mt-[2px] mr-1">↑</span>
              : <span className="-mt-[1px] mr-1">↓</span>
            }

            {decimalFormatter(Math.abs(percentChange))}%

            {valueChange && <span className="ml-1">({priceFormatter(valueChange)})</span>}
          </p>

          <p className="mt-3">
            Previous: {previousValue}
          </p>
        </div>
      </div>
    </Link>
  );
}