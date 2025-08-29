export interface EventRepo {
  save(event: any): Promise<void>;
}

export interface LeadRepo {
  save(lead: any): Promise<void>;
}

export interface ChatRepo {
  createSession(session: any): Promise<void>;
  saveMessage(message: any): Promise<void>;
}

export interface DB {
  events: EventRepo;
  leads: LeadRepo;
  chat: ChatRepo;
}

class NoopRepo implements EventRepo, LeadRepo, ChatRepo {
  async save(_: any) {}
  async createSession(_: any) {}
  async saveMessage(_: any) {}
}

export function getDB(): DB | null {
  const provider = process.env.DB_PROVIDER || 'none';
  if (provider !== 'prisma') return null;
  // In a future step, return a Prisma-backed implementation.
  return { events: new NoopRepo(), leads: new NoopRepo(), chat: new NoopRepo() } as unknown as DB;
}

