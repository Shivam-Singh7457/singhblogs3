import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';
import AdBanner from '../components/adbanner';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
          Blogging Beyond Boundaries
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-300 text-sm sm:text-base">
          Unleash Your Voice, Ignite Your Passion
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/search"
            className="px-5 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700"
          >
            Explore All Posts
          </Link>
          {currentUser && (
            <Link
              to="/create-post"
              className="px-5 py-2 border border-teal-600 text-teal-600 dark:text-teal-400 rounded-lg text-sm hover:bg-teal-50 dark:hover:bg-slate-800"
            >
              + Create Post
            </Link>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <div className="p-4 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      {/* Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts && posts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-10">
              Recent Posts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* View All Posts Link */}
            <div className="mt-10 text-center">
              <Link
                to="/search"
                className="text-teal-600 hover:underline text-lg"
              >
                View All Posts
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Ad Banner at Bottom */}
      <AdBanner />

      {/* You can place your <Footer /> component here if it's not globally rendered */}
    </div>
  );
}
