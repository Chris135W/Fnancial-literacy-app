import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to FinLit
        </h1>
        <p className="text-muted-foreground">
          Your guide to understanding personal finance basics. Start learning
          about stocks and credit cards today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Stock Basics</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Learn the fundamentals of stocks, how the market works, and key
            terms every investor should know.
          </p>
          <Button asChild className="mt-4">
            <Link href="/stocks">Start Learning</Link>
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Credit Cards</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Understand how credit cards work, building credit, and using them
            responsibly.
          </p>
          <Button asChild className="mt-4">
            <Link href="/credit-cards">Start Learning</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and should not be considered financial advice. Always consult
          with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
