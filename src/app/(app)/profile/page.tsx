"use client";

import { useState, useRef } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { user } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      // Here you would typically upload the file to a server
      // and update the user's profile data.
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Profile"
        description="Manage your account and fitness preferences."
      />
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your photo and personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
            <Button variant="outline" onClick={triggerFileSelect}>
              Change Photo
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fitness Preferences</CardTitle>
          <CardDescription>
            This information helps us personalize your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fitness-level">Fitness Level</Label>
            <Select defaultValue={user.fitnessLevel}>
              <SelectTrigger id="fitness-level">
                <SelectValue placeholder="Select your fitness level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="goals">Fitness Goals</Label>
            <Textarea
              id="goals"
              defaultValue={user.goals}
              placeholder="e.g., Build muscle, lose weight..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="limitations">Limitations or Injuries</Label>
            <Textarea
              id="limitations"
              defaultValue={user.limitations}
              placeholder="e.g., Bad knees, shoulder injury..."
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
