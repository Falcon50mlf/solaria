type Props = {
  size?: number;
  className?: string;
  fill?: string;
  gradient?: boolean;
};

export function SolariaLogo({ size = 28, className, fill = "white", gradient = true }: Props) {
  const gradId = `solaria-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 41.4072 41.4072"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {gradient && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="41.4072" y2="41.4072" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="55%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#14F195" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M20.7041 0C32.1384 0.000163897 41.4072 9.26981 41.4072 20.7041C41.4071 32.1383 32.1383 41.4071 20.7041 41.4072H1.88672C0.844974 41.4072 0.000182855 40.5632 0 39.5215V20.7041C0 9.26971 9.26971 0 20.7041 0ZM19.2275 14.7588C17.9372 14.759 16.8917 15.8053 16.8916 17.0957V23.8145C16.8917 23.9757 17.0223 24.1064 17.1836 24.1064C19.6033 24.1063 21.5645 22.1444 21.5645 19.7246V17.0957C21.5644 15.8052 20.5181 14.7588 19.2275 14.7588ZM28.001 14.7588C26.7106 14.759 25.6641 15.8053 25.6641 17.0957V23.8145C25.6641 23.9757 25.7957 24.1064 25.957 24.1064C28.3767 24.1062 30.3379 22.1444 30.3379 19.7246V17.0957C30.3378 15.8052 29.2915 14.7588 28.001 14.7588Z"
        fill={gradient ? `url(#${gradId})` : fill}
      />
    </svg>
  );
}

export function SolariaBrand({ size = 28, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <SolariaLogo size={size} fill="white" />
      {showText && (
        <span className="font-semibold tracking-tight text-white" style={{ fontSize: size * 0.75 }}>
          Solaria
        </span>
      )}
    </span>
  );
}
