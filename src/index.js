import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import LogIn from "./LogIn";
import Main from "./Main";
import LoadingPage from "./LoadingPage.jsx";
import ChooseGenre from "./ChooseGenres.jsx";
import ChooseSongs from "./ChooseSongs.jsx";
import Summary from "./Summary.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoadingPage />} />
			<Route path="/main" element={<Main />} />
			<Route path="/login" element={<LogIn />} />
			<Route path="/choose-genre" element={<ChooseGenre />} />
			<Route path="/choose-songs" element={<ChooseSongs />} />
			<Route path="/summary" element={<Summary />} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
