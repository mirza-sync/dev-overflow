import Image from "next/image";
import { Button } from "../ui/button";

const SocialAuthForm = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className="background-dark400_light900">
        <Image
          src="/icons/github.svg"
          alt="Github Icon"
          className="invert-colors mr-2.5 object-contain"
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
};

export default SocialAuthForm;
