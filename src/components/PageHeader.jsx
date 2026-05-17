export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-col gap-4 border-b border-slate-800/80 pb-5 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-[1.65rem] font-semibold tracking-tight text-white">{title}</h1>
        {subtitle ? <p className="max-w-3xl text-sm leading-relaxed text-slate-400">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
