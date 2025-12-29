import type { Lesson } from "./stocks";

export const creditCardsLessons: Lesson[] = [
  {
    id: "how-credit-cards-work",
    title: "Credit Cards: The Core Basics",
    description:
      "Learn how credit cards function, how balances work, and the habits that keep borrowing costs low.",
    duration: "12 min",
    sections: [
      {
        title: "APR: The Cost of Borrowing",
        content:
          "APR (Annual Percentage Rate) is the yearly interest rate charged on any balance you carry. If you pay your statement balance in full by the due date, you typically avoid interest. Carrying a balance causes interest to accrue, which can make purchases far more expensive over time.",
      },
      {
        title: "Utilization: How Much Credit You Use",
        content:
          "Utilization is the percentage of your credit limit that you're using. For example, a $300 balance on a $1,000 limit is 30% utilization. Lower utilization generally looks better for credit health and leaves you more flexibility in your budget.",
      },
      {
        title: "Statement Balance vs Current Balance",
        content:
          "Your statement balance is the total you owe at the end of a billing cycle. Your current balance includes any new purchases made after the statement closed. Paying the statement balance by the due date usually avoids interest on those statement purchases.",
      },
      {
        title: "On-Time Payments",
        content:
          "Paying on time is one of the most important habits for responsible credit use. Late payments can trigger fees, higher rates, and negative credit impacts. Setting reminders or autopay can help you stay consistent.",
      },
    ],
    keyTerms: [
      {
        term: "APR",
        definition:
          "Annual Percentage Rate—the yearly interest rate charged on unpaid balances.",
      },
      {
        term: "Utilization",
        definition:
          "The percentage of your credit limit that you are currently using.",
      },
      {
        term: "Statement Balance",
        definition:
          "The total amount owed at the end of a billing cycle.",
      },
      {
        term: "Current Balance",
        definition:
          "The total owed right now, including purchases after the statement closed.",
      },
      {
        term: "On-Time Payment",
        definition:
          "A payment made by the due date to avoid late fees and protect credit health.",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What does APR represent on a credit card?",
        options: [
          "A one-time fee for opening the account",
          "The yearly interest rate charged on unpaid balances",
          "The minimum amount you must pay each month",
          "The total you owe right now",
        ],
        correctIndex: 1,
        explanation:
          "APR is the annual percentage rate charged on balances you carry. Paying the statement balance in full typically avoids interest.",
      },
      {
        id: "q2",
        question: "What is credit utilization?",
        options: [
          "The number of days between statements",
          "The percentage of your credit limit you are using",
          "The total rewards you have earned",
          "The amount due after the grace period",
        ],
        correctIndex: 1,
        explanation:
          "Utilization measures how much of your credit limit is used. Lower utilization generally supports healthier credit habits.",
      },
      {
        id: "q3",
        question: "Why is paying the statement balance on time important?",
        options: [
          "It guarantees your credit limit will increase",
          "It avoids late fees and helps prevent interest charges",
          "It resets your billing cycle immediately",
          "It removes all past balances automatically",
        ],
        correctIndex: 1,
        explanation:
          "On-time payments protect you from late fees and usually keep interest from applying to statement purchases.",
      },
    ],
  },
];

export function getCreditCardLessonById(id: string): Lesson | undefined {
  return creditCardsLessons.find((lesson) => lesson.id === id);
}
