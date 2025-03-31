import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";

const Tags = () => {
  const { tag } = useParams();

  // Mock data for demonstration
  const posts = [
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building modern web applications.',
      author: 'John Doe',
      date: 'March 15, 2024',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      tags: ['react', 'javascript', 'web-development']
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      excerpt: 'Explore advanced TypeScript patterns and improve your code quality.',
      author: 'Jane Smith',
      date: 'March 14, 2024',
      coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
      tags: ['typescript', 'javascript', 'programming']
    }
  ];

  // Filter posts by tag
  const filteredPosts = tag ? posts.filter(post => post.tags.includes(tag)) : posts;

  // Get unique tags from all posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tag Cloud */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tagName => (
              <a
                key={tagName}
                href={`/tags/${tagName}`}
                className={`px-4 py-2 rounded-full text-sm font-medium ${tag === tagName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {tagName}
              </a>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  <a href={`/blog/${post.id}`} className="hover:text-blue-600">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;