import Navbar from "./components/Navbar";
import cardsData from "../data/cardsData"; // ✅ Import your card data
import FeatureCard from "./components/FeatureCard"; // ✅ Import reusable Card component

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
  {/* Navbar */}
  <header className="h-24 w-full bg-slate-500 fixed top-0 left-0 z-50 flex items-center px-6">
    <h1 className="text-white text-2xl font-bold">Krishi AI</h1>
  </header>

  <div className="flex pt-24">
    {/* Sidebar */}
    <aside className="w-96 bg-[#E7E3DF] h-[calc(100vh-6rem)] fixed top-24 left-0 overflow-y-auto p-4">
      <div className="bg-white w-80 h-48 p-4 mx-auto rounded-md mb-4">Weather</div>
      

<div className="bg-white w-80 h-[340px] p-3 mx-auto rounded-md ">
  <h3 className="text-red-600 text-center p-3 font-bold text-lg">Latest Government Schemes</h3>
  <hr className="border-t-2 border-black mb-1" />
  <h3 className="text-md font-bold text-base">Central</h3>
  <a href="#" className="text-blue-500 hover:underline p-2 text-base leading-loose">
    PM Kisan Samman Nidhi(PM-KISAN)
  </a>
  <br />
  <a href="#" className="text-blue-500 hover:underline p-2 text-base leading-loose">
    Rashtriya Krishi Vikas Yojana(RKVY)
  </a>
  <br />
  <a href="#" className="text-blue-500 hover:underline p-2 text-base leading-loose">
    Mission for Integrated Development of Horticulture(MIDH)
  </a>
  <hr className="border-t-2 border-black my-1" />
  <h3 className="text-md font-bold text-base">State</h3>
  <a href="#" className="text-blue-500 hover:underline p-2 text-base mb-3 leading-loose">
    PM Kisan Samman Nidhi(PM-KISAN)
  </a>
  <br />
  <a href="#" className="text-blue-500 hover:underline p-2 text-base leading-loose">
    Rashtriya Krishi Vikas Yojana(RKVY)
  </a>
</div>

    </aside>
    

    {/* Main Content */}
    <main className="flex-1 ml-96 p-8 bg-[#FCF9F6] min-h-[calc(100vh-6rem)]">
      <h1 className="text-4xl font-bold tracking-wide pt-2">
        What Krishi AI Offers...
      </h1>

      {/* Cards Section */}
      <div className="flex flex-wrap  ">
        {cardsData.map((card) => (
          <FeatureCard
            key={card.id}
            logo={card.logo}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </main>
  </div>

  {/* Footer */}
  <footer className="h-5 w-full bg-green-800 fixed bottom-0 left-0"></footer>
</div>

    
    

              


 
      


        
        
      



      //Footer
  )
}

export default Dashboard;