// import prisma from '@repo/db';  // Import the shared Prisma client

// const blogSystem = {
//     async createPost(title: string, content?: string) {
//         try {
//             const post = await prisma.post.create({
//                 data: {
//                     title,
//                     content,
//                 },
//             });
//             console.log('Post created:', post);
//             return post;
//         } catch (error) {
//             console.error('Error creating post:', error);
//             throw error; // Re-throw to be caught by caller, if needed
//         }
//     },

//     async getPosts() {
//         try {
//             const posts = await prisma.post.findMany();
//             console.log('Posts retrieved:', posts);
//             return posts;
//         } catch (error) {
//             console.error('Error getting posts:', error);
//             throw error;
//         }
//     },

//     async getPostById(id: string) {
//         try {
//             const post = await prisma.post.findUnique({
//                 where: {
//                     id: id,
//                 },
//             });
//             console.log('Post retrieved:', post);
//             return post;
//         } catch (error) {
//             console.error('Error getting post by ID:', error);
//             throw error;
//         }
//     },

//     async updatePost(id: string, title: string, content?: string) {
//         try {
//             const updatedPost = await prisma.post.update({
//                 where: {
//                     id: id,
//                 },
//                 data: {
//                     title,
//                     content,
//                 },
//             });
//             console.log('Post updated:', updatedPost);
//             return updatedPost;
//         } catch (error) {
//             console.error('Error updating post:', error);
//             throw error;
//         }
//     },

//     async deletePost(id: string) {
//         try {
//             const deletedPost = await prisma.post.delete({
//                 where: {
//                     id: id,
//                 },
//             });
//             console.log('Post deleted:', deletedPost);
//             return deletedPost;
//         } catch (error) {
//             console.error('Error deleting post:', error);
//             throw error;
//         }
//     },
// };
