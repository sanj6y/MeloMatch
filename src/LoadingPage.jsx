// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import {Button, Card, Nav} from "react-bootstrap";
import NavBar from "./NavBar.jsx"
import './LoadingPage.css'
// const backgroundImage1 = require("listeningtomusic.webp")
// import Typewriter from 'typewriter-effect/dist/core';
import {TypeAnimation} from 'react-type-animation';

const logo = require("./listen.png")


function LoadingPage() {
  return (
    <div className="landingHolder">
      <NavBar/> 
      <div className="background-image1" >
        <div className="welcome-text">
          <p className="dawg1"><TypeAnimation cursor={true} sequence={['Having trouble finding new music?', 1000, 'Tired of listening to the same songs over and over?', 1000]} repeat={Infinity} speed={50}wrapper="span" className="special" /></p>
          <p className="dawg2">MeloMatch is the website for you.</p>
          <button className="getStarted-button">
            Get Started
          </button>
        </div>
        
      </div>
    </div>

    );
}

export default LoadingPage;
