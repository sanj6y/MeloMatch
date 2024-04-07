import React, { useState, useEffect, useRef } from 'react'
import { Spotify } from 'react-bootstrap-icons';
import NavBar from './NavBar';
import './Summary.css'

function Summary() {

    const [songs, setSongs] = useState([])
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("")
    const [playlist, setPlaylist] = useState('')
    const nameRef = useRef('')

    const handleCreatePlaylist = async () => {
        if (userId == '') {
            return;
        }
        const req = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            body: JSON.stringify({
                name: nameRef.current.value,
                description: 'Powered by MeloMatch 🎶',
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

        const playlistReq = await fetch(`https://api.spotify.com/v1/playlists/${data.id} `, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            }
        })

        const playlistData = await playlistReq.json();
        setPlaylist(data.id)



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
        <div>
            <NavBar />
            <div className='summary-holder'>
                <div className="inputs-holder">
                    {playlist === "" ? <input type="text" placeholder='Enter a playlist name' className='playlist-name-input' ref={nameRef} /> : <></>}
                    <br />
                    {playlist === "" ? <button onClick={handleCreatePlaylist} className="playlist-submit-button"><span><Spotify className='spotify-icon' size={50} />Export to Spotify</span></button> : <></>}
                </div>


            </div>
            {playlist !== "" ? <div className='embed-holder'>
                <iframe
                    src={`https://open.spotify.com/embed/playlist/${playlist}`}
                    width="700"
                    height="450"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify Playlist"
                    className='embed'
                ></iframe>
            </div> : <></>}

        </div>
    )
}

export default Summary;