export function Input({ type, placeholder, value, onChange }: { type: string; placeholder: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full px-4 py-2 rounded-md bg-gray-700 text-white" />;
  }
  