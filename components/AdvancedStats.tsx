export default function AdvancedStats({ xG, teamRating }: any) {
  return (
    <div className="bg-[#111] p-5 rounded-[2rem] border border-blue-500/20 shadow-xl">
      <h3 className="text-blue-500 text-[10px] font-black uppercase mb-4 tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Derin İstatistik (FBref/Understat)
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-2xl">
          <p className="text-[8px] text-slate-500 font-bold">BEKLENEN GOL (xG)</p>
          <p className="text-xl font-black text-white">{xG}</p>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-2xl">
          <p className="text-[8px] text-slate-500 font-bold">TAKIM GÜCÜ (ClubElo)</p>
          <p className="text-xl font-black text-white">{teamRating}</p>
        </div>
      </div>
    </div>
  );
}
