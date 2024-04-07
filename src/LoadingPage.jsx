// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import {Button, Card, Nav} from "react-bootstrap";
import NavBar from "./NavBar.jsx"
import './LoadingPage.css'
// const backgroundImage1 = require("listeningtomusic.webp")
// import Typewriter from 'typewriter-effect/dist/core';
import { TypeAnimation } from 'react-type-animation';

const logo = require("./listen.png")


function LoadingPage() {

    const CLIENT_ID = '05345fe6718845e98a33b228f41eb512'
    const SPOTIFY_AUTH_ENDPT = 'https://accounts.spotify.com/authorize'
    const REDIRECT_URL = 'http://localhost:3000/dashboard'
    //   const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'user-library-read', 'playlist-modify-public',
    //       'playlist-modify-private']
    const SCOPES = ['playlist-modify-public', 'playlist-modify-private', 'streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state']

    const SCOPES_URL_PARAM = SCOPES.join("%20")

    const requestAuthorization = () => {
        console.log("button pressed");
        window.location = `${SPOTIFY_AUTH_ENDPT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }

    return (
        <div className="landingHolder">
            <NavBar />
            <div className="background-image1" >
                <div className="welcome-text">
                    <p className="dawg1"><TypeAnimation cursor={true} sequence={['Having trouble finding new music?', 1000, 'Tired of listening to the same songs over and over?', 1000]} repeat={Infinity} speed={50} wrapper="span" className="special" /></p>
                    <p className="dawg2">MeloMatch is the website for you.</p>
                    <button className="getStarted-button" onClick={requestAuthorization}>
                        Get Started
                    </button>
                </div>
            </div>
            <div id="about" className="aboutus">
              <div className="about-holder">

              </div>
                <div>
                  MeloMatch is a platform designed to quickly and easily create playlists of songs uniquely tailored to your tastes.
                </div>
                <div>
                 
                </div>
            
            </div>
            <div id="services" className="services-s">
                <p>
                  MeloMatch is a platform designed to quickly and easily create playlists of songs uniquely tailored to your tastes.
                </p>
            </div>
            <div id="contact" className="contact-s">
                <p>
                  MeloMatch is a platform designed to quickly and easily create playlists of songs uniquely tailored to your tastes.
                </p>
            </div>
            <div className="bedder-s">
                <p>
                  MeloMatch is a platform designed to quickly and easily create playlists of songs uniquely tailored to your tastes.
                </p>
            </div>
        </div>

    );
}

export default LoadingPage;
