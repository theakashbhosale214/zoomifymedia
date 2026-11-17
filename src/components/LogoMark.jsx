/**
 * The Zoomify arrow mark, redrawn as SVG so it can take the site palette.
 * Pass the original brand colours (e.g. a="#f43fe0" b="#2a2ae0" c="#7a2be8")
 * to render it exactly like the source logo.
 */
export default function LogoMark({
  className = "",
  a = "var(--color-peach)",
  b = "currentColor",
  c = "var(--color-powder)",
  title,
}) {
  return (
    <svg
      viewBox="0 0 268 320"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d="M136 0 L177 72 L83 233 L0 233 Z" fill={a} />
      <path d="M177 72 L268 233 L183 233 L134 147 Z" fill={b} />
      <path d="M135 147 L183 233 L135 320 L87 233 Z" fill={c} fillOpacity="0.95" />
    </svg>
  );
}
