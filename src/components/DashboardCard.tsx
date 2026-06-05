import { decimalFormatter } from "@/helper/formatters";
import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  icon: LucideIcon;
  iconColor: string;

  value: string;
  subtitle: string;

  previousValue: string;

  percentChange: number;
};

export default function DashboardCard({
  title,
  icon: Icon,
  iconColor,
  value,
  subtitle,
  previousValue,
  percentChange,
}: Props) {
  return (
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
          {value}
        </p>

        <p className="text-sm text-gray-500">
          {subtitle}
        </p>

        <p className="mt-2">
          {percentChange > 0 ? "↑" : "↓"}
          {" "}
          {decimalFormatter(
            Math.abs(percentChange)
          )}
          %
        </p>

        <span
          className={`inline-flex mt-2 rounded-full px-2 py-1 text-xs font-medium
          ${
            percentChange > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {percentChange > 0
            ? "Rising"
            : "Falling"}
        </span>

        <p className="mt-3">
          Previous: {previousValue}
        </p>
      </div>
    </div>
  );
}