import type { MealType, WeeklyLog } from './types';

export const DAYS_OF_WEEK: string[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export const MAX_DAILY_CALORIES = 1750;

export const getInitialWeeklyLog = (): WeeklyLog => DAYS_OF_WEEK.map(day => ({
  dayName: day,
  meals: {
    Breakfast: { items: [] },
    Lunch: { items: [] },
    Dinner: { items: [] },
    Snacks: { items: [] },
  }
}));