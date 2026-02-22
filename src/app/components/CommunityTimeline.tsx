import { Heart, MapPin, Share2, MessageCircle, Camera, AlertCircle, ChevronDown, X, Send, MoreVertical, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchPosts, createPost, updatePost, deletePost, likePost, fetchComments, addComment, deleteComment, PostComment } from '../../lib/db';

interface Post {
  id: number;
  user_name: string;
  user_avatar: string;
  user_location: string;
  content: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  animal_type: string;
  image_url?: string;
  likes: number;
  comments: number;
  shares: number;
  created_at?: string;
  liked?: boolean;
  isOwn?: boolean;
}

export function CommunityTimeline() {
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [postLocation, setPostLocation] = useState('');
  const [postUrgency, setPostUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [postAnimalType, setPostAnimalType] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState('');
  const [postUserName, setPostUserName] = useState('');
  const [commentsMap, setCommentsMap] = useState<Record<number, PostComment[]>>({});
  const [commentsLoading, setCommentsLoading] = useState<Record<number, boolean>>({});
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [sessionPostIds, setSessionPostIds] = useState<Set<number>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    loadPosts(new Set());
  }, []);

  const loadPosts = async (currentSessionIds: Set<number> = new Set()) => {
    setLoading(true);
    const data = await fetchPosts();

    // ✅ Filter out any Anonymous posts from showing in the feed
    const filtered = data.filter(
      p => p.user_name.trim().toLowerCase() !== 'anonymous' && p.user_name.trim() !== ''
    );

    setPosts(filtered.map(p => ({ ...p, liked: false, isOwn: currentSessionIds.has(p.id!) })));
    setLoading(false);
  };

  const urgencyColors = {
    Critical: 'bg-red-500',
    High: 'bg-orange-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  const handleCreatePost = async () => {
    // ✅ Name is required — no Anonymous allowed
    if (!postUserName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!newPost.trim() || !postLocation.trim() || !postAnimalType.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const saved = await createPost({
      user_name: postUserName.trim(), // ✅ No || 'Anonymous' fallback
      user_avatar: 'https://i.pravatar.cc/150?img=10',
      user_location: postLocation,
      content: newPost,
      urgency: postUrgency,
      location: postLocation,
      animal_type: postAnimalType,
      image_url: selectedImage || undefined,
      likes: 0,
      comments: 0,
      shares: 0,
    });

    if (saved) {
      const updatedIds = new Set([...sessionPostIds, saved.id!]);
      setSessionPostIds(updatedIds);
      setPosts(prev => [{ ...saved, liked: false, isOwn: true }, ...prev]);
      toast.success('Your rescue alert has been posted to the community!');
    } else {
      toast.error('Failed to post. Please try again.');
    }

    setSubmitting(false);
    setNewPost('');
    setPostLocation('');
    setPostUrgency('Medium');
    setPostAnimalType('');
    setSelectedImage(null);
    setPostUserName('');
    setShowPostForm(false);
  };

  const handleLike = async (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    await likePost(postId, post.likes, !!post.liked);
    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
        : p
    ));
  };

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: `Help rescue this ${post.animal_type}`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
    setPosts(posts.map(p => p.id === post.id ? { ...p, shares: p.shares + 1 } : p));
  };

  const loadComments = async (postId: number) => {
    setCommentsLoading(prev => ({ ...prev, [postId]: true }));
    const data = await fetchComments(postId);
    setCommentsMap(prev => ({ ...prev, [postId]: data }));
    setCommentsLoading(prev => ({ ...prev, [postId]: false }));
  };

  const handleToggleComments = (postId: number) => {
    const next = showComments === postId ? null : postId;
    setShowComments(next);
    if (next && !commentsMap[postId]) {
      loadComments(next);
    }
  };

  const handleComment = async (postId: number) => {
    if (!commentText.trim()) return;
    if (!userName.trim()) {
      toast.error('Please enter your name first');
      return;
    }
    setCommentSubmitting(true);
    const saved = await addComment({
      post_id: postId,
      user_name: userName.trim(),
      content: commentText.trim(),
    });
    if (saved) {
      setCommentsMap(prev => ({ ...prev, [postId]: [...(prev[postId] || []), saved] }));
      setPosts(posts.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p));
      toast.success('Comment posted!');
      setCommentText('');
    } else {
      toast.error('Failed to post comment.');
    }
    setCommentSubmitting(false);
  };

  const handleDeleteComment = async (commentId: number, postId: number) => {
    const ok = await deleteComment(commentId, postId);
    if (ok) {
      setCommentsMap(prev => ({ ...prev, [postId]: prev[postId].filter(c => c.id !== commentId) }));
      setPosts(posts.map(p => p.id === postId ? { ...p, comments: Math.max(p.comments - 1, 0) } : p));
      toast.success('Comment deleted.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (postId: number) => {
    const ok = await deletePost(postId);
    if (ok) {
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Post deleted.');
    } else {
      toast.error('Failed to delete post.');
    }
    setOpenMenu(null);
  };

  const handleStartEdit = (post: Post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
    setOpenMenu(null);
  };

  const handleSaveEdit = async (postId: number) => {
    if (!editContent.trim()) return;
    const ok = await updatePost(postId, { content: editContent });
    if (ok) {
      setPosts(posts.map(p => p.id === postId ? { ...p, content: editContent } : p));
      toast.success('Post updated!');
    } else {
      toast.error('Failed to update post.');
    }
    setEditingPostId(null);
  };

  return (
    <section className="py-20 bg-[#FFF6ED]" id="community-timeline">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-[#3A2E2A] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Community Rescue Feed
          </h2>
          <p className="text-[#5A4E4A] text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
            Share rescue alerts and help animals in your community
          </p>
        </div>

        {/* Create Post Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FF914D] rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex-1 text-left px-4 py-3 bg-[#FFF6ED] rounded-full text-[#5A4E4A] hover:bg-[#FFE8D6] transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {postUserName
                ? `Hi ${postUserName}! Report an animal that needs help...`
                : 'Report an animal that needs help...'}
            </button>
          </div>

          {showPostForm && (
            <div className="space-y-4 pt-4 border-t border-[#FFF6ED]">

              {/* Your Name — full width at top */}
              <input
                type="text"
                placeholder="Your name *"
                value={postUserName}
                onChange={(e) => setPostUserName(e.target.value)}
                className="w-full px-4 py-3 bg-[#FFF6ED] rounded-full border-2 border-transparent focus:border-[#FF914D] focus:outline-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />

              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Describe the situation, location, and what help is needed..."
                className="w-full px-4 py-3 bg-[#FFF6ED] rounded-2xl border-2 border-transparent focus:border-[#FF914D] focus:outline-none resize-none"
                rows={4}
                style={{ fontFamily: 'Inter, sans-serif' }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Location *"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  className="px-4 py-2 bg-[#FFF6ED] rounded-full border-2 border-transparent focus:border-[#FF914D] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <input
                  type="text"
                  placeholder="Animal Type *"
                  value={postAnimalType}
                  onChange={(e) => setPostAnimalType(e.target.value)}
                  className="px-4 py-2 bg-[#FFF6ED] rounded-full border-2 border-transparent focus:border-[#FF914D] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <select
                  value={postUrgency}
                  onChange={(e) => setPostUrgency(e.target.value as any)}
                  className="px-4 py-2 bg-[#FFF6ED] rounded-full border-2 border-transparent focus:border-[#FF914D] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {selectedImage && (
                <div className="relative">
                  <img src={selectedImage} alt="Preview" className="w-full h-64 object-cover rounded-2xl" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 px-4 py-2 text-[#5A4E4A] hover:bg-[#FFF6ED] rounded-full transition-all cursor-pointer">
                  <Camera className="w-5 h-5" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPostForm(false)}
                    className="px-6 py-3 bg-white text-[#5A4E4A] border-2 border-[#FFE8D6] rounded-full hover:bg-[#FFF6ED] transition-all"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={submitting}
                    className="px-8 py-3 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all disabled:opacity-60 flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting ? 'Posting...' : 'Post Alert'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Posts Feed */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#FF914D] animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif' }}>
            No posts yet. Be the first to report a rescue! 🐾
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">

                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.user_avatar}
                        alt={post.user_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-[#3A2E2A]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                          {post.user_name}
                        </h4>
                        <div className="flex items-center gap-2 text-[#5A4E4A] text-sm">
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>
                            {post.created_at
                              ? new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                              : 'Just now'}
                          </span>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{post.user_location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: urgency badge + 3-dot menu */}
                    <div className="flex items-center gap-2">
                      <div className={`${urgencyColors[post.urgency]} text-white px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                        <AlertCircle className="w-4 h-4" />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{post.urgency}</span>
                      </div>

                      {/* 3-dot menu on ALL posts */}
                      <div className="relative" ref={openMenu === post.id ? menuRef : null}>
                        <button
                          onClick={() => setOpenMenu(openMenu === post.id ? null : post.id)}
                          className="p-2 rounded-full hover:bg-[#FFF6ED] transition-all text-[#5A4E4A]"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openMenu === post.id && (
                          <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-xl border border-[#FFE8D6] overflow-hidden min-w-[150px]">
                            {post.isOwn ? (
                              <>
                                <button
                                  onClick={() => handleStartEdit(post)}
                                  className="flex items-center gap-2 w-full px-4 py-3 text-[#3A2E2A] hover:bg-[#FFF6ED] transition-all text-sm"
                                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                                >
                                  <Pencil className="w-4 h-4 text-[#FF914D]" />
                                  Edit Post
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="flex items-center gap-2 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition-all text-sm border-t border-[#FFF6ED]"
                                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete Post
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  toast.success('Post reported. Thank you!');
                                  setOpenMenu(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-3 text-[#5A4E4A] hover:bg-[#FFF6ED] transition-all text-sm"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                              >
                                <AlertCircle className="w-4 h-4 text-[#FF914D]" />
                                Report Post
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  {editingPostId === post.id ? (
                    <div className="mb-4">
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FFF6ED] rounded-2xl border-2 border-[#FF914D] focus:outline-none resize-none"
                        rows={4}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2 justify-end">
                        <button
                          onClick={() => setEditingPostId(null)}
                          className="px-5 py-2 rounded-full border-2 border-[#FFE8D6] text-[#5A4E4A] hover:bg-[#FFF6ED] text-sm transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(post.id)}
                          className="px-5 py-2 rounded-full bg-[#FF914D] text-white text-sm hover:bg-[#FF7A2E] transition-all"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#3A2E2A] mb-4" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6, fontSize: '1rem' }}>
                      {post.content}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-3 py-1 bg-[#FFF6ED] text-[#FF914D] rounded-full text-sm"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {post.animal_type}
                    </span>
                    <span className="px-3 py-1 bg-[#FFF6ED] text-[#5A4E4A] rounded-full text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{post.location}</span>
                    </span>
                  </div>
                </div>

                {/* Post Image */}
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="Rescue animal"
                    className="w-full h-96 object-cover"
                  />
                )}

                {/* Post Actions */}
                <div className="p-4 border-t border-[#FFF6ED]">
                  <div className="flex items-center justify-between text-[#5A4E4A] mb-3 text-sm">
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{post.likes} people want to help</span>
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{post.comments} comments · {post.shares} shares</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center justify-center gap-2 py-2 hover:bg-[#FFF6ED] rounded-lg transition-all"
                    >
                      <Heart className={`w-5 h-5 ${post.liked ? 'fill-[#FF914D] text-[#FF914D]' : 'text-[#5A4E4A]'}`} />
                      <span className="text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                        {post.liked ? 'Helped' : 'Help'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleToggleComments(post.id)}
                      className="flex items-center justify-center gap-2 py-2 hover:bg-[#FFF6ED] rounded-lg transition-all"
                    >
                      <MessageCircle className="w-5 h-5 text-[#5A4E4A]" />
                      <span className="text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Comment</span>
                    </button>
                    <button
                      onClick={() => handleShare(post)}
                      className="flex items-center justify-center gap-2 py-2 hover:bg-[#FFF6ED] rounded-lg transition-all"
                    >
                      <Share2 className="w-5 h-5 text-[#5A4E4A]" />
                      <span className="text-[#5A4E4A]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments === post.id && (
                    <div className="mt-4 pt-4 border-t border-[#FFE8D6] space-y-3">
                      {commentsLoading[post.id] ? (
                        <div className="flex justify-center py-3">
                          <Loader2 className="w-5 h-5 text-[#FF914D] animate-spin" />
                        </div>
                      ) : commentsMap[post.id]?.length > 0 ? (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {commentsMap[post.id].map(comment => (
                            <div key={comment.id} className="flex gap-2 items-start group">
                              <div className="w-7 h-7 rounded-full bg-[#FF914D] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {comment.user_name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 bg-[#FFF6ED] rounded-2xl px-3 py-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[#3A2E2A] text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {comment.user_name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#5A4E4A] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      {comment.created_at
                                        ? new Date(comment.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                                        : 'Just now'}
                                    </span>
                                    {comment.user_name === userName && (
                                      <button
                                        onClick={() => handleDeleteComment(comment.id!, post.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 className="w-3 h-3 text-red-400 hover:text-red-600" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-[#5A4E4A] text-sm mt-0.5" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                                  {comment.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-[#5A4E4A] text-sm py-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          No comments yet. Be the first! 🐾
                        </p>
                      )}

                      {/* Name + Comment Input */}
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={userName}
                          onChange={e => setUserName(e.target.value)}
                          placeholder="Your name *"
                          className="w-full px-4 py-2 bg-[#FFF6ED] rounded-full border border-[#FFE8D6] focus:outline-none focus:ring-2 focus:ring-[#FF914D] text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 px-4 py-2 bg-[#FFF6ED] rounded-full border border-[#FFE8D6] focus:outline-none focus:ring-2 focus:ring-[#FF914D] text-sm"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            onKeyPress={e => e.key === 'Enter' && handleComment(post.id)}
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            disabled={commentSubmitting}
                            className="p-2 bg-[#FF914D] text-white rounded-full hover:bg-[#FF7A2E] transition-all disabled:opacity-60"
                          >
                            {commentSubmitting
                              ? <Loader2 className="w-5 h-5 animate-spin" />
                              : <Send className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <button
            className="px-8 py-4 bg-white text-[#FF914D] border-2 border-[#FF914D] rounded-full hover:bg-[#FF914D] hover:text-white transition-all hover:shadow-lg flex items-center gap-2 mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            Load More Posts
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}