import BaseCard from "./BaseCard";
export type User = {
  id: number;
  name: string;
  email: string;
  company?: { name: string };
};
function hue(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}
function Avatar({ name }: { name: string }) {
  const h = hue(name || "U");
  const bg = `hsl(${h} 30% 20%)`;
  const fg = `hsl(${h} 80% 70%)`;
  const initial = (name?.[0] || "U").toUpperCase();
  return (
    <div
      className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold"
      style={{ backgroundColor: bg, color: fg }}
    >
      {initial}
    </div>
  );
}
export default function UserCard({
  user,
  onSelect,
  href,
}: {
  user: User;
  onSelect?: (u: User) => void;
  href?: string;
}) {
  return (
    <BaseCard
      title={user.name}
      subtitle={user.email}
      meta={user.company?.name}
      leading={<Avatar name={user.name} />}
      href={href}
      onClick={href ? undefined : () => onSelect?.(user)}
      aria-label={`Open user ${user.id}`}
    />
  );
}
