"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, Globe, Zap, BarChart3, Award } from "lucide-react";

export default function GlobalFootballHub() {
  const [matches, setMatches] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Ligler");
  const REPL_URL = "https://4f7fa6fe-9818-43af-b9e8-154f977aa648-00-jtvgtxw7r722.pike.replit.dev:5000/";

  const categories = ["Ligler", "UEFA", "FIFA", "Favoriler"];

  useEffect(() => {
    fetch(`${REPL_URL}/hub/all-scores`).then(res => res.json()).then(setMatches);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* PREMIUM HEADER */}
      <header className="p-6 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#374df5] rounded-xl rotate-3 shadow-lg shadow-[#374df5]/20">
              <Shield size={20} />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic">GOALSCOPE<span className="text-[#374df5]">UNIVERSE</span></h1>
          </div>
          <div className="flex gap-4 opacity-60">
            <Globe size={20} />
            <Award size={20} />
          </div>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="flex gap-6 mt-6 max-w-5xl mx-auto overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] pb-2 transition-all ${activeCategory === cat ? "text-[#374df5] border-b-2 border-[#374df5]" : "text-slate-600"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="p-4 max-w-5xl mx-auto space-y-6">
        {/* LIVE TICKER (OPSİYONEL) */}
        <div className="bg-[#374df5]/10 border border-[#374df5]/20 p-3 rounded-2xl flex items-center gap-3">
          <Zap size={14} className="text-[#374df5] animate-pulse" />
          <p className="text-[10px] font-bold text-[#374df5] uppercase tracking-wider">Şu an 12 maçta kritik xG değişimi var</p>
        </div>

        {/* MATCH CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m: any) => (
            <Link key={m.id} href={`/match/${m.id}`}>
              <div className="bg-[#0f0f0f] border border-white/5 p-5 rounded-[2.5rem] hover:bg-[#151515] transition-all group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[8px] font-black bg-white/5 px-2 py-1 rounded text-slate-500 uppercase">
                    {m.tournament.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-bold text-red-500 uppercase">{m.status.description}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <TeamBlock name={m.homeTeam.name} id={m.homeTeam.id} score={m.homeScore.display} />
                  <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                    <BarChart3 size={16} />
                    <span className="text-[7px] font-bold uppercase">Detay</span>
                  </div>
                  <TeamBlock name={m.awayTeam.name} id={m.awayTeam.id} score={m.awayScore.display} reverse />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function TeamBlock({ name, id, score, reverse }: any) {
  return (
    <div className={`flex items-center gap-4 w-[45%] ${reverse ? "flex-row-reverse" : ""}`}>
      <img src={`https://img.sofascore.com/api/v1/team/${id}/image`} className="w-10 h-10 object-contain drop-shadow-xl" />
      <div className={`flex flex-col ${reverse ? "items-end" : "items-start"}`}>
        <span className="text-xl font-black tabular-nums">{score}</span>
        <span className="text-[10px] font-bold text-slate-400 truncate w-20">{name}</span>
      </div>
    </div>
  );
}
