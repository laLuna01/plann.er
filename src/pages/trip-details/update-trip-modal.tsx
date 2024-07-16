import { X, Calendar, MapPin } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { DateRange, DayPicker } from "react-day-picker";
import { default as defaultStyles } from "react-day-picker/dist/style.module.css";
import { format } from "date-fns";

interface UpdateTripModalProps {
    closeUpdateTripModal: () => void
    eventStartAndEndDates: DateRange | undefined
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

const UpdateTripModal = (props: UpdateTripModalProps) => {
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
    
    const { tripId } = useParams();
    
    async function updateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const destination = data.get('destination');

        if (!destination) {
            return
          }
        
          if (!props.eventStartAndEndDates?.from || !props.eventStartAndEndDates?.to) {
            return
          }

        await api.put(`/trips/${tripId}`, {
            destination,
            starts_at: props.eventStartAndEndDates.from,
            ends_at: props.eventStartAndEndDates.to,
        })

        window.document.location.reload();
    }
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Alterar local e data</h2>
                <button type="button" onClick={props.closeUpdateTripModal}><X className="size-5 text-zinc-400"></X></button>
                </div>
            </div>

            <form onSubmit={updateTrip} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <MapPin className="size-5 text-zinc-400"></MapPin>
                    <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" name="destination" placeholder="Para onde você vai?" />
                </div>
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 cursor-pointer" onClick={openDatePicker}>
                    <Calendar className="size-5 text-zinc-400"></Calendar>
                    <span className="text-lg text-zinc-400">{displayedDate}</span>
                </div>
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
                <Button variant="primary" size="full" type="submit">Atualizar viagem</Button>
            </form>
        </div>
    </div>
    )
};

export default UpdateTripModal;
