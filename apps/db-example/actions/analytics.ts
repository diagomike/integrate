"use server";

import { analyticsSystem } from "@repo/db/routes";

export async function getTotalPosts() {
  return await analyticsSystem.getTotalPosts();
}

export async function getPostsCreatedLast24Hours() {
  return await analyticsSystem.getPostsCreatedLast24Hours();
}

export async function getPostCountsByDay() {
  return await analyticsSystem.getPostCountsByDay();
}
