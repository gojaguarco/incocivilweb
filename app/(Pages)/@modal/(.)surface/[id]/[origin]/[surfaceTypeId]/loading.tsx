import Modal from "@/app/(Pages)/_components/Modal";
import Spinner from "@/app/(Pages)/_components/Spinner";

export default function Loading(){
  return(
    <Modal>
      <div className="p-20 rounded-xl bg-light flex flex-col items-center justify-center">
        <Spinner />
        <h1 className="">Cargando...</h1>
      </div>
    </Modal>
  )
}