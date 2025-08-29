import React, { useState } from "react";
import { uploadImage } from "../../../utils/uploadImage"; // adjust path as needed

type Product = {
  id?: string;
  title: string;
  artist: string;
  genre: string;
  year: string;
  price: string;
  stock: number;
  description: string;
  image: string; // URL or base64 for now
  tags?: string[];
  status: "active" | "inactive";
  imageFile?: File; // Add this line
};

type ProductFormProps = {
  initialData?: Product;
  onSubmit: (product: Product) => void;
  onCancel?: () => void;
};

const defaultProduct: Product = {
  title: "",
  artist: "",
  genre: "",
  year: "",
  price: "",
  stock: 1,
  description: "",
  image: "",
  tags: [],
  status: "active",
};

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [product, setProduct] = useState<Product>(initialData || defaultProduct);

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
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: name === "stock" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = product.image;
    if (product.imageFile) {
      imageUrl = await uploadImage(product.imageFile);
    }
    onSubmit({ ...product, image: imageUrl });
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
        gap: 16,
      }}
    >
      <h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "1.3rem" }}>
        {initialData ? "Editar producto" : "Agregar producto"}
      </h2>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={product.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="artist"
        placeholder="Artista"
        value={product.artist}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="genre"
        placeholder="Género"
        value={product.genre}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="year"
        placeholder="Año"
        value={product.year}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="price"
        placeholder="Precio"
        value={product.price}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        min={0}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={product.description}
        onChange={handleChange}
        required
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      <input
        type="text"
        name="tags"
        placeholder="Etiquetas (separadas por coma)"
        value={product.tags?.join(", ") || ""}
        onChange={e =>
          setProduct((p) => ({
            ...p,
            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
          }))
        }
        style={inputStyle}
      />
      <div>
        <label style={{ color: "var(--accent)", fontWeight: 500 }}>
          Imagen de portada:
        </label>
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
      </div>
      <select
        name="status"
        value={product.status}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
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

export default ProductForm;