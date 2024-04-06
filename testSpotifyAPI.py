
import requests
from urllib.parse import urlencode
import base64
import webbrowser

#def search(id):
client_id = "05345fe6718845e98a33b228f41eb512"
client_secret = "f15f734ac86e4151a7ee6e176e821300"

auth_headers = {
    "client_id": client_id,
    "response_type": "code",
    "redirect_uri": "http://localhost:7777/callback",
    "scope": "user-library-read"
}

webbrowser.open("https://accounts.spotify.com/authorize?" + urlencode(auth_headers))