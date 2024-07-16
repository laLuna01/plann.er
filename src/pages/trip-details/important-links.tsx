import { Link2, Plus } from "lucide-react";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}
interface Link {
  title: string
  url: string
}

const ImportantLinks = (props: ImportantLinksProps) => {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
      
  useEffect(() => {
      api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links));
  }, [tripId]);
  
  return (
    <div className="space-y-6">
        <h2 className="font-semibold text-xl">Links importantes</h2>
        <div className="space-y-5">
          {links.map(link => {
            return (
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">{link.title}</span>
                    <a href={link.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">{link.url}</a>
                </div>
                <Link2 className="size-5 text-zinc-400 shrink-0"></Link2>
              </div>
            )
          })}
        </div>
        <Button variant="secondary" size="full" onClick={props.openCreateLinkModal}><Plus className="size-5"></Plus>Cadastrar novo link</Button>
    </div>
  )
};

export default ImportantLinks;
