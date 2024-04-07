import React, { useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

function Player({ token, uri }) {
    return (
        <SpotifyPlayer
            token={token}
            uris={[`spotify:track:${uri}`]}
            layout='compact'
            hideAttribution={true}
        />
    )
}

export default Player;