import React, { useEffect, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineUndo } from 'react-icons/ai'
import convertToHMS from '../util/convertToHMS';
import { animated, useSpring } from '@react-spring/web'
import { usePrevious } from '../hooks';
import { TimerProps, TimerType } from '../types/Timer';
const isNumber = function (str: string) {

    const pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
}


const Timer = ({ isBreak, paused, time, breakDuration, play, timerDuration, onClickPlay, onClickStop, onBreakChange, onTimerChange }: TimerType & TimerProps) => {
    const prevTime = usePrevious(convertToHMS(time))
    const [hr, min, sec] = convertToHMS(time)
    const [th, tm, ts] = convertToHMS(timerDuration)
    const [timerDurationTime, setTimerDurationTime] = useState({
        hrs: th,
        mins: tm,
        sec: ts
    })

    const filterUnwantedChars = (e: React.FormEvent<HTMLInputElement>) => {

        let currentVal = e.currentTarget.value
        if (!isNumber(currentVal)) {
            currentVal = '0'
        }
        if (Number(currentVal) > 9) {
            currentVal = currentVal.replaceAll("0", '')
        }
        e.currentTarget.value = currentVal

    }


    useEffect(() => {
        if (onTimerChange) {

            let { hrs, mins, sec } = timerDurationTime
            onTimerChange(Number(hrs), Number(mins), Number(sec))
        }
    }, [timerDurationTime])
    useEffect(() => {


    }, [time])
    const breakIndicatorStyles = useSpring({
        y: isBreak ? 0 : 25
    })


    return (
        <>
            <button id='play-button' onClick={onClickPlay} className='text-2xl'> {!paused ? <BsFillPauseFill /> : <BsFillPlayFill />}</button>

            <div className='w-full flex justify-center items-center font-bold text-xl'>
                <div className=''>Break Duration:</div>

                <div className='w-12  '>
                    <input disabled={!paused} onChange={(e) => {
                        filterUnwantedChars(e)

                        if (onBreakChange)
                            onBreakChange(e)
                    }} defaultValue={String(Math.floor(breakDuration / 60)).padStart(2, '0')} className='w-full text-center bg-transparent focus:outline-none' />
                </div>
                <div>
                    Minutes
                </div>
            </div>



            {
                isBreak &&
                <animated.div style={breakIndicatorStyles} className=' text-2xl md:text-4xl text-red-400'>
                    {`It's Break Time!`}
                </animated.div>
            }
            {
                !play &&
                <div className=' text-2xl md:text-4xl text-white'>
                    Set your timer duration..
                </div>
            }
            <div className={'w-full flex  justify-center gap-x-4 md:gap-x-16 items-center text-xl md:text-4xl '}>
                <div className='text-6xl md:text-8xl text-red-500'>[</div>
                <div className='flex justify-center items-center flex-col my-6'>
                    <div className='w-16 text-center '>
                        {play && <div id="hr-display" className='text-center w-full flex items-center justify-center'>
                            {hr}
                        </div>}
                        {!play &&
                            <input id="hr" onChange={(e) => {
                                let val = e.target.value
                                if (val === '') {
                                    setTimerDurationTime((prev) => ({ ...prev, hrs: val }))
                                    return
                                }
                                else if (!val || !isNumber(val)) {
                                    val = "0"
                                }

                                setTimerDurationTime((prev) => ({ ...prev, hrs: val }))
                            }} value={timerDurationTime.hrs} className='w-16 ring-2 ring-neutral-800 focus:ring-red-500  text-center bg-transparent focus:outline-none' />
                        }
                    </div>
                    <div className='text-2xl text-center'> Hr</div>
                </div>
                <div>:</div>
                <div className='flex justify-center items-center flex-col'>
                    <div className='w-16  '>
                        {play && <div id="min-display" className='text-center w-full'>
                            {min}
                        </div>}
                        {!play &&

                            <input id="min" onChange={(e) => {
                                let val = e.target.value
                                if (val === '') {
                                    setTimerDurationTime((prev) => ({ ...prev, mins: val }))
                                    return
                                }
                                else if (!val || !isNumber(val)) {
                                    val = "0"

                                }

                                setTimerDurationTime((prev) => ({ ...prev, mins: val }))
                            }} value={timerDurationTime.mins} className='w-16 ring-2 ring-neutral-800 focus:ring-red-500  text-center bg-transparent focus:outline-none' />
                        }
                        <div className='text-2xl text-center'>Min</div>
                    </div>
                </div>
                <div>:</div>
                <div className='flex justify-center items-center flex-col'>
                    <div className='w-16  '>
                        {play && <div id="sec-display" className='text-center w-full flex items-center justify-center'>
                            {sec}
                        </div>}
                        {
                            !play &&
                            <input id="sec" onChange={(e) => {
                                let val = e.target.value
                                if (val === '') {
                                    setTimerDurationTime((prev) => ({ ...prev, sec: val }))
                                    return
                                }
                                else if (!val || !isNumber(val)) {
                                    val = "0"
                                }

                                setTimerDurationTime((prev) => ({ ...prev, sec: val }))
                            }} value={timerDurationTime.sec} className='w-16 ring-2 ring-neutral-800 focus:ring-red-500 bg-transparent focus:outline-none text-center' />
                        }
                    </div>

                    <div className='text-2xl'>Sec</div>
                </div>
                <div className=' text-6xl md:text-8xl text-red-500'>]</div>

            </div>
            {
                play &&
                <button onClick={onClickStop} className='text-2xl text-white'><AiOutlineUndo /></button>
            }
        </>
    )
}

export default Timer