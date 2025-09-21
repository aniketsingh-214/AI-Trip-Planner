# 🌍 Full-Stack Trip Planner Web App

Welcome to the **Trip Planner Web App**!  
This is a full-stack application that helps users plan their trips with the power of **AI**.  
You can generate personalized itineraries, explore places to visit, and even find hotels with detailed information.

This project is perfect for travelers who want smart travel recommendations and for beginners who want to learn how different technologies work together.

---

## 📌 Table of Contents
- [About the Project](#about)
- [Live Demo](#demo)
- [Technologies Used](#tech)
- [Features](#features)
- [Project Layout](#layout)
- [Prerequisites](#pre)
- [How to Run the Project](#run)
- [Future Improvements](#future)

---

## <a id="about">📖 About the Project</a>
This web app allows users to:
- Sign in securely with Google.
- Create and save their own trips.
- Get AI-powered suggestions for itineraries and hotels.
- Explore detailed information about places with photos and descriptions.

The app combines **frontend, backend, and external APIs** to give users a smooth and intelligent trip-planning experience.

---

## <a id="demo">🚀 Live Demo</a>
You can check out the live project here:  
👉 [Visit Trip Planner App](https://ai-trip-planner-bay-theta.vercel.app/)

---

## <a id="tech">💻 Technologies Used</a>

### **Frontend**
- **React.js** → For building the user interface and handling user interactions.  
- **TailwindCSS** → For modern styling and responsive design.  
- **Axios** → For sending and receiving data from external APIs.  

### **Backend & Services**
- **Google Generative AI API** → To generate AI-powered itineraries and hotel recommendations.  
- **Google Places API** → To fetch detailed information (location, ratings, photos, etc.) about places and hotels.  
- **Firebase Firestore** → Cloud database for saving user trips securely.  
- **Firebase Authentication** → For signing in with Google accounts (OAuth).  

---

## <a id="features">✨ Features</a>
- **AI-Powered Travel Plans**  
  Get smart and customized itineraries based on AI.  

- **Dynamic Place Information**  
  View real photos, location details, and ratings of places and hotels using Google APIs.  

- **User Authentication**  
  Sign in securely with your Google account.  

- **Save Trips**  
  Store your trips in Firebase and access them anytime.  

- **Beautiful UI**  
  Responsive and modern design built with TailwindCSS.  

- **Detailed Itineraries**  
  Get daily schedules including attractions, timings, and ticket pricing.  

---

## <a id="layout">🖼️ Project Layout</a>
The project has the following main pages:
1. **Home Page** → Introduction and Sign-in option.  
2. **Create Trip Page** → Generate AI-based trip itineraries.  
3. **My Trips Page** → View and manage all your saved trips.  
4. **Trip Details Page** → See detailed information about your selected trip.  

---

## <a id="pre">🗂️ Prerequisites</a>
Before running the project, make sure you have:
- **Node.js & npm** → [Download here](https://nodejs.org/)  
- **Firebase Project** →  
  - Enable Firestore Database.  
  - Enable Authentication (Google Sign-In).  
  - Copy your Firebase configuration keys.  
- **Google API Keys** →  
  - Google Generative AI API Key.  
  - Google Places API Key.  

---

## <a id="run">⚡ How to Run the Project</a>

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/trip-planner-app.git
cd trip-planner-app
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root folder and add:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_GOOGLE_GEN_AI_KEY=your_google_gen_ai_key
REACT_APP_GOOGLE_PLACES_KEY=your_google_places_key
```

### 4️⃣ Start the development server

```bash
npm start
```

### 5️⃣ Open the app

Go to [http://localhost:3000](http://localhost:3000) in your browser.

---

## <a id="future">🔮 Future Improvements</a>

* Add **social sharing** for trips.
* Include **budget estimation** for itineraries.
* Add support for **offline access** to trips.
* Multi-language support for global users.

---

## 🙌 Contribution

If you are a beginner, feel free to fork this project and try adding small improvements like styling, new features, or fixing bugs. Contributions are always welcome!

---

## 🧑‍💻 Author

Made with ❤️ by **Aniket Singh**


