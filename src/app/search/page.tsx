'use client'
import { useSearchParams } from 'next/navigation'

export default function Search () {
  const query = useSearchParams().get('q')
  return (
    <main className='h-screen w-full grid place-content-center'>
      <h1>{query}</h1>
    </main>
  )
}
