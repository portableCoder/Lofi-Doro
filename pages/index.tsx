import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useReducer, useRef, useState } from 'react'
import useIsMobile from '../util/useIsMobile'
import Timer from '../components/Timer'
import useInterval from '../util/useInterval'
import Background from '../components/Background'
import reducer from '../util/TimerReducer'
import YouTube, { YouTubeProps } from 'react-youtube'
import { BsMusicNoteBeamed, BsX } from 'react-icons/bs'
function youtube_parser(url: string): string {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : "";
}
var pl: any;
function onYouTubeIframeAPIReady() {
  //@ts-ignore
  pl = new YT.Player('player', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange() {
  //...
}
const Home: NextPage = () => {

  const isMobile = useIsMobile()
  const [timerState, dispatchTimerState] = useReducer(reducer, {
    time: 0,
    isBreak: false,
    play: false,
    breakDuration: 5 * 60,
    paused: true,
    timerDuration: 10 * 60
  })
  useInterval(() => {
    let currentTime = timerState.time + 1
    if (currentTime === timerState.timerDuration && !timerState.isBreak) {
      dispatchTimerState({
        payload: 0,
        type: "changetimer"
      })
      dispatchTimerState({
        payload: true,
        type: "setbreak"
      })
    } else if (timerState.isBreak) {
      if (currentTime === timerState.breakDuration) {
        dispatchTimerState({
          payload: false,
          type: "setbreak"
        })
        dispatchTimerState({
          payload: 0,
          type: "changetimer"
        })
      } else {
        dispatchTimerState({
          payload: currentTime,
          type: "changetimer"
        })
      }
    } else {
      dispatchTimerState({
        payload: currentTime,
        type: "changetimer"
      })
    }
  }, !timerState.paused ? 1000 : 100000000000)
  const resetTimer = () => {
    dispatchTimerState({
      payload: false,
      type: "setplay"
    })
    dispatchTimerState({
      payload: false,
      type: "setbreak"
    })
    dispatchTimerState({
      payload: 0,
      type: "changetimer"
    })
    dispatchTimerState({
      payload: timerState.breakDuration,
      type: "changebreak"
    })
    dispatchTimerState({
      payload: timerState.timerDuration,
      type: "settimerduration"
    })
    dispatchTimerState({
      payload: true,
      type: "setpaused"
    })
  }
  const player = useRef<any>(null)
  const [showPlayer, setShowPlayer] = useState(false)
  const [link, setLink] = useState(`https://www.youtube.com/watch?v=5qap5aO4i9A`)
  const parsedLink = youtube_parser(link)
  useEffect(() => {
    if (player.current && player.current.target) {
      if (timerState.isBreak || !timerState.play || timerState.paused) {
        player.current.target.pauseVideo()
      } else if (!timerState.isBreak && !timerState.paused && timerState.play) {
        player.current.target.playVideo()

      }
    }
  }, [timerState])
  return (
    <main className='text-white px-6 md:px-16 w-full h-screen overflow-hidden font-montserrat'>
      {showPlayer && <div onClick={(e) => {
        e.preventDefault()
        setShowPlayer(false)
      }} className='absolute top-0 left-0 bg-black opacity-90  w-screen h-screen' />}
      <Head>
        <title>Lofi Doro </title>
        <meta name="description" content="A pomodoro timer to study/relax to" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='z-0'>
        <Background />
      </section>
      <section>
        {/*  */}

      </section>
      <section className=' bg-transparent w-full h-full overflow-hidden'>
        <div className='flex justify-between w-full items-center my-2'>
          <div className='text-2xl z-50 '>

            <button style={{
              zIndex: 9999
            }} className={` transition-all text-2xl md:text-4xl z-50 ${showPlayer ? "text-red-500" : "text-white"}`} onClick={() => {
              setShowPlayer((prev) => !prev)
            }}>

              {!showPlayer ? <BsMusicNoteBeamed /> : <BsX />}


            </button>
            <div className={` absolute left-0 flex flex-col justify-center items-center overflow-hidden ${showPlayer ? "opacity-100 scale-1" : "opacity-0 scale-0"} `}>
              <YouTube
                onReady={(e) => {
                  player.current = e
                }}
                videoId={!parsedLink || parsedLink === "" ? "" : parsedLink}                  // defaults -> null
                id={"player"}                       // defaults -> null
                className={`transition-all w-96 h-64 bg-red-400 rounded-md p-1   ${showPlayer ? "opacity-100 scale-1" : "opacity-0 scale-0"}`}                // defaults -> null
                containerClassName={"w-screen flex justify-center items-center h-96 z-50"} // defaults -> ''

              />
              <div className={` transition-all z-50 ${showPlayer ? "opacity-100 scale-1" : "opacity-0 scale-0"}  `}>
                <input value={link} onChange={(e) => {
                  setLink(e.target.value)
                }} className='w-96 bg-transparent z-50 py-1 focus:outline-none my-6' placeholder='Add a Youtube video or playlist' />
              </div>

            </div>
          </div>

          <div className='text-2xl'>Lofi Doro</div>

          <div className='transform scale-0 text-2xl md:text-4xl '>
            <button className='focus:text-red-500 ' > <BsMusicNoteBeamed /></button>
          </div>


        </div>
        <div className='h-full  flex flex-col gap-y-4 justify-center items-center -my-24'>
          <Timer onTimerChange={(hr, min, sec) => {
            if (hr === '' || min === '' || sec === '') {
              console.log('okayy')
              return
            }

            if (typeof hr != "number" || typeof min != "number" || typeof sec != "number") {
              return;
            }

            console.log(hr, min, sec)

            let time = hr * 3600 + min * 60 + sec

            dispatchTimerState({
              payload: time,
              type: "settimerduration"
            })

          }} onBreakChange={(e) => {

            dispatchTimerState({
              payload: Number(e.target.value) * 60,
              type: "changebreak"
            })
          }} onClickStop={resetTimer} onClickPlay={() => {
            if (!timerState.paused === false) {
              player.current.target.playVideo()
            }
            if (!timerState.play)
              dispatchTimerState({
                payload: true,
                type: "setplay"
              })
            dispatchTimerState({
              payload: !timerState.paused,
              type: "setpaused"
            })

          }} {...timerState} />

        </div>
      </section>
    </main>
  )
}

export default Home
