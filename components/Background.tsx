import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import { useWindowSize, useIsMobile } from '../hooks'

const Background = ({ scale }: { scale: number }) => {
    const { width, height } = useWindowSize()
    const isMobile = useIsMobile()
    const scaleSpring = useSpring({
        scale: isMobile ? 1.4 + scale : 1 + scale
    })
    return (
        <>
            <animated.svg id="visual" style={scaleSpring} className="" viewBox={`0 0 ${width} ${height}`} width={width} height={height} xmlns=" http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width={width} height={height}
                    fillOpacity="0" fill="#101010"></rect>

                <defs>
                    <linearGradient id="grad1_0" x1="33.3%" y1="0%" x2="100%" y2="100%">
                        <stop offset="20%" stopColor="#101010" stopOpacity="1"></stop>
                        <stop offset="80%" stopColor="#101010" stopOpacity="1"></stop>
                    </linearGradient></defs>


                <defs>
                    <linearGradient id="grad2_0" x1="0%" y1="0%" x2="66.7%" y2="100%">
                        <stop offset="20%" stopColor="#101010" stopOpacity="1">
                        </stop><stop offset="80%" stopColor="#101010" stopOpacity="1"></stop></linearGradient>

                </defs>

                <defs>

                    <linearGradient gradientTransform="rotate(0)" id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="10%" stopColor=" #F55555" />
                        <stop offset="100%" stopColor="#FD6E5B " />
                    </linearGradient>

                </defs>
                <g transform={`translate(${width}, 0)`}>
                    <path d="M0 243.4C-36.5 226.9 -73 210.5 -111 192.3C-149 174 -188.5 154 -210.8 121.7C-233.1 89.3 -238.2 44.7 -243.4 0L0 0Z" fill={"url(#gradient)"}></path></g><g transform={`translate(0, ${height})`}><path d="M0 -243.4C39.2 -231.5 78.3 -219.7 116 -200.9C153.7 -182.1 189.8 -156.3 210.8 -121.7C231.7 -87 237.6 -43.5 243.4 0L0 0Z" fill={"url(#gradient)"}>

                    </path>
                </g>
            </animated.svg>
        </>
    )
}

export default Background