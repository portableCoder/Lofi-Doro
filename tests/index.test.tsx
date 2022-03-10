import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'

describe('Home', () => {
    let min = document.getElementById('min') as HTMLInputElement
    let sec = document.getElementById('sec') as HTMLInputElement
    let hr = document.getElementById('hr') as HTMLInputElement
    beforeEach(() => {
        render(<Home />)
        min = document.getElementById('min') as HTMLInputElement
        sec = document.getElementById('sec') as HTMLInputElement
        hr = document.getElementById('hr') as HTMLInputElement
    })
    it('Renders the home page with the timer', () => {

        const text = screen.getByText("Lofi Doro")
        expect(text).toBeInTheDocument()
        const timerText = screen.getByText("Break Duration:")
        expect(timerText).toBeInTheDocument()

        const setTimer = screen.getByText("Set your timer duration..")
        expect(setTimer).toBeInTheDocument()

    })
    it('checks if the timer renders properly', () => {

        [hr, min, sec].forEach((el) => expect(el).toBeInTheDocument())
        expect(min.value).toBe('10') // default value 10 minutes  


    })
    it('tests the timer inputs against malformed inputs', () => {
        //check malformed inputs
        fireEvent.change(hr, { target: { value: 'ab' } })
        fireEvent.change(hr, { target: { value: 'abcdefb5-0' } })
        expect(hr.value).toBe('0')

    })
    it(`tests the timer's functionality`, () => {
        let hrDisplay = document.getElementById('hr-display') as HTMLDivElement
        let minDisplay = document.getElementById('min-display') as HTMLDivElement
        let secDisplay = document.getElementById('sec-display') as HTMLDivElement

        //fire the timer
        const playButton = document.getElementById('play-button') as HTMLButtonElement
        playButton.click()
        setTimeout(() => {
            expect(secDisplay.textContent).toBe('01')
        }, 1100)

    })
})



