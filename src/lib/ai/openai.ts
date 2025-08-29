export async function assistantReply(messages: { role: 'system'|'user'|'assistant', content: string }[]): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    // Fallback demo reply
    const last = messages.filter(m=>m.role==='user').slice(-1)[0]?.content || '';
    return `Thanks! You said: "${last}". A teammate will follow up shortly.`;
  }
  // TODO: Integrate Assistants API (Runs) or Chat Completions as needed.
  // For now, avoid making network calls in this environment.
  const last = messages.filter(m=>m.role==='user').slice(-1)[0]?.content || '';
  return `Acknowledged: "${last}". (AI reply placeholder)`;
}

