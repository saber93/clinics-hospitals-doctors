
export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
