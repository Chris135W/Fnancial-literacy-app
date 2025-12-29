"use client";

import { useEffect } from "react";
import { markLessonVisited } from "@/lib/progress";

interface LessonTrackerProps {
  trackId: string;
  lessonId: string;
}

export function LessonTracker({ trackId, lessonId }: LessonTrackerProps) {
  useEffect(() => {
    markLessonVisited(trackId, lessonId);
  }, [trackId, lessonId]);

  return null;
}
