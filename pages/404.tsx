import Link from 'next/link'
import React from 'react'

const _404Page = () => {
    return (
        <div style={{
            backgroundColor: "#101010"
        }} className='w-screen h-screen flex justify-center items-center'>

            <div className='text-5xl flex flex-col gap-y-4 text-white'>
                <div className='text-center underline underline-offset-4  '>404</div>
                <div className='flex gap-x-2 text-base md:text-xl'>Couldn't find that! <Link href='/'>

                    <a className='text-blue-500 hover:underline'>Click To Go Back To Home</a>

                </Link> </div>
            </div>

        </div>



    )
}

export default _404Page