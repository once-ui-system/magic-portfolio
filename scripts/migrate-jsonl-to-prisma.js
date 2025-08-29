#!/usr/bin/env node
/*
  Migrates JSONL logs to Postgres via Prisma.
  Requirements (run once installs are permitted):
    - npm i prisma @prisma/client
    - npx prisma generate
    - set DATABASE_URL in .env.local
    - npx prisma migrate deploy (or migrate dev)

  Usage: node scripts/migrate-jsonl-to-prisma.js
*/
const fs = require('fs');
const path = require('path');

async function main() {
  let prisma;
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  } catch (e) {
    console.error('Prisma not installed. Skipping migration.');
    process.exit(1);
  }

  const varDir = path.join(process.cwd(), 'var');
  const efile = path.join(varDir, 'analytics_events.jsonl');
  if (fs.existsSync(efile)) {
    const lines = fs.readFileSync(efile, 'utf8').split(/\r?\n/).filter(Boolean);
    for (const ln of lines) {
      try {
        const ev = JSON.parse(ln);
        await prisma.event.create({ data: {
          sid: ev.sid || null,
          type: String(ev.type || ''),
          path: ev.path || null,
          ref: ev.ref || null,
          ua: ev.ua || ev.serverUA || null,
          ip: ev.ip || null,
          at: BigInt(ev.at || Date.now()),
        }});
      } catch {}
    }
    console.log('Migrated events');
  }

  const lfile = path.join(varDir, 'leads.jsonl');
  if (fs.existsSync(lfile)) {
    const lines = fs.readFileSync(lfile, 'utf8').split(/\r?\n/).filter(Boolean);
    for (const ln of lines) {
      try {
        const lead = JSON.parse(ln);
        await prisma.lead.create({ data: {
          id: String(lead.id),
          name: String(lead.name||''),
          email: String(lead.email||''),
          company: lead.company || null,
          industry: lead.industry || null,
          funnel: lead.funnel || null,
          value: typeof lead.value==='number'? lead.value : null,
          source: lead.source || null,
          consent: lead.consent ?? null,
        }});
      } catch {}
    }
    console.log('Migrated leads');
  }

  const pfile = path.join(varDir, 'playbook_requests.jsonl');
  if (fs.existsSync(pfile)) {
    const lines = fs.readFileSync(pfile, 'utf8').split(/\r?\n/).filter(Boolean);
    for (const ln of lines) {
      try {
        const r = JSON.parse(ln);
        await prisma.playbookRequest.create({ data: { email: r.email, slug: r.slug, industry: r.industry || null }});
      } catch {}
    }
    console.log('Migrated playbook requests');
  }

  const chatDir = path.join(varDir, 'chat', 'days');
  if (fs.existsSync(chatDir)) {
    const files = fs.readdirSync(chatDir).filter(f => f.endsWith('.jsonl'));
    const seenSessions = new Set();
    for (const f of files) {
      const lines = fs.readFileSync(path.join(chatDir, f), 'utf8').split(/\r?\n/).filter(Boolean);
      for (const ln of lines) {
        try {
          const ev = JSON.parse(ln);
          if (ev.type === 'create') {
            if (!seenSessions.has(ev.id)) {
              await prisma.chatSession.create({ data: { id: ev.id, takeover: false }});
              seenSessions.add(ev.id);
            }
          } else if (ev.type === 'message') {
            await prisma.chatMessage.create({ data: { sessionId: ev.session, role: ev.role, content: ev.message?.content || '', at: new Date(ev.at || Date.now()) }});
          }
        } catch {}
      }
    }
    console.log('Migrated chat sessions/messages');
  }

  await prisma.$disconnect();
  console.log('Migration complete');
}

main().catch((e) => { console.error(e); process.exit(1); });

