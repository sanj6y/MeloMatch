import React, { useEffect, useState } from "react"

const PLAYLIST_ENDPT = 'https://api.spotify.com/v1/me/playlists'

function Main() {

    const [token, setToken] = useState("");
    const [data, setData] = useState({})

    const getReturnedParams = (hash) => {
        const stringAfterHash = hash.substring(1);
        const paramsInUrl = stringAfterHash.split("&");
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
            console.log(currentValue);
            const [key, value] = currentValue.split("=");
            accumulater[key] = value;
            return accumulater;
        }, {})

        return paramsSplitUp;
    }

    const handleGetPlaylists = async () => {
        const res = await fetch("https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }
        ).catch(e => {
            console.error(e)
        })

        const playlists = await res.json();
        console.log(playlists)
        setData(playlists['items'])
    }

    // for loading the data to local storage
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } =
                getReturnedParams(window.location.hash);

            localStorage.clear();

            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    }, []);

    // for chagning the variables
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
        }
    }, [])

    return (
        <div>
            <p>Main page!! woo</p>
            <button onClick={handleGetPlaylists}>get playlists </button>
            <h3>playlist names</h3>
            <div>
                {
                    Object.keys(data).map((key, index) => (
                        <p key={index}>{data[key]['name']}</p>
                    ))
                }
            </div>

        </div>
    )
}

export default Main;