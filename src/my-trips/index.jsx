import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 min-h-screen sm:px-10 md:px-32 lg:px-56 px-5 pt-10">
      <div className="mb-10">
        <h2 className="font-bold text-4xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
          ✈️ My Trips
        </h2>
        <p className="text-gray-600 font-medium mt-2 text-lg">
          Explore your travel adventures and memories
        </p>
      </div>

      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-6">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem trip={trip} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[220px] w-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl shadow-lg border border-gray-200"
              >
                <div className="p-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
