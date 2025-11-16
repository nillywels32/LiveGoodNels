/**
 * Utility functions for daily-checkin Edge Function
 */

import type { CheckinInput, CheckinMessage } from "./types.ts";

/**
 * Validate checkin input
 */
export function validateCheckinInput(input: unknown): CheckinInput {
  const data = input as CheckinInput;

  if (!data.userId) {
    throw new Error("userId is required");
  }

  if (!data.userName) {
    throw new Error("userName is required");
  }

  if (!data.date) {
    throw new Error("date is required");
  }

  if (!data.dayOfWeek) {
    throw new Error("dayOfWeek is required");
  }

  if (!data.todaysMeals) {
    throw new Error("todaysMeals is required");
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.date)) {
    throw new Error("date must be in YYYY-MM-DD format");
  }

  // Validate day of week
  const validDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (!validDays.includes(data.dayOfWeek)) {
    throw new Error(`dayOfWeek must be one of: ${validDays.join(", ")}`);
  }

  return data;
}

/**
 * Validate checkin message response from AI
 */
export function validateCheckinMessage(message: unknown): CheckinMessage {
  const checkin = message as CheckinMessage;

  if (!checkin.greeting) {
    throw new Error("Checkin must have a greeting");
  }

  if (!checkin.mainMessage) {
    throw new Error("Checkin must have a main message");
  }

  if (!checkin.questions || !Array.isArray(checkin.questions)) {
    throw new Error("Checkin must have questions array");
  }

  if (checkin.questions.length < 1 || checkin.questions.length > 5) {
    throw new Error("Checkin must have 1-5 questions");
  }

  // Validate that messages aren't too long
  if (checkin.mainMessage.length > 500) {
    throw new Error("Main message is too long (max 500 characters)");
  }

  if (checkin.motivationalNote && checkin.motivationalNote.length > 200) {
    throw new Error("Motivational note is too long (max 200 characters)");
  }

  return checkin;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Get day of week name
 */
export function getDayOfWeek(date: string): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(date);
  return days[d.getDay()];
}

/**
 * Check if user has a busy schedule
 */
export function hasBusySchedule(schedule?: CheckinInput["schedule"]): boolean {
  if (!schedule || schedule.length === 0) {
    return false;
  }

  // Consider busy if 4+ scheduled activities
  return schedule.length >= 4;
}

/**
 * Summarize schedule for context
 */
export function summarizeSchedule(schedule?: CheckinInput["schedule"]): string {
  if (!schedule || schedule.length === 0) {
    return "Light schedule";
  }

  if (schedule.length >= 4) {
    return "Busy day";
  }

  return "Moderate schedule";
}
