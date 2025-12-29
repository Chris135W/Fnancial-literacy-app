export interface KeyTerm {
  term: string;
  definition: string;
}

export interface ContentSection {
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  sections: ContentSection[];
  keyTerms: KeyTerm[];
  quiz: QuizQuestion[];
}

export const stocksLessons: Lesson[] = [
  {
    id: "what-is-a-stock",
    title: "What is a Stock?",
    description:
      "Learn the basics of stocks, what they represent, and why companies issue them.",
    duration: "10 min",
    sections: [
      {
        title: "Introduction",
        content:
          "A stock represents ownership in a company. When you buy a stock, you're purchasing a small piece of that company, making you a shareholder. Companies issue stocks to raise money for growth, research, or paying off debt.",
      },
      {
        title: "How Stocks Work",
        content:
          "When a company goes public through an Initial Public Offering (IPO), it sells shares to investors. These shares can then be bought and sold on stock exchanges like the NYSE or NASDAQ. The price of a stock fluctuates based on supply and demand, company performance, and market conditions.",
      },
      {
        title: "Why Invest in Stocks?",
        content:
          "Stocks offer the potential for growth over time. Historically, the stock market has returned an average of about 10% per year over long periods. However, stocks also carry risk—prices can go down, and you could lose money. Diversification and long-term thinking are key strategies for managing risk.",
      },
    ],
    keyTerms: [
      {
        term: "Stock",
        definition: "A share of ownership in a company.",
      },
      {
        term: "Shareholder",
        definition: "A person or entity that owns shares in a company.",
      },
      {
        term: "IPO",
        definition:
          "Initial Public Offering—when a company first sells shares to the public.",
      },
      {
        term: "Stock Exchange",
        definition:
          "A marketplace where stocks are bought and sold (e.g., NYSE, NASDAQ).",
      },
      {
        term: "Diversification",
        definition:
          "Spreading investments across different assets to reduce risk.",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What does owning a stock represent?",
        options: [
          "A loan to the company",
          "Ownership in the company",
          "A guaranteed return",
          "A company's debt",
        ],
        correctIndex: 1,
        explanation:
          "A stock represents partial ownership in a company. When you buy shares, you become a shareholder and own a piece of that business.",
      },
      {
        id: "q2",
        question: "What is an IPO?",
        options: [
          "A type of stock exchange",
          "When a company buys back its shares",
          "When a company first sells shares to the public",
          "A measure of stock performance",
        ],
        correctIndex: 2,
        explanation:
          "IPO stands for Initial Public Offering. It's the process by which a private company becomes publicly traded by selling shares to investors for the first time.",
      },
      {
        id: "q3",
        question: "Why is diversification important when investing in stocks?",
        options: [
          "It guarantees higher returns",
          "It helps reduce risk by spreading investments",
          "It eliminates all investment risk",
          "It is required by law",
        ],
        correctIndex: 1,
        explanation:
          "Diversification helps reduce risk by spreading your investments across different assets. If one investment performs poorly, others may perform better, balancing your overall portfolio.",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return stocksLessons.find((lesson) => lesson.id === id);
}
