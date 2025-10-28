
import React from 'react';
import type { FoodItem } from '../types';
import TrashIcon from './icons/TrashIcon';

interface FoodEntryProps {
  item: FoodItem;
  onDelete: () => void;
}

const FoodEntry: React.FC<FoodEntryProps> = ({ item, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-200">
      <div>
        <p className="font-semibold text-slate-800">{item.name}</p>
        <p className="text-sm text-slate-500">{item.amount}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-slate-700">{item.calories} kcal</span>
        <button
          onClick={onDelete}
          className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label={`Delete ${item.name}`}
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FoodEntry;
