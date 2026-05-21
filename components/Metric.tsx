interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
}: MetricProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={imgStyles}
      />
      <p className={textStyles}>
        {value} {title}
      </p>
    </div>
  );
};

export default Metric;
