'use client'
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!)

export default function Billing () {
  const onSubmit = async ({ formData }: any) => {
    fetch('/api/process_payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, description: 'la mejor hamburguesa del hijueputa mundo!' })
    }).then(res => res.json()).then(console.log).catch(console.error)
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
