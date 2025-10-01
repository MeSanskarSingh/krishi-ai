export default function MarketPrices() {
  const marketData = [
    { crop: "Tomato", variety: "Cherry", market: "KR Market, Delhi", unit: "kg", price: 45, date: "2025-09-29", trend: "up" },
    { crop: "Potato", variety: "Regular", market: "MG Market, Bangalore", unit: "kg", price: 32, date: "2025-09-29", trend: "stable" },
    { crop: "Onion", variety: "Red", market: "KR Market, Delhi", unit: "kg", price: 55, date: "2025-09-29", trend: "down" },
    { crop: "Banana", variety: "Cavendish", market: "MG Market, Bangalore", unit: "dozen", price: 60, date: "2025-09-29", trend: "up" },
    { crop: "Rice", variety: "Basmati", market: "KR Market, Delhi", unit: "kg", price: 120, date: "2025-09-29", trend: "stable" },
  ];

  const getTrendColor = (trend) => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen p-6 bg-[#FEF7EB] font-mochiy">
      <h1 className="text-3xl font-bold mb-6 text-[#462f27]">📈 Market Prices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-[#462f27] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Crop</th>
              <th className="py-3 px-6 text-left">Variety</th>
              <th className="py-3 px-6 text-left">Market</th>
              <th className="py-3 px-6 text-left">Unit</th>
              <th className="py-3 px-6 text-left">Price (₹)</th>
              <th className="py-3 px-6 text-left">Trend</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{item.crop}</td>
                <td className="py-3 px-6">{item.variety}</td>
                <td className="py-3 px-6">{item.market}</td>
                <td className="py-3 px-6">{item.unit}</td>
                <td className="py-3 px-6">{item.price}</td>
                <td className={`py-3 px-6 font-semibold ${getTrendColor(item.trend)}`}>
                  {item.trend === "up" ? "⬆" : item.trend === "down" ? "⬇" : "➖"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
