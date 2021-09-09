export default function NavItem({ href, isActive, children }) {
  return (
    <li>
      <a
        href={href}
        className={`block px-4 py-2 rounded-md ${
          isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
            : "text-black dark:text-white"
        }`}
      >
        {children}
      </a>
    </li>
  );
}
