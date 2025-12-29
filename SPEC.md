# Product goals
- Teach foundational financial literacy through two focused tracks: Stocks and Credit Cards.
- Let users browse tracks, read lessons, and complete short quizzes to reinforce learning.
- Provide a clear view of learning progress without requiring accounts or payments.
- Keep content educational, neutral, and free of financial recommendations.

# Routes and pages
- `/` Home: introduction to the platform and entry point to the two tracks.
- `/tracks` Track list: overview of available tracks with short descriptions.
- `/tracks/stocks` Track detail: outline of the Stocks track and its lessons.
- `/tracks/credit-cards` Track detail: outline of the Credit Cards track and its lessons.
- `/tracks/stocks/lessons/[lesson-id]` Lesson page: educational content for a single Stocks lesson.
- `/tracks/credit-cards/lessons/[lesson-id]` Lesson page: educational content for a single Credit Cards lesson.
- `/tracks/stocks/quizzes/[quiz-id]` Quiz page: questions tied to a Stocks lesson or track section.
- `/tracks/credit-cards/quizzes/[quiz-id]` Quiz page: questions tied to a Credit Cards lesson or track section.
- `/progress` Progress summary: visual snapshot of completed lessons and quiz results.
- `/about` About: non-advisory disclaimer and product purpose.

# Learning model
- A Track groups a sequence of Lessons and associated Quizzes.
- Each Lesson teaches a single concept or a tightly related set of concepts.
- Each Quiz checks understanding for a specific Lesson or a small cluster of Lessons.
- Tracks are independent; progress and completion are tracked per track.

# Data shapes
Track
- id: unique identifier
- title: display name
- description: short summary
- order: numeric ordering for display
- lessons: list of Lesson references
- quizzes: list of Quiz references

Lesson
- id: unique identifier
- trackId: parent track reference
- title: display name
- summary: brief overview
- content: structured learning content (text, bullets, examples)
- order: numeric ordering within the track
- estimatedMinutes: expected time to complete
- quizId: optional reference to a Quiz

Quiz
- id: unique identifier
- trackId: parent track reference
- lessonId: optional reference to the related Lesson
- title: display name
- description: short purpose statement
- questions: list of Question items
- passingScore: minimum percentage to pass

Question
- id: unique identifier
- prompt: the question text
- choices: list of answer options
- correctChoiceIndex: index of the correct option
- explanation: brief rationale shown after answering

Progress
- currentTrackId: current track in focus (or null)
- tracks: map of trackId to TrackProgress
- TrackProgress
  - trackId: track reference
  - lastLessonId: last lesson visited (or null)
  - lastVisitedAt: ISO timestamp of last visit (or null)
  - lessons: map of lessonId to LessonProgress
- LessonProgress
  - lessonId: lesson reference
  - completed: true when quiz is submitted
  - quizScore: number of correct answers (or null)
  - quizTotal: number of questions (or null)
  - completedAt: ISO timestamp when quiz was submitted (or null)

# Progress rules
- Progress is recorded locally after a user completes a lesson or submits a quiz.
- A lesson is complete when the user reaches the end of the lesson content.
- A quiz is complete when submitted; passing is determined by meeting the quiz passingScore.
- Progress display shows per-track lesson completion counts, quiz scores, and pass status.
- Progress persists across sessions using local storage on the same device and browser.
- Local storage key: `finlit-progress`, value follows the Progress shape above.

# Explicit non-goals
- No financial advice, personalized recommendations, or trading signals.
- No authentication, accounts, payments, or subscriptions.
- No options, futures, or advanced derivatives content.
- No real-time market data or portfolio tracking.
- No social features, messaging, or community content.

# UX principles
- Education-first: content clarity and comprehension take priority over gamification.
- Consistent structure: lessons and quizzes follow predictable layouts and flow.
- Plain language: avoid jargon or define it when necessary.
- Transparency: always include educational disclaimers and avoid prescriptive language.
- Low friction: minimal steps to start learning; progress is visible and easy to understand.
