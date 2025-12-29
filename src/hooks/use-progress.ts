"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProgress,
  markLessonVisited,
  markLessonCompleted,
  getTrackCompletionPercent,
  type UserProgress,
} from "@/lib/progress";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    currentTrackId: null,
    tracks: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setIsLoaded(true);
  }, []);

  const visitLesson = useCallback((trackId: string, lessonId: string) => {
    markLessonVisited(trackId, lessonId);
    setProgress(getProgress());
  }, []);

  const completeLesson = useCallback(
    (trackId: string, lessonId: string, score: number, total: number) => {
      markLessonCompleted(trackId, lessonId, score, total);
      setProgress(getProgress());
    },
    []
  );

  const getCompletionPercent = useCallback(
    (trackId: string, totalLessons: number) => {
      return getTrackCompletionPercent(trackId, totalLessons);
    },
    []
  );

  return {
    progress,
    isLoaded,
    visitLesson,
    completeLesson,
    getCompletionPercent,
  };
}
