import { supabase } from './supabase';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface CommunityPost {
  id?: number;
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
}

export interface VolunteerSignup {
  id?: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
}

export interface AdoptionApplication {
  id?: number;
  animal_id: number;
  animal_name: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  home_type: string;
  has_yard: string;
  has_other_pets: string;
  other_pets_details?: string;
  pet_experience: string;
  why_adopt: string;
  agree_home_visit: boolean;
  agree_responsibility: boolean;
  created_at?: string;
}

// ─────────────────────────────────────────────
// COMMUNITY POSTS
// ─────────────────────────────────────────────

export async function fetchPosts(): Promise<CommunityPost[]> {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
  return data || [];
}

export async function createPost(post: Omit<CommunityPost, 'id' | 'created_at'>): Promise<CommunityPost | null> {
  const { data, error } = await supabase
    .from('community_posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error.message);
    return null;
  }
  return data;
}

export async function updatePost(id: number, updates: Partial<CommunityPost>): Promise<boolean> {
  const { error } = await supabase
    .from('community_posts')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating post:', error.message);
    return false;
  }
  return true;
}

export async function deletePost(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('community_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error.message);
    return false;
  }
  return true;
}

export async function likePost(id: number, currentLikes: number, liked: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('community_posts')
    .update({ likes: liked ? currentLikes - 1 : currentLikes + 1 })
    .eq('id', id);

  if (error) {
    console.error('Error liking post:', error.message);
    return false;
  }
  return true;
}

// ─────────────────────────────────────────────
// VOLUNTEER SIGNUPS
// ─────────────────────────────────────────────

export async function submitVolunteerSignup(signup: Omit<VolunteerSignup, 'id' | 'created_at'>): Promise<boolean> {
  const { error } = await supabase
    .from('volunteer_signups')
    .insert([signup]);

  if (error) {
    console.error('Error saving volunteer signup:', error.message);
    return false;
  }
  return true;
}

// ─────────────────────────────────────────────
// ADOPTION APPLICATIONS
// ─────────────────────────────────────────────

export async function submitAdoptionApplication(
  application: Omit<AdoptionApplication, 'id' | 'created_at'>
): Promise<boolean> {
  const { error } = await supabase
    .from('adoption_applications')
    .insert([application]);

  if (error) {
    console.error('Error saving adoption application:', error.message);
    return false;
  }
  return true;
}

// ─────────────────────────────────────────────
// COMMENTS
// ─────────────────────────────────────────────

export interface PostComment {
  id?: number;
  post_id: number;
  user_name: string;
  content: string;
  created_at?: string;
}

export async function fetchComments(postId: number): Promise<PostComment[]> {
  const { data, error } = await supabase
    .from('post_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error.message);
    return [];
  }
  return data || [];
}

export async function addComment(comment: Omit<PostComment, 'id' | 'created_at'>): Promise<PostComment | null> {
  const { data, error } = await supabase
    .from('post_comments')
    .insert([comment])
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error.message);
    return null;
  }

  // Increment comment count on the post
  await supabase.rpc('increment_comments', { post_id: comment.post_id });

  return data;
}

export async function deleteComment(commentId: number, postId: number): Promise<boolean> {
  const { error } = await supabase
    .from('post_comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment:', error.message);
    return false;
  }

  // Decrement comment count on the post
  await supabase.rpc('decrement_comments', { post_id: postId });

  return true;
}