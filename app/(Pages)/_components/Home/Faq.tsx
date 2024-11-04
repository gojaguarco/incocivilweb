"use client"
import { useState } from "react"

type TProps = {
  faq: {
    _id: string;
    _type: "faq";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    question: string;
    answer: string;
  }
}

const Faq = ({ faq}: TProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }

  return (
        <article className="bg-light-dark rounded-xl w-full px-4 py-2 el-shadow">
          <div className="flex justify-between items-center group cursor-pointer" onClick={()=> toggleOpen()} >
            <h4 className="group-hover:underline">{faq.question}</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`stroke-gray-600 transition-all duration-300 ${isOpen && 'rotate-180'}`}>
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 10l6 6l6 -6h-12" />
            </svg>
          </div>
          <div className={`${isOpen ? 'max-h-48 min-h-2 py-2' : 'max-h-0 min-h-0 py-0'} transition-all overflow-hidden duration-300`}>
            <p className={`${isOpen ? 'visible' : 'hidden'}`}>{faq.answer}</p>
          </div>
        </article>
  )
}

export default Faq