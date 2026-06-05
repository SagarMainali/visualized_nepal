import { Carrot, TrendingUp, TrendingDown } from "lucide-react";
import { decimalFormatter } from "@/helper/formatters";

type Props = {
  totalCommodities: number;
  topGainer: {
    commodity: string;
    percent: number;
    change: number;
  };
  topLoser: {
    commodity: string;
    percent: number;
    change: number;
  };
};

export default function VegetablesDashboardCard({
  totalCommodities,
  topGainer,
  topLoser,
}: Props) {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Vegetables
        </h2>

        <Carrot className="w-8 h-8 text-green-600" />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Tracking
      </p>

      <p className="text-4xl font-bold">
        {totalCommodities}
      </p>

      <p className="text-sm text-gray-500">
        commodities
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg bg-green-50 p-4 border border-green-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">
              TOP GAINER
            </span>
          </div>

          <p className="mt-2 font-semibold">
            {topGainer.commodity}
          </p>

          <p className="mt-1 text-green-600 font-bold">
            +{decimalFormatter(topGainer.percent)}%
          </p>
        </div>

        <div className="rounded-lg bg-red-50 p-4 border border-red-100">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <span className="text-xs font-medium text-red-700">
              TOP LOSER
            </span>
          </div>

          <p className="mt-2 font-semibold">
            {topLoser.commodity}
          </p>

          <p className="mt-1 text-red-600 font-bold">
            {decimalFormatter(topLoser.percent)}%
          </p>
        </div>
      </div>
    </div>
  );
}