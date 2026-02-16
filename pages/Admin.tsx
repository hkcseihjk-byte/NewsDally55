import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import { Plus, Loader2 } from 'lucide-react';

interface AdminProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id'>) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
  onViewPost: (post: Post) => void;
}

const Admin: React.FC<AdminProps> = ({ posts, onAddPost, onDeletePost, onViewPost }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setIsLoading(true);
    // Use a placeholder image if none provided
    const img = imageUrl.trim() || `https://picsum.photos/600/400?random=${Date.now()}`;
    
    // 🔥 FIREBASE: This triggers the service function that should call Firestore
    await onAddPost({
      title,
      imageUrl: img,
      content,
      timestamp: Date.now()
    });

    setTitle('');
    setImageUrl('');
    setContent('');
    setIsAdding(false);
    setIsLoading(false);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-2.5 min-h-[80vh] py-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-dark border-l-4 border-primary pl-3">Admin Dashboard</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-md"
        >
          {isAdding ? 'Cancel' : <><Plus size={20} /> Add New Post</>}
        </button>
      </div>

      {/* Add Post Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 animate-fade-in-down">
          <h3 className="text-lg font-bold mb-4 text-dark">Create New Content</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="e.g. Cyberpunk City Portrait"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Image URL (Optional)</label>
              <input 
                type="text" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-gray-400 mt-1">If left blank, a random aesthetic image will be assigned.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Prompt / Content</label>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm"
                placeholder="Paste the full prompt here..."
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-dark text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Publish to Database'}
            </button>
          </form>
        </div>
      )}

      {/* Post List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            isAdmin={true}
            onDelete={async (id) => {
              if(window.confirm('Are you sure you want to delete this from the database?')) {
                // 🔥 FIREBASE: This triggers delete logic
                await onDeletePost(id);
              }
            }}
            onView={onViewPost}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
