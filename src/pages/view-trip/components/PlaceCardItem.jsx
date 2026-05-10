import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.place,
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
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.place}
      target="_blank"
    >
      <div className="bg-gradient-to-r from-white to-blue-50 shadow-lg border-2 border-blue-100 rounded-2xl p-4 mt-4 flex gap-6 hover:scale-105 hover:shadow-2xl hover:border-blue-300 cursor-pointer transition-all duration-300 group">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={photoUrl ? photoUrl : "/placeholder.jpg"}
            alt=""
            className="w-[140px] h-[140px] rounded-xl object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </div>

        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <h2 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              {place.place}
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3 font-medium">
              {place.details}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
              <span>🏷️</span>
              <span>Ticket: {place.ticket_pricing}</span>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 shadow-lg">
              View on Map
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
