import { useState} from "react";
import { useGetEventsForHomeQuery } from "../../store/services/eventApi";
import EventCard from "../cards/EventCard";

function EventHome({city}){
    console.log(city);
    const { data,isLoading,isSuccess,isError} = useGetEventsForHomeQuery({page: 1,page_size: 1000});

    const events = data?.payload?.items || [];

    const filteredEvents = events.filter((event) => event.city === city);

    if (isError) {
        return <h2>Помилка завантаження подій</h2>;
    }
    return (
        <div className="eventHome">
            <div
                className="eventsList"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 220px)",
                    justifyContent: "center",
                    gap: "24px",
                    padding: "24px",
                }}
            >
                {isSuccess && filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        </div>
    )
}
export default EventHome;