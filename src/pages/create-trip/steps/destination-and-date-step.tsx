import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import Button from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { default as defaultStyles } from "react-day-picker/dist/style.module.css";
import { format } from "date-fns";
import "../../../index.css"

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    eventStartAndEndDates: DateRange | undefined
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

const DestinationAndDateStep = (props: DestinationAndDateStepProps) => {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  let displayedDate; 
  if (props.eventStartAndEndDates && props.eventStartAndEndDates.from && props.eventStartAndEndDates.to) {
    if (props.eventStartAndEndDates.from.getMonth() === props.eventStartAndEndDates.to.getMonth()) {
      displayedDate = format(props.eventStartAndEndDates.from, 'd').concat(' até ').concat(format(props.eventStartAndEndDates.to, "d ' de ' LLL"))
    } else {
      displayedDate = format(props.eventStartAndEndDates.from, "d ' de ' LLL").concat(' até ').concat(format(props.eventStartAndEndDates.to, "d ' de ' LLL"))
    }
  } else { 
    displayedDate = "Quando?"
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-5">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400"></MapPin>
        <input
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
          disabled={props.isGuestsInputOpen}
          onChange={event => props.setDestination(event.target.value)}
        />
      </div>

      <button className="flex items-center gap-2 text-left min-w-40" disabled={props.isGuestsInputOpen} onClick={openDatePicker}>
        <Calendar className="size-5 text-zinc-400"></Calendar>
        <span className="text-lg text-zinc-400 flex-1">{displayedDate}</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker}><X className="size-5 text-zinc-400"></X></button>
              </div>
            </div>
            <DayPicker mode="range" classNames={defaultStyles} selected={props.eventStartAndEndDates} onSelect={props.setEventStartAndEndDates} />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800"></div>

      {props.isGuestsInputOpen ? (
        <Button variant="secondary" onClick={props.closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5"></Settings2>
        </Button>
      ) : (
        <Button variant="primary" onClick={props.openGuestsInput}>
          Continuar
          <ArrowRight className="size-5"></ArrowRight>
        </Button>
      )}
    </div>
  );
};

export default DestinationAndDateStep;
