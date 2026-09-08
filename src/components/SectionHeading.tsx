import s from "./SectionHeading.module.css";

type Props = {
  black: string;
  red: string;
  /** 見出し右のライン色 */
  line?: "red" | "orange";
  className?: string;
};

export default function SectionHeading({ black, red, line = "red", className }: Props) {
  return (
    <h2 className={`${s.heading} ${className ?? ""}`}>
      <span className={s.text}>
        {black}
        <span className={s.accent}>{red}</span>
      </span>
      <span className={line === "red" ? s.lineRed : s.lineOrange} aria-hidden="true" />
    </h2>
  );
}
