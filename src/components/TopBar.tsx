export function TopBar() {
  return (
    <div className="relative z-20 flex justify-between items-center px-8 py-4 border-b border-red-950/30">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-red-500/60 text-xs tracking-[0.3em]">SYSTEM ONLINE</span>
      </div>
      <div className="text-red-800/60 text-xs tracking-[0.2em]">
        N109-ZONE // CLASSIFIED
      </div>
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
        <div className="w-1 h-1 bg-red-500/50 rounded-full animate-pulse delay-75" />
        <div className="w-1 h-1 bg-red-500/30 rounded-full animate-pulse delay-150" />
      </div>
    </div>
  );
}
