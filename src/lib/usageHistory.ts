export interface UsageRecord {
  id: string;
  applicationId: string;
  planId: number;
  planTitle: string;
  company: string;
  discount?: string;
  usedBy: string;
  companyName: string;
  usedAt: string;
}

const STORAGE_KEY = "sc_usage_history";

export function getUsageHistory(): UsageRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addUsage(record: Omit<UsageRecord, "id" | "usedAt">): UsageRecord {
  const newRecord: UsageRecord = {
    ...record,
    id: `use_${Date.now()}`,
    usedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
  };
  const history = getUsageHistory();
  history.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newRecord;
}

export function isUsed(applicationId: string): boolean {
  return getUsageHistory().some((r) => r.applicationId === applicationId);
}
