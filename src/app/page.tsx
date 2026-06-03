import { getGoldRatesSummary } from "@/lib/dashboard";

export default async function Dashboard() {

  const [
    goldSummary,
    // inflationSummary,
    // tourismSummary,
    // vegetableSummary,
    // hospitalSummary
  ] = await Promise.all([
    getGoldRatesSummary(),
    // getInflationSummary(),
    // getTourismSummary(),
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
            <span>Latest: {goldSummary.latest?.price}</span>
            <span>Previous: {goldSummary.previous?.price}</span>
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Inflation</h2>
          <p className="text-2xl font-bold">
            0
            {/* {inflation.currentRate}% */}
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-1">
          <h2>Tourists</h2>
          <p className="text-2xl font-bold">
            0
            {/* {tourism.totalVisitors.toLocaleString()} */}
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
