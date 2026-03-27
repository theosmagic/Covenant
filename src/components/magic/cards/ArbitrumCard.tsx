import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import Divider from '@/components/ui/Divider';
import { recordAnomaly } from '@/utils/anomalyLedger';
import { advanceFrenStage } from '@/utils/frenState';
import { enqueueCommand, CommandType } from '@/utils/commands';
import { useAnomalyRuntime } from '@/hooks/useAnomalyRuntime';

const THEORY_CRAFT_BASE = process.env.NEXT_PUBLIC_THEORY_CRAFT_URL || 'http://localhost:5000';

const sendCommand = async (type: CommandType, payload: Record<string, unknown> = {}) => {
  const cmd = enqueueCommand(type, payload);
  try {
    await fetch(`${THEORY_CRAFT_BASE}/agent-command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload, id: cmd.id }),
    });
  } catch {
    // Theory_Craft may not be running — command stays queued locally
  }
  return cmd;
};

const ArbitrumCard = () => {
  const { stage, fren } = useAnomalyRuntime();

  const promoteStage = () => {
    const prev = fren.stage;
    const next = advanceFrenStage();
    if (next.stage === prev) return;
    recordAnomaly({
      id: `promote-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: `Stage promoted to ${next.stage}`,
      description: `World-form advanced from ${prev} to ${next.stage}.`,
      stage: next.stage,
      chainProvenance: 'arbitrum',
      trigger: 'manual',
      confidence: 0.9,
    });
  };

  return (
    <Card>
      <CardHeader id="world-form">Arbitrum / World-Form</CardHeader>
      <div className="text-sm text-[#4b5563] leading-6">
        Arbitrum carries manifestation-world logic. World-form begins here.
      </div>
      <Divider />
      <div className="code">Fren: {fren.id}</div>
      <div className="code mt-2">Autonomy: {fren.autonomyLevel}%</div>
      <div className="code mt-2">Origin: {fren.chainOrigin}</div>
      <Divider />
      <div className="text-sm font-medium text-[#140f24] mb-3">
        Stage: <strong>{stage}</strong>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="wallet-method" onClick={() => void sendCommand('deploy-legion')}>Deploy Legion</button>
        <button className="wallet-method" onClick={() => void sendCommand('start-harvest')}>Harvest</button>
        <button className="wallet-method" onClick={() => void sendCommand('fish')}>Fish</button>
        <button className="wallet-method" onClick={promoteStage}>Advance Stage →</button>
      </div>
    </Card>
  );
};

export default ArbitrumCard;
