export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
