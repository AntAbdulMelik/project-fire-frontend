import { avatar } from "assets/media";

type Props = {
  className?: string;
  src?: string;
  alt: string;
  names?: {
    firstName: string;
    lastName: string;
  }[];
};

const Avatar = ({ className, src, alt }: Props) => {
  return (
    <img
      className={`object-cover ${className}`}
      src={src ? src : avatar}
      alt={alt}
    />
  );
};

export default Avatar;
