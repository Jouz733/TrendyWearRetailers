'use server'

import { createClient } from '@/utils/supabase/server'

export async function addToCart(itemId: number, quantity: number = 1, size: string, color: string) {
  const supabase = await createClient()

  // Get logged in user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return;
  }
  
  // Get or create active cart for this user
  let cartId: number

  const { data: existingCart } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (existingCart) {
    // Use existing active cart
    cartId = existingCart.id
  } else {
    // Create a new cart
    const { data: newCart, error: cartError } = await supabase
      .from('carts')
      .insert({
        user_id: user.id,
        status: 'active',
        created_at: new Date(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      })
      .select()
      .single()

    if (cartError || !newCart) throw new Error(cartError?.message || 'Failed to create cart')

    cartId = newCart.id
  }

  //  Get current price of the item
  const { data: priceData } = await supabase
    .from('prices')
    .select('price')
    .eq('item_id', itemId)
    .or(`valid_to.is.null,valid_to.gte.${new Date().toISOString()}`)
    .order('priority', { ascending: false })
    .limit(1)
    .single()

  const priceAtTime = priceData?.price ?? 0

  // Get the proper variant ID based on size and color
  const { data: variantData, error: variantError } = await supabase
    .from('item_variants')
    .select('id')
    .eq('item_id', itemId)
    .eq('size', size)
    .eq('color', color)
    .single()

  if (variantError || !variantData) throw new Error(variantError?.message || 'Variant not found')

  //  Check if item already exists in cart
  const { data: existingCartItem } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('cart_id', cartId)
    .eq('variant_id', variantData.id)
    .single()

  if (existingCartItem) {
    // Update quantity if item already in cart
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existingCartItem.quantity + quantity })
      .eq('id', existingCartItem.id)

    if (error) throw new Error(error.message)
    return { success: true, message: 'Cart item quantity updated' }
  }

  //  Add item to cart
  const { error } = await supabase
    .from('cart_items')
    .insert({
      cart_id: cartId,
      variant_id: variantData.id,
      quantity,
      price_at_time: priceAtTime,
      created_at: new Date(),
    })

  if (error) throw new Error(error.message)

  return { success: true, message: 'Added to cart' }
}