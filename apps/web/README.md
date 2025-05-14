// Example usage (within the blog system)
async function mainBlog() {
  // Added await keyword
  const newPost = await blogSystem.createPost(
    "My First Post",
    "This is the content of my first post."
  );
  const allPosts = await blogSystem.getPosts();
  const specificPost = await blogSystem.getPostById(newPost.id); // Use the id of the newly created post
  const updatedPost = await blogSystem.updatePost(
    newPost.id,
    "My First Post - Updated",
    "This is the updated content."
  );
  const deletedPost = await blogSystem.deletePost(newPost.id);
}

mainBlog();


async function mainAnalytics() {
    // Seed some data for analytics
    await prisma.post.create({ data: { title: "Post 1", content: "Content 1" } });
    await prisma.post.create({ data: { title: "Post 2", content: "Content 2", createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) } }); // Post from 12 hours ago

    const totalPosts = await analyticsSystem.getTotalPosts();
    const recentPosts = await analyticsSystem.getPostsCreatedLast24Hours();
}

mainAnalytics();