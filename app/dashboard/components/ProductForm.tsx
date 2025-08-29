import React, { useState } from "react";
import { uploadImage } from "../../../utils/uploadImage";
import type { Product } from "../page";

type ProductFormProps = {
  initialData?: Product;
  onSubmit: (product: Product) => Promise<void>;
  onCancel?: () => void;
};

const defaultProduct: Product = {
  id: "",
  title: "",
  artist: "",
  price: 0,
  oldPrice: 0,
  image: "",
  tipo: "",
  genero: "",
  estado: "",
  condicion: "",
  featured: false,
  newArrival: false,
  beatlesShowcase: false,
  badge: "",
  quantity: 1,
  description: "",
  tags: [],
  status: "active",
  year: "",
};

type ProductFormState = Product & { imageFile?: File };

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [product, setProduct] = useState<ProductFormState>({
    ...defaultProduct,
    ...initialData,
  });

  // For image preview (simulate upload)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct((p) => ({ ...p, imageFile: file }));
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProduct((p) => ({ ...p, image: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct((p) => ({ ...p, [name]: checked }));
    } else if (name === "price" || name === "oldPrice" || name === "quantity") {
      setProduct((p) => ({ ...p, [name]: value === "" ? "" : Number(value) }));
    } else if (name === "stock") {
      setProduct((p) => ({ ...p, quantity: value === "" ? 0 : Number(value) }));
    } else {
      setProduct((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = product.image;
    if (product.imageFile) {
      imageUrl = await uploadImage(product.imageFile);
    }
    // Convert blank string to 0 for Firestore
    const safeProduct: Product = {
      ...product,
      price: typeof product.price === "string" && product.price === "" ? 0 : Number(product.price),
      oldPrice: typeof product.oldPrice === "string" && product.oldPrice === "" ? 0 : Number(product.oldPrice ?? 0),
      quantity: typeof product.quantity === "string" && product.quantity === "" ? 0 : Number(product.quantity),
      image: imageUrl,
    };
    await onSubmit(safeProduct);
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
      {/* Price */}
      <label style={badgeLabel}>Precio (MXN)</label>
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={product.price === 0 ? "" : product.price}
        onChange={handleChange}
        required
        style={inputStyle}
        min={0}
      />
      {/* Old Price */}
      <label style={badgeLabel}>Precio anterior (opcional)</label>
      <input
        type="number"
        name="oldPrice"
        placeholder="Precio anterior"
        value={product.oldPrice === 0 ? "" : product.oldPrice}
        onChange={handleChange}
        style={inputStyle}
        min={0}
      />
      {/* Tipo */}
      <label style={badgeLabel}>Tipo (Vinilo, CD, etc.)</label>
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
      <label style={badgeLabel}>Estado (Nuevo, Usado)</label>
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
      <label style={badgeLabel}>Condición (Sellado, Excelente, etc.)</label>
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
      <label style={badgeLabel}>Badge (opcional)</label>
      <input
        type="text"
        name="badge"
        placeholder="Badge"
        value={product.badge}
        onChange={handleChange}
        style={inputStyle}
      />
      {/* Quantity */}
      <label style={badgeLabel}>Cantidad en stock</label>
      <input
        type="number"
        name="quantity"
        placeholder="Cantidad en stock"
        value={product.quantity === 0 ? "" : product.quantity}
        onChange={handleChange}
        required
        style={inputStyle}
        min={0}
      />
      {/* Year */}
      <label style={badgeLabel}>Año (opcional)</label>
      <input
        type="text"
        name="year"
        placeholder="Año"
        value={product.year}
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
      {/* Tags */}
      <label style={badgeLabel}>Etiquetas (separadas por coma)</label>
      <input
        type="text"
        name="tags"
        placeholder="Etiquetas"
        value={product.tags?.join(", ") || ""}
        onChange={e =>
          setProduct((p) => ({
            ...p,
            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
          }))
        }
        style={inputStyle}
      />
      {/* Image */}
      <label style={badgeLabel}>Imagen de portada</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: 8 }}
      />
      {product.image && (
        <img
          src={product.image}
          alt="Portada"
          style={{
            width: 80,
            height: 80,
            objectFit: "cover",
            borderRadius: 8,
            marginTop: 8,
            boxShadow: "var(--shadow)",
          }}
        />
      )}
      {/* Switches */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
        <label style={switchLabel}>
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
            style={switchInput}
          />
          Destacado
        </label>
        <label style={switchLabel}>
          <input
            type="checkbox"
            name="newArrival"
            checked={product.newArrival}
            onChange={handleChange}
            style={switchInput}
          />
          Nuevo lanzamiento
        </label>
        <label style={switchLabel}>
          <input
            type="checkbox"
            name="beatlesShowcase"
            checked={product.beatlesShowcase}
            onChange={handleChange}
            style={switchInput}
          />
          Beatles Showcase
        </label>
      </div>
      {/* Status */}
      <label style={badgeLabel}>Estado del producto</label>
      <select
        name="status"
        value={product.status}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
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

const switchLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 500,
  color: "var(--accent)",
  fontSize: "0.98rem",
};

const switchInput: React.CSSProperties = {
  marginRight: 6,
  accentColor: "var(--accent)",
  width: 18,
  height: 18,
};

export default ProductForm;