"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/use-progress";
import { stocksLessons, getLessonById } from "@/lib/data/stocks";
import { creditCardsLessons, getCreditCardLessonById } from "@/lib/data/credit-cards";
import { Button } from "@/components/ui/button";

const TRACKS = {
  stocks: {
    name: "Stocks",
    href: "/stocks",
    lessons: stocksLessons,
    getLessonById: getLessonById,
  },
  "credit-cards": {
    name: "Credit Cards",
    href: "/credit-cards",
    lessons: creditCardsLessons,
    getLessonById: getCreditCardLessonById,
  },
};

export default function DashboardPage() {
  const { progress, isLoaded, getCompletionPercent } = useProgress();

  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-32 rounded-lg bg-muted" />
        </div>
      </div>
    );
  }

  const totalLessons = Object.values(TRACKS).reduce((sum, t) => sum + t.lessons.length, 0);
  const completedLessons = Object.entries(TRACKS).reduce((sum, [trackId, track]) => {
    const trackData = progress.tracks[trackId];
    if (!trackData) return sum;
    return sum + Object.values(trackData.lessons).filter((l) => l.completed).length;
  }, 0);
  const overallPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const tracksWithProgress = Object.entries(TRACKS)
    .map(([trackId, track]) => {
      const trackData = progress.tracks[trackId];
      if (!trackData?.lastLessonId) return null;
      const lastLesson = track.getLessonById(trackData.lastLessonId);
      const percent = getCompletionPercent(trackId, track.lessons.length);
      return {
        trackId,
        track,
        trackData,
        lastLesson,
        percent,
      };
    })
    .filter(Boolean);

  const hasProgress = tracksWithProgress.length > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your learning progress across all courses.
        </p>
      </div>

      {hasProgress ? (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Overall Progress</h2>
              <span className="text-sm text-muted-foreground">
                {overallPercent}% complete
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>

          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tracksWithProgress.map((item) => {
              if (!item) return null;
              const { trackId, track, lastLesson, percent } = item;
              return (
                <div
                  key={trackId}
                  className="rounded-lg border bg-card p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{track.name}</h3>
                    <span className="text-sm text-muted-foreground">{percent}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  {lastLesson && (
                    <p className="text-sm text-muted-foreground">
                      Last: {lastLesson.title}
                    </p>
                  )}
                  <div className="flex gap-2">
                    {lastLesson && (
                      <Button size="sm" asChild>
                        <Link href={`${track.href}/${lastLesson.id}`}>Continue</Link>
                      </Button>
                    )}
                    <Button size="sm" variant="outline" asChild>
                      <Link href={track.href}>All Lessons</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Get Started</h2>
          <p className="text-muted-foreground">
            You haven&apos;t started any lessons yet. Begin your financial literacy journey today!
          </p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/stocks">Start Stocks</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/credit-cards">Start Credit Cards</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Tracks</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(TRACKS).map(([trackId, track]) => {
            const percent = getCompletionPercent(trackId, track.lessons.length);
            return (
              <Link
                key={trackId}
                href={track.href}
                className="rounded-lg border bg-card p-4 shadow-sm hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{track.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {percent}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {track.lessons.length} lessons
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
