// import { prisma } from "@repo/db";

// const analyticsSystem = {
//   async getTotalPosts() {
//     try {
//       const count = await prisma.post.count();
//       console.log("Total number of posts:", count);
//       return count;
//     } catch (error) {
//       console.error("Error counting posts:", error);
//       throw error;
//     }
//   },

//   async getPostsCreatedLast24Hours() {
//     try {
//       const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//       const posts = await prisma.post.findMany({
//         where: {
//           createdAt: {
//             gte: twentyFourHoursAgo,
//           },
//         },
//       });
//       console.log("Posts created in last 24 hours", posts);
//       return posts;
//     } catch (error) {
//       console.error("Error getting posts from last 24 hours", error);
//       throw error;
//     }
//   },
//   async getPostCountsByDay() {
//     try {
//       // MongoDB aggregation to count posts per day
//       const result = await prisma.post.aggregateRaw({
//         pipeline: [
//           {
//             $group: {
//               _id: {
//                 $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
//               },
//               count: { $sum: 1 },
//             },
//           },
//           {
//             $sort: { _id: 1 }, // Sort by date
//           },
//         ],
//       });

//       //  Adapt the result to the expected format
//       const formattedResult = (result as any).map((item: any) => ({
//         date: item._id,
//         count: item.count,
//       }));
//       return formattedResult;
//     } catch (error) {
//       console.error("Error getting post counts by day", error);
//       throw error;
//     }
//   },
// };

// export default analyticsSystem;
