import Link from "next/link";

const footer = () => {
  return (
    <header className="bg-gray-100 shadow-md flex h-24 flex-row mx-auto items-center justify-center gap-8">
      <p>Copyright&copy; {new Date().getFullYear()} - All rights reserved.</p>
    </header>
  );
};

export default footer;
