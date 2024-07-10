import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
}

const DestinationAndDateStep = (props: DestinationAndDateStepProps) => {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-5">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400"></MapPin>
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
          disabled={props.isGuestsInputOpen}
        />
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400"></Calendar>
        <input
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
          type="text"
          placeholder="Quando?"
          disabled={props.isGuestsInputOpen}
        />
      </div>

      <div className="w-px h-6 bg-zinc-800"></div>

      {props.isGuestsInputOpen ? (
        <button
          className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
          onClick={props.closeGuestsInput}
        >
          Alterar local/data
          <Settings2 className="size-5"></Settings2>
        </button>
      ) : (
        <button
          className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          onClick={props.openGuestsInput}
        >
          Continuar
          <ArrowRight className="size-5"></ArrowRight>
        </button>
      )}
    </div>
  );
};

export default DestinationAndDateStep;
