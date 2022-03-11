import parseYoutubeLink from "../util/parseYoutubeLink";

describe('parses youtube links & returns a video id from the given  url', () => { 

    it('should return the correct video id', ()=>{
        let videoUrl =  `https://www.youtube.com/watch?v=7B8sCMsicpE`
        expect(parseYoutubeLink(videoUrl)).toBe('7B8sCMsicpE')
        videoUrl = `https://youtu.be/7B8sCMsicpE`
        expect(parseYoutubeLink(videoUrl)).toBe('7B8sCMsicpE')
    })
    it('should return an empty string when provided with a malformed url',()=>{
        let urls = ['a','google.com','.com.youtube/v','none']
        urls.forEach((url)=> expect(parseYoutubeLink(url)).toBe(""))
    })
 })