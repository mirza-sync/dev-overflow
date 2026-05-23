import Image from "next/image";

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
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={imgStyles}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </div>
  );
};

export default Metric;
