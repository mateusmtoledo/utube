type ProgressBarProps = {
  value: number;
  max: number;
  fillColor?: string;
  className?: string;
};

export default function ProgressBar({
  value,
  max,
  fillColor,
  className,
}: ProgressBarProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute h-full w-full left-0 ${
          fillColor ? fillColor : "bg-green-500"
        }`}
        style={{
          transform: `scaleX(${(value / max) * 100}%)`,
          transformOrigin: "left",
        }}
      ></div>
    </div>
  );
}
