import React from "react";
interface SpotifyPlayerProps {
  playlist: string
}
export default function SpotifyPlayer({ playlist }: SpotifyPlayerProps) {
  let thisPlaylist = playlist;

  thisPlaylist = thisPlaylist.replace(".com/", ".com/embed/");
  return (
    <iframe
      title="spotify-player"
      src={thisPlaylist}
      width="300"
      height="80"
      frameBorder="0"
      allowTransparency={true}
      allow="encrypted-media"
    ></iframe>
  );
}
