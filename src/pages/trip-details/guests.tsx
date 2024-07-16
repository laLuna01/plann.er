import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
interface Participant {
  id: string
  name?: string
  email: string
  is_confirmed: boolean
}

interface GuestsProps {
  openUpdateGuestsModal: () => void
}

const Guests = (props: GuestsProps) => {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
    
  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));
  }, [tripId]);
  
  return (
    <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>
        <div className="space-y-5">
          {participants.map((participant, index) => {
            return (
              <div key={participant.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">{participant.name === "" || participant.name === null || participant.name === undefined ? `Convidado ${index}` : participant.name}</span>
                    <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
                </div>
                {participant.is_confirmed? (
                  <CheckCircle2 className="size-5 text-lime-300 shrink-0"></CheckCircle2>
                ) : (
                  <CircleDashed className="size-5 text-zinc-400 shrink-0"></CircleDashed>
                )}
              </div>
            )
          })}
        </div>
        <Button variant="secondary" size="full" onClick={props.openUpdateGuestsModal}><UserCog className="size-5"></UserCog>Gerenciar convidados</Button>
    </div>
  )
};

export default Guests;
