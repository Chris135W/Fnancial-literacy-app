import Link from "next/link";
import { creditCardsLessons } from "@/lib/data/credit-cards";
import { Button } from "@/components/ui/button";

export default function CreditCardsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Credit Cards</h1>
        <p className="text-muted-foreground">
          Understand how credit cards work and how to use them responsibly.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lessons</h2>
        {creditCardsLessons.length === 0 ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            No lessons are available yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-4">
            {creditCardsLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {lesson.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                </div>
                <Button asChild>
                  <Link href={`/credit-cards/${lesson.id}`}>Start</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
