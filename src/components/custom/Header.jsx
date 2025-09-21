import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  });

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile: ", error);
      });
  };

  return (
    <div className="backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-lg flex justify-between items-center px-8 py-4 z-50">
      <div className="flex items-center">
        <img
          src="/Icon.svg"
          alt="Logo"
          className="h-10 w-auto transition-transform hover:scale-105"
        />
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/create-trip" className="group">
              <Button
                variant="outline"
                className="rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-700 font-semibold px-6 py-2.5 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 group-hover:scale-105"
              >
                <span className="text-lg mr-2">✈️</span>
                Create Trip
              </Button>
            </a>

            <a href="/my-trips" className="group">
              <Button
                variant="outline"
                className="rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-700 font-semibold px-6 py-2.5 hover:from-emerald-100 hover:to-teal-100 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group-hover:scale-105"
              >
                <span className="text-lg mr-2">🗂️</span>
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger className="group">
                <div className="relative">
                  <img
                    src={user?.picture || user?.imageUrl}
                    className="h-11 w-11 rounded-full border-3 border-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 ring-2 ring-blue-200 group-hover:ring-blue-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-36 p-0 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl">
                <div className="p-2">
                  <h2
                    className="cursor-pointer text-red-600 font-medium hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all duration-200 text-center"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    <span className="mr-2">🚪</span>
                    Logout
                  </h2>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-1">👋</span>
            Sign In
          </Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl">
          <DialogHeader className="text-center space-y-4">
            <DialogDescription className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl">
                  <img
                    src="/Icon.svg"
                    alt="logo"
                    width="80px"
                    className="mx-auto"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-2xl text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome to Your Journey
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Sign in to unlock personalized travel plans and save your
                  adventures
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={login}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 font-semibold py-3 px-6 rounded-xl flex gap-4 items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <FcGoogle className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>Continue with Google</span>
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Secure authentication powered by Google
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
