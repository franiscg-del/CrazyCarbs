import React, { useState, useEffect, useCallback } from 'react';
import DayTabs from './components/DayTabs';
import DayView from './components/DayView';
import { getInitialWeeklyLog, DAYS_OF_WEEK } from './constants';
import type { WeeklyLog, MealType } from './types';

const App: React.FC = () => {
  const [weeklyLog, setWeeklyLog] = useState<WeeklyLog>(() => {
    try {
      const savedLog = localStorage.getItem('weeklyFoodLog');
      const parsedLog = savedLog ? JSON.parse(savedLog) : null;
      
      if (parsedLog && Array.isArray(parsedLog) && parsedLog.length === 7) {
        // Data migration for users who used the app before the week start day change.
        if (parsedLog[0]?.dayName === 'Sunday') {
          const reorderedLog = [...parsedLog];
          const sundayData = reorderedLog.shift();
          if (sundayData) {
            reorderedLog.push(sundayData);
          }
          return reorderedLog;
        }
        return parsedLog;
      }
      
      return getInitialWeeklyLog();
    } catch (error) {
      console.error("Could not parse weekly log from localStorage", error);
      return getInitialWeeklyLog();
    }
  });

  // Adjust for Monday start: (Sun=0, Mon=1,..) => (Mon=0, Tue=1,.., Sun=6)
  const [activeDayIndex, setActiveDayIndex] = useState<number>((new Date().getDay() + 6) % 7);

  useEffect(() => {
    try {
      localStorage.setItem('weeklyFoodLog', JSON.stringify(weeklyLog));
    } catch (error) {
      console.error("Could not save weekly log to localStorage", error);
    }
  }, [weeklyLog]);

  const handleAddFood = useCallback((dayIndex: number, mealType: MealType, food: Omit<import('./types').FoodItem, 'id'>) => {
    setWeeklyLog(prevLog => {
      const newLog = [...prevLog];
      const newFoodItem = { ...food, id: new Date().toISOString() + Math.random() };
      newLog[dayIndex].meals[mealType].items.push(newFoodItem);
      return newLog;
    });
  }, []);

  const handleDeleteFood = useCallback((dayIndex: number, mealType: MealType, foodId: string) => {
    setWeeklyLog(prevLog => {
      const newLog = [...prevLog];
      const items = newLog[dayIndex].meals[mealType].items;
      newLog[dayIndex].meals[mealType].items = items.filter(item => item.id !== foodId);
      return newLog;
    });
  }, []);
  
  const handleResetWeek = useCallback(() => {
    if(window.confirm("Are you sure you want to clear all data for the week? This cannot be undone.")) {
      setWeeklyLog(getInitialWeeklyLog());
    }
  }, []);

  const activeDayData = weeklyLog[activeDayIndex];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:flex md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-700">
            Weekly Food Log
          </h1>
           <button 
            onClick={handleResetWeek}
            className="mt-2 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
          >
            Reset Week
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <DayTabs 
          days={DAYS_OF_WEEK} 
          activeDayIndex={activeDayIndex} 
          onSelectDay={setActiveDayIndex}
        />
        {activeDayData && (
          <DayView 
            dayData={activeDayData}
            onAddFood={(mealType, food) => handleAddFood(activeDayIndex, mealType, food)}
            onDeleteFood={(mealType, foodId) => handleDeleteFood(activeDayIndex, mealType, foodId)}
          />
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
