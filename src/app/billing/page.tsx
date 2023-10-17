'use client'
import { useRouter } from 'next/navigation'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)

export default function Billing () {
  const router = useRouter()
  const onSubmit = async ({ formData }: any) => {
    const { ip }: any = await fetch('https://api.ipify.org?format=json').then(res => res.json())

    fetch('/api/process_payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        callback_url: 'https://foodllowers.vercel.app/',
        description: 'la mejor hamburguesa del mundo!',
        additional_info: { ip_address: ip }
      })
    })
      .then(res => res.json())
      .then(data => router.push(data.transaction_details?.external_resource_url))
      .catch(console.error)
  }

  return (
    <main className='flex justify-center mt-20'>
      <div className='w-96'>
        <Payment
          onSubmit={onSubmit}
          locale='es-CO'
          initialization={{ amount: 20000 }}
          customization={{
            visual: { style: { theme: 'dark' } },
            paymentMethods: { mercadoPago: 'all', ticket: 'all', bankTransfer: 'all', creditCard: 'all', debitCard: 'all' }
          }}
        />
      </div>
    </main>
  )
}
