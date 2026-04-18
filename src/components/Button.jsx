export default function Button({ children, href, variant = "primary", className = "" }) {
  const base =
    "inline-block px-7 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer";
  const variants = {
    primary: "bg-white text-primary hover:bg-accent hover:scale-105 shadow-lg",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-primary hover:scale-105",
    solid: "bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-lg",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}
