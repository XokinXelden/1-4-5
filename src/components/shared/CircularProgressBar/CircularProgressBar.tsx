import style from "./style.module.scss";

interface Props {
  strokeWidth: number;
  sqSize: number;
  percentage?: number;
}

export const CircularProgressBar = ({
  strokeWidth,
  sqSize,
  percentage,
}: Props) => {
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100;

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
      className={style.circularProgressbar}
    >
      <circle
        className={style.circleBackground}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className={style.circleProgress}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
};
