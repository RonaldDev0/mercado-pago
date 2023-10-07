'use client'
import { useOptions } from '@/store'
import { Button } from './ui'
import { Search } from 'lucide-react'

export function NavBarr () {
  const { setStore, commandMenu } = useOptions()

  return (
    <nav className='fixed w-full flex justify-center border-b border-neutral-700 p-2'>
      <Button className='flex gap-10' variant='outline' onClick={() => setStore('commandMenu', !commandMenu)}>
        Search Barr
        <Search />
      </Button>
    </nav>
  )
}
