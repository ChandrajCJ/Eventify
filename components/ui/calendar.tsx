"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  showOutsideDays?: boolean
  initialFocus?: boolean
}

function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  showOutsideDays = true,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [focusedDate, setFocusedDate] = React.useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getDaysFromPreviousMonth = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date)
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1)
    const daysInPrevMonth = getDaysInMonth(prevMonth)
    const days = []

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i),
        isOutside: true,
      })
    }

    return days
  }

  const getDaysFromNextMonth = (date: Date, totalCells: number) => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1)
    const days = []
    let day = 1

    while (totalCells < 42) {
      days.push({
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day),
        isOutside: true,
      })
      day++
      totalCells++
    }

    return days
  }

  const getDaysInCurrentMonth = (date: Date) => {
    const daysInMonth = getDaysInMonth(date)
    const days = []

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), day),
        isOutside: false,
      })
    }

    return days
  }

  const getAllDays = () => {
    const prevMonthDays = showOutsideDays ? getDaysFromPreviousMonth(currentDate) : []
    const currentMonthDays = getDaysInCurrentMonth(currentDate)
    const totalDays = [...prevMonthDays, ...currentMonthDays]
    const nextMonthDays = showOutsideDays ? getDaysFromNextMonth(currentDate, totalDays.length) : []
    return [...totalDays, ...nextMonthDays]
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    if (Array.isArray(selected)) {
      return selected.some(selectedDate => 
        selectedDate.toDateString() === date.toDateString()
      )
    }
    return selected.toDateString() === date.toDateString()
  }

  const isToday = (date: Date) => {
    return new Date().toDateString() === date.toDateString()
  }

  const handleDateSelect = (date: Date) => {
    onSelect?.(date)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className={cn("p-3", className)}>
      <div className="space-y-4">
        <div className="flex justify-center pt-1 relative items-center">
          <div className="text-sm font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <div className="space-x-1 flex items-center absolute right-1">
            <Button
              variant="outline"
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              onClick={previousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              onClick={nextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full">
            {weekDays.map(day => (
              <div
                key={day}
                className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-2">
            {getAllDays().map(({ date, isOutside }, index) => (
              <div
                key={date.toISOString()}
                className={cn(
                  "h-9 w-9 p-0 relative",
                  isOutside && "text-muted-foreground opacity-50"
                )}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "h-9 w-9 p-0 font-normal",
                    isSelected(date) && 
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isToday(date) && !isSelected(date) && "bg-accent text-accent-foreground",
                    isOutside && "text-muted-foreground"
                  )}
                  onClick={() => handleDateSelect(date)}
                >
                  {date.getDate()}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
export type { CalendarProps }