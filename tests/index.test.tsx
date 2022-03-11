import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'
import { act } from 'react-dom/test-utils'
jest.setTimeout(10000)
describe('Home', () => {
    let min = document.getElementById('min') as HTMLInputElement
    let sec = document.getElementById('sec') as HTMLInputElement
    let hr = document.getElementById('hr') as HTMLInputElement
    let hrDisplay = document.getElementById('hr-display') as HTMLDivElement
    let minDisplay = document.getElementById('min-display') as HTMLDivElement
    let secDisplay = document.getElementById('sec-display') as HTMLDivElement
    beforeEach(() => {

        render(<Home />)
        min = document.getElementById('min') as HTMLInputElement
        sec = document.getElementById('sec') as HTMLInputElement
        hr = document.getElementById('hr') as HTMLInputElement

        console.log(`secdisplay`)
        console.log(secDisplay)
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

        act(() => {
            //check malformed inputs
            fireEvent.change(hr, { target: { value: 'ab' } })
        })
        act(() => {
            fireEvent.change(hr, { target: { value: 'abcdefb5-0' } })

        })
        expect(hr.value).toBe('0')
    })
    it(`tests the timer's functionality`, (done) => {
        //set duration

        act(() => {
            fireEvent.change(hr, { target: { value: '00' } })


        })
        act(() => {
            fireEvent.change(min, { target: { value: '00' } })
        })

        act(() => {
            fireEvent.change(sec, { target: { value: '05' } })
        })
        //fire the timer
        const playButton = document.getElementById('play-button') as HTMLButtonElement
        act(() => {
            playButton.click()

        })
        window.setTimeout(() => {
            hrDisplay = document.getElementById('hr-display') as HTMLDivElement
            minDisplay = document.getElementById('min-display') as HTMLDivElement
            secDisplay = document.getElementById('sec-display') as HTMLDivElement
            expect(secDisplay.textContent).toBe('04')
            setTimeout(() => {
                const el = screen.getByText(`It's Break Time!`)
                //assert timer was reset
                expect(el).toBeInTheDocument()

                done()

            }, 1500)
        }, 4100)


    })
})



