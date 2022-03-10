import convertToHMS from "../util/convertToHMS"

describe('seconds to hours,minutes, and seconds',()=>{
    it('tests if the conversion happens properly',()=>{
        const seconds = 3600 //one hour
        
        const [hr,min,sec] = convertToHMS(seconds) 
        expect(hr).toBe("01")
        expect(min).toBe("00")
        expect(sec).toBe("00")

    })
    it('tests if the method can handle null inputs',()=>{
        const seconds = undefined
    
        //@ts-ignore
        expect(convertToHMS).toThrowError()

    })
})
