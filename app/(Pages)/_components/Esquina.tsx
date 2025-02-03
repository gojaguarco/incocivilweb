
type TProps = {
  className?: string,
  colorHex: string,
}
const Esquina = ({ className, colorHex }: TProps) => {
  return (
    <svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_26_29)">
        <path d="M86 85.9063C85.9997 42.9532 42.9388 0.00012207 0 0.00012207H86V85.9063Z" fill={`#${colorHex}`} />
      </g>
      <defs>
        <clipPath id="clip0_26_29">
          <rect width="86" height="86" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Esquina