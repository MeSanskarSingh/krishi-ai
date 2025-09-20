import Link from "next/link";
import cardsData from "../data/cardsData";
import FeatureCard from "../pages/components/featureCard";

const Dashboard = () => {
  return (
    <div className="min-h flex flex-col bg-[#c4beb8]">
      <div className="flex pt-24">
      {/* Sidebar */}
      <aside className="w-96 bg-[#c4beb8] h-[calc(100vh-6rem)] fixed top-24 left-0 overflow-y-auto p-4">
        <div className="bg-white w-80 h-48 p-4 mx-auto rounded-3xl shadow-md mb-4">
          Weather
        </div>
      
        <div className="bg-white w-80 h-[340px] p-3 mx-auto rounded-3xl font-merritweather">
          <h3 className="text-red-600 text-center p-3 font-bold text-lg">Latest Government Schemes</h3>
          <hr className="border-t-2 border-black mb-1" />
          <h3 className="text-md font-bold text-base">Central</h3>
          <ul className="list-disc list-outside pl-5">
            <li>
              <a href="#" className="text-blue-500 underline p-2 text-sm leading-loose">
                PM Kisan Samman Nidhi (PM-KISAN)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 underline p-2 text-sm leading-loose">
                Rashtriya Krishi Vikas Yojana(RKVY)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 underline p-2 text-sm ">
                Mission for Integrated Development of Horticulture(MIDH)
              </a>
            </li>
          </ul>
          <hr className="border-t-2 border-black mb-2 mt-2" />
          <h3 className="text-md font-bold text-base">State</h3>
          <ul className="list-disc list-outside pl-5">
            <li>
              <a href="#" className="text-blue-500 underline p-2 text-sm mb-3 leading-loose">
                PM Kisan Samman Nidhi(PM-KISAN)
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 underline p-2 text-sm leading-loose">
                Rashtriya Krishi Vikas Yojana(RKVY)
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