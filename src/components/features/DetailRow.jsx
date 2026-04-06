

export default function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between">
        <span className="text-text-dim">{label}</span>
        <span className="text-text-main">{value}</span>
    </div>
  );
}