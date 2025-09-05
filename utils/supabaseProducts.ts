import { supabase } from "./supabaseClient";

const PRODUCTS_TABLE = "products";
const IMAGES_TABLE = "product_images";

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
    status = true, // <-- default boolean
    price = 0,
    createdAt,
    tags = [],
    beatlesFeatured = false,
    viniloExclusivo = false,
    exitosRock = false,
    edicionColeccion = false,
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
    status: typeof status === "boolean"
      ? status
      : status === "true" || status === true
      ? true
      : false,
    tags: Array.isArray(tags)
      ? tags
      : typeof tags === "string" && tags
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    price: typeof price === "string" ? Number(price) : price,
    createdAt: createdAt ?? new Date().toISOString(),
    beatlesFeatured,
    viniloExclusivo: product.viniloExclusivo ?? false,
    exitosRock: product.exitosRock ?? false,
    edicionColeccion: product.edicionColeccion ?? false,
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

export async function getProductsWithImages() {
  // Get products and their images
  const { data: products, error: prodError } = await supabase.from(PRODUCTS_TABLE).select("*");
  if (prodError) throw prodError;

  const { data: images, error: imgError } = await supabase.from(IMAGES_TABLE).select("*");
  if (imgError) throw imgError;

  // Map images to products
  const productsWithImages = products.map((product: any) => {
    const productImages = images.filter((img: any) => img.product_id === product.id).map((img: any) => img.url);
    return {
      ...product,
      images: productImages,
      image: productImages[0] ?? "",
    };
  });

  return productsWithImages;
}

export async function addProductWithImages(product: any, imageUrls: string[]) {
  // Add product first
  const cleanProduct = mapProductToSchema(product);
  const { data, error } = await supabase.from(PRODUCTS_TABLE).insert([cleanProduct]).select();
  if (error) throw error;
  const newProduct = data?.[0];
  if (!newProduct) throw new Error("No se pudo crear el producto");

  // Add images
  if (imageUrls && imageUrls.length > 0) {
    const imageRows = imageUrls.map((url) => ({
      product_id: newProduct.id,
      url,
    }));
    const { error: imgError } = await supabase.from(IMAGES_TABLE).insert(imageRows);
    if (imgError) throw imgError;
  }
  return { ...newProduct, images: imageUrls, image: imageUrls[0] ?? "" };
}

export async function updateProductWithImages(id: string, product: any, imageUrls: string[]) {
  // Update product
  const cleanProduct = mapProductToSchema(product);
  const { error } = await supabase.from(PRODUCTS_TABLE).update(cleanProduct).eq("id", id);
  if (error) throw error;

  // Remove old images and add new ones
  await supabase.from(IMAGES_TABLE).delete().eq("product_id", id);
  if (imageUrls && imageUrls.length > 0) {
    const imageRows = imageUrls.map((url) => ({
      product_id: id,
      url,
    }));
    const { error: imgError } = await supabase.from(IMAGES_TABLE).insert(imageRows);
    if (imgError) throw imgError;
  }
}

export async function deleteProductWithImages(id: string) {
  await supabase.from(IMAGES_TABLE).delete().eq("product_id", id);
  await supabase.from(PRODUCTS_TABLE).delete().eq("id", id);
}
