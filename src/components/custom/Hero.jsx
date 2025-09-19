import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-700">
            AI-Powered Travel Planning
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8">
          <span className="block text-gray-900 mb-2">Discover Your Next</span>
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Adventure with AI
          </span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl leading-relaxed font-light">
          Your personal trip planner and travel curator, creating
          <span className="font-medium text-gray-800">
            {" "}
            custom itineraries{" "}
          </span>
          tailored to your interests and budget.
        </p>

        <Link to={"/create-trip"}>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold">
            Get Started, It's Free
            <span className="ml-2">✨</span>
          </Button>
        </Link>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 text-sm">Trips Created</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600 text-sm">Countries</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-indigo-600 mb-2">4.9★</div>
            <div className="text-gray-600 text-sm">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
