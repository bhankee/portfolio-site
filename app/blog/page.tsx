import BlogCard from "../components/BlogCard";

export const revalidate = 3600;

async function getPosts() {
  const res = await fetch(
    `https://dev.to/api/articles?username=bhankee&api_key=${process.env.DEV_TO_API_KEY}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-blue-900 text-center mb-10">
        Blog
      </h1>

      <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-16" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post: any) => (
          <BlogCard
            key={post.id}
            title={post.title}
            url={post.url}
            description={post.description}
            image={post.cover_image || post.social_image}
          />
        ))}
      </div>
    </main>
  );
}
