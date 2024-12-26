import React from 'react'
import { TextTypes } from '../types/slidetype'

function Text1(props:TextTypes) {
  return (
    <div className="text-center mt-32 mb-14 bg-[#fffdfb] text-[#877B73]">
    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{props.title}</h1>
    <p className="mt-4 text-xs sm:text-sm md:text-base">{props.description} <br className="hidden sm:block" />{props.brdescription}
     <br className="hidden sm:block" />{props.p1}</p>
</div>
  )
}

export default Text1