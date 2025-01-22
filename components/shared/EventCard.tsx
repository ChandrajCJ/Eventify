'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";


interface EventCardProps {
  imageUrl: string;
  isPaid: boolean;
  price: number;
  startDate: Date;
  endDate: Date;
  title: string;
  url:string;
}

export function EventCard({
  imageUrl,
  isPaid,
  price,
  startDate,
  endDate,
  title,
  url,
}: EventCardProps) {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 flex flex-col justify-between
    hover:translate-y-[-12px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.9)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.9)]">
      <div className="relative">
        <div className="aspect-[16/9] relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority
          />
        </div>
        <Badge 
          className={`${isPaid? "bg-gray-200" : "bg-green-400"} absolute top-4 right-4  text-primary hover:bg-white/90 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.2)]`}
          variant="secondary"
        >
           {isPaid ? `Rs ${price}` : "Free"}
        </Badge>
      </div>
      
      <CardHeader>
        <h3 className="text-xl md:text-2xl font-semibold leading-none tracking-tight line-clamp-2">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">
            {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Link 
        href={url} 
        className="w-full"
        >
            <Button className="w-full">
          View Event
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}