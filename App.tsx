import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import { Post, ViewMode } from './types';
import { getPosts, addPost, deletePost } from './services/firebaseService';
import { Copy, X } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('USER');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [visitCount, setVisitCount] = useState(76738);

  // Fetch Data on Mount
  useEffect(() => {
    // 🔥 FIREBASE: Load initial data
    getPosts().then(data => setPosts(data));
    
    // Simulate visitor count increment
    const interval = setInterval(() => {
      setVisitCount(prev => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleAddPost = async (newPostData: Omit<Post, 'id'>) => {
    // 🔥 FIREBASE: Add to DB
    const createdPost = await addPost(newPostData);
    setPosts([createdPost, ...posts]);
  };

  const handleDeletePost = async (id: string) => {
    // 🔥 FIREBASE: Delete from DB
    await deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Prompt Copied Successfully!');
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans text-[#333]">
      <Header 
        onOpenMenu={() => setIsSidebarOpen(true)} 
        visitCount={visitCount} 
        viewMode={viewMode}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentMode={viewMode}
        onToggleMode={() => setViewMode(prev => prev === 'USER' ? 'ADMIN' : 'USER')}
      />

      {/* Main Content Area */}
      {viewMode === 'USER' ? (
        <Home posts={posts} onViewPost={setSelectedPost} />
      ) : (
        <Admin 
          posts={posts} 
          onAddPost={handleAddPost} 
          onDeletePost={handleDeletePost}
          onViewPost={setSelectedPost}
        />
      )}

      <Footer />

      {/* Prompt View Modal (Overlay) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/80 z-[4000] flex justify-center items-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 p-2 rounded-full transition z-10"
            >
              <X size={24} />
            </button>

            <div className="relative h-[250px] sm:h-[350px] bg-gray-200">
               <img src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                 <h2 className="text-white text-2xl font-bold p-6">{selectedPost.title}</h2>
               </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                <span className="text-primary font-bold uppercase text-sm tracking-wider mb-3 block">Prompt</span>
                <div className="font-mono text-[15px] text-gray-700 bg-white p-4 rounded-lg border-l-4 border-primary leading-relaxed break-words">
                  {selectedPost.content}
                </div>
              </div>

              <button 
                onClick={() => copyToClipboard(selectedPost.content)}
                className="w-full bg-dark text-white font-bold py-3.5 rounded-full hover:bg-[#34495e] active:scale-95 transition-all flex justify-center items-center gap-2 shadow-lg"
              >
                <Copy size={20} /> Copy Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;