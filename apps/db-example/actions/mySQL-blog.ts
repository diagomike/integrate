"use server";

import { blogSystem } from "@repo/db/routes"; // Import the shared Prisma client

export async function createPost(title: string, content?: string) {
  return await blogSystem.createPost(title, content);
}

export async function getPosts() {
  return await blogSystem.getPosts();
}

export async function getPostById(id: number) {
  return await blogSystem.getPostById(id);
}

export async function updatePost(id: number, title: string, content?: string) {
  return await blogSystem.updatePost(id, title, content);
}

export async function deletePost(id: number) {
  return await blogSystem.deletePost(id);
}
