import AIChatBoX from '@/components/AIChatBox'
import AIChatBoxV2 from '@/components/AIV2'
import Navbar from '@/components/navbar'
import Table from '@/components/Table'
import React from 'react'
import { useState } from 'react'

export default function chatbot() {
  const [dataToevoeg, setDataToevoeg] = useState({});
  const [dataAanpassen, setDataAanpassen] = useState({});
  const [dataVerwijderen, setDataVerwijderen] = useState({});
  return (
    <>
      <Navbar>
        <Table
          dataToevoeg={dataToevoeg}
          setDataToevoeg={setDataToevoeg}
          dataAanpassen={dataAanpassen}
          setDataAanpassen={setDataAanpassen}
          dataVerwijderen={dataVerwijderen}
          setDataVerwijderen={setDataVerwijderen}
        />
        <AIChatBoxV2
          dataToevoeg={dataToevoeg}
          setDataToevoeg={setDataToevoeg}
          dataAanpassen={dataAanpassen}
          setDataAanpassen={setDataAanpassen}
          dataVerwijderen={dataVerwijderen}
          setDataVerwijderen={setDataVerwijderen}
        />
      </Navbar>
    </>
  )
}
