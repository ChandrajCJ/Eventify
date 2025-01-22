'use client'
import React, { useEffect, useState } from 'react'
import { EventCard } from './EventCard'
import { getEventFeaturesRes } from '@/helper';
import { getEntryByUID } from '@/contentstack-sdk';

const FeaturedEvents = () => {
    interface EventsData {
        uid: string;
        title: string;
        url: string;
        description: string;
        date_and_time: {
            start_date: Date;
            end_date: Date;
        };
        ispaid: boolean;
        price: number;
        banner: {
            uid: string;
            filename: string;
            url: string;
        };
    }

    const [list, setList] = useState<EventsData[]>([]);

    interface FeatureEvent {
        title: string;
        event_reference: EventsData[];
    };

    const [data, setData] = useState<FeatureEvent>({
        title: "",
        event_reference: []
    });

    async function getEventInfo() {
        try {
            const res = await getEventFeaturesRes();
            const events = await Promise.all(
                res.event_reference.map(async (event: EventsData) => {
                    return await getEntryByUID({
                        uid: event.uid,
                        contentTypeUid: 'event'
                    });
                })
            );

            setList(events); // Update the list without duplicates
            setData(res);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getEventInfo();
    }, []);

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8" id='events'>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">{data.title}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {list.map((event, index) => (
                        <EventCard
                            imageUrl={event.banner.url}
                            isPaid={event.ispaid}
                            price={event.price}
                            startDate={event.date_and_time.start_date}
                            endDate={event.date_and_time.end_date}
                            title={event.title}
                            url={event.url}
                            key={event.uid} // Use a unique key (uid)
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedEvents;
