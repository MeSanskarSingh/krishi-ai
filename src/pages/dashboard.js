import Link from "next/link";
import cardsData from "../data/cardsData";
import FeatureCard from "../pages/components/featureCard";
import WeatherCard from "./components/weatherCard";

const Dashboard = () => {
  return (
    <div className="min-h flex flex-col bg-[#e2c5a7]">
      <div className="flex pt-24">
      {/* Sidebar */}
      <aside className="w-96 bg-[#e2c5a7] h-[calc(100vh-6rem)] fixed top-24 left-0 overflow-y-auto p-4">
        <WeatherCard />
      
        <div className="bg-white w-80 h-[380px] p-3 mx-auto rounded-3xl font-merritweather">
          <h3 className="text-red-600 text-center p-3 font-bold text-lg">📢Latest Government Schemes</h3>
          <hr className="border-t-2 border-black mb-2" />
          <h3 className="text-md font-bold text-base">Central</h3>
          <ul className="list-disc list-outside pl-5">
            <li>
              <a href="https://pmkisan.gov.in/homenew.aspx" className="text-blue-500 hover:underline p-2 text-sm leading-loose">
                PM Kisan Samman Nidhi (PM-KISAN)
              </a>
            </li>
            <li>
              <a href="https://rkvy.da.gov.in/" className="text-blue-500 hover:underline p-2 text-sm leading-loose">
                Rashtriya Krishi Vikas Yojana(RKVY)
              </a>
            </li>
            <li>
              <a href="https://midh.gov.in/" className="text-blue-500 hover:underline p-2 text-sm ">
                Mission for Integrated Development of Horticulture(MIDH)
              </a>
            </li>
          </ul>
          <hr className="border-t-2 border-black mb-2 mt-2" />
          <h3 className="text-md font-bold text-base">State</h3>
          <ul className="list-disc list-outside pl-5">
            <li>
              <a href="https://keralaagriculture.gov.in/wp-content/uploads/2024/07/4472-corrected.pdf" className="text-blue-500 hover:underline p-2 text-sm mb-3 leading-loose">
                Scheme on Coconut Development (Kerala State Plan)
              </a>
            </li>
            <li>
              <a href="https://kslub.kerala.gov.in/?page_id=2&lang=en" className="text-blue-500 hover:underline p-2 text-sm leading-loose">
                Kerala State Land Use Board – “Jaivasamridhikoppam Kattakada”
              </a>
            </li>
          </ul>
        </div>
      </aside>
    

    {/* Main Content */}
    <main className="flex-1 ml-96 p-4 bg-[#FEF7EB] min-h-[calc(100vh-6rem)] rounded-tl-3xl">
      <h1 className="text-3xl tracking-widest pt-2 ml-4 mb-4 font-mochiy text-[#5A3C34]">
        What Krishi AI Offers...
      </h1>

      {/* Cards Section */}
      <div className="flex flex-wrap">
        {cardsData.map((card) => (
          <Link key={card.id} href={card.link}>
          <FeatureCard
            key={card.id}
            logo={card.logo}
            title={card.title}
            description={card.description}
          />
          </Link>
        ))}
      </div>
    </main>
  </div>

  <div className="bg-[#3F9148] fixed bottom-0 left-0 w-full py-2"></div>
</div>

  )
}

export default Dashboard;