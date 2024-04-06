
from recommendationSystem import recommend_songs
import pandas as pd
genres = ['Pop', 'Rock', 'Hip Hop', 'R&B/Soul', 'Country', 'Electronic/Dance', 'Indie', 'K-Pop', 'Classical', 'Jazz', 'Metal', 'Reggae', 'Latin', 'Folk', 'Rap'
]

name = input('Song name: ')
artists = input('Artist name: ')
print(recommend_songs(name, artists).head())