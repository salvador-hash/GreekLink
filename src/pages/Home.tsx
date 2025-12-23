import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, getMockUsers } from '@/contexts/AuthContext';
import { Post } from '@/types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    authorId: '2',
    content: 'Just landed my dream job at Goldman Sachs! Grateful for all the brothers who helped me along the way. The Greek network is truly invaluable. 🎉',
    createdAt: new Date(Date.now() - 3600000),
    likes: ['1', '3', '4'],
    comments: [
      { id: '1', userId: '3', text: 'Congratulations! Well deserved! 🙌', createdAt: new Date(Date.now() - 1800000) }
    ],
  },
  {
    id: '2',
    authorId: '3',
    content: 'Looking for Delta Gamma sisters in the LA tech scene! Would love to connect and grab coffee. DM me! ☕',
    createdAt: new Date(Date.now() - 86400000),
    likes: ['1', '2'],
    comments: [],
  },
];

const Home = () => {
  const { currentUser } = useAuth();
  const users = getMockUsers();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim() || !currentUser) return;
    const post: Post = {
      id: String(Date.now()),
      authorId: currentUser.id,
      content: newPost,
      createdAt: new Date(),
      likes: [],
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId && currentUser) {
        const liked = post.likes.includes(currentUser.id);
        return {
          ...post,
          likes: liked 
            ? post.likes.filter(id => id !== currentUser.id)
            : [...post.likes, currentUser.id]
        };
      }
      return post;
    }));
  };

  const getUser = (id: string) => users.find(u => u.id === id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Home Feed</h1>
        <p className="text-muted-foreground">See what's happening in your Greek network</p>
      </div>

      {/* Create Post */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-premium p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary">{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share something with your network..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[80px] bg-secondary/30 border-0 resize-none"
            />
            <div className="flex justify-end mt-3">
              <Button onClick={handlePost} disabled={!newPost.trim()} className="rounded-xl">
                <Send className="h-4 w-4 mr-2" /> Post
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => {
          const author = getUser(post.authorId);
          const isLiked = currentUser && post.likes.includes(currentUser.id);
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-premium p-5"
            >
              <div className="flex gap-3 mb-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={author?.avatarUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary">{author?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{author?.name}</p>
                  <p className="text-sm text-muted-foreground">{author?.fraternity} · {author?.university}</p>
                </div>
              </div>
              <p className="text-foreground mb-4">{post.content}</p>
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <Button variant="ghost" size="sm" onClick={() => toggleLike(post.id)} className={isLiked ? 'text-destructive' : 'text-muted-foreground'}>
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} /> {post.likes.length}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" /> {post.comments.length}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
