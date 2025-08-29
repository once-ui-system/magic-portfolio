export type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  industry?: string;
  funnel?: string;
  value?: number;
  source?: string;
  consent?: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
};

export interface CRMAdapter {
  createLead(lead: Lead): Promise<{ id: string }>;
}
