import React, { useState } from "react";
import { uploadImage } from "../../../utils/supabaseUploadImage"; // adjust path if needed

type ProductFormProps = {
  initialData?: {
    title?: string;
    artist?: string;
    tipo?: string;
    genero?: string;
    estado?: string;
    condicion?: string;
    badge?: string;
    description?: string;
    year?: string;
    featured?: boolean;
    newArrival?: boolean;
    beatlesShowcase?: boolean;
    status?: string;
    price?: number | string;
    oldPrice?: number | string;
    quantity?: number | string;
    createdAt?: string;
    tags?: string[] | string;
    image?: string;
    images?: string[] | string;
  };
  onSubmit: (
    product: {
      title: string;
      artist: string;
      tipo: string;
      genero: string;
      estado: string;
      condicion: string;
      badge: string;
      description: string;
      year: string;
      featured: boolean;
      newArrival: boolean;
      beatlesShowcase: boolean;
      status: string;
      price: number;
      oldPrice: number;
      quantity: number;
      createdAt: string;
      tags: string[];
      image: string;
      images: string[];
    }
  ) => Promise<void>;
  onCancel?: () => void;
};

// Add estado and condicion to defaultProduct
const defaultProduct = {
  title: "",
  artist: "",
  tipo: "",
  genero: "",
  estado: "",
  condicion: "",
  badge: "",
  description: "",
  year: "",
  featured: false,
  newArrival: false,
  beatlesShowcase: false,
  status: "active",
  price: "",      // <-- empty string for input
  oldPrice: "",   // <-- empty string for input
  quantity: "",   // <-- empty string for input
  createdAt: undefined,
  tags: [],
  image: "",
  images: [],
};

type ProductFormState = {
  title: string;
  artist: string;
  tipo: string;
  genero: string;
  estado: string;
  condicion: string;
  badge: string;
  description: string;
  year: string;
  featured: boolean;
  newArrival: boolean;
  beatlesShowcase: boolean;
  status: string;
  price: number | string;
  oldPrice: number | string;
  quantity: number | string;
  createdAt?: string;
  tags: string[] | string;
  image: string;
  images: string[] | string;
};

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [product, setProduct] = useState<ProductFormState>({
    ...defaultProduct,
    ...initialData,
    title: initialData?.title ?? "",
    artist: initialData?.artist ?? "",
    tipo: initialData?.tipo ?? "",
    genero: initialData?.genero ?? "",
    estado: initialData?.estado ?? "",
    condicion: initialData?.condicion ?? "",
    badge: initialData?.badge ?? "",
    description: initialData?.description ?? "",
    year: initialData?.year ?? "",
    featured: initialData?.featured ?? false,
    newArrival: initialData?.newArrival ?? false,
    beatlesShowcase: initialData?.beatlesShowcase ?? false,
    status: initialData?.status ?? "active",
    price: initialData?.price ?? "",
    oldPrice: initialData?.oldPrice ?? "",
    quantity: initialData?.quantity ?? "",
    createdAt: initialData?.createdAt ?? undefined,
    tags: Array.isArray(initialData?.tags)
      ? initialData.tags
      : typeof initialData?.tags === "string" && initialData?.tags
      ? initialData.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    image: initialData?.image ?? "",
    images: Array.isArray(initialData?.images)
      ? initialData.images
      : typeof initialData?.images === "string" && initialData?.images
      ? initialData.images.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
  });
  const [uploading, setUploading] = useState(false);

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    const uploadedUrls: string[] = [];
    for (const file of files) {
      try {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      } catch (err) {
        // Optionally show error to user
      }
    }
    setProduct((p) => {
      const allImages = [...(Array.isArray(p.images) ? p.images : []), ...uploadedUrls];
      return {
        ...p,
        images: allImages,
        image: allImages[0] ?? "",
      };
    });
    setUploading(false);
  };

  // Remove image from preview and array
  const handleRemoveImage = (idx: number) => {
    setProduct((p) => {
      const newImages = Array.isArray(p.images) ? [...p.images] : [];
      newImages.splice(idx, 1);
      return {
        ...p,
        images: newImages,
        image: newImages[0] ?? "",
      };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setProduct((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "price" || name === "oldPrice" || name === "quantity") {
      setProduct((p) => ({ ...p, [name]: value }));
    } else if (name === "tags") {
      setProduct((p) => ({
        ...p,
        tags: value.split(",").map((t) => t.trim()).filter(Boolean),
      }));
    } else {
      setProduct((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const safeProduct = {
      title: product.title,
      artist: product.artist,
      tipo: product.tipo,
      genero: product.genero,
      estado: product.estado,
      condicion: product.condicion,
      badge: product.badge,
      description: product.description,
      year: product.year,
      featured: product.featured,
      newArrival: product.newArrival,
      beatlesShowcase: product.beatlesShowcase,
      status: product.status === "true" ? true : false,
      image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "",
      images: Array.isArray(product.images) ? product.images : [],
      tags: Array.isArray(product.tags)
        ? product.tags
        : typeof product.tags === "string" && product.tags
        ? product.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      price: product.price === "" ? 0 : Number(product.price),
      oldPrice: product.oldPrice === "" ? 0 : Number(product.oldPrice),
      quantity: product.quantity === "" ? 0 : Number(product.quantity),
      createdAt:
        product.createdAt && typeof product.createdAt === "string"
          ? product.createdAt
          : new Date().toISOString(),
    };
    try {
      await onSubmit(safeProduct);
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--card)",
        borderRadius: 12,
        boxShadow: "var(--shadow)",
        padding: 24,
        maxWidth: 420,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "1.3rem", marginBottom: 8 }}>
        {initialData ? "Editar producto" : "Agregar producto"}
      </h2>
      {/* Title */}
      <label style={badgeLabel}>Título</label>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={product.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      {/* Artist */}
      <label style={badgeLabel}>Artista</label>
      <input
        type="text"
        name="artist"
        placeholder="Artista"
        value={product.artist}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      {/* Tipo */}
      <label style={badgeLabel}>Tipo</label>
      <input
        type="text"
        name="tipo"
        placeholder="Tipo"
        value={product.tipo}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      {/* Genero */}
      <label style={badgeLabel}>Género</label>
      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={product.genero}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      {/* Estado */}
      <label style={badgeLabel}>Estado</label>
      <input
        type="text"
        name="estado"
        placeholder="Estado"
        value={product.estado}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      {/* Condicion */}
      <label style={badgeLabel}>Condición</label>
      <input
        type="text"
        name="condicion"
        placeholder="Condición"
        value={product.condicion}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      {/* Badge */}
      <label style={badgeLabel}>Badge</label>
      <input
        type="text"
        name="badge"
        placeholder="Badge"
        value={product.badge}
        onChange={handleChange}
        style={inputStyle}
      />
      {/* Description */}
      <label style={badgeLabel}>Descripción</label>
      <textarea
        name="description"
        placeholder="Descripción"
        value={product.description}
        onChange={handleChange}
        required
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      {/* Year */}
      <label style={badgeLabel}>Año</label>
      <input
        type="text"
        name="year"
        placeholder="Año"
        value={product.year}
        onChange={handleChange}
        style={inputStyle}
      />
      {/* Featured */}
      <label style={badgeLabel}>
        <input
          type="checkbox"
          name="featured"
          checked={product.featured}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        Destacado
      </label>
      {/* New Arrival */}
      <label style={badgeLabel}>
        <input
          type="checkbox"
          name="newArrival"
          checked={product.newArrival}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        Nuevo lanzamiento
      </label>
      {/* Beatles Showcase */}
      <label style={badgeLabel}>
        <input
          type="checkbox"
          name="beatlesShowcase"
          checked={product.beatlesShowcase}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        Beatles Showcase
      </label>
      {/* Status */}
      <label style={badgeLabel}>Estado del producto</label>
      <select
        name="status"
        value={product.status}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>
      {/* Price */}
      <label style={badgeLabel}>Precio</label>
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={product.price}
        onChange={handleChange}
        style={inputStyle}
        min={0}
      />
      {/* Old Price */}
      <label style={badgeLabel}>Precio anterior</label>
      <input
        type="number"
        name="oldPrice"
        placeholder="Precio anterior"
        value={product.oldPrice}
        onChange={handleChange}
        style={inputStyle}
        min={0}
      />
      {/* Quantity */}
      <label style={badgeLabel}>Cantidad en stock</label>
      <input
        type="number"
        name="quantity"
        placeholder="Cantidad en stock"
        value={product.quantity}
        onChange={handleChange}
        style={inputStyle}
        min={0}
      />
      {/* Tags */}
      <label style={badgeLabel}>Etiquetas (separadas por coma)</label>
      <input
        type="text"
        name="tags"
        placeholder="ej: rock, vinilo, clásico"
        value={Array.isArray(product.tags) ? product.tags.join(", ") : ""}
        onChange={handleChange}
        style={inputStyle}
      />
      {/* Imágenes del producto */}
      <label style={badgeLabel}>Imágenes del producto</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ marginTop: 8 }}
        disabled={uploading}
      />
      {uploading && (
        <div style={{ color: "var(--accent)", marginTop: 8 }}>Subiendo imágenes...</div>
      )}
      {Array.isArray(product.images) && product.images.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {product.images.map((img, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <img
                src={img}
                alt={`Imagen ${idx + 1}`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  boxShadow: "var(--shadow)",
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  background: "#b80000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "var(--shadow)",
                }}
                title="Eliminar imagen"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button
          type="submit"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontWeight: "bold",
            fontSize: "1.05rem",
            cursor: "pointer",
            boxShadow: "var(--shadow)",
            transition: "background 0.2s",
          }}
        >
          {initialData ? "Guardar cambios" : "Agregar"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "var(--muted)",
              color: "var(--text)",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontWeight: "bold",
              fontSize: "1.05rem",
              cursor: "pointer",
              boxShadow: "var(--shadow)",
              transition: "background 0.2s",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--section)",
  color: "var(--text)",
  fontSize: "1rem",
  outline: "none",
};

const badgeLabel: React.CSSProperties = {
  fontWeight: "bold",
  color: "var(--accent)",
  fontSize: "0.97rem",
  marginBottom: 2,
  marginLeft: 2,
  display: "block",
};

export default ProductForm;