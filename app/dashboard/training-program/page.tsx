"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

type Exercise = {
  id: string;
  name: string;
  sets: Array<{
    id: string;
    reps: number;
    weight: number;
  }>;
  previousRecord?: {
    reps: number;
    weight: number;
    date: string;
  };
};

// Main content component that uses useSearchParams
function TrainingProgramContent() {
  const searchParams = useSearchParams();
  const date =
    searchParams.get("date") || new Date().toISOString().slice(0, 10);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "پرس سینه",
      sets: [
        { id: "1-1", reps: 8, weight: 100 },
        { id: "1-2", reps: 8, weight: 100 },
        { id: "1-3", reps: 6, weight: 105 },
      ],
      previousRecord: {
        reps: 5,
        weight: 115,
        date: "2024-03-14",
      },
    },
    {
      id: "2",
      name: "پرس دمبل شیبدار",
      sets: [
        { id: "2-1", reps: 10, weight: 30 },
        { id: "2-2", reps: 10, weight: 30 },
        { id: "2-3", reps: 8, weight: 32.5 },
      ],
      previousRecord: {
        reps: 8,
        weight: 35,
        date: "2024-03-12",
      },
    },
  ]);

  const [newExerciseName, setNewExerciseName] = useState("");

  // Add new exercise
  const addExercise = () => {
    if (!newExerciseName.trim()) return;

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: newExerciseName,
      sets: [{ id: `${Date.now()}-1`, reps: 10, weight: 0 }],
    };

    setExercises([...exercises, newExercise]);
    setNewExerciseName("");
  };

  // Remove exercise
  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  };

  // Add set to exercise
  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          const lastSet = ex.sets[ex.sets.length - 1];
          return {
            ...ex,
            sets: [
              ...ex.sets,
              {
                id: `${exerciseId}-${Date.now()}`,
                reps: lastSet?.reps || 10,
                weight: lastSet?.weight || 0,
              },
            ],
          };
        }
        return ex;
      })
    );
  };

  // Remove set from exercise
  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.filter((s) => s.id !== setId),
          };
        }
        return ex;
      })
    );
  };

  // Update set values
  const updateSet = (
    exerciseId: string,
    setId: string,
    field: "reps" | "weight",
    value: number
  ) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((s) => {
              if (s.id === setId) {
                return { ...s, [field]: value };
              }
              return s;
            }),
          };
        }
        return ex;
      })
    );
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalReps = exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps, 0),
    0
  );
  const totalVolume = exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    0
  );
  const bestPreviousVolume = exercises.reduce((best, ex) => {
    if (!ex.previousRecord) {
      return best;
    }
    return Math.max(best, ex.previousRecord.weight * ex.previousRecord.reps);
  }, 0);

  // Update exercise name
  const updateExerciseName = (exerciseId: string, newName: string) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exerciseId) {
          return { ...ex, name: newName };
        }
        return ex;
      })
    );
  };

  // Save program
  const saveProgram = () => {
    // Here you would typically save to a backend or local storage
    alert("برنامه تمرینی ذخیره شد!");
  };

  return (
    <div
      className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard/calendar">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md border-gray-300"
              >
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              برنامه تمرینی
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiCalendar className="w-4 h-4" />
            <span>{new Date(date).toLocaleDateString("fa-IR")}</span>
          </div>
        </div>
        <Button
          onClick={saveProgram}
          className="rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FiSave className="w-4 h-4 ml-2" />
          ذخیره برنامه
        </Button>
      </div>

      {/* Summary Stats */}
      <Card className="rounded-lg border border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-800">
            آمار کلی تمرین
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">تعداد حرکت‌ها</div>
              <div className="text-2xl font-semibold text-gray-900">
                {exercises.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">تعداد ست</div>
              <div className="text-2xl font-semibold text-gray-900">
                {totalSets}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">تعداد تکرار</div>
              <div className="text-2xl font-semibold text-gray-900">
                {totalReps}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">
                حجم تمرین (کیلوگرم)
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {totalVolume.toFixed(0)}
              </div>
              <div className="text-xs text-gray-400">تکرار × وزن</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">بهترین حجم قبلی</div>
              <div className="text-2xl font-semibold text-gray-900">
                {bestPreviousVolume ? bestPreviousVolume.toFixed(0) : "—"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises List */}
      <div className="space-y-4">
        {exercises.map((exercise, exerciseIndex) => (
          <Card
            key={exercise.id}
            className="rounded-lg border-gray-200 shadow-sm"
          >
            <CardHeader className="pb-3 bg-gray-50 rounded-t-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {exerciseIndex + 1}
                  </div>
                  <Input
                    value={exercise.name}
                    onChange={(e) =>
                      updateExerciseName(exercise.id, e.target.value)
                    }
                    className="font-semibold text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    dir="rtl"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExercise(exercise.id)}
                  className="rounded-md border-red-200 text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {/* Sets Table Header */}
              <div className="grid grid-cols-12 gap-2 mb-2 text-xs sm:text-sm font-semibold text-gray-600 px-2">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-2 text-center">تکرار</div>
                <div className="col-span-2 text-center">وزن (کیلوگرگ)</div>
                <div className="col-span-3 text-center">سابقه</div>
                <div className="col-span-2 text-center">حجم</div>
                <div className="col-span-2"></div>
              </div>

              {/* Sets List */}
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={set.id}
                    className="grid grid-cols-12 gap-2 items-center bg-white border border-gray-100 rounded-md px-2 py-2"
                  >
                    <div className="col-span-1 text-center font-semibold text-gray-700">
                      {setIndex + 1}
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={set.reps}
                        onChange={(e) =>
                          updateSet(
                            exercise.id,
                            set.id,
                            "reps",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="text-center rounded-md border-gray-200 focus-visible:ring-blue-200"
                        min="0"
                        dir="ltr"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={set.weight}
                        onChange={(e) =>
                          updateSet(
                            exercise.id,
                            set.id,
                            "weight",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="text-center rounded-md border-gray-200 focus-visible:ring-blue-200"
                        min="0"
                        step="0.5"
                        dir="ltr"
                      />
                    </div>
                    <div className="col-span-3 text-center">
                      {exercise.previousRecord ? (
                        <div className="leading-tight text-gray-700">
                          <div className="font-medium">
                            {exercise.previousRecord.reps} x{" "}
                            {exercise.previousRecord.weight}
                          </div>
                          <div className="text-xs text-gray-400">
                            {exercise.previousRecord.date}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-lg">-</span>
                      )}
                    </div>
                    <div className="col-span-2 text-center text-gray-700 font-medium">
                      {(set.reps * set.weight || 0).toFixed(0)}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      {exercise.sets.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSet(exercise.id, set.id)}
                          className="text-red-500 hover:bg-red-50 rounded-md"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Set Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSet(exercise.id)}
                className="w-full mt-3 rounded-md border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <FiPlus className="w-4 h-4 ml-2" />
                افزودن ست
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Exercise Section */}
      <Card className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              placeholder="نام حرکت جدید را وارد کنید..."
              className="flex-1 rounded-md border-gray-300"
              dir="rtl"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addExercise();
                }
              }}
            />
            <Button
              onClick={addExercise}
              className="rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FiPlus className="w-4 h-4 ml-2" />
              افزودن حرکت
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="rounded-lg border-gray-200 bg-gradient-to-l from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg">خلاصه تمرین</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {exercises.length}
              </div>
              <div className="text-sm text-gray-600">حرکت</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {exercises.reduce((sum, ex) => sum + ex.sets.length, 0)}
              </div>
              <div className="text-sm text-gray-600">ست</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {exercises.reduce(
                  (sum, ex) =>
                    sum + ex.sets.reduce((s, set) => s + set.reps, 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">تکرار</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {exercises
                  .reduce(
                    (sum, ex) =>
                      sum +
                      ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
                    0
                  )
                  .toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">کیلوگرم کل</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function TrainingProgramPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری برنامه تمرینی...</p>
          </div>
        </div>
      }
    >
      <TrainingProgramContent />
    </Suspense>
  );
}
