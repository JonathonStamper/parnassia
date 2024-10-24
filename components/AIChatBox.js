import bot from '../public/images/botIcon.png'
import chattingbot from '../public/images/chattingbot.png'
import Image from 'next/image'
import SVGSendArrow from '../icons/SendArrow'
import { useState } from 'react';
import SVGCloseX from '../icons/CloseX';
import chatbotIcon from '../public/images/chatbotIcon.png';

const AIChatBox = () => {
  const [conversation, setConversation] = useState([
    { from: 'bot', message: 'Hallo! Ik ben Bob, uw digitale hulp voor het rekenmodel. Hoe kan ik u helpen?' },
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
      personeelnr: '19076882',
      datumUitDienst: '15-05-2022',
      werktijd: 'fulltime',
      uren: '40',
    },
  });

  const handleSubmit = () => {
    if (!value.trim()) return;

    setConversation((prev) => [...prev, { from: 'user', message: value }]);

    if (step === 1) {
      if (value.toLowerCase().includes('gegevens aanpassen')) {
        setConversation((prev) => [
          ...prev,
          { from: 'bot', message: 'Welke gegevens wilt u aanpassen?' },
        ]);
        setData((prev) => ({ ...prev, gegevens: 'aanpassen' }));
        setStep(2);
      } else if (value.toLowerCase().includes('gegevens opzoeken')) {
        setConversation((prev) => [
          ...prev,
          { from: 'bot', message: 'Welke gegevens wilt u opzoeken? Voer het ID of naam in.' },
        ]);
        setData((prev) => ({ ...prev, gegevens: 'opzoeken' }));
        setStep(2);
      } else if (value.toLowerCase().includes('gegevens verwijderen')) {
        setConversation((prev) => [
          ...prev,
          { from: 'bot', message: 'Welke gegevens wilt u verwijderen? Voer het ID in.' },
        ]);
        setData((prev) => ({ ...prev, gegevens: 'verwijderen' }));
        setStep(2);
      } else {
        setConversation((prev) => [
          ...prev,
          { from: 'bot', message: 'Sorry, ik begrijp dat niet. Probeer iets anders.' },
        ]);
      }
    } else if (step === 2) {
      // Handle "aanpassen" case
      if (data.gegevens === 'aanpassen') {
        setData((prev) => ({ ...prev, field: value }));
        setConversation((prev) => [
          ...prev,
          { from: 'bot', message: 'Wat is het ID nummer van deze persoon?' },
        ]);
        setStep(3);
      }

      // Handle "opzoeken" case
      else if (data.gegevens === 'opzoeken') {
        const searchResult = value === data.mockPersonData.personeelnr || value === data.mockPersonData.voornaam ? data.mockPersonData : null;

        if (searchResult) {
          setConversation((prev) => [
            ...prev,
            {
              from: 'bot',
              message: `Gevonden gegevens:\n\n
              \n\nVoornaam: ${searchResult.voornaam}
              \n\nAchternaam: ${searchResult.achternaam}
              \n\nPersoneelnummer: ${searchResult.personeelnr}
              \n\nDatum uit dienst: ${searchResult.datumUitDienst}
              \n\nParttime/fulltime: ${searchResult.werktijd}
              \n\nUren: ${searchResult.uren}`,
            },
          ]);
        } else {
          setConversation((prev) => [
            ...prev,
            { from: 'bot', message: 'Geen gegevens gevonden met die ID of naam.' },
          ]);
        }
        setStep(1); // Reset conversation
      }

      // Handle "verwijderen" case
      else if (data.gegevens === 'verwijderen') {
        if (value === data.mockPersonData.personeelnr) {
          setConversation((prev) => [
            ...prev,
            {
              from: 'bot',
              message: `Weet u zeker dat u deze gegevens wilt verwijderen?\n\nVoornaam: ${data.mockPersonData.voornaam}\nAchternaam: ${data.mockPersonData.achternaam}`,
            },
          ]);
          setStep(3); // Ask for confirmation
        } else {
          setConversation((prev) => [
            ...prev,
            { from: 'bot', message: 'Geen gegevens gevonden met dat ID nummer.' },
          ]);
          setStep(1);
        }
      }
    } else if (step === 3) {
      // Handle confirmation for "aanpassen"
      if (data.gegevens === 'aanpassen') {
        setData((prev) => ({ ...prev, idNumber: value }));
        setConversation((prev) => [
          ...prev,
          {
            from: 'bot',
            message: `Hieronder zie je de gegevens van persoon met ID nummer ${value}. Wat wilt u aanpassen?\n
            Voornaam: ${data.mockPersonData.voornaam}\nAchternaam: ${data.mockPersonData.achternaam}\nPersoneelnummer: ${data.mockPersonData.personeelnr}\nDatum uit dienst: ${data.mockPersonData.datumUitDienst}\nParttime/fulltime: ${data.mockPersonData.werktijd}\nUren: ${data.mockPersonData.uren}`,
          },
        ]);
        setStep(4); // Proceed to editing
      }

      // Handle confirmation for "verwijderen"
      else if (data.gegevens === 'verwijderen') {
        if (value.toLowerCase().includes('ja')) {
          setConversation((prev) => [
            ...prev,
            { from: 'bot', message: 'Gegevens succesvol verwijderd.' },
          ]);
          setData((prev) => ({
            ...prev,
            mockPersonData: null, // Remove the data
          }));
        } else {
          setConversation((prev) => [
            ...prev,
            { from: 'bot', message: 'Gegevens niet verwijderd.' },
          ]);
        }
        setStep(1); // Reset after deletion
      }
    }

    setValue('');
  };

  const handleChange = (e) => setValue(e.target.value);
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <>
    {isChatOpen ? (
    <div className="mx-20 mt-20 w-[478px] h-[523px] border-2 border-[#DEDEDE] rounded-xl flex flex-col text-black">
      <div className="flex flex-row mx-5 border-b-2 py-4">
        <h3 className="mr-2.5">Bob the bot</h3>
        <Image src={bot} alt="Bot" width={30} height={30} />
        <div className='ml-64' onClick={()=>setIsChatOpen(false)}><SVGCloseX/></div>
      </div>

      {/*-------------- Chat history ---------------*/}
      <div className="mt-7 mx-10 flex-grow overflow-y-auto">
        {conversation.map((chat, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-md w-full ${
              chat.from === 'bot' ? 'bg-gray-100' : 'bg-blue-100 text-right'
            }`}
          >
            {chat.from === 'bot' ? 'Chatbot' : 'You'}: {chat.message}
          </div>
        ))}
      </div>

      {/*--------------- Input field and send button ----------------*/}
      <div className="flex flex-row items-center px-4 pb-4 mt-auto">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="flex-grow p-2 border border-gray-300 rounded-md"
          placeholder="Type hier..."
        />
        <button onClick={handleSubmit} className="ml-2">
          <SVGSendArrow />
        </button>
      </div>
    </div>
    ) :
    (
      <div className="cursor-pointer" onClick={()=>setIsChatOpen(true)}>
        <Image src={chatbotIcon} alt="Open Chat" />
      </div>
    )}
    </>
  );
};

export default AIChatBox;

