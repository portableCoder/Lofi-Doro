const getHMS = (time:number)=>{
    return new Date(time * 1000).toISOString().substr(11, 8)
}
export default function (time:number){
    
    return getHMS(time).split(":")}
export {
    getHMS
}