import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { user, workoutStats } from "@/lib/data";
import { Dumbbell, Clock, Flame } from "lucide-react";
import { WeeklyProgressChart } from "./components/weekly-progress-chart";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "dashboard-hero");

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user.name}!`}
        description="Here's a snapshot of your fitness journey."
      />
      
      {heroImage && (
        <div className="relative w-full h-52 md:h-64 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-headline">
              Ready to crush your goals?
            </h2>
            <p className="text-white/90 mt-1">
              Your next workout is waiting for you.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Workouts Completed
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workoutStats.workoutsCompleted}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workoutStats.timeSpent}</div>
            <p className="text-xs text-muted-foreground">+45m this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calories Burned
            </CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workoutStats.caloriesBurned.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+320 this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyProgressChart />
        </CardContent>
      </Card>
    </div>
  );
}
