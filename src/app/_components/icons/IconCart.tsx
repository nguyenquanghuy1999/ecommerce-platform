export const IconCart = ({
  width = 30,
  height = 30,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 26.6 25.6"
    width={width}
    height={height}
    fill="#323c42"
    stroke="#323c42"
  >
    <polyline
      fill="none"
      points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.1"
    ></polyline>
    <circle cx="10.7" cy="23" r="1.9" stroke="none"></circle>
    <circle cx="19.7" cy="23" r="1.9" stroke="none"></circle>
  </svg>
);
