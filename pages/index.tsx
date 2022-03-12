import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Timer from '../components/Timer'
import Background from '../components/Background'
import YouTube from 'react-youtube'
import { BsMusicNoteBeamed, BsX } from 'react-icons/bs'
import Image from 'next/image'
import SEOHead from '../components/SEOHead'
import { useWindowSize } from '../hooks'
import parseYoutubeLink from '../util/parseYoutubeLink'
import useTimer from '../hooks/useTimer'
const Home: NextPage = () => {
  const { width, height } = useWindowSize()
  const { timerState, link, setLink, resetTimer, setTimerDuration, setPlay, setPaused } = useTimer()

  const player = useRef<any>(null)

  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {

    if (player.current) {
      if (timerState.isBreak || !timerState.play || timerState.paused) {
        player.current.target.pauseVideo()

      } else if (!timerState.isBreak && !timerState.paused && timerState.play) {
        player.current.target.playVideo()

      }
    }
  }, [timerState])
  const parsedLink = parseYoutubeLink(link)

  return (
    <>
      <SEOHead />

      <main className='overflow-hidden font-montserrat text-white'>
        {showPlayer && <div onClick={(e) => {
          e.preventDefault()
          setShowPlayer(false)
        }} style={{
          width, height
        }} className='fixed z-50 top-0 left-0 bg-black opacity-90  ' />}
        <div className=' px-6 md:px-16 w-full h-screen '>


          <div className='fixed top-0 left-0 -z-50'>
            <Background scale={timerState.isBreak || !timerState.paused ? 0 : 1} />
          </div>
          <section style={{
            zIndex: -999
          }} className='w-screen h-screen bg-neutral-900 fixed left-0 top-0'>
            {<Image unoptimized id='thumbnail-img' layout='fill' alt='youtube-thumbnail' src={`https://img.youtube.com/vi/${parsedLink}/maxresdefault.jpg`} className={`w-full h-full object-cover transition-all ${(parsedLink && (parsedLink !== "")) ? "opacity-30" : "opacity-0"}`} />}
          </section>
          <section>
            {/*  */}

          </section>
          <section className=' bg-transparent w-full h-full overflow-hidden'>
            <div className='flex justify-between w-full items-center my-2'>
              <div className='text-2xl z-50 '>

                <button id='menu-button' style={{
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
                    <div>Video Link</div>
                    <input id="link-input" value={link} onChange={(e) => {
                      setLink(e.target.value)
                    }} className='ring-2 ring-neutral-800 p-2 focus:ring-red-500 w-80 md:w-96 bg-transparent z-50 py-1 focus:outline-none my-2' placeholder='Add a Youtube video or playlist' />
                  </div>

                </div>
              </div>

              <div className='text-2xl md:text-3xl font-bold  tracking-wide  md:tracking-wider'>Lofi Doro</div>

              <div className='transform scale-0 text-2xl md:text-4xl '>
                <button className='focus:text-red-500 ' > <BsMusicNoteBeamed /></button>
              </div>


            </div>
            <div className='h-full  flex flex-col gap-y-4 justify-center items-center -my-24'>
              <Timer onTimerChange={(hr, min, sec) => {
                if (hr === '' || min === '' || sec === '') {
                  return
                }

                if (typeof hr != "number" || typeof min != "number" || typeof sec != "number") {

                  return;
                }

                let time = hr * 3600 + min * 60 + sec

                setTimerDuration(time)
              }} onBreakChange={(e) => {

                setTimerDuration(Number(e.target.value))

              }} onClickStop={resetTimer} onClickPlay={() => {
                if (!timerState.paused === false && player.current) {
                  player.current.target.playVideo()
                }
                if (!timerState.play)
                  setPlay(true)
                setPaused(!timerState.paused)
              }} {...timerState} />

            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Home
