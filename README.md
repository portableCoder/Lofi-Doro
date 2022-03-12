# Lofi-Doro
A pomodoro timer to study/ work to
<img src="https://raw.githubusercontent.com/portableCoder/Lofi-Doro/master/assets/logo.png"/>
<br/>

A pomodoro timer that plays lofi (or any) music from youtube while you do your thing. 
It's a rewrite of the same react app that I wrote over a year ago, now with Nextjs & Typescript.

# Usage
<img src="https://raw.githubusercontent.com/portableCoder/Lofi-Doro/master/assets/img.png"/>
<br/>
 You first set a duration for the timer, then the duration of the break interval, and then hit play. You can click the reset button to reset the timer completely,
 or pause it with the pause button. Clicking the 🎜 icon will open up the youtube player and an input box where you can enter your video link. It can be any youtube video,
 or a livestream. While the timer runs, the music will play in the background. If you give the site notification access, you'll also get a notification whenever a break interval starts.
 
 
# Installation
Clone the project, then run
```bash
yarn install
```
You can then run the tests with 

```bash 
yarn test
yarn cy:open 
```
A static file is built with next's static site generation:
```bash
yarn export
```
