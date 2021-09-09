export default function Nav({ children }) {
  return (
    <nav className="p-4 shadow-md bg-white dark:bg-black">
      <ul className="flex space-x-2">{children}</ul>
    </nav>
  );
}
