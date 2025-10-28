import React, { useState } from 'react';
import FoodEntry from './FoodEntry';
import type { FoodItem, MealType } from '../types';

interface MealCardProps {
  mealType: MealType;
  foodItems: FoodItem[];
  onAddFood: (food: Omit<FoodItem, 'id'>) => void;
  onDeleteFood: (foodId: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ mealType, foodItems, onAddFood, onDeleteFood }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [calories, setCalories] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const totalMealCalories = foodItems.reduce((total, item) => total + item.calories, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calorieValue = parseInt(calories, 10);
    if (name && amount && !isNaN(calorieValue) && calorieValue >= 0) {
      onAddFood({ name, amount, calories: calorieValue });
      setName('');
      setAmount('');
      setCalories('');
      setIsFormVisible(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-700">{mealType}</h3>
        <span className="text-lg font-bold text-pink-600">{totalMealCalories.toLocaleString()} kcal</span>
      </div>
      
      <div className="p-4 space-y-3 flex-grow">
        {foodItems.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No items logged yet.</p>
        ) : (
          foodItems.map(item => (
            <FoodEntry key={item.id} item={item} onDelete={() => onDeleteFood(item.id)} />
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-200">
        {isFormVisible ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Food Name (e.g., Apple)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Amount (e.g., 1 medium)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-1/2 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
              />
              <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-1/2 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                required
                min="0"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setIsFormVisible(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700">Add Item</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setIsFormVisible(true)} className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
            + Add Food
          </button>
        )}
      </div>
    </div>
  );
};

export default MealCard;