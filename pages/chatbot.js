import AIChatBoX from '@/components/AIChatBox'
import AIChatBoxV2 from '@/components/AIV2'
import Navbar from '@/components/navbar'
import React from 'react'

export default function chatbot() {
  return (
    <>
      <Navbar>
        <AIChatBoxV2/>
      </Navbar>
    </>
  )
}
