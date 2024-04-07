import spotipy
from collections import defaultdict
import pandas as pd, numpy as np
from spotipy.oauth2 import SpotifyClientCredentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='05345fe6718845e98a33b228f41eb512',
    client_secret='f15f734ac86e4151a7ee6e176e821300'))



song_results = sp.search(q='abacab&type=track', limit=5) # Searching for song data using song and artist name
for i in range(5):
    results = song_results['tracks']['items'][i]
    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0] # Getting song audio features

    url = 'https://open.spotify.com/track/{}'.format(track_id)
    print(url)
