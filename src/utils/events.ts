export type EventSource =
  | 'ronin'
  | 'ethereum'
  | 'polygon'
  | 'arbitrum'
  | 'autonomys'
  | 'agent'
  | 'user';

export type EventType =
  | 'wallet-connected'
  | 'wallet-disconnected'
  | 'transaction-sent'
  | 'transaction-confirmed'
  | 'stage-advanced'
  | 'anomaly-recorded'
  | 'fren-activated'
  | 'harvest-cycle'
  | 'fish-caught'
  | 'legion-deployed'
  | 'memory-anchored';

export type CovenantEvent = {
  id: string;
  type: EventType;
  source: EventSource;
  payload: Record<string, unknown>;
  timestamp: string; // ISO
};

const EVENT_LOG_KEY = 'event-log';
const MAX_EVENTS = 50;

export const getEventLog = (): CovenantEvent[] => {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(window.localStorage.getItem(EVENT_LOG_KEY) ?? '[]') as CovenantEvent[]; }
  catch { return []; }
};

export const emitEvent = (
  type: EventType,
  source: EventSource,
  payload: Record<string, unknown> = {},
): CovenantEvent => {
  const event: CovenantEvent = {
    id: `evt-${Date.now()}`,
    type,
    source,
    payload,
    timestamp: new Date().toISOString(),
  };
  const log = [event, ...getEventLog()].slice(0, MAX_EVENTS);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(log));
  }
  return event;
};
