from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='116657a4e279491b9e7a42c56f09db1c',
    client_secret='0d2cb83374a5458395be9302d62b6aff'))

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
    song_id = str(request.get_data(), encoding='utf-8')[1:-1]
    playlist.append(song_id)
    print(song_id)
    ids = []
    d = sp.recommendations(seed_tracks=[str(song_id)], limit=2)

    for song in d["tracks"]:
        print(song["name"])
        ids.append(song['id'])

    return ids
    

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
    print(genres)
    print(type(genres))
    ids = []
    d = sp.recommendations(seed_genres=genres, limit=2)
    print("got here")

    for song in d["tracks"]:
        print(song["name"])
        #playlist.append(song["id"])
        ids.append(song['id'])
    print("reached here")
    return jsonify(ids)



if __name__ == '__main__':
    app.run(debug=True)