'use client'
import { useSearchParams } from 'next/navigation'
import { VideoPlayer } from '@/components'

export default function Home () {
  const query: any = useSearchParams().get('q')
  return (
    <main className='w-full flex justify-center mt-10'>
      {query && <VideoPlayer width='1200' src={query} />}
    </main>
  )
}
