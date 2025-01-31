export function Button({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    return (
      <button onClick={onClick} className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ${className}`}>
        {children}
      </button>
    );
  }
  