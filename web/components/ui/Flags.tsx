export function FlagUS() {
  return (
    <svg viewBox="0 0 24 16" width="20" height="14" className="rounded-sm overflow-hidden block">
      <rect width="24" height="16" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map((y) => (
        <rect key={y} x="0" y={y * 16 / 13} width="24" height={16 / 13} fill="#fff" />
      ))}
      <rect width="10" height="8" fill="#3C3B6E" />
    </svg>
  );
}

export function FlagDE() {
  return (
    <svg viewBox="0 0 24 16" width="20" height="14" className="rounded-sm overflow-hidden block">
      <rect width="24" height="5.33" y="0" fill="#000" />
      <rect width="24" height="5.33" y="5.33" fill="#DD0000" />
      <rect width="24" height="5.34" y="10.66" fill="#FFCE00" />
    </svg>
  );
}

export function FlagTR() {
  return (
    <svg viewBox="0 0 24 16" width="20" height="14" className="rounded-sm overflow-hidden block">
      <rect width="24" height="16" fill="#E30A17" />
      <circle cx="9" cy="8" r="3.2" fill="#fff" />
      <circle cx="9.9" cy="8" r="2.6" fill="#E30A17" />
      <polygon fill="#fff" points="13.6,8 12.0,8.6 13.0,7.2 13.0,8.8 12.0,7.4" />
    </svg>
  );
}
