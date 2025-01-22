'use client'

import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getEvent } from '@/helper';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { format } from "date-fns";

const page = () => {

    interface EventsData {
        uid: string;
        title: string;
        url: string;
        description: string;
        date_and_time: {
            start_date: Date;
            end_date: Date;
        };
        location : {
            venue_name: string;
            address: string;
        }
        tickets_available: number;
        ispaid: boolean;
        price: number;
        banner: {
            uid: string;
            filename: string;
            url: string;
        };
    }

    const entryUrl= usePathname();
    const [data, setData] = React.useState({
        date_and_time: {
            start_date: new Date(),
            end_date: new Date()
        }
    } as EventsData);

    async function getEventInfo({entryUrl}: {entryUrl: string}) {
        await getEvent(entryUrl).then(res => {
            console.log(res);
            setData(res);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getEventInfo({entryUrl});
    }, []);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]  ">
    {/* Banner Image */}
    <div className="h-[40vh] mb-8 md:h-full md:w-1/2 relative overflow-hidden">
      <img
        src={data?.banner?.url}
        alt={data?.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    {/* Event Details */}
    <div className="flex-1 md:w-1/2 p-6 md:p-12 lg:p-16 overflow-y-auto ">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {data.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-8 text-justify">
          {data.description}
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 mt-1 text-primary" />
            <div>
              <p className="text-xl font-semibold">{data.location?.venue_name}</p>
              <p className="text-muted-foreground">
                {data.location?.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-primary" />
            <div>
              <p className="text-xl font-medium">
              {format(data.date_and_time.start_date, 'MMM d, yyyy')} - {format(data.date_and_time.end_date, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-6 h-6 text-primary" />
            <div>
              <p className="text-xl font-medium">
              {format(data.date_and_time.start_date, 'hh:mm')} - {format(data.date_and_time.end_date, 'hh:mm')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Ticket className="w-6 h-6 text-primary" />
            <div>
              <p className="text-xl font-medium">
                {data.ispaid ? `Rs ${data.price}` : "Free"}
              </p>
              <p className="text-muted-foreground">
                {data.tickets_available} tickets available
              </p>
            </div>
          </div>
        </div>

        <button className="mt-12 w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md text-lg font-semibold transition-colors">
          Get Tickets
        </button>
      </div>
    </div>
  </div>
  )
}

export default page