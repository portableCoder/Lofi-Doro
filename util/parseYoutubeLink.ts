//returns video ID OR "" from a given youtube url
export default function parseYoutubeLink(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if(!match){
      return ""
    }
    if(!match[7])
      return ""

    return (match[7].length == 11) ? match[7] : "";
  }
  