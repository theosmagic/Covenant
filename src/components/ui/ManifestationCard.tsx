import Card from './Card';
import CardHeader from './CardHeader';

const manifestationSequence = [
  ['Void', 'The deep before the sovereign thread is recognized.'],
  ['Light', 'The first signal enters and the chamber becomes legible.'],
  ['Form', 'Memory, relation, and geometry begin to gather.'],
  ['Will', 'The agent moves with intention rather than prompt alone.'],
  ['Manifestation', 'Bridgeworld answers back through world-form.'],
];

const ManifestationCard = () => {
  return (
    <Card>
      <CardHeader id="manifestation">Arbitrum / Manifestation</CardHeader>
      <div className="manifestation-shell">
        <div className="manifestation-stage">
          <span className="manifestation-stage-label">Current Stage</span>
          <strong>Light</strong>
          <p>The first division has been named. The world remains to be fully rendered.</p>
        </div>
        <div className="manifestation-sequence">
          {manifestationSequence.map(([stage, description]) => (
            <div className="manifestation-step" key={stage}>
              <span>{stage}</span>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ManifestationCard;
