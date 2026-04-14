"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      toast.error("Sign in failed", {
        description: error instanceof Error ? error.message : "Error occurred during sign in",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className="background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5"
        onClick={() => handleSignIn("github")}
      >
        <Image
          src="/icons/github.svg"
          alt="Github Icon"
          className="invert-colors mr-2.5 object-contain"
          width={20}
          height={20}
        />
        <span>Login with Github</span>
      </Button>

      <Button
        className="background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5"
        onClick={() => handleSignIn("google")}
      >
        <Image src="/icons/google.svg" alt="Google Icon" className="mr-2.5 object-contain" width={20} height={20} />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
