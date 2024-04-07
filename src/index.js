import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import LogIn from "./LogIn";
import Main from "./Main";
import LoadingPage from "./LoadingPage.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoadingPage />} />
			<Route path="/main" element={<Main />} />
			<Route path ="/login" element={<LogIn/>}/>
			<Route path ="/dashboard" element={<Dashboard/>}/>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
