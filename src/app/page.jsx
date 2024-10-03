import RegisterForm from "@/components/RegisterForm";
import { getUserFromCookie } from "@/library/getUser";
import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const user = await getUserFromCookie();
  return (
    <div>
      {user && <Dashboard user={user} />}
      {!user && (
        <div className="flex flex-col items-center justify-center">
          <p className="flex text-center text-2xl text-gray-600 mb-5">
            Dont&rsquo;t have an account?
            <span className="text-red-700 font-bold pl-2">Create One</span>
          </p>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}
