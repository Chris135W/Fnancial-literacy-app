import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonById } from "@/lib/data/stocks";
import { Button } from "@/components/ui/button";

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link
          href="/stocks"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Back to Stocks
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {lesson.sections.map((section, index) => (
            <section key={index} className="space-y-2">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          <div className="pt-4">
            <Button asChild size="lg">
              <Link href={`/stocks/${lessonId}/quiz`}>Take Quiz</Link>
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Key Terms</h3>
            <dl className="space-y-3">
              {lesson.keyTerms.map((term) => (
                <div key={term.term}>
                  <dt className="font-medium text-sm">{term.term}</dt>
                  <dd className="text-sm text-muted-foreground">
                    {term.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
