import React, { useState, useEffect } from 'react'

function Summary() {

    const [songs, setSongs] = useState([])
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("")

    const handleCreatePlaylist = async () => {
        if (userId == '') {
            return;
        }
        const req = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
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
        })

        const data = await req.json();
        console.log(data)

        let uriArr = songs
        uriArr = uriArr.map(id => "spotify:track:" + id);
        console.log(uriArr)


        await (fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "uris": uriArr,
                "positition": 0,
            })
        }).catch(e => console.log(e))
        )


    }


    useEffect(() => {
        const fn = async () => {
            const req = await fetch('http://127.0.0.1:5000/playlist_get')
            const res = await req.json();
            console.log(res);
            setSongs(res)
        }

        fn()
    }, [])

    useEffect(() => {

        const fn = async () => {
            if (localStorage.getItem("accessToken")) {
                setToken(localStorage.getItem("accessToken"));

                const res = await fetch('https://api.spotify.com/v1/me/', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
        <button onClick={handleCreatePlaylist}>Export to Spotify</button>
    )
}

export default Summary;