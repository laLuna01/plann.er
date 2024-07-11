import { UserRoundPlus, ArrowRight } from "lucide-react";
import Button from "../../../components/button";

interface InviteGuestsStepProps {
    emailsToInvite: string[]
    openConfirmTripModal: () => void
    openGuestsModal: () => void
}

const InviteGuestsStep = (props: InviteGuestsStepProps) => {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-5">
      <button className="flex items-center gap-2 flex-1" onClick={props.openGuestsModal}>
        <UserRoundPlus className="size-5 text-zinc-400"></UserRoundPlus>
        {props.emailsToInvite.length > 0 ? (
          <span className="bg-transparent text-lg text-zinc-400 text-left flex-1">{props.emailsToInvite.length} pessoa(s) convidada(s)</span>
        ) : (
          <span className="bg-transparent text-lg text-zinc-400 text-left flex-1">Quem estará na viagem?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800"></div>

      <Button variant="primary" onClick={props.openConfirmTripModal}>Confirmar viagem
        <ArrowRight className="size-5"></ArrowRight>
      </Button>
    </div>
  )
};

export default InviteGuestsStep;
