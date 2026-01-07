import type { User, Challenge, LeaderboardEntry } from './types';
import { Medal, Target, Zap } from 'lucide-react';

export const user: User = {
  name: 'Alex',
  avatar: 'https://picsum.photos/seed/user-avatar/100/100',
  fitnessLevel: 'Intermediate',
  goals: 'Build muscle and improve cardiovascular health.',
  limitations: 'Slight knee discomfort during high-impact exercises.',
};

export const workoutStats = {
  workoutsCompleted: 18,
  timeSpent: '12h 30m',
  caloriesBurned: 5400,
};

export const weeklyProgressData = [
  { date: 'Mon', minutes: 30 },
  { date: 'Tue', minutes: 45 },
  { date: 'Wed', minutes: 60 },
  { date: 'Thu', minutes: 40 },
  { date: 'Fri', minutes: 75 },
  { date: 'Sat', minutes: 30 },
  { date: 'Sun', minutes: 0 },
];

export const challenges: Challenge[] = [
  {
    id: 'c1',
    title: '30-Day Push-up Challenge',
    description: 'Complete 100 push-ups every day for 30 days.',
    icon: Medal,
    metric: 'Days Completed',
    progress: 18,
  },
  {
    id: 'c2',
    title: 'Cardio King',
    description: 'Run 5km three times a week.',
    icon: Zap,
    metric: 'Runs Completed',
    progress: 8,
  },
  {
    id: 'c3',
    title: 'Consistency is Key',
    description: 'Workout at least 4 times a week for a month.',
    icon: Target,
    metric: 'Workouts Logged',
    progress: 15,
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sophia', score: 1250, avatar: 'https://picsum.photos/seed/leader-1/40/40' },
  { rank: 2, name: 'Liam', score: 1180, avatar: 'https://picsum.photos/seed/leader-2/40/40' },
  { rank: 3, name: 'Olivia', score: 1120, avatar: 'https://picsum.photos/seed/leader-3/40/40' },
  { rank: 4, name: 'Noah', score: 1050, avatar: 'https://picsum.photos/seed/leader-4/40/40' },
  { rank: 5, name: 'Alex', score: 1020, avatar: user.avatar },
  { rank: 6, name: 'Emma', score: 980, avatar: 'https://picsum.photos/seed/leader-5/40/40' },
];
