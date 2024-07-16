import { X, Plus, Pencil, CheckCircle2, CircleDashed } from "lucide-react";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface UpdateGuestsModalProps {
    closeUpdateGuestsModal: () => void
    openNewInvitesModal: () => void
    openEditGuestModal: () => void
    setParticipantId: React.Dispatch<React.SetStateAction<string>>
}

interface Participant {
    id: string
    name?: string
    email: string
    is_confirmed: boolean
}

const UpdateGuestsModal = (props: UpdateGuestsModalProps) => {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<Participant[]>([]);
        
    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));
    }, [tripId]);
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[440px] max-h-[450px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Gerenciar convidados</h2>
                    <button type="button" onClick={props.closeUpdateGuestsModal}><X className="size-5 text-zinc-400"></X></button>
                    </div>
                </div>

                <div className="space-y-5 max-h-72 overflow-y-auto custom-scroll">
                {participants.map((participant, index) => {
                    return (
                    <div key={participant.id} className="flex items-center justify-between gap-4 px-2">
                        <div className="flex items-center gap-5">
                            {participant.is_confirmed? (
                                <CheckCircle2 className="size-5 text-lime-300 shrink-0"></CheckCircle2>
                            ) : (
                                <CircleDashed className="size-5 text-zinc-400 shrink-0"></CircleDashed>
                            )}
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{participant.name === "" || participant.name === null || participant.name === undefined ? `Convidado ${index}` : participant.name}</span>
                                <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
                            </div>
                        </div>
                        <Pencil className="size-5 text-zinc-400 shrink-0 hover:text-lime-300 cursor-pointer" onClick={() => {props.openEditGuestModal(); props.setParticipantId(participant.id);}}></Pencil>
                    </div>
                    )
                })}
                </div>

                <Button variant="primary" size="full" onClick={props.openNewInvitesModal}>Novos convites<Plus className="size-5"></Plus></Button>
            </div>
        </div>
    )
};

export default UpdateGuestsModal;
