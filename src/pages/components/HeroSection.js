const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-10 py-20 bg-white">
      <div className="md:w-1/2 max-w-xl">
        <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
          Your Digital Krishi Sathi – <br />
          Farming made smarter,<br />
          easier and profitable
        </h1>
        <button className="bg-green-600 text-white font-bold px-7 py-3 rounded-full mt-6 flex items-center shadow hover:bg-green-700 transition">
          LET’S GET STARTED <span className="ml-2">&#8594;</span>
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
        <img
          src="/farmer.png"  // Adjust the path if your image is elsewhere
          alt="Farmer Illustration"
          className="h-64 w-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
