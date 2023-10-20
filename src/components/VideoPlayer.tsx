/* eslint-disable no-return-assign */
'use client'
import { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, Minimize, Maximize, ChevronRight, ChevronLeft, Settings } from 'lucide-react'

export function VideoPlayer ({ src, width }: { src: string, width: string }) {
  const containerRef = useRef<any>(null)
  const videoRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.1)

  const handlePlayPause = () => {
    isPlaying ? videoRef.current.pause() : videoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleFullScreen = () => {
    !isFullscreen ? containerRef.current.requestFullscreen() : document.exitFullscreen().catch(() => null)
    setIsFullscreen(!isFullscreen)
  }

  const handleVolumeChange = (e: any) => {
    const newVolume = e.target.value
    videoRef.current.volume = newVolume
    setVolume(newVolume)
  }

  const handleProgressBarClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickedValue = x * videoRef.current.duration / rect.width
    videoRef.current.currentTime = clickedValue
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    const hrsString = hrs > 0 ? `${hrs}:` : ''
    const minsString = `${hrs > 0 && mins < 10 ? '0' : ''}${mins}:`
    const secsString = `${secs < 10 ? '0' : ''}${secs}`

    return hrsString + minsString + secsString
  }

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(progress)
      }
    }

    videoRef.current.addEventListener('timeupdate', handleTimeUpdate)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
  }, [])

  return (
    <div className={`video relative w-[${width}]px transition-all rounded-xl bg-black`} ref={containerRef}>
      <video className='rounded-xl' width={width} src={src} ref={videoRef} loop />
      <div onClick={handlePlayPause} className='absolute top-0 w-full h-full grid place-content-center'>
        {!isPlaying && <Play size={30} className='cursor-pointer' />}
      </div>
      <div className='video-controls absolute bottom-0 w-full flex flex-col items-center'>
        <div className='flex items-center w-[95%] h-2 rounded-lg bg-[rgba(105,105,105,0.45)] cursor-pointer' onClick={handleProgressBarClick}>
          <div style={{ width: `${progress}%` }} className='rounded-l-sm h-full bg-blue-800' />
          <div className='top-[-50%] -translate-x-1/2 w-4 h-4 bg-blue-950 rounded-full' />
        </div>
        <div className='w-[95%] flex items-center justify-between'>
          <div className='flex items-center gap-5 my-2'>
            {
              isPlaying
                ? <Pause size={30} className='cursor-pointer' onClick={handlePlayPause} />
                : <Play size={30} className='cursor-pointer' onClick={handlePlayPause} />
            }
            <ChevronLeft size={30} className='cursor-pointer' onClick={() => videoRef.current.currentTime -= 15} />
            <ChevronRight size={30} className='cursor-pointer' onClick={() => videoRef.current.currentTime += 15} />
            <div className='group flex gap-5'>
              <div className='flex group'>
                <Volume2 size={30} className='cursor-pointer' />
                <div className='w-0 group-hover:w-5 transition-all duration-500' />
                <input type='range' min='0' max='1' step='0.01' value={volume} onChange={handleVolumeChange} className='w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 transition-all duration-500' />
              </div>

            </div>
            <p>{videoRef.current ? `${formatTime(videoRef.current.currentTime)} / ${formatTime(videoRef.current.duration)}` : '00:00 / 00:00'}</p>
          </div>
          <div className='flex gap-5'>
            <Settings size={30} className='cursor-pointer hover:rotate-45 transition-all' />
            {
              isFullscreen
                ? <Minimize size={30} className='cursor-pointer' onClick={handleFullScreen} />
                : <Maximize size={30} className='cursor-pointer' onClick={handleFullScreen} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
