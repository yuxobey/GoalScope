"use client";
import { DollarSign, Activity, TrendingUp, Award } from "lucide-react";

export default function PlayerDeepView({ data }: any) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-end md:items-center justify-center p-4">
      <div className="bg-[#0c0c0c] w-full max-w-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(55,77,245,0.15)]">
        
        {/* PLAYER HEADER */}
        <div className="p-8 bg-gradient-to-br from-[#1a1a1a] to-black border-b border-white/5 relative">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#374df5] to-purple-600 p-1">
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-black italic">GS</span>
               </div>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">{data.technical?.Player || "Oyuncu"}</h2>
              <div className="flex gap-3 mt-2">
                <span className="text-[10px] font-bold bg-white/5 px-3 py-1 rounded-full text-slate-400">FORVET</span>
                <span className="text-[10px] font-bold bg-[#374df5]/20 px-3 py-1 rounded-full text-[#374df5]">LEVEL: PRO</span>
              </div>
            </div>
          </div>
        </div>

        {/* DATA GRID */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Finansal Kart (Capology + TM) */}
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
            <div className="flex items-center gap-2 mb-4 text-green-500">
              <DollarSign size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Ekonomik Değer</span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Yıllık Brüt Maaş</p>
                <p className="text-xl font-black">{data.finance?.['Gross Salary'] || "Bilinmiyor"} €</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Piyasa Değeri</p>
                <p className="text-xl font-black text-[#374df5]">{data.market?.['Market Value'] || "5.0M"} €</p>
              </div>
            </div>
          </div>

          {/* Teknik Kart (FBref) */}
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
            <div className="flex items-center gap-2 mb-4 text-blue-500">
              <Activity size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Teknik Analiz (90dk)</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] text-slate-500 font-bold uppercase">xG (Beklenen Gol)</p>
                <p className="text-lg font-black">{data.technical?.xG || "0.45"}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500 font-bold uppercase">Pas İsabeti</p>
                <p className="text-lg font-black">%{data.technical?.['Cmp%'] || "82"}</p>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER ACTION */}
        <div className="p-6 bg-white/5 flex justify-center">
           <button className="bg-[#374df5] hover:bg-[#2a3cb5] text-white text-[10px] font-black uppercase px-12 py-4 rounded-full transition-all shadow-xl shadow-[#374df5]/20">
             Tüm Kariyer İstatistiklerini Gör
           </button>
        </div>
      </div>
    </div>
  );
                  }
