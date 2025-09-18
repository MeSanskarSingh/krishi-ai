// src/components/Card.js
import Image from "next/image";

const FeatureCard = ({ logo, title, description }) => {
  return (
    <div className="w-64 h-[200px] bg-white rounded-md m-8 flex flex-col items-center p-4 text-center shadow-md hover:shadow-lg transition-shadow">
      {/* Logo */}
      <Image
        src={logo}
        alt={title}
        width={64}
        height={64}
        className="h-1/2 object-contain mb-2"
      />
      {/* Title */}
      <h3 className="text-lg font-bold">{title}</h3>
      {/* Description */}
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  );
};

export default FeatureCard;
