import { useState} from "react";
import { useGetEventsForHomeQuery } from "../../store/services/eventApi";
import EventCard from "../cards/EventCard";

function EventHome({city,selectMonth,selectCategory}){
    const { data,isLoading,isSuccess,isError} = useGetEventsForHomeQuery({page: 1,page_size: 1000});

    const events = data?.payload?.items || [];

    const filteredCity = events.filter((event) => event.city == city);

    const filteredCategory = filteredCity.filter((event)=> {
        if (selectCategory == "Усі типи") {
            return true;
        }
        return event.category?.name == selectCategory;
    })

    const filteredEvents = filteredCategory.filter((event) => {
        if(selectMonth == null) return true;

        const eventDate = new Date(event.date); 
        const month = eventDate.getMonth(); 
        const months = { "Січень": 0, "Лютий": 1, "Березень": 2, 
            "Квітень": 3, "Травень": 4, "Червень": 5, "Липень": 6, 
            "Серпень": 7, "Вересень": 8, "Жовтень": 9, "Листопад": 10, "Грудень": 11 
        }; 
        return month == months[selectMonth];
    })
    if (filteredEvents.length === 0) {
        return <h2 style={{textAlign:"center"}}>Подій не знайдено</h2>
    }

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