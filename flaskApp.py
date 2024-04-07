from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='05345fe6718845e98a33b228f41eb512',
    client_secret='f15f734ac86e4151a7ee6e176e821300'))

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

playlist = []

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
    id = request.get_data()
    
    d = sp.recommendations(seed_tracks=[str(id)], limit=2)

    for song in d["tracks"]:
        print(song["name"])
        playlist.append(song["id"])

    # Logic to process the string
    
    return jsonify({'message': 'String received and processed successfully'})



if __name__ == '__main__':
    app.run(debug=True)