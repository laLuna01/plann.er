import { X, User2, CheckCircle2, CircleDashed } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface EditGuestModalProps {
    closeEditGuestModal: () => void
    participantId: string
}

interface Participant {
    id: string
    name?: string
    email: string
    is_confirmed: boolean
}

const EditGuestModal = (props: EditGuestModalProps) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [nameGuest, setNameGuest] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const [participant, setParticipant] = useState<Participant | undefined>();

    useEffect(() => {
        api.get(`/participants/${props.participantId}`).then(response => setParticipant(response.data.participant));
    }, [props.participantId]);

    useEffect(() => {
        setNameGuest(participant?.name || "");
    }, [participant]);

    async function updateGuest(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const name = data.get('name');

        let is_confirmed;

        if (participant?.is_confirmed) {
            is_confirmed = true;
        } else {
            is_confirmed = data.get('isConfirmed');
        }

        if (is_confirmed === "true") {
            is_confirmed = true;
        }

        if (is_confirmed === "false") {
            is_confirmed = false;
        }

        console.log(is_confirmed)

        await api.put(`/participants/${props.participantId}`, {
            name,
            is_confirmed,
        })

        window.document.location.reload();
    }
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Editar convidado</h2>
                <button type="button" onClick={props.closeEditGuestModal}><X className="size-5 text-zinc-400"></X></button>
                </div>
            </div>

            <form onSubmit={updateGuest} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <User2 className="size-5 text-zinc-400"></User2>
                    <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" name="name" placeholder={participant?.name == null ? "Nome ou apelido" : undefined} value={nameGuest} onChange={(e) => setNameGuest(e.target.value)}/>
                </div>
                {participant?.is_confirmed? (
                    null
                ) : (
                    <div className="flex justify-between h-10 px-4 items-center">
                        <div className="flex gap-2">
                            {selectedValue === 'true' ? (
                                <CheckCircle2 className="size-6 text-lime-300 shrink-0"></CheckCircle2>
                            ) : (
                                <CircleDashed className="size-6 text-zinc-400 shrink-0"></CircleDashed>
                            )}
                            <span>Confirmar presença?</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="radio flex gap-2">
                                <input type="radio" name="isConfirmed" value="true" checked={selectedValue === 'true'}
                                onChange={handleChange}/>
                                <label>Sim</label>
                            </div>
                            <div className="radio flex gap-2">
                                <input type="radio" name="isConfirmed" value="false" checked={selectedValue === 'false'}
                                onChange={handleChange} />
                                <label>Não</label>
                            </div>
                        </div>
                    </div>
                )}
                <Button variant="primary" size="full" type="submit">Salvar</Button>
            </form>
        </div>
    </div>
    )
};

export default EditGuestModal;
