import React, { useState } from "react";
import { uploadImage } from "../../../utils/supabaseUploadImage";

type ProductFormProps = {
  initialData?: any;
  onSubmit: (
    product: any,
    imageUrls: string[]
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
  beatlesFeatured: false,
  viniloExclusivo: false,
  exitosRock: false,
  edicionColeccion: false,
  vinilNuevo: false,
  vinilosenVista: false,
  eleccion: false,
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
  beatlesFeatured: boolean;
  viniloExclusivo: boolean;
  exitosRock: boolean;
  edicionColeccion: boolean;
  vinilNuevo: boolean;
  vinilosenVista: boolean;
  eleccion: boolean;
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
      ? initialData.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    image: initialData?.image ?? "",
    images: Array.isArray(initialData?.images)
      ? initialData.images
      : typeof initialData?.images === "string" && initialData?.images
      ? initialData.images.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [],
    beatlesFeatured: initialData?.beatlesFeatured ?? false,
    viniloExclusivo: initialData?.viniloExclusivo ?? false,
    exitosRock: initialData?.exitosRock ?? false,
    edicionColeccion: initialData?.edicionColeccion ?? false,
    vinilNuevo: initialData?.vinilNuevo ?? false,
    vinilosenVista: initialData?.vinilosenVista ?? false,
    eleccion: initialData?.eleccion ?? false,
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
      status: product.status, // keep as string ("true" or "false")
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
      beatlesFeatured: product.beatlesFeatured,
      viniloExclusivo: product.viniloExclusivo,
      exitosRock: product.exitosRock,
      edicionColeccion: product.edicionColeccion,
      vinilNuevo: product.vinilNuevo,
      vinilosenVista: product.vinilosenVista,
      eleccion: product.eleccion,
    };
    const imageUrls = Array.isArray(product.images) ? product.images : [];
    try {
      await onSubmit(safeProduct, imageUrls);
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--card)",
        borderRadius: 16,
        boxShadow: "0 8px 32px var(--shadow)",
        padding: 32,
        maxWidth: 480,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        border: "1px solid var(--border)",
        animation: "fadeIn 0.7s cubic-bezier(.77,0,.175,1)",
      }}
    >
      <h2 style={{
        color: "var(--accent)",
        fontWeight: "bold",
        fontSize: "1.6rem",
        marginBottom: 12,
        textAlign: "center",
        letterSpacing: 1,
        textShadow: "0 2px 8px var(--bg)",
      }}>
        {initialData ? "Editar producto" : "Agregar producto"}
      </h2>
      {/* Grouped fields for better layout */}
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Título</label>
          <input type="text" name="title" placeholder="Título" value={product.title} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Artista</label>
          <input type="text" name="artist" placeholder="Artista" value={product.artist} onChange={handleChange} required style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Tipo</label>
          <input type="text" name="tipo" placeholder="Tipo" value={product.tipo} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Género</label>
          <input type="text" name="genero" placeholder="Género" value={product.genero} onChange={handleChange} required style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Estado</label>
          <input type="text" name="estado" placeholder="Estado" value={product.estado} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Condición</label>
          <input type="text" name="condicion" placeholder="Condición" value={product.condicion} onChange={handleChange} required style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Precio</label>
          <input type="number" name="price" placeholder="Precio" value={product.price} onChange={handleChange} style={inputStyle} min={0} onWheel={e => e.currentTarget.blur()} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Precio anterior</label>
          <input type="number" name="oldPrice" placeholder="Precio anterior" value={product.oldPrice} onChange={handleChange} style={inputStyle} min={0} onWheel={e => e.currentTarget.blur()} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Cantidad en stock</label>
          <input type="number" name="quantity" placeholder="Cantidad en stock" value={product.quantity} onChange={handleChange} style={inputStyle} min={0} onWheel={e => e.currentTarget.blur()} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Año</label>
          <input type="text" name="year" placeholder="Año" value={product.year} onChange={handleChange} style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Badge</label>
          <input type="text" name="badge" placeholder="Badge" value={product.badge} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={badgeLabel}>Estado del producto</label>
          <select name="status" value={product.status} onChange={handleChange} style={inputStyle}>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      </div>
      <label style={badgeLabel}>Descripción</label>
      <textarea name="description" placeholder="Descripción" value={product.description} onChange={handleChange} required rows={3} style={{ ...inputStyle, resize: "vertical", minHeight: 60 }} />
      <label style={badgeLabel}>Etiquetas (separadas por coma)</label>
      <input type="text" name="tags" placeholder="ej: rock, vinilo, clásico" value={Array.isArray(product.tags) ? product.tags.join(", ") : ""} onChange={handleChange} style={inputStyle} />
      {/* Switches */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
        <label style={switchLabel}>
          <input type="checkbox" name="featured" checked={product.featured} onChange={handleChange} style={switchInput} />
          Destacado
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="newArrival" checked={product.newArrival} onChange={handleChange} style={switchInput} />
          Nuevo lanzamiento
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="beatlesShowcase" checked={product.beatlesShowcase} onChange={handleChange} style={switchInput} />
          Beatles Showcase
        </label>
        <label style={switchLabel}>
          <input
            type="checkbox"
            name="beatlesFeatured"
            checked={product.beatlesFeatured}
            onChange={handleChange}
            style={switchInput}
          />
          Beatles Featured
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="viniloExclusivo" checked={product.viniloExclusivo} onChange={handleChange} style={switchInput} />
          Vinilo Exclusivo
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="exitosRock" checked={product.exitosRock} onChange={handleChange} style={switchInput} />
          Éxitos del Rock
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="edicionColeccion" checked={product.edicionColeccion} onChange={handleChange} style={switchInput} />
          Edición de Colección
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="vinilNuevo" checked={product.vinilNuevo} onChange={handleChange} style={switchInput} />
          Hot New Vinyl
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="vinilosenVista" checked={product.vinilosenVista} onChange={handleChange} style={switchInput} />
          Mostrar en Hot New Vinyls
        </label>
        <label style={switchLabel}>
          <input type="checkbox" name="eleccion" checked={product.eleccion} onChange={handleChange} style={switchInput} />
          Staff Pick
        </label>
      </div>
      {/* Imágenes del producto */}
      <label style={badgeLabel}>Imágenes del producto</label>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ marginTop: 8 }} disabled={uploading} />
      {uploading && (
        <div style={{ color: "var(--accent)", marginTop: 8 }}>Subiendo imágenes...</div>
      )}
      {Array.isArray(product.images) && product.images.length > 0 && (
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {product.images.map((img, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <img
                src={img} // Use the full public URL returned by Supabase
                alt={`Imagen ${idx + 1}`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                  boxShadow: "var(--shadow)",
                  border: "2px solid var(--accent)",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
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
      <div style={{ display: "flex", gap: 12, marginTop: 18, justifyContent: "center" }}>
        <button
          type="submit"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontWeight: "bold",
            fontSize: "1.08rem",
            cursor: "pointer",
            boxShadow: "var(--shadow)",
            transition: "background 0.2s",
            letterSpacing: "1px",
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
              padding: "12px 28px",
              fontWeight: "bold",
              fontSize: "1.08rem",
              cursor: "pointer",
              boxShadow: "var(--shadow)",
              transition: "background 0.2s",
              letterSpacing: "1px",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </form>
  );
};

const inputStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--section)",
  color: "var(--text)",
  fontSize: "1rem",
  outline: "none",
  marginBottom: 2,
  boxShadow: "0 2px 8px var(--shadow)",
  transition: "border 0.2s, box-shadow 0.2s",
};

const badgeLabel: React.CSSProperties = {
  fontWeight: "bold",
  color: "var(--accent)",
  fontSize: "1rem",
  marginBottom: 2,
  marginLeft: 2,
  display: "block",
  letterSpacing: "0.5px",
};

const switchLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 500,
  color: "var(--accent)",
  fontSize: "1rem",
};

const switchInput: React.CSSProperties = {
  marginRight: 6,
  accentColor: "var(--accent)",
  width: 18,
  height: 18,
};

export default ProductForm;