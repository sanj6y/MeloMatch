# 🎵 MeloMatch 🎵  
**Discover new music tailored to your taste!**  

## 🚀 Inspiration  
As avid music listeners, we often find ourselves stuck listening to the same playlists. Discovering new music that matches our tastes can be challenging, so we built **MeloMatch** to create personalized playlists effortlessly.  

## 🎶 What It Does  
MeloMatch is a music discovery tool that helps users generate personalized Spotify playlists using two different methods:  
1. **Pairwise Ranking** – The user selects genres and is prompted with pairs of songs to choose from. After 20 iterations, a playlist is created based on their preferences.  
2. **Seed-Based Recommendation** – The user provides 5 songs, and MeloMatch generates a 20-song playlist tailored to those choices.  

All playlists are automatically saved to the user's Spotify account.  

## 🛠️ Technologies Used  

### **Frontend (React.js)**  
- **React.js** – A JavaScript framework for building dynamic, component-based UIs.  
- **Spotify Web API** – Used for authentication, retrieving song metadata, and creating playlists.  
- **React Hooks (`useState`, `useEffect`)** – Manage state updates and API calls efficiently.  
- **Axios** – Handles asynchronous API requests between the frontend and backend.  
- **CSS (Styled Components / Tailwind CSS)** – Provides a modern, responsive UI for seamless user experience.  

### **Backend (Python & Flask)**  
- **Flask** – A lightweight Python web framework used for handling API requests between the frontend and backend.  
- **Spotipy** – A Python wrapper for the Spotify Web API to manage user authentication and music data retrieval.  
- **Ranking Algorithm (Custom Implementation)** – Uses a pairwise comparison approach to rank songs based on user preferences.  
- **Flask-CORS** – Enables cross-origin requests, allowing the React frontend to communicate with the Python backend.  

### **Database & Storage**  
- **SQLite (or JSON storage)** – Stores temporary user session data and ranking choices before playlist creation.  
- **Environment Variables (`.env`)** – Keeps sensitive Spotify API credentials secure.  

### **Deployment & Hosting (Future Plans)**  
- **Vercel / Netlify** – Potential options for hosting the frontend.  
- **Render / Heroku** – Candidates for deploying the backend Flask server.  

## ⚡ Challenges We Faced  
- **Developing an optimal ranking algorithm** to ensure that song choices aligned well with user preferences.  
- **Fine-tuning hyperparameters** to refine the accuracy of our song selection model.  
- **Handling Spotify API authentication**, which requires periodic token refreshes.  

## 🎯 Accomplishments We're Proud Of  
- Successfully integrating the **Spotify API** for an interactive and engaging user experience.  
- Implementing a **custom ranking algorithm** to tailor music recommendations uniquely for each user.  
- Creating a fully functional web application that enhances music discovery.  

## 📚 What We Learned  
- How to interact with the **Spotify API** for retrieving song metadata and handling user authentication.  
- Optimizing ranking algorithms for better personalization.  
- Improving the **React-Backend** communication using Flask and REST APIs.  

## 🔮 Future Improvements  
- **Automating token refresh** to eliminate manual intervention for long-term usability.  
- **Enhancing the ranking model** to incorporate more advanced machine learning techniques for even better recommendations.  
- **Expanding compatibility** to other music streaming platforms beyond Spotify.  

## 🏁 Getting Started  

### Prerequisites  
- **Node.js** and **npm** installed for frontend development.  
- **Python 3.x** installed for backend development.  
- A **Spotify Developer Account** to generate API credentials.  

### Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/sanj6y/MeloMatch.git
   cd MeloMatch
