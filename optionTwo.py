import spotipy
from collections import defaultdict
import pandas as pd, numpy as np
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='05345fe6718845e98a33b228f41eb512',
    client_secret='f15f734ac86e4151a7ee6e176e821300'))

playlist = []



d = sp.recommendations(seed_genres=[str(user_genre)], limit=2)
ids = []
for i in d["tracks"]:
    print(i["name"])
    ids.append(i["id"])

print("\n")

num_songs = int(input("Enter the number of songs you want in your playlist (1-5): "))
while num_songs < 1 or num_songs > 5:
    num_songs = int(input("Invalid input. Enter the number of songs you want in your playlist (1-5): "))

playlist.extend(ids)

for _ in range(num_songs - 1):
    d = sp.recommendations(seed_tracks=[str(playlist[-1])], limit=2)
    ids = []
    for song in d["tracks"]:
        print(song["name"])
        ids.append(song["id"])

    print("\n")
    user_choice = input("Pick which of these two songs you like more. Type 1 for the first song, 2 for the second: ")
    while user_choice not in ['1', '2']:
        user_choice = input("Invalid input. Pick which of these two songs you like more. Type 1 for the first song, 2 for the second: ")

    playlist.append(ids[int(user_choice) - 1])

for _ in range(15):
    d = sp.recommendations(seed_tracks=[str(playlist[-1])], limit=2)
    ids = []
    for song in d["tracks"]:
        ids.append(song["id"])

    playlist.append(ids[0])

print('\n\n\n')

print('Congratulations! Here are the songs of your playlist: ')
for i in playlist:
    print(sp.track(i)["name"])