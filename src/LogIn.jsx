import React, { useEffect } from "react"

const CLIENT_ID = '05345fe6718845e98a33b228f41eb512'
const SPOTIFY_AUTH_ENDPT = 'https://accounts.spotify.com/authorize'
const REDIRECT_URL = 'http://localhost:3000/main'
const SCOPES = ['playlist-read-private', 'playlist-read-collaborative', 'user-library-read']
const SCOPES_URL_PARAM = SCOPES.join("%20")

function LogIn() {
    const requestAuthorization = () => {
        console.log("button pressed");
        window.location = `${SPOTIFY_AUTH_ENDPT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }

    return (
        <div>
            <p>Log in to spotify</p>
            <button onClick={requestAuthorization}>log in button</button>
        </div>
    );
}

export default LogIn;
