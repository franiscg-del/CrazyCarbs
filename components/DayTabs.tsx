import React from 'react';

interface DayTabsProps {
  days: string[];
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
}

const DayTabs: React.FC<DayTabsProps> = ({ days, activeDayIndex, onSelectDay }) => {
  return (
    <div className="mb-6">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a day</label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-slate-300 focus:border-pink-500 focus:ring-pink-500"
          value={activeDayIndex}
          onChange={(e) => onSelectDay(parseInt(e.target.value, 10))}
        >
          {days.map((day, index) => (
            <option key={day} value={index}>{day}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => onSelectDay(index)}
                className={`
                  ${index === activeDayIndex
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-t-sm
                `}
              >
                {day}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DayTabs;