import React from 'react'
import AwashLoading from "../asset/videos/awashloading.mp4"
function Loading() {
  return (
    <div className='loading-body'>
      <video src={AwashLoading} loop muted autoPlay></video>
    </div>
  )
}

export default Loading
