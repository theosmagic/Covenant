export type CommandType =
  | 'deploy-legion'
  | 'start-harvest'
  | 'fish'
  | 'advance-stage'
  | 'anchor-memory'
  | 'connect-wallet'
  | 'switch-network';

export type CommandStatus = 'queued' | 'executing' | 'complete' | 'failed';

export type Command = {
  id: string;
  type: CommandType;
  payload: Record<string, unknown>;
  status: CommandStatus;
  issuedAt: string;       // ISO timestamp
  completedAt?: string;
  result?: unknown;
  error?: string;
};

const COMMAND_QUEUE_KEY = 'command-queue';

export const getCommandQueue = (): Command[] => {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(window.localStorage.getItem(COMMAND_QUEUE_KEY) ?? '[]') as Command[]; }
  catch { return []; }
};

export const enqueueCommand = (type: CommandType, payload: Record<string, unknown> = {}): Command => {
  const cmd: Command = {
    id: `cmd-${Date.now()}`,
    type,
    payload,
    status: 'queued',
    issuedAt: new Date().toISOString(),
  };
  const queue = [cmd, ...getCommandQueue()].slice(0, 20);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(COMMAND_QUEUE_KEY, JSON.stringify(queue));
  }
  return cmd;
};

export const updateCommand = (id: string, patch: Partial<Command>): void => {
  const queue = getCommandQueue().map(c => c.id === id ? { ...c, ...patch } : c);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(COMMAND_QUEUE_KEY, JSON.stringify(queue));
  }
};
