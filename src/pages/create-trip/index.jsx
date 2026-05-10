import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDAys > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData.traveler
    ) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile: ", error);
      });
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-bold text-5xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Plan Your Trip ✈️
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto font-medium">
          Tell us your preferences and we'll create a personalized itinerary for
          you
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Destination */}
        <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
          <label className="block text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Where do you want to go?
          </label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              placeholder: "Search destinations...",
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  border: "3px solid #e879f9",
                  borderRadius: "12px",
                  padding: "6px",
                  fontSize: "16px",
                  minHeight: "52px",
                  boxShadow: "none",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fdf4ff 100%)",
                  "&:hover": {
                    borderColor: "#c084fc",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(196, 132, 252, 0.2)",
                  },
                  ...(state.isFocused && {
                    borderColor: "#a855f7",
                    "&:hover": {
                      borderColor: "#a855f7",
                    },
                  }),
                }),
                input: (provided) => ({
                  ...provided,
                  margin: 0,
                  padding: 0,
                  color: "#374151",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "12px",
                  border: "2px solid #e879f9",
                  boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#f3e8ff" : "white",
                  color: "#374151",
                  padding: "12px 16px",
                }),
              },
            }}
          />
        </div>

        {/* Duration */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
          <label className="block text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            How many days?
          </label>
          <Input
            placeholder="Enter number of days"
            type="number"
            className="h-14 text-base border-3 border-blue-300 focus:border-blue-500 focus:ring-0 rounded-xl bg-gradient-to-r from-white to-blue-50 hover:shadow-md transition-all duration-200"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div className="bg-gradient-to-r from-white to-emerald-50 rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300">
          <label className="block text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">
            What's your budget?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-6 border-3 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  formData?.budget == item.title
                    ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg transform scale-105"
                    : "border-emerald-200 bg-gradient-to-br from-white to-emerald-25 hover:border-emerald-300"
                }`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-emerald-800 mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-emerald-600 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div className="bg-gradient-to-r from-white to-rose-50 rounded-2xl p-8 shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300">
          <label className="block text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Who's traveling?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-6 border-3 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  formData?.traveler == item.people
                    ? "border-rose-400 bg-gradient-to-br from-rose-50 to-rose-100 shadow-lg transform scale-105"
                    : "border-rose-200 bg-gradient-to-br from-white to-rose-25 hover:border-rose-300"
                }`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-rose-800 mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-rose-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-16 text-center">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold text-xl px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 hover:scale-105 transform"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
              <span>Creating your magical trip...</span>
            </div>
          ) : (
            <span className="flex items-center gap-3">
              ✨ Generate My Trip ✨
            </span>
          )}
        </Button>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl border-2 border-purple-200">
          <DialogHeader className="text-center space-y-6 p-8">
            <DialogDescription className="space-y-8">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl">
                  <img src="/logo.svg" alt="logo" width="80px" />
                </div>
              </div>

              <div>
                <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Sign in to continue
                </h2>
                <p className="text-gray-700 font-medium">
                  Create and save your personalized travel plans
                </p>
              </div>

              <Button
                onClick={login}
                className="w-full bg-gradient-to-r from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 text-gray-800 border-3 border-purple-300 hover:border-purple-400 font-bold py-4 px-6 rounded-xl flex gap-4 items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FcGoogle className="h-6 w-6" />
                <span>Continue with Google</span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
