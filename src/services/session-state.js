const drafts = new Map();
const completedLessons = new Set();
const passedExercises = new Set();

export const getDraft = (key) => drafts.get(key);
export const saveDraft = (key, value) => drafts.set(key, value);
export const getCompletedLessons = () => completedLessons;
export const completeLesson = (id) => completedLessons.add(id);
export const getPassedExercises = () => passedExercises;
export const passExercise = (id) => passedExercises.add(id);
