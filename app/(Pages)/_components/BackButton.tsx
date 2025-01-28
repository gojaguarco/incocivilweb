"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"


const BackButton = ({ url }: {
  url?: string
}) => {
  const router = useRouter()

  return (
    <button onClick={() => router.back()}
      className="hover:underline underline-offset-1 flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
      <span>Volver</span>
    </button>
    // </Link>
  )
}

export default BackButton