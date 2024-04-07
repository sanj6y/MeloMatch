from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import spotipy
import json
import requests
from spotipy.oauth2 import SpotifyClientCredentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='05345fe6718845e98a33b228f41eb512',
    client_secret='f15f734ac86e4151a7ee6e176e821300'))

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

playlist = []
ids = []

@app.route('/')
def hello():
    return '<h1> Hello World </h1>'


@app.route('/get_string', methods=['GET'])
def get_string():
    # Logic to get the string from the backend
    print(request.data)
    return {"response": "ok"}

@app.route('/song_rec', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def song_rec():
    # Logic to receive the string from the frontend
    global playlist
    global ids
    id1 = str(request.get_data(), encoding='utf-8')[1:-1]
    ids = []
    print(id1)
    playlist.append(id1)
    #d = sp.recommendations(seed_tracks=[str(id)], limit=2)
    user_headers = {
    "Authorization": "Bearer " + 'BQCQzwKuIB1sXvhUh19uNPXFQuPv02X8Hx7ojMg7ncPHOdHhRd60UpWcJqbxcMrdZqSkgJpHPN3dZkuqrKjpKtxJAgRVDU6TimBNYlcz6mLYr36bv4WbFuv6W04WfC5e9IPonSjGPY1sYZKNAw7EJGOpNJ7e_GbHsC7LzNX4ybBK4WZ9Vg1_T5St_A',
    "Content-Type": "application/json"
    }

    user_params = {
        "limit": 3600
    }

    
    
    d = requests.get("https://api.spotify.com/v1/recommendations?limit=2&seed_tracks={}".format(id1), params=user_params, headers=user_headers)
    print(d.json())

    for song in d.json()["tracks"]:
        print(song["name"])
        #playlist.append(song["id"])
        ids.append(song['id'])
    return jsonify(ids)
    

@app.route('/song_get', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def song_get():
    # Logic to receive the string from the frontend
    global playlist
    global ids

    return ids

@app.route('/playlist_get', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def playlist_get():
    # Logic to receive the string from the frontend
    global playlist
    global ids

    return playlist

@app.route('/genre', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def genre():
    # Logic to receive the string from the frontend
    global playlist
    global ids
    genres = json.loads(request.get_data())
    ids = []
    #d = sp.recommendations(seed_genre=[genres], limit=2)

    user_headers = {
    "Authorization": "Bearer " + 'BQCQzwKuIB1sXvhUh19uNPXFQuPv02X8Hx7ojMg7ncPHOdHhRd60UpWcJqbxcMrdZqSkgJpHPN3dZkuqrKjpKtxJAgRVDU6TimBNYlcz6mLYr36bv4WbFuv6W04WfC5e9IPonSjGPY1sYZKNAw7EJGOpNJ7e_GbHsC7LzNX4ybBK4WZ9Vg1_T5St_A',
    "Content-Type": "application/json"
    }

    user_params = {
        "limit": 3600
    }

    genre_string = ""
    print(genres)
    for i in genres:

        genre_string = genre_string + i + "%2c"
    genre_string = genre_string[0:len(genre_string)-3]
    print("here",genre_string)
    d = requests.get("https://api.spotify.com/v1/recommendations?limit=2&seed_genres={}".format(genre_string), params=user_params, headers=user_headers)
    print(d.json())


    for song in d.json()["tracks"]:
        print(song["name"])
        #playlist.append(song["id"])
        ids.append(song['id'])
    
    return jsonify(ids)



if __name__ == '__main__':
    app.run(debug=True)