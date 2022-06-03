import React from 'react'
import {BsCircle} from 'react-icons/bs'

const image = 'https://bit.ly/3ag9pRY'

const About = () => {
  return (
    <div className='max-w-[1240px] flex mt-2 mx-auto'>
        <div className='grid p-10 md:grid-cols-3 gap-6 grid-rows-none'>
            <h2 className='col-span-1 md:col-span-2 bg-cyan-400 cursive m-5 pl-2 text-center text-xl md:text-3xl py-16 tracking-[0.25em]'>
                Buy original products and enjoy the <span className='text-yellow-400'> Best price</span>
                <div className='flex justify-center py-16 text-red-600 animate-bounce'>
                <BsCircle className='bg-red-600 rounded-full' />
                </div>
            </h2>
            <div className=''>
            <img src={image} alt="pixel 6" className='w-full object-contain rounded-lg' />
            </div>
        </div>
    </div>
  )
}

export default About