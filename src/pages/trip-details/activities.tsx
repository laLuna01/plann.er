import { Activity, CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
interface Activity {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

const Activities = () => {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
        
    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities));
    }, [tripId]);

  return (
    <div className="space-y-8">
        {activities.map(activity => {
            return (
                <div key={activity.date} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">{format(activity.date, 'd')}</span>
                    <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE', { locale: ptBR })}</span>
                </div>
                    {activity.activities.length > 0 ? (
                        activity.activities.map(activityItem => {
                            return (
                                <div key={activityItem.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                    <CircleCheck className="size-5 text-lime-300"></CircleCheck>
                                    <span className="text-zinc-100">{activityItem.title}</span>
                                    <span className="text-zinc-400 text-sm ml-auto">{format(activityItem.occurs_at, 'HH:mm')}</span>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                    )}
                </div>
            )
        })}

    </div>
  )
};

export default Activities;
