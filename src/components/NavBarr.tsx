'use client'
import { useOptions } from '@/store'
import { Button } from './ui'
import { Search } from 'lucide-react'

export function NavBarr () {
  const { setStore, commandMenu } = useOptions()
  const openSearch = () => setStore('commandMenu', !commandMenu)

  return (
    <div className='w-full relative'>
      <nav className='w-full flex justify-center p-2'>
        <Button className='flex gap-14' variant='outline' onClick={openSearch}>
          Search Barr
          <Search />
        </Button>
      </nav>
      <div className='border' />
    </div>
  )
}
