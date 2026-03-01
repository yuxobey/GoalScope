"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Calendar, ChevronRight, Activity } from "lucide-react";

// Replit API linkin (Aynı kalsın)
const REPL_URL = "https://4f7fa6fe-9818-43af-b9e8-154f977aa648-00-jtvgtxw7r722.pike.replit.dev:5000/"; 

export default function HomePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Türkiye Süper Lig maçlarını çekiyoruz
    fetch(`${REPL_URL}/matches?year=24/25&league=Turkiye Super Lig`)
      .then(res => res.json())
      .then(data => {
        // Sadece en güncel veya oynanan maçları filtreleyebilirsiniz
        setMatches(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0e14] text-white p-4 pb-20">
      {/* LOGO & HEADER */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-white">GOALSCOPE<span className="text-[#374df5]">PRO</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Canlı Analiz & İstatistik</p>
        </div>
        <div className="w-10 h-10 bg-[#374df5]/10 rounded-full flex items-center justify-center border border-[#374df5]/20">
          <Activity size={20} className="text-[#374df5]" />
        </div>
      </div>

      {/* LİG SEÇİCİ (BASİT) */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <button className="bg-[#374df5] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase">Süper Lig</button>
        <button className="bg-[#151a23] text-slate-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase border border-white/5">Premier League</button>
        <button className="bg-[#151a23] text-slate-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase border border-white/5">Champions League</button>
      </div>

      {/* MAÇ LİSTESİ */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Günün Maçları</h2>
        
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-[#151a23] rounded-2xl border border-white/5"></div>)}
          </div>
        ) : matches.length > 0 ? (
          matches.map((m: any) => (
            <Link key={m.id} href={`/match/${m.id}`}>
              <div className="bg-[#151a23] p-4 rounded-2xl border border-white/5 hover:border-[#374df5]/30 transition-all active:scale-[0.98] mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] text-slate-500 font-bold uppercase">{m.status?.description || 'MAÇ SONU'}</span>
                  <ChevronRight size={14} className="text-slate-600" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-2/5">
                    <img src={`https://img.sofascore.com/api/v1/team/${m.homeTeam.id}/image`} className="w-8 h-8 object-contain" />
                    <span className="text-xs font-bold truncate">{m.homeTeam.shortName || m.homeTeam.name}</span>
                  </div>
                  
                  <div className="flex flex-col items-center w-1/5">
                    <span className="text-lg font-black tracking-tighter">
                      {m.homeScore?.display ?? 0} - {m.awayScore?.display ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-2/5 justify-end">
                    <span className="text-xs font-bold truncate">{m.awayTeam.shortName || m.awayTeam.name}</span>
                    <img src={`https://img.sofascore.com/api/v1/team/${m.awayTeam.id}/image`} className="w-8 h-8 object-contain" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-slate-500 text-sm italic">Maç bulunamadı.</div>
        )}
      </div>

      {/* BOTTOM NAV (MOBİL İÇİN) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0b0e14]/80 backdrop-blur-xl border-t border-white/5 p-4 flex justify-around items-center z-[100]">
        <Link href="/" className="text-[#374df5] flex flex-col items-center gap-1">
          <Trophy size={20} />
          <span className="text-[9px] font-bold">Maçlar</span>
        </Link>
        <div className="text-slate-600 flex flex-col items-center gap-1 opacity-50">
          <Calendar size={20} />
          <span className="text-[9px] font-bold">Fikstür</span>
        </div>
        <div className="text-slate-600 flex flex-col items-center gap-1 opacity-50">
          <Activity size={20} />
          <span className="text-[9px] font-bold">Analiz</span>
        </div>
      </nav>
    </main>
  );
}
