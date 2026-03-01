export default function SalaryCard({ salaries }: { salaries: any[] }) {
  return (
    <div className="bg-[#111] p-5 rounded-[2rem] border border-yellow-500/20 shadow-xl">
      <h3 className="text-yellow-500 text-[10px] font-black uppercase mb-4 tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Finansal Analiz (Capology)
      </h3>
      <div className="space-y-3">
        {salaries.slice(0, 5).map((s, i) => (
          <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-slate-300">{s.Player}</span>
            <span className="text-xs font-black text-white">{s['Weekly Gross']} € <span className="text-[8px] text-slate-500">/Haftalık</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}
