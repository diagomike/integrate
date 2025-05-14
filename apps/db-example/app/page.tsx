"use client";
// packages/blog/pages/index.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Import the shared Prisma client (adjust the path if needed in a monorepo)
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "@/actions/mySQL-blog";

const BlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        // Handle error (e.g., show a message to the user)
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPostTitle.trim()) return; // Don't create empty posts
    setLoading(true);
    try {
      const newPost = await createPost(newPostTitle, newPostContent);
      setPosts([...posts, newPost]);
      setNewPostTitle("");
      setNewPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = async (id: number) => {
    setLoading(true);
    try {
      const post = await getPostById(id);
      if (post) {
        setSelectedPost(post);
        setEditPostTitle(post.title);
        setEditPostContent(post.content || "");
      }
    } catch (error) {
      console.error("Error fetching post", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!selectedPost) return;

    setLoading(true);
    try {
      const updatedPost = await updatePost(
        selectedPost.id,
        editPostTitle,
        editPostContent
      );
      setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      setSelectedPost(null); // Close the edit view
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    setLoading(true);
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
      setSelectedPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Blog System</h1>

      {/* Create Post Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Add a new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Post Content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full"
              rows={4}
            />
          </div>
          <Button onClick={handleCreatePost} disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </CardContent>
      </Card>

      {/* Display Posts */}
      <h2 className="text-2xl mb-4">Posts</h2>
      {loading ? (
        <p>Loading posts...</p> // Simple loading indicator
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handlePostClick(post.id)}
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.content?.substring(0, 100)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for Editing Post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Edit Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  value={editPostTitle}
                  onChange={(e) => setEditPostTitle(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <Textarea
                  value={editPostContent}
                  onChange={(e) => setEditPostContent(e.target.value)}
                  className="w-full"
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedPost(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdatePost} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePost(selectedPost.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
