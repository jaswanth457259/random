export default function StatTile({ label, value, tone = "default" }) {
  return (
    <div className={`stat-tile stat-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
