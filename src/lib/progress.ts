export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number | null;
  quizTotal: number | null;
  completedAt: string | null;
}

export interface TrackProgress {
  trackId: string;
  lastLessonId: string | null;
  lastVisitedAt: string | null;
  lessons: Record<string, LessonProgress>;
}

export interface UserProgress {
  currentTrackId: string | null;
  tracks: Record<string, TrackProgress>;
}

const STORAGE_KEY = "finlit-progress";

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { currentTrackId: null, tracks: {} };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Invalid JSON, reset
  }
  
  return { currentTrackId: null, tracks: {} };
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markLessonVisited(trackId: string, lessonId: string): void {
  const progress = getProgress();
  
  if (!progress.tracks[trackId]) {
    progress.tracks[trackId] = {
      trackId,
      lastLessonId: null,
      lastVisitedAt: null,
      lessons: {},
    };
  }
  
  progress.currentTrackId = trackId;
  progress.tracks[trackId].lastLessonId = lessonId;
  progress.tracks[trackId].lastVisitedAt = new Date().toISOString();
  
  if (!progress.tracks[trackId].lessons[lessonId]) {
    progress.tracks[trackId].lessons[lessonId] = {
      lessonId,
      completed: false,
      quizScore: null,
      quizTotal: null,
      completedAt: null,
    };
  }
  
  saveProgress(progress);
}

export function markLessonCompleted(
  trackId: string,
  lessonId: string,
  quizScore: number,
  quizTotal: number
): void {
  const progress = getProgress();
  
  if (!progress.tracks[trackId]) {
    progress.tracks[trackId] = {
      trackId,
      lastLessonId: lessonId,
      lastVisitedAt: new Date().toISOString(),
      lessons: {},
    };
  }
  
  progress.tracks[trackId].lessons[lessonId] = {
    lessonId,
    completed: true,
    quizScore,
    quizTotal,
    completedAt: new Date().toISOString(),
  };
  
  saveProgress(progress);
}

export function getTrackCompletionPercent(
  trackId: string,
  totalLessons: number
): number {
  const progress = getProgress();
  const track = progress.tracks[trackId];
  
  if (!track || totalLessons === 0) return 0;
  
  const completedCount = Object.values(track.lessons).filter(
    (l) => l.completed
  ).length;
  
  return Math.round((completedCount / totalLessons) * 100);
}
