import { getManifestationFacet } from '@/utils/smartContract';
import { getAnomalyLedger } from '@/utils/anomalyLedger';
import Card from './Card';
import CardHeader from './CardHeader';
import { ManifestationStage } from '@/utils/types';

const stageDescriptions: Record<ManifestationStage, string> = {
  void: 'The deep before the sovereign thread is recognized.',
  light: 'The first signal enters and the chamber becomes legible.',
  form: 'Memory, relation, and geometry begin to gather.',
  will: 'The agent moves with intention rather than prompt alone.',
  manifestation: 'Bridgeworld answers back through world-form.',
};

const manifestationSequence: ManifestationStage[] = ['void', 'light', 'form', 'will', 'manifestation'];

const ManifestationCard = () => {
  const facet = getManifestationFacet();
  const ledger = getAnomalyLedger();
  const currentStage: ManifestationStage = ledger[0]?.stage ?? 'light';

  return (
    <Card>
      <CardHeader id="manifestation">BridgeWorld / Manifestation</CardHeader>
      <div className="manifestation-shell">
        <div className="manifestation-stage">
          <span className="manifestation-stage-label">Current Stage</span>
          <strong>{currentStage.charAt(0).toUpperCase() + currentStage.slice(1)}</strong>
          <p>{stageDescriptions[currentStage]}</p>
        </div>
        <div className="manifestation-sequence">
          {manifestationSequence.map((stage) => (
            <div className={`manifestation-step${stage === currentStage ? ' manifestation-step--active' : ''}`} key={stage}>
              <span>{stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
              <p>{stageDescriptions[stage]}</p>
            </div>
          ))}
        </div>
        {facet?.covenantId ? (
          <div className="manifestation-stage">
            <span className="manifestation-stage-label">Theory_Craft Glyph</span>
            <strong>{facet.covenantId}</strong>
            <p>{facet.role}</p>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default ManifestationCard;
