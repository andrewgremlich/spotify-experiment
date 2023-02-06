import Link from "next/link";

// a nav component that links to the player and home page
export const Nav = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/player">Player</Link>
    </nav>
  );
};
