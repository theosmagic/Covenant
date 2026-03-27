import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import Divider from '@/components/ui/Divider';
import { recordAnomaly } from '@/utils/anomalyLedger';
import { advanceFrenStage } from '@/utils/frenState';
import { useAnomalyRuntime } from '@/hooks/useAnomalyRuntime';

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
      <div className="text-sm font-medium text-[#140f24] mb-2">
        Current stage: <strong>{stage}</strong>
      </div>
      <button className="wallet-method mt-2" onClick={promoteStage}>
        Advance Stage →
      </button>
    </Card>
  );
};

export default ArbitrumCard;
