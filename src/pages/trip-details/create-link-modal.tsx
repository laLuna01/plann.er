import { X, Tag, Link2 } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void
}

const CreateLinkModal = (props: CreateLinkModalProps) => {
    const { tripId } = useParams();
    
    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get('title');
        const url = data.get('url');

        await api.post(`/trips/${tripId}/links`, {
            title,
            url
        })

        window.document.location.reload();
    }
    
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar Link</h2>
                <button type="button" onClick={props.closeCreateLinkModal}><X className="size-5 text-zinc-400"></X></button>
                </div>
                <p className="text-sm text-zinc-400">Todos convidados podem visualizar os links.</p>
            </div>

            <form onSubmit={createLink} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="size-5 text-zinc-400"></Tag>
                <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" name="title" placeholder="Título do link" />
                </div>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Link2 className="size-5 text-zinc-400"></Link2>
                <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" name="url" placeholder="Url do link" />
                </div>
                <Button variant="primary" size="full" type="submit">Salvar link</Button>
            </form>
        </div>
    </div>
  )
};

export default CreateLinkModal;
