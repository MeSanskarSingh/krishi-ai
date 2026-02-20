import React from 'react'

const Mission = () => {
  return (
    <div
      className="flex flex-col gap-4 justify-center items-center w-screen h-screen bg-cover bg-no-repeat bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/mission-bg.png')" }}
    >
      

      <div className="px-10 max-w-[1000px] bg-black/70 flex flex-col items-center justify-center mt-20 py-6 rounded-[30px]">
        <h1 className="text-white text-4xl font-bold mb-7 font-mochiy">Our Mission</h1>
        <p className="text-xl text-white font-mitr">
          At Krishi AI, our mission is to empower farmers with intelligent,
          accessible, and reliable technology that bridges the gap between
          traditional farming practices and modern innovations. We aim to
          provide real-time guidance on crop health, fertilizers, soil quality,
          and weather patterns, enabling farmers to make informed decisions that
          increase productivity and sustainability.
        </p>

        <p className="text-xl text-white mt-6 font-mitr">
          Our vision goes beyond solving today’s
          challenges—we aspire to build a future where smart farming tools are
          accessible to every farmer, from smallholders in rural villages to
          large-scale cultivators.
        </p>

        <p className="text-xl text-white mt-6 font-mitr">
          Looking ahead, Krishi AI will expand into predictive analytics for
          crop yields, market price forecasting, and climate-resilient farming
          solutions. We believe that by harnessing technology, we can not only
          improve livelihoods but also contribute to a more sustainable and
          food-secure world.
        </p>
      </div>
    </div>
  )
}

export default Mission;