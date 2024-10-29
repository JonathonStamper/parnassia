import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Navlink({children, linkName, link}) {
  const router = useRouter()

  // console.log(router.asPath)
    // const [isHovered, setIsHovered] = useState()

  return (
  
          <Link href={`/${link}`} className={`flex w-full gap-10 items-center text-x p-3 rounded-xl px-5 ${router.asPath === `/${link}` ? 'bg-[#3766C3]' : ''}`}>
                <div  className='w-12'>{children}</div>
                {linkName}
        </Link>  

  )
}
