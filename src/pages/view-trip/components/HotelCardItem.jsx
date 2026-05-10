import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.name +
        "," +
        hotel?.address
      }
      target="_blank"
    >
      <div className="group hover:scale-105 transition-all duration-300 cursor-pointer mt-6 mb-10 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 overflow-hidden">
        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden">
          <img
            src={photoUrl ? photoUrl : "/placeholder.jpg"}
            className="rounded-t-2xl h-[200px] w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>{hotel?.rating}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-3">
          {/* Hotel Name */}
          <h2 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {hotel?.name}
          </h2>

          {/* Address */}
          <div className="flex items-start gap-2 text-gray-600">
            <span className="text-lg mt-0.5">📍</span>
            <p className="text-sm font-medium leading-relaxed line-clamp-2">
              {hotel?.address}
            </p>
          </div>

          {/* Price and Rating Row */}
          <div className="flex items-center justify-between pt-2">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {hotel?.price}
              </span>
            </div>

            {/* View Details Button */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
              View Details
            </div>
          </div>

          {/* Amenities/Features Bar */}
          <div className="flex gap-2 pt-2">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              Popular Choice
            </div>
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
              Best Value
            </div>
          </div>
        </div>

        {/* Bottom Border Accent */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
