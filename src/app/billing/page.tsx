'use client'
import { useOptions } from '@/store'
import { Input } from '@/components/ui'
import { PaymentForm } from '@/components'

export default function Billing () {
  const { amount, setStore } = useOptions()
  return (
    <main className='flex flex-col gap-16 items-center mt-20'>
      <Input value={amount} onChange={e => setStore('amount', e.target.value)} type='number' placeholder='Monto a pagar en pesos colombianos' className='w-96' />
      <PaymentForm amount={amount} description='la mejor hamburguesa del mundo!' />
    </main>
  )
}
