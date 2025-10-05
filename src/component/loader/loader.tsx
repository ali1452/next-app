import React from 'react'

type Props = {}

function Loader({}: Props) {
  return (
    <div className="w-full bg-black flex items-center justify-center h-screen z-[99]">
        <img src="/loaderImg.gif" alt="loading" />
    </div>
  )
}

export default Loader