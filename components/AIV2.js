import bot from '../public/images/botIcon.png'
import chattingbot from '../public/images/chattingbot.png'
import Image from 'next/image'
import SVGSendArrow from '../icons/SendArrow'
import { useEffect, useState } from 'react';
import SVGCloseX from '../icons/CloseX';
import chatbotIcon from '../public/images/chatbotIcon.png';

const AIChatBoxV2 = () => {

    const [conversation, setConversation] = useState([
        // { from: 'bot', message: '</br> Hallo! Ik ben Bob, uw digitale hulp voor het rekenmodel. Hoe kan ik u helpen? ' },

    ]);
    const [value, setValue] = useState('');
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        gegevens: '',
        field: '',
        idNumber: '',
        mockPersonData: {
            voornaam: 'Jan',
            achternaam: 'Jansen',
            personeelnr: '21080887',
            datumUitDienst: '15-05-2022',
            werktijd: 'fulltime',
            uren: '40',
        },
    });
    
    const [isChatOpen, setIsChatOpen] = useState(true);

    const [option, setOption] = useState('')
    const [arrayNumber, setArayNumber] = useState(-1)
    
    const [dataToevoeg, setDataToevoeg] = useState({})
    const [dataAanpassen, setDataAanpassen] = useState({})
    const [dataVerwijderen, setDataVerwijderen] = useState({})

    const [convoEnded, setConvoEnded] = useState(undefined)
    const Toevoegenscript = [
        {
            from: 'bot',
            message: 'Wat is de voornaam van het persoon die u wilt toevoegen?',
            field: 'voornaam',
            type: 'text'

        },
        {
            from: 'bot',
            message: 'Wat is de achternaam van het persoon die u wilt toevoegen?',
            field: 'achternaam',
            type: 'text'
        },
        {
            from: 'bot',
            message: 'Wat voor soort werktijd heeft deze persoon? (Parttime of Voltijd)',
            field: 'werktijd',
            type: 'text'
        },
        {
            from: 'bot',
            message: 'Hoeveel uren zal deze persoon werken?',
            field: 'uren',
            type: 'number'
        },
        {
            from: 'bot',
            message: 'Wanneer zou hun datum uit dienst zijn?',
            field: 'datumUitDienst',
            type: 'date'
        },
        {
            from: 'bot',
            message: 'Wat is hun persoonlijke nummer?',
            field: 'personeelnr',
            type: 'number'
        },
        {
            from: 'bot',
            message: `Zijn de volgende gevgeens correct? Ja of Nee \n gegevens:
                    \nVoornaam: ${dataToevoeg?.voornaam}
                    \nAchternaam: ${dataToevoeg?.achternaam}
                    \nPersoneelnummer: ${dataToevoeg?.personeelnr}
                    \nDatum uit dienst: ${dataToevoeg?.datumUitDienst}
                    \nParttime/fulltime: ${dataToevoeg?.werktijd}
                    \nUren: ${dataToevoeg?.uren}`,

            field: 'End',
            type: 'text'
        }
    ]

    const Aanpassenscript = [
        {
            from: 'bot',
            message: 'Wat is het personeelsnummer van de persoon die je wilt aanpassen?',
            field: 'personeelnr',
            type: 'number'
        },

        {
            from: 'bot',
            message: `Is dit de juiste persoon? 
                     Ja of Nee \n\n gegevens:
                    Voornaam: ${dataAanpassen?.voornaam}
                    \nAchternaam: ${dataAanpassen?.achternaam}
                    \nPersoneelnummer: ${dataAanpassen?.personeelnr}
                    \nDatum uit dienst: ${dataAanpassen?.datumUitDienst}
                    \nParttime/fulltime: ${dataAanpassen?.werktijd}
                    \nUren: ${dataAanpassen?.uren}`,

            field: 'End',
            type: 'text',
        },
        {from: 'bot',
            message: `Is dit de juiste persoon? 
                     Ja of Nee \n\n gegevens:
                    Voornaam: ${dataAanpassen?.voornaam}
                    \nAchternaam: ${dataAanpassen?.achternaam}
                    \nPersoneelnummer: ${dataAanpassen?.personeelnr}
                    \nDatum uit dienst: ${dataAanpassen?.datumUitDienst}
                    \nParttime/fulltime: ${dataAanpassen?.werktijd}
                    \nUren: ${dataAanpassen?.uren}`,

            field: 'EndEnd',
            type: 'text'}


    ]


    const personArray = [
        {
            voornaam: 'Jan',
            achternaam: 'Jansen',
            personeelnr: '21080887',
            datumUitDienst: '15-05-2022',
            werktijd: 'fulltime',
            uren: '40',
        },

        {
            voornaam: 'Jan',
            achternaam: 'Jansen',
            personeelnr: '21036233',
            datumUitDienst: '15-05-2022',
            werktijd: 'fulltime',
            uren: '40',
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.trim()) return;

        if (option === 'Toevoegen') {

            if (!(Toevoegenscript[arrayNumber].field === 'End')) {
                setConversation((prev) => [...prev, { from: 'You', message: value }]);
                setDataToevoeg((prev) => ({ ...prev, [Toevoegenscript[arrayNumber].field]: value }))
                setArayNumber(arrayNumber + 1)
                
            }

            else {
                if(value.includes('Ja')){
                    setConvoEnded(true)
                    // Add data to the list
                    console.log('convo is ended')
                    
                }

                else if(value.includes('Nee')){
                    setConvoEnded(false)
                    console.log('Convo not ended')
                }

                else{
                    setConversation((prev) => [...prev, { from: 'bot', message: Toevoegenscript[arrayNumber].message }])
                    
                }
            }
        }


        if (option === 'Aanpassen') {
            if (!(Aanpassenscript[arrayNumber].field === 'End')) {
                setConversation((prev) => [...prev, { from: 'You', message: value }]);
                
                const isFound = personArray.find((r,i) =>{
                    if(r.personeelnr === value){
                        return true
                    }

                    return false
                })

                if(isFound){
                setArayNumber(arrayNumber + 1)
                console.log(isFound)
                setDataAanpassen(isFound)

                }

                else{
                    setConversation((prev) => [...prev, { from: 'bot', message: 'Er bestaat geen persoon met die nummer, probeer nog een keer.' }])
                }
            }

            else {
                if(value.includes('Ja')){
                    if(Aanpassenscript[arrayNumber].field === 'EndEnd'){
                        if(value.includes('Ja')){
                            setConvoEnded(true)
                            console.log('convo is ended')

                            return
                        }
                    }
                    setConvoEnded(false)
                    setArayNumber(arrayNumber + 1)
                    // Add data to the list
                    console.log('convo is ended')
                    
                }

                else if(value.includes('Nee')){
                    // setConvoEnded(false)
                    console.log('Convo not ended')
                    setArayNumber(0)    

                }

                else{
                    setConversation((prev) => [...prev, { from: 'bot', message: Aanpassenscript[arrayNumber].message }])                    
                }
            }
        }


        setValue('');
    };

    const handleChange = (e) => setValue(e.target.value);
    
    function handleEditChange(e, field, content){

        if(option === 'Toevoegen'){
        if(e.target.value === ''){
            setDataToevoeg((prev) => ({...prev, [field]: content}))
        }

        setDataToevoeg((prev) => ({...prev, [field]: e.target.value}))
    }

    if(option === 'Aanpassen'){
        if(e.target.value === ''){
            setDataAanpassen((prev) => ({...prev, [field]: content}))
        }

        setDataAanpassen((prev) => ({...prev, [field]: e.target.value}))
    }

    if(option === 'Verwijderen'){
        if(e.target.value === ''){
            setDataVerwijderen((prev) => ({...prev, [field]: content}))
        }

        setDataVerwijderen((prev) => ({...prev, [field]: e.target.value}))
    }
    }


    useEffect(() => {
        if( !(option === '')){
            if (option === 'Toevoegen') {
                setConversation((prev) => [...prev, { from: 'bot', message: Toevoegenscript[arrayNumber]?.message }])
                return
            }
            
            if (option === 'Aanpassen') {
                setConversation((prev) => [...prev, { from: 'bot', message: Aanpassenscript[arrayNumber]?.message }])
                return
            }
        }
    }, [arrayNumber])



    function regenerate(){
        setConversation(null)
        setArayNumber(-1)
        setDataToevoeg({})
        setDataAanpassen({})
        setDataVerwijderen({})
        setConvoEnded(undefined)
        setOption('')
    }


    console.log('Test', dataToevoeg)

    return (
        <>
            {isChatOpen ? (
                <div className="mx-[30%] mt-20 w-[478px] h-[523px] border-2 border-[#DEDEDE] rounded-xl flex flex-col  text-black">
                    <div className="flex flex-row mx-5 border-b-2 py-4">
                        <h3 className="mr-2.5">Bob the bot</h3>
                        <Image src={bot} alt="Bot" width={30} height={30} />
                        <div className='ml-64' onClick={() => setIsChatOpen(false)}><SVGCloseX /></div>
                    </div>

                    {/*-------------- User choice ---------------*/}
                    {convoEnded === undefined ? <div className="mt-7 mx-10 flex  h-[100%] overflow-auto ">
                        <div>
                            <div className={`mb-3 p-4 rounded-md w-full font-bold ${'bg-gray-100'}`}>
                                {'Chabot: '}
                                <span className='font-normal'>
                                    Hallo! Ik ben Bob, uw digitale hulp voor het rekenmodel. Hoe kan ik u helpen?
                                </span>
                            </div>

                            {/* This is the toevoeg option */}
                            {option === '' && <button disabled={option != ''} onClick={() => {
                                setOption('Toevoegen'),
                                    setConversation([{ from: 'You', message: 'Ik wil gegevens toevoegen' }]), setArayNumber(arrayNumber + 1)
                            }} className={`mb-2 p-4 text-left rounded-md w-full font-bold ${option === 'Toevoegen' ? 'bg-[#abffad]' : 'bg-gray-100'}`}>
                                {'Option 1'}:
                                <div className='font-normal'>
                                    Ik wil gegevens toevoegen
                                </div>
                            </button>}


                            {/* This is the Aanpassen option */}
                            {option === '' && <button disabled={option != ''} onClick={() => {
                                setOption('Aanpassen'),
                                    setConversation((prev) => [...prev, { from: 'You', message: 'Ik wil gegevens aanpassen' }]), setArayNumber(arrayNumber + 1)
                            }} className={`mb-2 p-4 text-left rounded-md w-full font-bold ${option === 'Aanpassen' ? 'bg-[#abffad]' : 'bg-gray-100'}`}>
                                {'Option 2'}:
                                <div className='font-normal'>
                                    Ik wil gegevens aanpassen
                                </div>
                            </button>}



                            {/* This is the Verwijderen option */}
                            {option === '' && <button disabled={option != ''} onClick={() => {
                                setOption('Verwijderen'),
                                    setConversation([{ from: 'You', message: ' Ik wil gegevens Verwijderen' }]), setArayNumber(arrayNumber + 1)
                            }} className={`mb-2 p-4 text-left rounded-md w-full font-bold ${option === 'Verwijderen' ? 'bg-[#abffad]' : 'bg-gray-100'}`}>
                                {'Option 3'}:
                                <div className='font-normal'>
                                    Ik wil gegevens verwijderen
                                </div>
                            </button>}




                            {/*-------------- Chat history ---------------*/}
                            {conversation && conversation?.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 p-4 rounded-md w-full font-bold ${chat.from === 'bot' ? 'bg-gray-100' : 'bg-blue-100 text-right'
                                        }`}
                                >
                                    {chat.from === 'bot' ? 'Chatbot' : 'U'}:
                                    <br></br>

                                    <span className='font-normal' dangerouslySetInnerHTML={{
                                        __html: chat?.message?.replace(/\n/g, '<br />'),
                                    }}></span>
                                </div>
                            ))}
                        </div>

                    </div> : convoEnded === true ? 
                    <div className='w-32 my-auto mx-auto'>
                        <CheckMarkSVG/>
                    </div> 

                    : 

                    <div className="mt-4 mx-10 flex bg-white rounded-xl h-[100%] overflow-auto flex-col gap-2">

                        Typ {`'Ja'`} om je wijzigingen te bevestigen.
                        {Object.keys(option === 'Toevoegen' ? dataToevoeg : option === 'Aanpassen' ? dataAanpassen : dataVerwijderen).map((row, i) =>
                            (
                                <div className='flex flex-col' key={i}>
                                    <label className='font-bold'>
                                        {row}
                                    </label>

                                    <input type={Toevoegenscript[i].type} onChange={(e) =>{handleEditChange(e, row, option === 'Toevoegen' ? dataToevoeg[row] : option === 'Aanpassen' ? dataAanpassen[row] : dataVerwijderen[row])}} placeholder={option === 'Toevoegen' ? dataToevoeg[row] : option === 'Aanpassen' ? dataAanpassen[row] : dataVerwijderen[row]}/>
                                </div>

                            )
                            
                        )}
                    </div> 
                }





                    {/*--------------- Input field and send button ----------------*/}
                    {convoEnded === undefined || convoEnded === false ?
                    <form onSubmit={(e) => { e.preventDefault() }} className="flex flex-row items-center px-4 pb-4 mt-auto">
                        <input disabled={option === ''}
                            type={option === 'Toevoegen' ? Toevoegenscript[arrayNumber]?.type : option === 'Aanpassen' ? '' : option === 'Verwijderen' && ''}
                            value={value}
                            onChange={handleChange}
                            className="flex-grow p-2 border border-gray-300 rounded-md"
                            placeholder="Type hier..."
                        />

                        <button
                            onClick={(e) => handleSubmit(e)} className="ml-2">
                            <SVGSendArrow />
                        </button>
                    </form>:

<button onClick={() => {regenerate()}} className="flex flex-row items-center justify-center font-bold bg-slate-500 rounded-xl px-4 m-3 p-4 mt-auto">
                        regenerate
</button>

                    
                }
                </div>
            ) :
                (
                    <div className="cursor-pointer mx-[45%] my-[23%]" onClick={() => setIsChatOpen(true)}>
                        <Image src={chatbotIcon} alt="Open Chat" />
                    </div>
                )}
        </>
    );
};

export default AIChatBoxV2;

const CheckMarkSVG = () =>{
    return(
        <svg  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1C6.61553 1 5.26216 1.41054 4.11101 2.17971C2.95987 2.94888 2.06266 4.04213 1.53285 5.32122C1.00303 6.6003 0.86441 8.00777 1.13451 9.36563C1.4046 10.7235 2.07129 11.9708 3.05026 12.9497C4.02922 13.9287 5.2765 14.5954 6.63437 14.8655C7.99224 15.1356 9.3997 14.997 10.6788 14.4672C11.9579 13.9373 13.0511 13.0401 13.8203 11.889C14.5895 10.7378 15 9.38447 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1ZM7 10.795L4.5 8.295L5.295 7.5L7 9.205L10.705 5.5L11.503 6.293L7 10.795Z" fill="black"/>
</svg>

    )
}


// if (step === 1) {
//     if (value.toLowerCase().includes('aanpassen')) {
//         setConversation((prev) => [
//             ...prev,
//             { from: 'bot', message: 'Welke gegevens wilt u aanpassen?' },
//         ]); `-*-
// `
//         setData((prev) => ({ ...prev, gegevens: 'aanpassen' }));
//         setStep(2);
//     } else if (value.toLowerCase().includes('opzoeken')) {
//         setConversation((prev) => [
//             ...prev,
//             { from: 'bot', message: 'Welke gegevens wilt u opzoeken? Voer het ID in.' },
//         ]);
//         setData((prev) => ({ ...prev, gegevens: 'opzoeken' }));
//         setStep(2);
//     } else if (value.toLowerCase().includes('verwijderen')) {
//         setConversation((prev) => [
//             ...prev,
//             { from: 'bot', message: 'Welke gegevens wilt u verwijderen? Voer het ID in.' },
//         ]);
//         setData((prev) => ({ ...prev, gegevens: 'verwijderen' }));
//         setStep(2);
//     } else {
//         setConversation((prev) => [
//             ...prev,
//             { from: 'bot', message: 'Sorry, ik begrijp dat niet. Probeer iets anders.' },
//         ]);
//     }
// } else if (step === 2) {
//     // Handle "aanpassen" case
//     if (data.gegevens === 'aanpassen') {
//         setData((prev) => ({ ...prev, field: value }));
//         setConversation((prev) => [
//             ...prev,
//             { from: 'bot', message: 'Wat is het ID nummer van deze persoon?' },
//         ]);
//         setStep(3);
//     }

//     // Handle "opzoeken" case
//     else if (data.gegevens === 'opzoeken') {
//         const searchResult = value === data.mockPersonData.personeelnr || value === data.mockPersonData.voornaam ? data.mockPersonData : null;

//         if (searchResult) {
//             setConversation((prev) => [
//                 ...prev,
//                 {
//                     from: 'bot',
//                     message: `Gevonden gegevens:\n\n
//       \n\nVoornaam: ${searchResult.voornaam}
//       \n\nAchternaam: ${searchResult.achternaam}
//       \n\nPersoneelnummer: ${searchResult.personeelnr}
//       \n\nDatum uit dienst: ${searchResult.datumUitDienst}
//       \n\nParttime/fulltime: ${searchResult.werktijd}
//       \n\nUren: ${searchResult.uren}`,
//                 },
//             ]);
//         } else {
//             setConversation((prev) => [
//                 ...prev,
//                 { from: 'bot', message: 'Geen gegevens gevonden met die ID of naam.' },
//             ]);
//         }
//         setStep(1); // Reset conversation
//     }

//     // Handle "verwijderen" case
//     else if (data.gegevens === 'verwijderen') {
//         if (value === data.mockPersonData.personeelnr) {
//             setConversation((prev) => [
//                 ...prev,
//                 {
//                     from: 'bot',
//                     message: `Weet u zeker dat u deze gegevens wilt verwijderen?\n\nVoornaam: ${data.mockPersonData.voornaam}\nAchternaam: ${data.mockPersonData.achternaam}`,
//                 },
//             ]);
//             setStep(3); // Ask for confirmation
//         } else {
//             setConversation((prev) => [
//                 ...prev,
//                 { from: 'bot', message: 'Geen gegevens gevonden met dat ID nummer.' },
//             ]);
//             setStep(1);
//         }
//     }
// } else if (step === 3) {
//     // Handle confirmation for "aanpassen"
//     if (data.gegevens === 'aanpassen') {
//         setData((prev) => ({ ...prev, idNumber: value }));
//         setConversation((prev) => [
//             ...prev,
//             {
//                 from: 'bot',
//                 message: `Hieronder zie je de gegevens van persoon met ID nummer ${value}. Wat wilt u aanpassen?\n\n
//     Voornaam: ${data.mockPersonData.voornaam}\nAchternaam: ${data.mockPersonData.achternaam}\n\nPersoneelnummer: ${data.mockPersonData.personeelnr}\n\nDatum uit dienst: ${data.mockPersonData.datumUitDienst}\n\nParttime/fulltime: ${data.mockPersonData.werktijd}\n\nUren: ${data.mockPersonData.uren}`,
//             },
//         ]);
//         setStep(4);
//     }

//     // Handle confirmation for "verwijderen"
//     else if (data.gegevens === 'verwijderen') {
//         if (value.toLowerCase().includes('ja')) {
//             setConversation((prev) => [
//                 ...prev,
//                 { from: 'bot', message: 'Gegevens succesvol verwijderd.' },
//             ]);
//             setData((prev) => ({
//                 ...prev,
//                 mockPersonData: null, // Remove the data
//             }));
//         } else {
//             setConversation((prev) => [
//                 ...prev,
//                 { from: 'bot', message: 'Gegevens niet verwijderd.' },
//             ]);
//         }
//         setStep(1); // Reset after deletion
//     }
// }

