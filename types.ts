
export interface FoodItem {
  id: string;
  name: string;
  amount: string;
  calories: number;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface MealData {
  items: FoodItem[];
}

export interface DayData {
  dayName: string;
  meals: {
    [key in MealType]: MealData;
  };
}

export type WeeklyLog = DayData[];
