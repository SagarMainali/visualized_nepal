import { getGoldRatesDataSummary, getInflationDataSummary, getTourismDataSummary } from "@/lib/dashboard";

export default async function Dashboard() {

  const [
    goldSummary,
    inflationSummary,
    tourismSummary,
    // vegetableSummary,
    // hospitalSummary
  ] = await Promise.all([
    getGoldRatesDataSummary(),
    getInflationDataSummary(),
    getTourismDataSummary(),
    // getVegetableSummary(),
    // getHospitalSummary()
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Gold Price</h2>
          <p className="text-2xl font-bold flex flex-col">
            <span>Latest: {goldSummary.latest?.price ?? 0}</span>
            <span>Previous: {goldSummary.previous?.price ?? 0}</span>
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Inflation</h2>
          <p className="text-2xl font-bold flex flex-col">
            <span>Latest: {inflationSummary.latest?.value ?? 0}</span>
            <span>Previous: {inflationSummary.previous?.value ?? 0}</span>
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Tourists</h2>
          <p className="text-2xl font-bold flex flex-col">
            <span>Latest: {tourismSummary.latest?.annualGrowthRate ?? 0}</span>
            <span>Previous: {tourismSummary.previous?.annualGrowthRate ?? 0}</span>
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Vegetables</h2>
          <p className="text-2xl font-bold">
            0
            {/* RM {vegetables.averagePrice} */}
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Hospitals</h2>
          <p className="text-2xl font-bold">
            0
            {/* {hospitals.total} */}
          </p>
        </div>

      </div>
    </div>
  );
}
