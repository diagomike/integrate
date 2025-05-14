"use client";
// packages/analytics/pages/index.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Example chart library

// Import the shared Prisma client
import {
  getPostCountsByDay,
  getPostsCreatedLast24Hours,
  getTotalPosts,
} from "@/actions/analytics";
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [postCountsByDay, setPostCountsByDay] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const total = await getTotalPosts();
        const recent = await getPostsCreatedLast24Hours();
        const dailyCounts = await getPostCountsByDay();
        setTotalPosts(total);
        setRecentPosts(recent);
        setPostCountsByDay(dailyCounts);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Analytics System</h1>

      {loading ? (
        <p>Loading analytics data...</p>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl">{totalPosts}</p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Posts Created in the Last 24 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPosts.length > 0 ? (
                <ul>
                  {recentPosts.map((post: any) => (
                    <li key={post.id}>
                      {post.title} - {new Date(post.createdAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No posts created in the last 24 hours.</p>
              )}
            </CardContent>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Post Counts by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={postCountsByDay}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
