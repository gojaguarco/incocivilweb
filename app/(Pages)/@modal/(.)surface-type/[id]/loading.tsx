import Modal from "@/app/(Pages)/_components/Modal";
import Spinner from "@/app/(Pages)/_components/Spinner";

export default function Loading(){
  return(
    <Modal>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Spinner />
        <h1 className="text-light">Cargando...</h1>
      </div>
    </Modal>
  )
}