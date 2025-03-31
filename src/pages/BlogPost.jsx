import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";

const BlogPost = () => {
  const { id } = useParams();

  // Mock data for demonstration
  const post = {
    title: 'Sample Blog Post',
    author: 'John Doe',
    date: 'March 15, 2024',
    coverImage: 'https://images.unsplash.com/photo-1542435503-956c469947f6',
    content: 'This is a sample blog post content. Replace this with actual content from your backend.',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            {/* Hero Section */}
            <div className="mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg mb-6"
              />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-600">
                <span className="mr-4">{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Comments Section */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
              <div className="space-y-6">
                {/* Add comments component here */}
                <p className="text-gray-600">No comments yet.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;