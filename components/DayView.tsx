import React from 'react';
import MealCard from './MealCard';
import { MEAL_TYPES, MAX_DAILY_CALORIES } from '../constants';
import type { DayData, MealType, FoodItem } from '../types';

interface DayViewProps {
  dayData: DayData;
  onAddFood: (mealType: MealType, food: Omit<FoodItem, 'id'>) => void;
  onDeleteFood: (mealType: MealType, foodId: string) => void;
}

const DayView: React.FC<DayViewProps> = ({ dayData, onAddFood, onDeleteFood }) => {
  const totalDailyCalories = MEAL_TYPES.reduce((total, mealType) => {
    return total + dayData.meals[mealType].items.reduce((mealTotal, item) => mealTotal + item.calories, 0);
  }, 0);

  const progressPercentage = (totalDailyCalories / MAX_DAILY_CALORIES) * 100;
  const caloriesOver = totalDailyCalories > MAX_DAILY_CALORIES;

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-6 sticky top-[70px] md:top-[80px] z-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-slate-700">{dayData.dayName}'s Log</h2>
          <div className="text-right">
            <p className="text-sm text-slate-500">Daily Goal</p>
            <p className="text-lg font-bold text-slate-600">{MAX_DAILY_CALORIES.toLocaleString()} kcal</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className={`font-bold text-lg ${caloriesOver ? 'text-red-600' : 'text-pink-600'}`}>
              {totalDailyCalories.toLocaleString()}
            </span>
            <span className="font-medium text-slate-500">
              {caloriesOver 
                ? `${(totalDailyCalories - MAX_DAILY_CALORIES).toLocaleString()} over`
                : `${(MAX_DAILY_CALORIES - totalDailyCalories).toLocaleString()} left`
              }
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full transition-all duration-300 ${caloriesOver ? 'bg-red-500' : 'bg-pink-500'}`}
              style={{ width: `${Math.min(100, progressPercentage)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MEAL_TYPES.map(mealType => (
          <MealCard
            key={mealType}
            mealType={mealType}
            foodItems={dayData.meals[mealType].items}
            onAddFood={(food) => onAddFood(mealType, food)}
            onDeleteFood={(foodId) => onDeleteFood(mealType, foodId)}
          />
        ))}
      </div>
    </div>
  );
};

export default DayView;