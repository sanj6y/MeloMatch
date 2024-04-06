# import dataset
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')

df = pd.read_csv('spotify_data_12_20_2023.csv')
# print(df.columns)

# selecting relevant features
df = df[['track_name', 'artists', 'artist_genres', 'explicit',
        'album_name', 'release_year', 'danceability','energy',
        'key','loudness', 'mode', 'speechiness', 'acousticness',
        'instrumentalness', 'liveness', 'valence', 'tempo',
        'time_signature']]
df['artists'] = df['artists'].str.replace(r"['\[\]]", '', regex=True)

# Processing artists genres to fit the purpose of the project
import ast

list_of_lists = [ast.literal_eval(s) for s in df['artist_genres']]
df['artist_genres'] = [sublist[0] if sublist else None for sublist in list_of_lists]
df['artist_genres'].fillna("unknown", inplace=True)

# Renaming column
df.rename(columns={'track_name':'name'}, inplace=True)

#df.info() # Summary of DataFrame information
# print('\nNumber of unique values in each column')
# for i in df.columns:
#     print(f'{i} - {df[i].nunique()}')
# print('\nNumber of missing values in each column\n', df.isnull().sum())
# print('\nNumber of duplicated rows\n', df.duplicated().sum())

# Drop rows with empty values
df = df.dropna()
# print('Length of the dataset:', len(df))

# Setting value type to integer
df['explicit'] = df['explicit'].astype(int)
df['release_year'] = df['release_year'].astype(int)

# Applying Label Encoder to artist genre values
from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
df['artist_genres_encoded'] = label_encoder.fit_transform(df['artist_genres'])
# print(df.describe())

# reset df index
df.reset_index(drop=True, inplace=True)




''' EDA - Exploratory Data Analysis '''
import matplotlib.pyplot as plt
import seaborn as sns
plt.style.use('seaborn-v0_8-bright')
colors = sns.color_palette('bright')
fig, axes = plt.subplots(1, 4, figsize=(15, 4))  # 1 row, 4 columns

for i, name in enumerate(['explicit', 'key', 'mode', 'time_signature']):
    axes[i].pie(df[name].value_counts(), labels=df[name].unique(), autopct='%1.1f%%', startangle=45)
    axes[i].set_title(f'{name}')

# Display the plot
# plt.tight_layout()
# plt.show()

''' PREPROCESSING '''
# Selecting training features (numerate columns)
features = df.select_dtypes(np.number).columns

# Rescaling data using Standard Scaler
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df[features])
df_scaled = pd.DataFrame(df_scaled, columns=features)
# print(df_scaled.head())

''' CLUSTERING '''
# Elbow Method to determine the number of clusters to be formed
from yellowbrick.cluster import KElbowVisualizer
from sklearn.cluster import KMeans
plt.figure(figsize=(15,5))
Elbow_M = KElbowVisualizer(KMeans(n_init='auto'), k=20)
Elbow_M.fit(df_scaled)
# Elbow_M.show()

# Using KMeans model 11 clusters
model = KMeans(n_clusters=11, n_init='auto')
model.fit(df_scaled)
df_scaled["Cluster"] = model.labels_

# Visualizing the Clusters with PCA
import plotly.express as px
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
embedding = pca.fit_transform(df_scaled)
projection = pd.DataFrame(columns=['x', 'y'], data=embedding)
projection['title'] = df['name']
projection['genre'] = df['artist_genres']
projection['cluster'] = df_scaled['Cluster']
fig = px.scatter(
    projection, x='x', y='y', color='cluster', hover_data=['x', 'y', 'genre'])
# fig.show()

''' setup recommendation system '''
# Re-adding string features (Name, Artist, Genre, Album)
df_scaled = df_scaled.join(df[df.drop(features, axis=1).columns])
# Re-adding Year feature
df_scaled['release_year'] = df['release_year']
# print(df_scaled.head())

''' using spotipy '''
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from kaggle_secrets import UserSecretsClient
# Initializing Kaggle secrets
user_secrets = UserSecretsClient()
# Setting up Spotipy with Kaggle secrets
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=user_secrets.get_secret("Client ID"),
                                                           client_secret=user_secrets.get_secret("Client secret")))


# Defining function for finding song on Spotify
from collections import defaultdict

def find_song(name, artists):
    song_data = defaultdict() # Setting up song dictionary
    song_results = sp.search(q= 'track: {} artist: {}'.format(name, artists), limit=1) # Searching for song data using song and artist name
    if song_results['tracks']['items'] == []:
        return None
    artist_results = sp.search(q= 'track: {} artist: {}'.format(name, artists), type='artist', limit=1) # Searching for artist data using song and artist name
    results = song_results['tracks']['items'][0]
    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0] # Getting song audio features

    song_data['name'] = [name]
    song_data['release_year'] = [pd.to_datetime(results['album']['release_date']).year]
    song_data['explicit'] = [int(results['explicit'])]
    genres = artist_results['artists']['items'][0]['genres']
    if genres != []:
        song_data['artist_genres_encoded'] = [label_encoder.transform([genres[0]])]
    else:
        song_data['artist_genres_encoded'] = [label_encoder.transform(['unknown'])]
    for key, value in audio_features.items():
        song_data[key] = value

    return pd.DataFrame(song_data)


# Selecting training features (numerate columns)
number_cols = df.select_dtypes(np.number).columns

# Defining function for getting song data
def get_song_data(song, spotify_data):
    try: # Try to find song in imported data
        song_data = spotify_data[(spotify_data['name'] == song['name'])
                                & (spotify_data['artists'] == song['artists'])].iloc[0]
        return song_data
    except IndexError: # If song not found, it will be retrieved from Spotify
        return find_song(song['name'], song['artists'])

# Defining function for getting mean vector of the song
def get_mean_vector(song_list, spotify_data):
    song_vectors = []
    for song in song_list:
        song_data = get_song_data(song, spotify_data) # Getting song data from user input
        if song_data is None:
            print('Warning: {} does not exist in Spotify or in database'.format(song['name'])) # Returing Warning if song does not exist in Spotify
            continue
        song_vector = song_data[number_cols].values # Getting audio features of the data
        song_vectors.append(song_vector)
    song_matrix = np.array(list(song_vectors))
    return np.mean(song_matrix, axis=0)

# Defining function for transforming a list of dictionaries
def flatten_dict_list(dict_list):
   flattened_dict = defaultdict()
   # Assign keys for dictionary
   for key in dict_list[0].keys():
       flattened_dict[key] = []
   # Append data to the dictionary
   for dictionary in dict_list:
       for key, value in dictionary.items():
           flattened_dict[key].append(value)
   return flattened_dict


from scipy.spatial.distance import cdist
# Defining function for getting song recommendations
def recommend_songs(song_list, spotify_data, n_songs=5): # Number of songs to be recommended - 5
    metadata_cols = ['name', 'artists', 'album_name', 'release_year', 'artist_genres'] # Features to be returned with recommendations
    # Applying pre-processing functions
    song_dict = flatten_dict_list(song_list)
    song_center = get_mean_vector(song_list, spotify_data)
    # Scaling data
    scaled_data = scaler.transform(spotify_data[number_cols])
    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    # Computing distances
    distances = cdist(scaled_song_center, scaled_data, 'cosine')
    index = list(np.argsort(distances)[:, :n_songs][0])
    # Getting recommended songs
    rec_songs = spotify_data.iloc[index]
    rec_songs = rec_songs[~rec_songs['name'].isin(song_dict['name'])]

    return rec_songs[metadata_cols].to_dict(orient='records')



''' Inference '''
# recommend based on Imagine by John Lennon
pd.DataFrame(recommend_songs([{'name': 'Imagine', 'artists': 'John Lennon'}],  df_scaled))
# recommend based on Despacito
pd.DataFrame(recommend_songs([{'name': 'Despacito', 'artists': 'Luis Fonsi'}],  df_scaled))
# recommend based on Gangnam Style
pd.DataFrame(recommend_songs([{'name': 'Gangnam Style', 'artists': 'PSY'}],  df_scaled))
