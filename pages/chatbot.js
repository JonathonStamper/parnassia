import AIChatBoX from '@/components/AIChatBox'
import AIChatBoxV2 from '@/components/AIV2'
import Navbar from '@/components/navbar'
import Table from '@/components/Table'
import React from 'react'
import { useState } from 'react'

export default function Chatbot() {
    const [dataToevoeg, setDataToevoeg] = useState({});
    const [dataAanpassen, setDataAanpassen] = useState({});
    const [dataVerwijderen, setDataVerwijderen] = useState({});

    const [personArray, setPersonArray] = useState([
        {
            voornaam: 'Jan',
            achternaam: 'Jansen',
            personeelnr: '21080887',
            werktijd: 'fulltime',
            uren: '40',
            datumUitDienst: '15-05-2022',
        },

        {
            voornaam: 'John',
            achternaam: 'Jansen',
            personeelnr: '21036233',
            werktijd: 'fulltime',
            uren: '40',
            datumUitDienst: '15-05-2022',
        }
    ])

    


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
                    personArray={personArray}
                />
                <AIChatBoxV2
                    dataToevoeg={dataToevoeg}
                    setDataToevoeg={setDataToevoeg}
                    dataAanpassen={dataAanpassen}
                    setDataAanpassen={setDataAanpassen}
                    dataVerwijderen={dataVerwijderen}
                    setDataVerwijderen={setDataVerwijderen}
                    personArray={personArray}
                    setPersonArray={setPersonArray}
                />
            </Navbar>
        </>
    )
}
