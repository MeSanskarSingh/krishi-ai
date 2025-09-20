// src/components/Card.js
import Image from "next/image";

const FeatureCard = ({ logo, title, description }) => {
  return (
    <div className="w-[300px] h-[200px] bg-white rounded-2xl m-6 flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
      {/* Logo */}
      <Image
        src={logo}
        alt={title}
        width={64}
        height={64}
        className="h-1/2 object-contain mb-2"
      />
      {/* Title */}
      <h3 className="text-lg font-mochiy">{title}</h3>
      {/* Description */}
      <p className="text-gray-400 text-[12px] font-l mt-1 font-mochiy">{description}</p>
    </div>
  );
};

export default FeatureCard;
