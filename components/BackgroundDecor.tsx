export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/40 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:24px_24px]" />
    </div>
  );
}
