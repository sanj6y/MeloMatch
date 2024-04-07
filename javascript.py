
import requests
from urllib.parse import urlencode
import base64
import webbrowser
import json

client_id = "116657a4e279491b9e7a42c56f09db1c"
client_secret = "0d2cb83374a5458395be9302d62b6aff"

auth_headers = {
    "client_id": client_id,
    "response_type": "code",
    "redirect_uri": "http://localhost:7777/callback",
    "scope": "user-library-read"
}

#webbrowser.open("https://accounts.spotify.com/authorize?" + urlencode(auth_headers))

code = "AQDnW_ptTr2XJ4IImiONv12VFjAijpaUMCW5PSjwW8myc3-lPEgnpEliQW6qGM0bVDQqtQnrVrh8eaG1EQ2z9FzPY3GBuYFCzUP2_WCJkoVaL6MqiNv-NJYB4iEBET94TUKm_Pf3WHjmlQAGhk9atfE8tI9v1jaWiHXXVH_Buh9Oq3PvgB1Q5rg0M7VszIr4417zfL8"

encoded_credentials = base64.b64encode(client_id.encode() + b':' + client_secret.encode()).decode("utf-8")

token_headers = {
    "Authorization": "Basic " + encoded_credentials,
    "Content-Type": "application/x-www-form-urlencoded"
}

token_data = {
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": "http://localhost:7777/callback"
}

r = requests.post("https://accounts.spotify.com/api/token", data=token_data, headers=token_headers)


#token = r.json()["access_token"]

#print(token)

user_headers = {
    "Authorization": "Bearer " + 'BQBSs9rMtLPBpVuWAl2ZZXCgnPjVuCYWpB-qHRqQyDFHsymMdhxgpbiNjlhtDr6AgUBLcvmZKKQ0aD7oeEhc-YlTgx-526Fq1dGpPHfrs2t2CQB0yQXhRSPEwz_b-RQapyjAIRZXv0iEIkjetYckYAyFKPZC7aL63XIvQdFF6-p8DgWKykFekLMG-A',
    "Content-Type": "application/json"
}

user_params = {
    "limit": 3600
}

user_tracks_response = requests.get("https://api.spotify.com/v1/recommendations?limit=2&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA", params=user_params, headers=user_headers)

print(json.dumps(user_tracks_response.json()))
