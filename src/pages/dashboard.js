import Link from "next/link";
import cardsData from "../data/cardsData";
import FeatureCard from "../pages/components/featureCard";
import WeatherCard from "./components/weatherCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#e2c5a7]">

      <div className="flex pt-24">

        {/* Sidebar */}
        <aside className="w-80 lg:w-96 bg-[#e2c5a7] h-[calc(100vh-6rem)] fixed top-24 left-0 overflow-y-auto px-6 py-4 space-y-6">

          <WeatherCard />

          <div className="bg-white p-5 rounded-3xl shadow-md transition-all duration-300 hover:shadow-lg">
            
            <h3 className="text-red-600 text-center font-bold text-lg mb-2">
              📢 Latest Government Schemes
            </h3>

            <hr className="border-t border-gray-300 mb-4" />

            <h4 className="font-semibold text-base mb-2">Central</h4>

            <ul className="space-y-2 text-sm leading-relaxed break-words">
              <li>
                <a
                  href="https://pmkisan.gov.in/homenew.aspx"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  PM Kisan Samman Nidhi (PM-KISAN)
                </a>
              </li>
              <li>
                <a
                  href="https://rkvy.da.gov.in/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Rashtriya Krishi Vikas Yojana (RKVY)
                </a>
              </li>
              <li>
                <a
                  href="https://midh.gov.in/"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Mission for Integrated Development of Horticulture (MIDH)
                </a>
              </li>
            </ul>

            <hr className="border-t border-gray-300 my-4" />

            <h4 className="font-semibold text-base mb-2">State</h4>

            <ul className="space-y-2 text-sm leading-relaxed break-words">
              <li>
                <a
                  href="https://keralaagriculture.gov.in/wp-content/uploads/2024/07/4472-corrected.pdf"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Scheme on Coconut Development (Kerala State Plan)
                </a>
              </li>
              <li>
                <a
                  href="https://kslub.kerala.gov.in/?page_id=2&lang=en"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Kerala State Land Use Board – Jaivasamridhikoppam Kattakada
                </a>
              </li>
            </ul>

          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-80 lg:ml-96 px-8 py-6 bg-[#FEF7EB] min-h-[calc(100vh-6rem)] rounded-tl-3xl transition-all duration-300">

          <h1 className="text-3xl tracking-wide mb-6 font-mochiy text-[#462f27]">
            What Krishi AI Offers...
          </h1>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardsData.map((card) => (
              <Link key={card.id} href={card.link}>
                <div className="transition-transform duration-300 hover:scale-105">
                  <FeatureCard
                    logo={card.logo}
                    title={card.title}
                    description={card.description}
                  />
                </div>
              </Link>
            ))}
          </div>

        </main>
      </div>

      {/* Bottom Accent Bar */}
      <div className="bg-[#3F9148] fixed bottom-0 left-0 w-full h-2"></div>

    </div>
  );
};

export default Dashboard;