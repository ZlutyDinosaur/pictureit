import Link from "next/link";
import { getUserFromCookie } from "@/library/getUser";
import { logout } from "../../server/userController";

const header = async () => {
  const user = await getUserFromCookie();
  return (
    <header className="bg-gray-100 shadow-md flex h-24 flex-row mx-auto items-center justify-between gap-8">
      <Link href="/" className="pl-11">
        Picture it
      </Link>

      <Link
        href="/create-file"
        className="p-3 rounded-md bg-blue-400 text-white"
      >
        Create file
      </Link>

      {!user && (
        <Link href="/login" className="pr-11">
          Log In
        </Link>
      )}

      {user && (
        <form action={logout} className="pr-11">
          <button>Log Out</button>
        </form>
      )}
    </header>
  );
};

export default header;
