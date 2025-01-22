"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { usePathname } from "next/navigation";

interface EventFormData {
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  venueName: string;
  address: string;
  ticketsAvailable: number;
  isPaid: boolean;
  price?: number;
  bannerImage: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateEventPage() {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    venueName: "",
    address: "",
    ticketsAvailable: 100,
    isPaid: false,
    bannerImage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.venueName) {
      newErrors.venueName = "Venue name is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (formData.ticketsAvailable < 1) {
      newErrors.ticketsAvailable = "Must have at least 1 ticket available";
    }

    if (formData.isPaid && (!formData.price || formData.price <= 0)) {
      newErrors.price = "Price is required for paid events";
    }

    if (formData.endDateTime <= formData.startDateTime) {
      newErrors.endDateTime = "End date must be after start date";
    }

    if (!formData.bannerImage) {
      newErrors.bannerImage = "Banner image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Here you would typically send the data to your backend
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, bannerImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

    const entryUrl= usePathname();
  

  return (
    <div className="min-h-screen bg-transparent from-background to-muted/20 sm:flex sm:items-center sm:justify-center">
      <div className="container max-w-4xl py-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details to create your event</p>
        </div>
        
        <div className="bg-card rounded-xl shadow-lg border p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-1">Banner Image</label>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className="relative h-[200px] rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {errors.bannerImage && (
                  <p className="text-sm text-destructive">{errors.bannerImage}</p>
                )}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Event Title</label>
                <Input
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  placeholder="Tell people about your event..."
                  className="resize-none min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                      )}
                    >
                      {format(formData.startDateTime, "PPP p")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDateTime}
                      onSelect={(date) => date && setFormData(prev => ({ ...prev, startDateTime: date }))}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <Input
                        type="time"
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(":");
                          const newDate = new Date(formData.startDateTime);
                          newDate.setHours(parseInt(hours), parseInt(minutes));
                          setFormData(prev => ({ ...prev, startDateTime: newDate }));
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date & Time</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                      )}
                    >
                      {format(formData.endDateTime, "PPP p")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDateTime}
                      onSelect={(date) => date && setFormData(prev => ({ ...prev, endDateTime: date }))}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <Input
                        type="time"
                        onChange={(e) => {
                          const [hours, minutes] = e.target.value.split(":");
                          const newDate = new Date(formData.endDateTime);
                          newDate.setHours(parseInt(hours), parseInt(minutes));
                          setFormData(prev => ({ ...prev, endDateTime: newDate }));
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                {errors.endDateTime && (
                  <p className="text-sm text-destructive mt-1">{errors.endDateTime}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Venue Name</label>
                <Input
                  placeholder="Enter venue name"
                  value={formData.venueName}
                  onChange={(e) => setFormData(prev => ({ ...prev, venueName: e.target.value }))}
                />
                {errors.venueName && (
                  <p className="text-sm text-destructive mt-1">{errors.venueName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Number of Tickets Available</label>
                <Input
                  type="number"
                  min={1}
                  value={formData.ticketsAvailable}
                  onChange={(e) => setFormData(prev => ({ ...prev, ticketsAvailable: parseInt(e.target.value) }))}
                />
                {errors.ticketsAvailable && (
                  <p className="text-sm text-destructive mt-1">{errors.ticketsAvailable}</p>
                )}
              </div>

              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium">Paid Event</label>
                  <p className="text-sm text-muted-foreground">
                    Toggle if this is a paid event
                  </p>
                </div>
                <Switch
                  checked={formData.isPaid}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPaid: checked }))}
                />
              </div>

              {formData.isPaid && (
                <div>
                  <label className="block text-sm font-medium mb-1">Ticket Price (Rs)</label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive mt-1">{errors.price}</p>
                  )}
                </div>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              Create Event
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}