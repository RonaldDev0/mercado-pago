/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Settings, User, Users, Home, ThumbsUp } from 'lucide-react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { useOptions } from '@/store'

export function CommandMenu () {
  const router = useRouter()
  const { commandMenu, setStore } = useOptions()
  const inputRef = useRef<any>('')

  const setCommand = (open: boolean) => setStore('commandMenu', open)

  function submit (page: string) {
    router.push(page)
    setStore('commandMenu', !commandMenu)
  }

  function handleEnter (e: any) {
    e.key === 'Enter' && submit(`/search?q=${inputRef.current.value}`)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setStore('commandMenu', !commandMenu)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={commandMenu} onOpenChange={setCommand}>
      <CommandInput ref={inputRef} onKeyDown={handleEnter} placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>Press enter to search</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <CommandItem onSelect={() => submit('/')}><Home className='mr-2 h-4 w-4' />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => submit('/subscriptions')}>
            <Users className='mr-2 h-4 w-4' />
            <span>Subscriptions</span>
          </CommandItem>
          <CommandItem onSelect={() => submit('/likes')}>
            <ThumbsUp className='mr-2 h-4 w-4' />
            <span>Likes</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Settings'>
          <CommandItem onSelect={() => submit('/profile')}>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => submit('/billing')}>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
          </CommandItem>
          <CommandItem onSelect={() => submit('/settings')}>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
