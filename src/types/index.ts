export interface Company {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  industry: string;
  area: string;
  description: string;
  strengths: string[];
  canProvide: string[];
  lookingFor: string[];
  website: string;
  contactPerson: string;
  memberSince: string;
}

export interface ConsultationPost {
  id: string;
  title: string;
  content: string;
  category: string;
  companyId: string;
  companyName: string;
  targetArea: string;
  deadline: string | null;
  createdAt: string;
  responses: number;
  tags?: string[];
  challenge?: string;
  lookingFor?: string;
  keywords?: string[];
}

export interface MatchingPair {
  id: string;
  companyA: Company;
  companyB: Company;
  reason: string;
  expectedCollaboration: string;
  theme: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  capacity: number;
  registered: number;
  image: string;
}

export interface MeetingRequest {
  targetCompanyId: string;
  requesterCompanyName: string;
  requesterName: string;
  reason: string;
  topics: string;
  preferredDate: string;
  format: "online" | "offline";
  withAdmin: boolean;
  status: "sent" | "adjusting" | "done" | "closed";
}

export interface SuccessCase {
  id: string;
  title: string;
  companies: string[];
  howTheyMet: string;
  consultation: string;
  result: string;
  comment: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}
