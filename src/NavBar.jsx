import React from "react";
import LogIn from "./LogIn";
const logo = require('./logo.png');


function NavBar() {

    const CLIENT_ID = '05345fe6718845e98a33b228f41eb512'
    const SPOTIFY_AUTH_ENDPT = 'https://accounts.spotify.com/authorize'
    const REDIRECT_URL = 'http://localhost:3000/main'
    const SCOPES = ['playlist-modify-public', 'playlist-modify-private', 'streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state']

    const SCOPES_URL_PARAM = SCOPES.join("%20")

    const requestAuthorization = () => {
        console.log("button pressed");
        window.location = `${SPOTIFY_AUTH_ENDPT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }

    const redirect = (direction) => {
        window.location.href = "#" + direction;
    }

    return (
        <div className="NavbarHolder">
            <nav class="bg-white dark:bg-white fixed w-full z-20 top-0 start-0">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://google.com/" target="_blank" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} class="h-12" />
                        <span class="self-center text-4xl font-thin font-semibold whitespace-nowrap text-orange-400">Melo<span class="self-center text-4xl font-semibold whitespace-nowrap text-orange-500">Match</span></span>
                    </a>
                    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" onClick={requestAuthorization} class=" text-[17px]  text-white bg-orange-900 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-purple-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Get Started</button>
                        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-base text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        </button>
                    </div>
                    <div class=" font-thin items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-transparent" id="navbar-sticky">
                        <ul class="font-light flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 bg-transparent text-xl">
                            <li>
                                <a href="#" class="block py-2 px-3 text-gray-500 rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 md:dark:hover:text-white-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                            </li>
                            <li>
                                <a href="#about" class="block py-2 px-3 text-gray-500 rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 md:dark:hover:text-white-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                            </li>
                            <li>
                                <a href="#services" class="block py-2 px-3 text-gray-500 rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                            </li>
                            <li>
                                <a href="#contact" class="block py-2 px-3 text-gray-500 rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-gray-400 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;