"use client"

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type TProps = {
  currentId: string,
  idArray: string[],
}

const NavigationButtons = ({currentId, idArray}: TProps) => {


  const currentIndex = idArray.indexOf(currentId)

  const nextIndex = () =>{
    if(currentIndex == idArray.length - 1){
      return 0
    } else {
      return currentIndex + 1
    }
  } 

  const previousIndex = () => {
    if(currentIndex == 0){
      return idArray.length - 1
    } else {
      return currentIndex - 1
    }
  }


  return (
    <>
      <Link className="absolute top-1/2 -translate-y-1/2 left-4 bg-light p-2 rounded-full hover:bg-light-dark text-black" href={`/surface/${idArray[previousIndex()]}`}>
      <svg  xmlns="http://www.w3.org/2000/svg"  width={32}  height={32}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="-translate-x-0.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
      </Link>
      <Link className="absolute top-1/2 -translate-y-1/2 right-4 bg-light p-2 rounded-full hover:bg-light-dark" href={`/surface/${idArray[nextIndex()]}`}>
      <svg  xmlns="http://www.w3.org/2000/svg"  width={32}  height={32}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="translate-x-0.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      </Link>
    </>
  )
}

export default NavigationButtons