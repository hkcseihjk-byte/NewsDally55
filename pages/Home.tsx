import React from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';

interface HomeProps {
  posts: Post[];
  onViewPost: (post: Post) => void;
}

const Home: React.FC<HomeProps> = ({ posts, onViewPost }) => {
  return (
    <div className="max-w-[1100px] mx-auto px-2.5 min-h-[80vh] py-2.5">
      {/* Ad Container Placeholder */}
      <div className="text-center mx-auto my-5 max-w-[320px] h-[250px] bg-gray-100 flex justify-center items-center border border-dashed border-gray-300 rounded">
         <span className="text-gray-400 font-bold">Ad Space</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onView={onViewPost}
          />
        ))}
      </div>

      <div className="text-center mt-10 pb-5">
        <button className="bg-primary text-white py-2.5 px-5 rounded-md font-semibold text-sm hover:bg-[#2980b9] hover:scale-105 transition-all inline-block mx-1">
          Next Page →
        </button>
      </div>
    </div>
  );
};

export default Home;
