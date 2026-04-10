'use client';

import { createClient } from "@/utils/supabase/client";

export type ShoppingCartItem = {
    id: number, 
    name: string, 
    item_id: number,
    category: string, 
    price: number, 
    quantity: number, 
    size: string, 
    color: string, 
    image: string, 
    isFavorite: boolean,
    isEditing: false 
}

const BUCKET_NAME = "images";

export async function fetchShoppingCart(): Promise<ShoppingCartItem[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
const user_id = user?.id;

  const { data: cartForUser, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user_id)
    .eq('status', 'active')
    .maybeSingle();

  if (cartError || !cartForUser) {
    return [];
  }

  const { data: cart_items, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      price_at_time,
      variant:item_variants (
        id,
        size,
        color,
        item:items (
          id,
          name,
          image_id,
          tags
        )
      )
    `)
    .eq("cart_id", cartForUser.id);

  if (error || !cart_items) {
    throw error ?? new Error('No items returned');
  }

  const itemIds = cart_items.map(i => i.variant.id);
  const now = new Date().toISOString();

  const { data: wishlisted } = await supabase
    .from("wishlist")
    .select("item_id")
    .eq("user_id", user_id)
    .in("item_id", itemIds);

  const wishlistSet = new Set<number>();
  if (wishlisted) {
    for (const w of wishlisted) {
      wishlistSet.add(w.item_id);
    }
  }

  const mapped: ShoppingCartItem[] = cart_items.map((ci) => {
    const imageUrls = (ci.variant.item.image_id ?? []).map(
      (imgId: string) =>
        supabase.storage.from(BUCKET_NAME).getPublicUrl(imgId).data.publicUrl
    );

    return {
      id: ci.id,
      name: ci.variant.item.name ?? "Unnamed",
      item_id: ci.variant.item.id,
      category: ci.variant.item.tags,
      price: ci.price_at_time,
      quantity: ci.quantity,
      size: ci.variant.size,
      color: ci.variant.color,
      image: imageUrls.length > 0 ? imageUrls[0] : "/images/placeholder.jpg",
      isFavorite: wishlistSet.has(ci.variant.item.id),
      isEditing: false
    };
  });

  return mapped;
}