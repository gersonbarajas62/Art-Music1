export function Button({
  children,
  onClick,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 rounded-md`}
      {...props} // Forward additional props like "disabled"
    >
      {children}
    </button>
  );
}
