export function Card({ children }: { children: React.ReactNode }) {
    return <div className="bg-gray-800 p-4 rounded-lg shadow-md">{children}</div>;
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="mt-2">{children}</div>;
  }
  