export default function Card({ title, desc, icon, className = "" }) {
  return (
    <div
      className={`bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ${className}`}
    >
      {icon && (
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}
