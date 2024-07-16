import { Mail, User, X } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (ownerName: string) => void
    setOwnerEmail: (ownerEmail: string) => void
}

const ConfirmTripModal = (props: ConfirmTripModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
            <button type="button" onClick={props.closeConfirmTripModal}><X className="size-5 text-zinc-400"></X></button>
          </div>
          <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
        </div>

        <form className="space-y-3" onSubmit={props.createTrip}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400"></User>
            <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" name="name" placeholder="Seu nome completo" onChange={event => props.setOwnerName(event.target.value)} />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="size-5 text-zinc-400"></Mail>
            <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="email" placeholder="Seu e-mail pessoal" onChange={event => props.setOwnerEmail(event.target.value)} />
          </div>
          <Button variant="primary" size="full" type="submit">Confirmar criação da viagem</Button>
        </form>
      </div>
    </div>
  )
};

export default ConfirmTripModal;
