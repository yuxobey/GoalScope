"use client";
import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Target, Zap, ShieldCheck } from "lucide-react";

export default function UltimateMatchCenter({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [activeView, setActiveView] = useState("tactical"); // tactical, financial, ai

  useEffect(() => {
    // Replit'ten tüm hibrit veriyi çek
    fetch(`https://4f7fa6fe-9818-43af-b9e8-154f977aa648-00-jtvgtxw7r722.pike.replit.dev:5000/`)
      .then(res => res.json())
      .then(setData);
  }, [params.id]);

  if (!data) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4">
      {/* SKOR VE CANLI DURUM */}
      <div className="bg-gradient-to-b from-[#111] to-black p-8 rounded-[3rem] border border-white/5 mb-6 text-center shadow-2xl">
         {/* Burası önceki tasarımdaki skor bölümü - Korunacak */}
      </div>

      {/* SEGMENTED CONTROL (UI/UX HARİKASI) */}
      <div className="flex bg-[#111] p-1.5 rounded-2xl mb-8 border border-white/5">
        {['tactical', 'financial', 'ai'].map((v) => (
          <button 
            key={v}
            onClick={() => setActiveView(v)}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${activeView === v ? "bg-[#374df5] text-white shadow-lg" : "text-slate-500"}`}
          >
            {v === 'tactical' ? 'Taktik Analiz' : v === 'financial' ? 'Mali Güç' : 'AI Tahmin'}
          </button>
        ))}
      </div>

      {/* 1. TAKTİK ANALİZ (Understat + Sofascore) */}
      {activeView === 'tactical' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
           {/* Şut Haritası ve Momentum Buraya Gelecek */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111] p-5 rounded-3xl border border-white/5">
                <Target className="text-[#374df5] mb-2" size={20} />
                <p className="text-[8px] text-slate-500 font-bold uppercase">Maç xG</p>
                <p className="text-2xl font-black">1.84 - 0.92</p>
              </div>
              <div className="bg-[#111] p-5 rounded-3xl border border-white/5">
                <Zap className="text-yellow-500 mb-2" size={20} />
                <p className="text-[8px] text-slate-500 font-bold uppercase">Baskı Gücü</p>
                <p className="text-2xl font-black">%64</p>
              </div>
           </div>
        </div>
      )}

      {/* 2. MALİ GÜÇ (Transfermarkt + Capology) - TÜRKİYE'DE TEK! */}
      {activeView === 'financial' && (
        <div className="space-y-4 animate-in fade-in">
           <div className="bg-[#111] p-6 rounded-[2.5rem] border border-green-500/20">
              <h4 className="text-green-500 text-[10px] font-black uppercase mb-6 flex items-center gap-2">
                <DollarSign size={14} /> Kadro Değeri Kıyaslaması
              </h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold">Ev Sahibi</span>
                    <span className="text-xl font-black italic">240M €</span>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#374df5] w-[70%]" />
                    <div className="h-full bg-slate-700 w-[30%]" />
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-slate-500">Deplasman</span>
                    <span className="text-lg font-black text-slate-500">85M €</span>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 3. AI TAHMİN (FiveThirtyEight) */}
      {activeView === 'ai' && (
        <div className="bg-[#111] p-8 rounded-[3rem] border border-[#374df5]/30 text-center space-y-6">
           <ShieldCheck size={40} className="mx-auto text-[#374df5]" />
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Algoritmik Kazanma İhtimali</p>
              <h3 className="text-5xl font-black text-white">%72</h3>
           </div>
           <p className="text-[10px] text-slate-400 leading-relaxed px-4">
              FiveThirtyEight SPI endeksine göre ev sahibi takımın galibiyet şansı ağır basıyor.
           </p>
        </div>
      )}
    </div>
  );
}
