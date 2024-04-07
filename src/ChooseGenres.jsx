import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.jsx"
import './ChooseGenres.css'


function ChooseGenre() {
    let genres = ['pop', 'rock', 'hip-hop', 'r-n-b', 'country', 'electronic', 'indie', 'k-pop', 'classical', 'jazz', 'metal', 'reggae', 'latin', 'folk', 'romance']
    const [genreList, setGenreList] = useState([])

    const updateButtonState = (index) => {
        let newArr = [];
        if (genreList.includes(index)) {
            genreList.map(value => {
                if (value != index) newArr.push(value)
            })

        }

        else {
            newArr = genreList;
            newArr.push(index);
        }
        setGenreList(newArr);
        console.log(newArr);

    }

    const handleGenreSubmit = async () => {
        console.log(JSON.stringify(genreList))
        if (genreList.length > 0) {
            // POST GENRE LIST TO SERVER
            await fetch("http://127.0.0.1:5000/genre", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(genreList),
            }).catch(err => console.log(err))

            window.location.href = '/choose-songs'
        }
    }

    return (
        <div>
            <NavBar />
            <div className="select-genre-title">
                <h1 >Choose Genres</h1>
            </div>
            <div className="genres-grid">
                {genres.map((value, index) => <button className="genres-grid-item" style={{ display: 'block' }} onClick={() => updateButtonState(value)}>{value}</button>)}
            </div>
            <div className="genres-submit-button">
                <button onClick={handleGenreSubmit}>Submit!</button>
            </div>
        </div>
    )
}

export default ChooseGenre;