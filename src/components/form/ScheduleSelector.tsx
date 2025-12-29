'use client';

import { cn } from '@/lib/utils';
import {
  dayLabels,
  DayPeriod,
  periodLabels,
  WeekDay,
} from '@/lib/validations/interestForm';

interface ScheduleSelectorProps {
  value: Array<{ day: string; period: string }>;
  onChange: (value: Array<{ day: string; period: string }>) => void;
  error?: string;
}

const days = Object.values(WeekDay);
const periods = Object.values(DayPeriod);

export function ScheduleSelector({
  value,
  onChange,
  error,
}: ScheduleSelectorProps) {
  const isSelected = (day: string, period: string) => {
    return value.some((item) => item.day === day && item.period === period);
  };

  const toggleSelection = (day: string, period: string) => {
    const exists = isSelected(day, period);

    if (exists) {
      onChange(
        value.filter((item) => !(item.day === day && item.period === period))
      );
    } else {
      onChange([...value, { day, period }]);
    }
  };

  return (
    <div className='w-full'>
      <p className='text-center text-[#fcf8f0] text-base mb-6'>
        Quais dias você teria disponibilidade?
      </p>

      <div className='flex justify-center gap-0 md:gap-2'>
        {days.map((day) => (
          <div
            key={day}
            className='flex flex-col items-center gap-4 w-[60px] md:w-[72px]'
          >
            {/* Day label */}
            <span className='text-white text-sm md:text-base font-normal'>
              {dayLabels[day]}
            </span>

            {/* Period buttons */}
            <div className='flex flex-col gap-4'>
              {periods.map((period) => {
                const selected = isSelected(day, period);

                return (
                  <button
                    key={`${day}-${period}`}
                    type='button'
                    onClick={() => toggleSelection(day, period)}
                    className={cn(
                      'w-[50px] md:w-[55px] h-[41px] rounded-lg text-xs font-normal transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-[#fcf8f0]/50',
                      selected
                        ? 'bg-[#f0fcf3] text-[#3c3b39]'
                        : 'bg-[#3c3b39] text-[#fcf8f0] border-2 border-[#f0fcf3] hover:bg-[#4a4947]'
                    )}
                  >
                    {periodLabels[period]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className='text-red-400 text-sm text-center mt-4'>{error}</p>
      )}
    </div>
  );
}
