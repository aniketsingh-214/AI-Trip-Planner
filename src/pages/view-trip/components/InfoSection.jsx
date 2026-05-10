import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt="img"
          className="h-[340px] w-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
      </div>

      <div>
        <div className="my-6 flex flex-col gap-4">
          <h2 className="font-bold text-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="flex flex-wrap gap-4">
            <h2 className="p-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs md:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs md:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-2 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-xs md:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              👥 No. of traveler/s: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
