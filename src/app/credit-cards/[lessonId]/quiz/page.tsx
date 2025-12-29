import Link from "next/link";
import { notFound } from "next/navigation";
import { getCreditCardLessonById } from "@/lib/data/credit-cards";
import { Quiz } from "@/components/quiz/quiz";

interface QuizPageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function CreditCardsQuizPage({ params }: QuizPageProps) {
  const { lessonId } = await params;
  const lesson = getCreditCardLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Link
          href={`/credit-cards/${lessonId}`}
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
        <Quiz questions={lesson.quiz} trackId="credit-cards" lessonId={lessonId} />
      </div>

      <div className="text-center">
        <Link
          href="/credit-cards"
          className="text-sm text-muted-foreground hover:underline"
        >
          Return to Credit Cards
        </Link>
      </div>
    </div>
  );
}
