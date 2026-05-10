import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
        🗺️ Places to Visit
      </h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <>
            <div className="mt-5">
              <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
                📅 {item.day}
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {item.plan.map((place, index) => (
                  <>
                    <div className="my-2">
                      <h2 className="font-bold text-sm bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
                        🕐 {place.time}
                      </h2>
                      <PlaceCardItem place={place} />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
