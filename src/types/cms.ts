
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
  // Fields from our CMS type
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  // Fields from the database
  name?: string;
  duration?: number;
  price?: number;
  vendor_id?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Adapter function to convert database service format to our CMS format
 */
export function adaptDatabaseService(dbService: any): Service {
  return {
    id: dbService.id,
    title: dbService.name || dbService.title || '',
    description: dbService.description || '',
    icon_name: dbService.icon_name || 'Layers',
    display_order: dbService.display_order || 0,
    is_active: typeof dbService.is_active !== 'undefined' ? dbService.is_active : true,
    name: dbService.name,
    duration: dbService.duration,
    price: dbService.price,
    vendor_id: dbService.vendor_id,
    created_at: dbService.created_at,
    updated_at: dbService.updated_at
  };
}
