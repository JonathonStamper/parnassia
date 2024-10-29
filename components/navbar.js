import React from 'react'
import Screens from './Navlink'
import Navlink from './Navlink'
import SVGQuestionmark from '../icons/Questionmark'
import SVGFolder from '@/icons/Folder'
import SVGClock from '@/icons/Clock'
import SVGBot from '@/icons/Chatbot'

export default function Navbar({children}) {

    const linkList = [
        {link: '',
         linkName: 'Home',
         children: <HomeIcon/>
        },

        {link: 'personeel',
            linkName: 'Personeel',
            children: <SVGFolder/>
           },

        {link: 'chatbot',
            linkName: 'Chatbot',
            children: <SVGBot/>
        },
        
        {link: 'recent',
            linkName: 'Recent',
            children: <SVGClock/>
        },

        {link: 'faq',
            linkName: 'Faq',
            children: <SVGQuestionmark/>
        }
    ]

  return (
    <main className='bg-[#0036A0] overflow-hidden h-screen w-screen absolute flex top-0 gap-4 justify-between items-center pl-0 p-6'>
        <nav className=' h-full w-1/6 flex flex-col items-center mr- gap-10 m item '>
        <div className='mr-10'>

        {linkList.map((row, index) => (
            <Navlink key={index} link={row.link} linkName={row.linkName} >
            {row.children}
      </Navlink>
        ))}
        </div>
            

        </nav>

        <section className='relative w-5/6 rounded-xl bg-white h-full overflow-hidden'>
            {children}
        </section>

    </main>
  )
}


const HomeIcon = () =>{
    return (<svg  className='w-[46px'  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_189_1068)">
<path d="M12.512 27.0449V19.8436H18.2155V27.0449C18.2155 27.8371 18.8572 28.4852 19.6414 28.4852H23.919C24.7033 28.4852 25.3449 27.8371 25.3449 27.0449V16.9631H27.7689C28.4248 16.9631 28.7385 16.1422 28.2394 15.7101L16.3191 4.86495C15.7773 4.37526 14.9503 4.37526 14.4084 4.86495L2.48812 15.7101C2.00332 16.1422 2.30275 16.9631 2.95865 16.9631H5.38264V27.0449C5.38264 27.8371 6.02429 28.4852 6.80852 28.4852H11.0861C11.8704 28.4852 12.512 27.8371 12.512 27.0449Z" fill="#FFFCFC"/>
</g>
<defs>
<clipPath id="clip0_189_1068">
<rect width="31.4836" height="31.4836" fill="white"/>
</clipPath>
</defs>
</svg>)

}