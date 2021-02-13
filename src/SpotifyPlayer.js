import React from "react";

export default function SpotifyPlayer({ playlist }) {
  let thisPlaylist = playlist;

  thisPlaylist = thisPlaylist.replace(".com/", ".com/embed/");
  return (
    <iframe
      title="spotify-player"
      src={thisPlaylist}
      width="300"
      height="80"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  );
}
