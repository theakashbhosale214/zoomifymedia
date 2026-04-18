export default function Section({ children, id, className = "", dark = false }) {
  return (
    <section
      id={id}
      className={`py-20 px-6 ${dark ? "bg-gray-950 text-white" : "bg-white"} ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
