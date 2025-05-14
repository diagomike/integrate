import { prisma } from "@repo/db";

const analyticsSystem = {
  async getTotalPosts() {
    try {
      const count = await prisma.posts.count();
      console.log("Total number of posts:", count);
      return count;
    } catch (error) {
      console.error("Error counting posts:", error);
      throw error;
    }
  },

  async getPostsCreatedLast24Hours() {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const posts = await prisma.posts.findMany({
        where: {
          createdAt: {
            gte: twentyFourHoursAgo,
          },
        },
      });
      console.log("Posts created in last 24 hours", posts);
      return posts;
    } catch (error) {
      console.error("Error getting posts from last 24 hours", error);
      throw error;
    }
  },
  async getPostCountsByDay() {
    try {
      // MongoDB aggregation to count posts per day
      const result = await prisma.posts.groupBy({
        by: ["createdAt"],
        _count: {
          _all: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // Format the result to group by day
      const formattedResult = result.map((item) => ({
        date: item.createdAt.toISOString().split("T")[0], // Extract the date part
        count: item._count._all,
      }));

      //  Adapt the result to the expected format
      //   const formattedResult = (result as any).map((item: any) => ({
      //     date: item._id,
      //     count: item.count,
      //   }));

      return formattedResult;
    } catch (error) {
      console.error("Error getting post counts by day", error);
      throw error;
    }
  },
};

export default analyticsSystem;
