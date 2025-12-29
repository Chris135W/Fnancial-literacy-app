import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/data/stocks";
import { Quiz } from "@/components/quiz/quiz";

interface QuizPageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Link
          href={`/stocks/${lessonId}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Lesson
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">
          Quiz: {lesson.title}
        </h1>
        <p className="text-muted-foreground">
          Test your understanding of the lesson content.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <Quiz questions={lesson.quiz} />
      </div>

      <div className="text-center">
        <Link
          href="/stocks"
          className="text-sm text-muted-foreground hover:underline"
        >
          Return to Stocks
        </Link>
      </div>
    </div>
  );
}
