import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const blogs = [
  {
    title: "Why Libraries Still Matter",
    content: "Libraries remain vital community centers offering free access to knowledge...",
  },
  {
    title: "Top 10 Books of 2025",
    content: "Discover this year's best reads across fiction, non-fiction, and more...",
  },
  {
    title: "Digital vs Physical Books",
    content: "Explore the pros and cons of reading formats in the modern world...",
  },
];

export default function Blog() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Latest Blog Posts</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {blogs.map((blog, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{blog.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
