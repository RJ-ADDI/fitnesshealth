export type User = {
  name: string;
  avatar: string;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: string;
  limitations: string;
};

export type Challenge = {
  id: string;
  title: string;
  description:string;
  icon: React.ElementType;
  metric: string;
  progress: number;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  avatar: string;
};
