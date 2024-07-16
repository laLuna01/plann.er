import { Calendar, MapPin, Settings2 } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

interface DestinationAndDateHeaderProps {
  openUpdateTripModal: () => void
}

const DestinationAndDateHeader = (props: DestinationAndDateHeaderProps) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
    
  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip));
  }, [tripId]);

  const startDate = trip?.starts_at? new Date(trip.starts_at) : null;
  const endDate = trip?.ends_at? new Date(trip.ends_at) : null;

  let displayedDate; 
  if (trip) {
    if (startDate?.getMonth() === endDate?.getMonth()) {
      displayedDate = format(trip?.starts_at, 'd').concat(' até ').concat(format(trip?.ends_at, "d ' de ' LLL"))
    } else {
      displayedDate = format(trip?.starts_at, "d ' de ' LLL").concat(' até ').concat(format(trip?.ends_at, "d ' de ' LLL"))
    }
  }
  
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
            <MapPin className="size-5 text-zinc-400"></MapPin>
            <span className="text-zinc-100">{trip?.destination}</span>
        </div>

        <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400"></Calendar>
            <span className="text-zinc-100">{displayedDate}</span>
            </div>
            <div className="w-px h-6 bg-zinc-800"></div>
            <Button variant="secondary" onClick={props.openUpdateTripModal}>
              Alterar local/data
              <Settings2 className="size-5"></Settings2>
            </Button>
        </div>
    </div>
  )
};

export default DestinationAndDateHeader;
