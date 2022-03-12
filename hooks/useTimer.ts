import {  useLocalStorage, useInterval} from '../hooks'
import { useEffect, useReducer,  useState } from 'react'
import reducer from '../util/TimerReducer'

const useTimer = () => {
    //get frozen state from localStorage and defaults to the values provided in the second arg
    const [frozenState, setFrozenState] = useLocalStorage('state', {
        timerState: {
    
          breakDuration: 5 * 60,
          timerDuration: 10 * 60
        },
        link: `https://www.youtube.com/watch?v=tgI6PjEq0O8`

      })
      //the central state of the timer. It contains all the required data.
      const [timerState, dispatchTimerState] = useReducer(reducer, {
        time: 0,
        isBreak: false,
        play: false,
        breakDuration: frozenState.timerState.breakDuration,
        paused: true,
        timerDuration: frozenState.timerState.timerDuration
    
      })
    const [link, setLink] = useState(frozenState.link)

    useEffect(() => {
        
        const { breakDuration, timerDuration } = timerState
        setFrozenState({
          link,
          timerState: {
            breakDuration,
            timerDuration
          }
        })
      }, [timerState, link])

      const setIsBreak =  (isBreak:boolean)=>{
        dispatchTimerState({
            payload: isBreak,
            type: "setbreak"
          })
      }
      const setPlay =  (play:boolean)=>{
        dispatchTimerState({
            payload: play,
            type: "setplay"
          })
      }

      function setTimer(time:number) {
        dispatchTimerState({
            payload:time,
            type: "changetimer"
        })
    }
    function setBreakduration(breakDuration:number) {
        dispatchTimerState({
            payload: breakDuration,
            type: "changebreak"
        })
    }

    function setTimerDuration(time:number) {
      dispatchTimerState({
        payload: time,
        type: "settimerduration"
      })
    }
    function setPaused(paused:boolean) {
      dispatchTimerState({
        payload: paused,
        type: "setpaused"
      })
    }
      useInterval(() => {
        let currentTime = timerState.time + 1
        if (currentTime === timerState.timerDuration && !timerState.isBreak) {
          setTimer(0)
          setIsBreak(true)
          if (grantedPerms) {
            const notification = new Notification("It's break time");
          }
        } else if (timerState.isBreak) {
          if (currentTime === timerState.breakDuration) {
            setIsBreak(false)
            setTimer(0)
          } else {
            setTimer(currentTime)
          }
        } else {
            setTimer(currentTime)

        }
      }, !timerState.paused ? 1000 : 100000000000)
      const resetTimer = () => {
        setPlay(false)
        setIsBreak(false)
        setTimer(0)
        setBreakduration(timerState.breakDuration)
        setTimerDuration(timerState.timerDuration)
        setPaused(true)

       

         

     

        
      }
      const [grantedPerms, setGrantedPerms] = useState(false)
      useEffect(() => {
        if (Notification) {
          if (Notification.permission !== "granted") {
            // If it's okay let's create a notification
    
            Notification.requestPermission().then(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                setGrantedPerms(true)
              }
            });
          } else if (Notification.permission === "granted") {
            setGrantedPerms(true)
          }
        }
      }, [])
  return ({
        link, setLink,timerState,resetTimer,
        setBreakduration,setPaused,setTimer,setTimerDuration,setIsBreak,setPlay
  })
}

export default useTimer