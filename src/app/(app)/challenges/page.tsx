import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { challenges, leaderboard } from "@/lib/data";

export default function ChallengesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Fitness Challenges"
        description="Join challenges, compete with others, and earn rewards."
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Active Challenges</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <challenge.icon className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>
                    {challenge.progress} / 30
                  </span>
                </div>
                <Progress value={(challenge.progress / 30) * 100} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Leaderboard</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry) => (
                <TableRow key={entry.rank}>
                  <TableCell className="font-medium text-lg">
                    {entry.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={entry.avatar} alt={entry.name} />
                        <AvatarFallback>
                          {entry.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {entry.score.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
