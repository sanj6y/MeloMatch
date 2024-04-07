import spotipy
from collections import defaultdict
import pandas as pd, numpy as np
from spotipy.oauth2 import SpotifyClientCredentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='05345fe6718845e98a33b228f41eb512',
    client_secret='f15f734ac86e4151a7ee6e176e821300'))


playlist = []

for i in range(5):
    name = input('Enter the song name: ')
    artists = input('Enter the artist: ')
    song_results = sp.search(q= 'track: {} artist: {}'.format(name, artists), limit=1)
    results = song_results['tracks']['items'][0]
    playlist.append(results['id'])
    print(playlist)

d = sp.recommendations(seed_tracks=playlist, limit=20)
ids = []
for song in d["tracks"]:
    print(song["name"])
    ids.append(song["id"])



print('\n\n\n')

print('Congratulations! Here are the songs of your playlist: ')
for i in ids:
    print(sp.track(i)["name"])

# d = sp.recommendations(seed_tracks=["0c6xIDDpzE81m2q797ordA"], limit=6)

# for i in d["tracks"]:
#     print(i["name"])
