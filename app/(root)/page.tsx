import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const session = await auth();
  console.log("session", session);

  return (
    <div>
      Home
      <form
        className="pt-10"
        action={async () => {
          "use server";

          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
