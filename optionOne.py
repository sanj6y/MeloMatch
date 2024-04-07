import spotipy
from collections import defaultdict
import pandas as pd, numpy as np
from spotipy.oauth2 import SpotifyClientCredentials
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='05345fe6718845e98a33b228f41eb512',
    client_secret='f15f734ac86e4151a7ee6e176e821300'))

playlist = []


genres = ['pop', 'rock', 'hip-hop', 'r-n-b', 'country',
    'electronic', 'indie', 'k-pop', 'classical', 'jazz',
    'metal', 'reggae', 'latin', 'folk', 'romance']

user_input = input("Pick one or more genres from the list (type EXACTLY as displayed, comma-separated): " + str(genres) + "\n")

user_genre = [genre for genre in user_input.split(',') if genre in genres]
print(user_genre)


d = sp.recommendations(seed_genres=user_genre, limit=2)
ids = []
for i in d["tracks"]:
    print(i["name"])
    ids.append(i["id"])

print("\n")
user_choice = input("Pick which of these two songs you like more. Type 1 for the first song, 2 for the second: ")

playlist.append(ids[int(user_choice) - 1])

for i in range(19):
    d = sp.recommendations(seed_tracks=[str(playlist[i])], limit=2)
    ids = []
    for song in d["tracks"]:
        print(song["name"])
        ids.append(song["id"])

    print("\n")
    user_choice = input("Pick which of these two songs you like more. Type 1 for the first song, 2 for the second: ")

    playlist.append(ids[int(user_choice) - 1])


print('\n\n\n')

print('Congratulations! Here are the songs of your playlist: ')
for i in playlist:
    print(sp.track(i)["name"])

# d = sp.recommendations(seed_tracks=["0c6xIDDpzE81m2q797ordA"], limit=6)

# for i in d["tracks"]:
#     print(i["name"])
