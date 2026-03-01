export default function PlayerDeepView({ playerStats, marketValue, salary }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 shadow-2xl">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
          <img src={playerStats.photo} className="w-24 h-24 rounded-full border-2 border-blue-500/50 relative z-10" />
        </div>
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">{playerStats.name}</h2>
          <div className="flex gap-2 mt-2">
            <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-blue-400 border border-blue-500/20">
              PIYASA: {marketValue} €
            </span>
            <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-green-400 border border-green-500/20">
              MAAŞ: {salary} €
            </span>
          </div>
        </div>
      </div>

      {/* İstatistik Izgarası */}
      <div className="grid grid-cols-3 gap-4">
        <StatBox label="xG" value={playerStats.xg} color="blue" />
        <StatBox label="PRES" value={playerStats.pressures} color="purple" />
        <StatBox label="PAS %" value={playerStats.passAccuracy} color="green" />
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: any) {
  return (
    <div className="bg-white/5 p-4 rounded-3xl border border-white/5 text-center">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-xl font-black text-${color}-500`}>{value}</p>
    </div>
  );
        }
