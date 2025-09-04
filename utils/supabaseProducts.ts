import { supabase } from "./supabaseClient";

const PRODUCTS_TABLE = "products";

// Only map fields that exist in your schema
function mapProductToSchema(product: any) {
  const {
    title = "",
    artist = "",
    tipo = "",
    genero = "",
    estado = "",
    condicion = "",
    badge = "",
    description = "",
    year = "",
    featured = false,
    newArrival = false,
    beatlesShowcase = false,
    status = "active",
    price = 0,
    createdAt,
    tags = [],
  } = product;

  return {
    title,
    artist,
    tipo,
    genero,
    estado,
    condicion,
    badge,
    description,
    year,
    featured,
    newArrival,
    beatlesShowcase,
    status,
    tags: Array.isArray(tags)
      ? tags
      : typeof tags === "string" && tags
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    price: typeof price === "string" ? Number(price) : price,
    createdAt: createdAt ?? new Date().toISOString(),
  };
}

export async function getProducts() {
  const { data, error } = await supabase.from(PRODUCTS_TABLE).select("*");
  if (error) throw error;
  return data;
}

export async function addProduct(product: any) {
  const cleanProduct = mapProductToSchema(product);
  const { data, error } = await supabase.from(PRODUCTS_TABLE).insert([cleanProduct]);
  if (error) throw error;
  return data?.[0];
}

export async function updateProduct(id: string, product: any) {
  const cleanProduct = mapProductToSchema(product);
  const { error } = await supabase.from(PRODUCTS_TABLE).update(cleanProduct).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from(PRODUCTS_TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function addMinimalProduct(title: string, artist: string, tipo: string, genero: string) {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert([{ title, artist, tipo, genero }]);
  if (error) throw error;
  return data?.[0];
}
