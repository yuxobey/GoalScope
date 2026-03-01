export const REPL_URL = "https://4f7fa6fe-9818-43af-b9e8-154f977aa648-00-jtvgtxw7r722.pike.replit.dev:5000/";
export async function getFullMatchData(id: string) {
  try {
    const res = await fetch(`${REPL_URL}/match/${id}/full`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}
