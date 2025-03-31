import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Database, Server, Globe, Heart, Share2, MessageSquare, Clock, User, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  // Featured articles data
  const featuredArticles = [
    {
      id: 1,
      title: "Building Scalable APIs with Express.js and MongoDB",
      excerpt: "Learn how to create robust RESTful APIs using Express.js with MongoDB for optimal performance and scalability.",
      author: "Sarah Johnson",
      date: "March 28, 2025",
      readTime: "12 min read",
      likes: 342,
      comments: 48,
      category: "Backend",
      image: "/api/placeholder/800/500",
      tags: ["express", "mongodb", "api"]
    },
    {
      id: 2,
      title: "React Hooks Deep Dive: Beyond the Basics",
      excerpt: "Explore advanced patterns and techniques with React Hooks to elevate your frontend development skills.",
      author: "Michael Chen",
      date: "March 25, 2025",
      readTime: "15 min read",
      likes: 287,
      comments: 36,
      category: "Frontend",
      image: "/api/placeholder/800/500",
      tags: ["react", "hooks", "javascript"]
    },
    {
      id: 3,
      title: "Optimizing MongoDB Performance for Production",
      excerpt: "Discover critical optimization techniques to make your MongoDB databases lightning fast in production environments.",
      author: "David Rodriguez",
      date: "March 22, 2025",
      readTime: "18 min read",
      likes: 215,
      comments: 29,
      category: "Database",
      image: "/api/placeholder/800/500",
      tags: ["mongodb", "performance", "database"]
    }
  ];

  // Recent posts data
  const recentPosts = [
    {
      id: 4,
      title: "JWT Authentication Best Practices in MERN Apps",
      excerpt: "Implement secure authentication flows using JWT tokens in your MERN stack applications.",
      author: "Alex Turner",
      date: "March 20, 2025",
      readTime: "10 min read",
      category: "Security",
      tags: ["jwt", "authentication", "security"]
    },
    {
      id: 5,
      title: "Mastering React Context API for State Management",
      excerpt: "Learn how to leverage the Context API effectively for global state management without Redux.",
      author: "Emma Wilson",
      date: "March 18, 2025",
      readTime: "8 min read",
      category: "Frontend",
      tags: ["react", "context-api", "state-management"]
    },
    {
      id: 6,
      title: "Building Real-time Applications with Socket.io and Node.js",
      excerpt: "Create responsive real-time web applications using Socket.io with your Node.js backend.",
      author: "James Lee",
      date: "March 15, 2025",
      readTime: "14 min read",
      category: "Backend",
      tags: ["socket.io", "nodejs", "real-time"]
    },
    {
      id: 7,
      title: "Implementing Pagination in MongoDB Queries",
      excerpt: "Learn effective strategies for implementing pagination in MongoDB to handle large datasets.",
      author: "Sophia Garcia",
      date: "March 12, 2025",
      readTime: "9 min read",
      category: "Database",
      tags: ["mongodb", "pagination", "database"]
    }
  ];

  // Technology categories
  const categories = [
    { name: "Frontend", icon: <Code size={20} />, color: "bg-blue-100 text-blue-700" },
    { name: "Backend", icon: <Server size={20} />, color: "bg-green-100 text-green-700" },
    { name: "Database", icon: <Database size={20} />, color: "bg-purple-100 text-purple-700" },
    { name: "DevOps", icon: <Globe size={20} />, color: "bg-orange-100 text-orange-700" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Explore the World of Technology
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Discover insightful articles, expert opinions, and the latest trends in software development and technology.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link to="/tags" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                  Browse Tags
                </Link>
                <Link to="/auth" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={`/tags/${category.name.toLowerCase()}`}
              className={`${category.color} flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stories</h2>
        <div className="space-y-8">
          {/* Main Featured Article */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="md:flex">
              <div className="md:w-2/3">
                <img className="w-full h-96 object-cover" src={featuredArticles[0].image} alt={featuredArticles[0].title} />
              </div>
              <div className="md:w-1/3 p-8">
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${featuredArticles[0].category === "Frontend" ? "bg-blue-100 text-blue-700" : featuredArticles[0].category === "Backend" ? "bg-green-100 text-green-700" : featuredArticles[0].category === "Database" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
                    {featuredArticles[0].category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredArticles[0].title}</h3>
                <p className="text-gray-600 mb-6">{featuredArticles[0].excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>{featuredArticles[0].author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{featuredArticles[0].readTime}</span>
                  </div>
                </div>
                <Link to={`/blog/${featuredArticles[0].id}`} className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center">
                  Read More
                </Link>
              </div>
            </div>
          </div>

          {/* Other Featured Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg flex">
                <div className="w-1/3">
                  <img className="w-full h-full object-cover" src={article.image} alt={article.title} />
                </div>
                <div className="w-2/3 p-6">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${article.category === "Frontend" ? "bg-blue-100 text-blue-700" : article.category === "Backend" ? "bg-green-100 text-green-700" : article.category === "Database" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
                      {article.category}
                    </span>
                  </div>
                  <Link to={`/blog/${article.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600">{article.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <Heart size={16} className="mr-1" />
                        <span>{article.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <MessageSquare size={16} className="mr-1" />
                        <span>{article.comments}</span>
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      {article.tags.map((tag, index) => (
                        <Link
                          key={index}
                          to={`/tags/${tag}`}
                          className="text-xs text-indigo-600 hover:text-indigo-800"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${post.category === "Frontend" ? "bg-blue-100 text-blue-700" : post.category === "Backend" ? "bg-green-100 text-green-700" : post.category === "Database" ? "bg-purple-100 text-purple-700" : post.category === "Security" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                    {post.category}
                  </span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600">{post.title}</h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/tags/${tag}`}
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/tags" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View All Articles
          </Link>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 text-center lg:text-left">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:w-0 md:flex-1">
                  <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    Stay up to date with the latest MERN stack trends
                  </h2>
                  <p className="mt-3 max-w-3xl text-lg text-indigo-200">
                    Get weekly updates with new tutorials, tips, and community highlights delivered straight to your inbox.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 md:ml-8">
                  <form className="sm:flex">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-white rounded-md"
                      placeholder="Enter your email"
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;