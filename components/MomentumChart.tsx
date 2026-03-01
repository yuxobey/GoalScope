"use client";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

export default function MomentumChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) return (
    <div className="h-40 flex items-center justify-center text-xs text-slate-500 bg-[#151a23] rounded-xl border border-white/5">
      Momentum verisi henüz hazır değil.
    </div>
  );

  return (
    <div className="bg-[#151a23] p-4 rounded-xl border border-white/5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Maç Baskı Momenti</h3>
        <div className="flex gap-3 text-[9px] font-bold">
          <span className="text-[#374df5]">EV</span>
          <span className="text-[#e53935]">DEP</span>
        </div>
      </div>
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="minute" hide />
            <YAxis hide domain={[-100, 100]} />
            <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0b0e14', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#374df5" 
              fill="#374df5" 
              fillOpacity={0.4}
              baseLine={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
