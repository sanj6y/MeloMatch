import React, { useEffect, useState } from 'react'
import Player from './Player';

function ChooseSongs() {

    const [token, setToken] = useState("");
    const [songURIS, setSongURIS] = useState(['7GX5flRQZVHRAGd6B4TmDO', '2dJ4rGtsOHOgvTQawsCRtg'])
    const [imageL, setImageL] = useState('')
    const [imageR, setImageR] = useState('')
    const [selectedSong, setSelectedSong] = useState(1)

    const handleSongsSubmit = async () => {
        console.log("pressed")
        const req = await fetch('http://127.0.0.1:5000/song_rec', {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(songURIS[selectedSong]),
        }).catch(err => { console.log(err); return })

        const get_ids = await fetch('http://127.0.0.1:5000/song_get')
        const res = await get_ids.json();
        console.log(res)

        setSongURIS(res);

    }

    // when loading
    useEffect(() => {

        const fn = async () => {
            if (localStorage.getItem("accessToken")) {
                setToken(localStorage.getItem("accessToken"));
            }

            const req = await fetch('http://127.0.0.1:5000/song_get')
            const res = await req.json();
            console.log(res)
            setSongURIS(res)

        }

        fn()

    }, [])

    // to get the songs 
    useEffect(() => {
        const fn = async () => {

            const req1 = await fetch(`https://api.spotify.com/v1/tracks/${songURIS[0]}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).catch(e => console.log(e))

            const res1 = await req1.json();

            const req2 = await fetch(`https://api.spotify.com/v1/tracks/${songURIS[1]}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).catch(e => console.log(e))

            const res2 = await req2.json();

            console.log(res1)
            console.log(res2)
            if (res1.error === undefined && res2.error == undefined) {
                setImageL(res1.album.images[0].url);
                setImageR(res2.album.images[0].url);
            }
        }

        fn()
    }, [songURIS])

    return (
        <div>
            <div style={{ width: 250 }} onClick={() => setSelectedSong(0)}> <img src={imageL} onClick={() => setSelectedSong(0)} /> </div>
            <div style={{ width: 250 }} onClick={() => setSelectedSong(1)}> <img src={imageR} onClick={() => setSelectedSong(1)} /> </div>
            <div style={{ width: 350 }}><Player token={token} uri={songURIS[selectedSong]} /></div>
            <button>Skip</button>
            <button onClick={handleSongsSubmit}>Submit</button>
        </div>
    )
}

export default ChooseSongs;