import React, { useEffect, useState } from "react";

function ChooseGenre() {
    let genres = ['pop', 'rock', 'hip-hop', 'r-n-b', 'country', 'electronic', 'indie', 'k-pop', 'classical', 'jazz', 'metal', 'reggae', 'latin', 'folk', 'romance']
    let [genreList, setGenreList] = useState([])

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
            await fetch("http://127.0.0.1:5000/post_string", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(genreList),
            }).catch(err => console.log(err))
        }
    }

    return (
        <div>
            <h1>Select Genres</h1>
            {genres.map((value, index) => <button style={{ display: 'block' }} onClick={() => updateButtonState(value)}>{value}</button>)}
            <button onClick={handleGenreSubmit}>Submit!</button>
        </div>
    )
}

export default ChooseGenre;