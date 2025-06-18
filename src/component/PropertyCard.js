import Image from "next/image";

export default function PropertyCard({ property, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(property)}
    >
      <Image
        src={property.image}
        alt={property.title}
        width={800}
        height={480}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">
        {property.title}
      </h3>
      <p className="text-green-600 font-bold mb-2">
        ${property.price.toLocaleString()}
      </p>
      <div className="text-gray-600">
        <p>
          {property.bedrooms} beds • {property.bathrooms} baths
        </p>
        <p>
          {property.address}
        </p>
      </div>
    </div>
  );
}
