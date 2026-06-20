interface CircularSpinnerProps {
  text: string;
  size?: number;
  reverse?: boolean;
  color?: string;
  duration?: number;
  className?: string;
}

export default function CircularSpinner({
  text,
  size = 400,
  reverse = false,
  color = "#C3FF00",
  duration = 120,
  className = "",
}: CircularSpinnerProps) {
  const chars = text.split('');
  const angleStep = (2 * Math.PI) / chars.length;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        animation: `${reverse ? 'spin2' : 'spin1'} ${duration}s linear infinite`,
      }}
    >
      {chars.map((char, i) => {
        const angle = reverse ? -(i * angleStep) : (i * angleStep);
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 20,
              height: size / 2,
              marginLeft: -10,
              transformOrigin: 'bottom center',
              transform: `rotate(${angle}rad)`,
              textAlign: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: Math.max(13, Math.floor(size / 30)),
              fontWeight: 400,
              color,
              lineHeight: '1',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
