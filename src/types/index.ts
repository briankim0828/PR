import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Base types
export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  splitIds: string[];
  sets?: Set[];
  notes?: string;
}

export interface Set {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Split {
  id: string;  // uuid – generate with uuidv4()
  name: string;
  days: string[];
  color?: string;
  exercises: { id: string; name: string; bodyPart: string }[];
}

// UI/Component types
export interface WorkoutCalendarProps {
  month: number;
  year: number;
  workouts: WorkoutDay[];
  splits: Split[];
  onDayPress?: (date: string) => void;
}

export interface WorkoutDay {
  date: string;
  completed: boolean;
  splitId?: string;
}

export interface BodyPartSectionData {
  id: string;
  bodyPart: string;
  exercises: Exercise[];
}

// State types
export type EditMode = 'none' | 'program' | 'splits';

// Storage types
// Live, during an active workout
export interface LiveWorkoutSession {
  user_id: string;                // Supabase UID
  session_date: string;           // ISO YYYY-MM-DD
  split_name: string | null;      // Split name instead of ID
  start_time: string;             // ISO timestamp
  duration_sec: number;           // 0 until finished
  sets: Set[][];                  // array-of-arrays per exercise
  exercises: Exercise[];          // mirrors WorkoutContext UI
}

// Stored locally & in Supabase
export interface StoredWorkoutSession {
  id?: string;                    // uuid (optional before insert)
  date: string;                   // ISO YYYY-MM-DD
  splitName: string | null;       // Split name instead of ID
  userId: string;
  sets: Set[][];
  startTime: string;
  durationSec: number;
  exercises: Exercise[];
  completed: boolean;             // always true once saved
}

// Constants
export const BODY_PARTS = [
  'Chest',
  'Back',
  'Legs',
  'Arms',
  'Shoulders',
  'Core',
  'Cardio',
] as const;

export type BodyPart = typeof BODY_PARTS[number];

export const WEEKDAYS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
] as const;

export type WeekDay = typeof WEEKDAYS[number]; 

// Default exercises database
export const DEFAULT_EXERCISES_BY_BODY_PART: Record<string, Omit<Exercise, 'splitIds'>[]> = {
  'Chest': [
    { id: 'chest-1', name: 'Flat Bench Press', bodyPart: 'Chest' },
    { id: 'chest-2', name: 'Incline Bench Press', bodyPart: 'Chest' },
    { id: 'chest-3', name: 'Incline Dumbbell Press', bodyPart: 'Chest' },
    { id: 'chest-4', name: 'Decline Bench Press', bodyPart: 'Chest' },
    { id: 'chest-5', name: 'Dips', bodyPart: 'Chest' },
    { id: 'chest-6', name: 'Machine Chest Flyes', bodyPart: 'Chest' },
    { id: 'chest-7', name: 'Cable Chest Flyes', bodyPart: 'Chest' },
    { id: 'chest-8', name: 'Push-Ups', bodyPart: 'Chest' },
  ],
  'Back': [
    { id: 'back-1', name: 'Barbell Row', bodyPart: 'Back' },
    { id: 'back-2', name: 'Pull-Ups', bodyPart: 'Back' },
    { id: 'back-3', name: 'Lat Pulldowns', bodyPart: 'Back' },
    { id: 'back-4', name: 'Deadlift', bodyPart: 'Back' },
    { id: 'back-5', name: 'Face Pulls', bodyPart: 'Back' },
    { id: 'back-6', name: 'Cable Row', bodyPart: 'Back' },
    { id: 'back-7', name: 'Lat Pullovers', bodyPart: 'Back' },
    { id: 'back-8', name: 'Bent Over Rows', bodyPart: 'Back' },
    { id: 'back-9', name: 'Chest Supported DB Rows', bodyPart: 'Back' },
  ],
  'Legs': [
    { id: 'legs-1', name: 'Squats', bodyPart: 'Legs' },
    { id: 'legs-2', name: 'Romanian Deadlift', bodyPart: 'Legs' },
    { id: 'legs-3', name: 'Leg Press', bodyPart: 'Legs' },
    { id: 'legs-4', name: 'Lunges', bodyPart: 'Legs' },
    { id: 'legs-5', name: 'Calf Raises', bodyPart: 'Legs' },
    { id: 'legs-6', name: 'Leg Extensions', bodyPart: 'Legs' }
  ],
  'Arms': [
    { id: 'arms-1', name: 'Bicep Curls', bodyPart: 'Arms' },
    { id: 'arms-2', name: 'Tricep Pushdowns', bodyPart: 'Arms' },
    { id: 'arms-3', name: 'Hammer Curls', bodyPart: 'Arms' },
    { id: 'arms-4', name: 'Skull Crushers', bodyPart: 'Arms' },
    { id: 'arms-5', name: 'Preacher Curls', bodyPart: 'Arms' },
    { id: 'arms-6', name: 'Tricep Extensions', bodyPart: 'Arms' }
  ],
  'Shoulders': [
    { id: 'shoulders-1', name: 'Dumbbell Shoulder Press', bodyPart: 'Shoulders' },
    { id: 'shoulders-2', name: 'Lateral Raises', bodyPart: 'Shoulders' },
    { id: 'shoulders-3', name: 'Front Raises', bodyPart: 'Shoulders' },
    { id: 'shoulders-4', name: 'Barbell Shoulder Press', bodyPart: 'Shoulders' },
    { id: 'shoulders-5', name: 'Shrugs', bodyPart: 'Shoulders' },
    { id: 'shoulders-6', name: 'Reverse Flyes', bodyPart: 'Shoulders' }
  ],
  'Core': [
    { id: 'core-1', name: 'Crunches', bodyPart: 'Core' },
    { id: 'core-2', name: 'Plank', bodyPart: 'Core' },
    { id: 'core-3', name: 'Russian Twists', bodyPart: 'Core' },
    { id: 'core-4', name: 'Leg Raises', bodyPart: 'Core' },
    { id: 'core-5', name: 'Mountain Climbers', bodyPart: 'Core' },
    { id: 'core-6', name: 'Bicycle Crunches', bodyPart: 'Core' }
  ],
  'Cardio': [
    { id: 'cardio-1', name: 'Treadmill', bodyPart: 'Cardio' },
    { id: 'cardio-2', name: 'Stairmaster', bodyPart: 'Cardio' },
    { id: 'cardio-3', name: 'Elliptical', bodyPart: 'Cardio' },
    { id: 'cardio-4', name: 'Stationary Bike', bodyPart: 'Cardio' },
    { id: 'cardio-5', name: 'Rowing Machine', bodyPart: 'Cardio' },
    { id: 'cardio-6', name: 'Arc Trainer', bodyPart: 'Cardio' }
  ]
}; 