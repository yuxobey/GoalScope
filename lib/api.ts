// Replit'ten aldığın linki buraya yapıştır (Sonunda / olmasın)
export const REPL_URL = "https://4f7fa6fe-9818-43af-b9e8-154f977aa648-00-jtvgtxw7r722.pike.replit.dev:5000/"; 

export async function getFullMatchData(id: string) {
  try {
    const res = await fetch(`${REPL_URL}/match/${id}/full`, {
      cache: 'no-store' // Canlı veri için cache'i kapatıyoruz
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return null;
  }
}
