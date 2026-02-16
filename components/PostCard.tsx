import React from 'react';
import { Post } from '../types';
import { Copy, Eye } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onView?: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isAdmin, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0_3px_10px_rgba(0,0,0,0.05)] flex flex-col hover:-translate-y-1 transition-transform duration-300 h-full">
      <div className="relative h-[220px] bg-gray-200">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        {isAdmin && (
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onDelete && onDelete(post.id);
             }}
             className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
           </button>
        )}
      </div>
      
      <div className="p-3 flex-grow flex flex-col">
        <h3 className="text-base font-bold text-dark mb-2.5 leading-snug line-clamp-2">
          {post.title}
        </h3>
        
        <div className="mt-auto">
          <button 
            onClick={() => onView && onView(post)}
            className="w-full bg-primary text-white py-2.5 px-1.5 rounded-md font-semibold text-sm animate-pulse-blue hover:bg-[#2980b9] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            View Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
