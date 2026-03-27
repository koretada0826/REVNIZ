export interface ApplicationRecord {
  id: string;
  type: "benefit" | "event";
  planId: number;
  planTitle: string;
  company: string;
  discount?: string;
  name: string;
  companyName: string;
  appliedAt: string;
}

const STORAGE_KEY = "sc_application_history";

export function getApplicationHistory(): ApplicationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addApplication(record: Omit<ApplicationRecord, "id" | "appliedAt">): ApplicationRecord {
  const newRecord: ApplicationRecord = {
    ...record,
    id: `app_${Date.now()}`,
    appliedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
  };
  const history = getApplicationHistory();
  history.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newRecord;
}
