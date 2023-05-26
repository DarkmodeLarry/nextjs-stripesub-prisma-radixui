'use client'
import '@/styles/Calendar.css'
import { FC, useState } from 'react'
import ReactCalendar from 'react-calendar'
import { add, format } from 'date-fns'
import { INTERVAL, STORE_CLOSING_TIMES, STORE_OPENING_TIMES } from '@/config/times'

interface CalendarProps {}

interface DateType {
  justDate: Date | null
  dateTime: Date | null
}

const CalendarComponent: FC<CalendarProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null
  })

  console.log(date.dateTime)

  const getTimes = () => {
    if (!date.justDate) return

    const { justDate } = date
    const beginning = add(justDate, { hours: STORE_OPENING_TIMES })
    const end = add(justDate, { hours: STORE_CLOSING_TIMES })
    const interval = INTERVAL // in minutes

    const times = []

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i)
    }

    return times
  }

  const times = getTimes()

  return (
    <div className='flex flex-col items-center justify-center gap-6 my-10 lg:flex-row'>
      <ReactCalendar
        minDate={new Date()}
        className='p-2 REACT-CALENDAR'
        view='month'
        onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
      />
      {date.justDate ? (
        <div className='flex flex-wrap items-center gap-4 p-2 border rounded-lg'>
          {times?.map((time, i) => (
            <div key={`time-${i}`} className='w-24 p-1 text-center bg-gray-400 border-2 rounded-lg'>
              <button
                type='button'
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, 'hh:mm a')}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default CalendarComponent
