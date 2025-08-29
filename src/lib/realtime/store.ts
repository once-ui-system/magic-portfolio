type Message = { id: string; role: 'user'|'assistant'|'admin'; content: string; at: number };
type Session = { id: string; takeover: boolean; messages: Message[] };

const sessions = new Map<string, Session>();

function uid() { return (Date.now().toString(36) + Math.random().toString(36).slice(2,8)).toUpperCase(); }

export function createSession(): Session {
  const id = uid();
  const s: Session = { id, takeover: false, messages: [] };
  sessions.set(id, s);
  return s;
}

export function getSession(id: string): Session | undefined { return sessions.get(id); }
export function listSessions(): Session[] { return Array.from(sessions.values()); }
export function setTakeover(id: string, v: boolean) { const s=sessions.get(id); if(s){ s.takeover=v; } }

export function addMessage(id: string, role: Message['role'], content: string): Message | null {
  const s = sessions.get(id); if(!s) return null; const m = { id: uid(), role, content, at: Date.now() }; s.messages.push(m); return m;
}

