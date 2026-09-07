import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 font-mono-label text-[11px] transition duration-300";

  const variants = {
    solid:
      "bg-brand text-white hover:bg-[#0011a8] border border-transparent",
    outline:
      "border border-current bg-transparent hover:bg-white/10",
    dark: "bg-ink-dark text-white hover:bg-black border border-transparent",
    light:
      "bg-white text-ink-dark hover:bg-brand-soft border border-transparent",
  };

  const classes = `${base} ${variants[variant] || variants.solid} ${className}`;

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
