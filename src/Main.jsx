import React, { useEffect, useState } from "react"
import Player from "./Player";

const PLAYLIST_ENDPT = 'https://api.spotify.com/v1/me/playlists'

function Main() {

    const [token, setToken] = useState("");
    const [data, setData] = useState({})
    const [userId, setUserId] = useState("")
    const [songURI, setURI] = useState("7GX5flRQZVHRAGd6B4TmDO")

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
        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
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

    const handleCreatePlaylist = async () => {
        if (userId == '') {
            return;
        }
        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            body: JSON.stringify({
                name: 'billy bob joe',
                description: 'created using api',
                public: false,
            }),
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'

            }
        }).catch(e => { console.log(e) })
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

        const fn = async () => {
            if (localStorage.getItem("accessToken")) {
                setToken(localStorage.getItem("accessToken"));

                const res = await fetch('https://api.spotify.com/v1/me/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                })
                const userInfo = await res.json();
                console.log(userInfo)
                setUserId(userInfo.id)
            }
        }

        fn()

    }, [])

    return (
        <div style={{ width: 300 }}>
            <Player token={token} uri={songURI} />
        </div>
    )
}

export default Main;