import { TimerType } from "../components/Timer"

type TimerAction = {
    payload: boolean | number,
    type: "changetimer" | "changebreak" | "setplay" | "setbreak" | "setpaused"|"settimerduration"
}
const reducer = (state: TimerType, action: TimerAction): TimerType => {
    switch (action.type) {
        case "changebreak": {
            if (typeof action.payload === 'number')
                return { ...state, breakDuration: (action.payload) }
            return state
        }
        case "changetimer": {
            if (typeof action.payload === 'number')
                return { ...state, time: action.payload }

            return state
        }
        case "setplay": {
            if (typeof action.payload === 'boolean')

                return { ...state, play: (action.payload) }
            return state
        }
        case "setbreak": {
            if (typeof action.payload === 'boolean')
                return { ...state, isBreak: (action.payload) }
            return state

        }
        case "setpaused": {
            if (typeof action.payload === 'boolean')
                return { ...state, paused: (action.payload) }
            return state

        }
        case "settimerduration": {
            if (typeof action.payload === 'number')
                return { ...state, timerDuration: (action.payload) }
            return state

        }
    }
}
export default reducer