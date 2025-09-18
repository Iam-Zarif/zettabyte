"use client";
import useFetch from "@/hooks/useFetch";
import { TableSkeletonRows } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import Modal from "@/components/Modal";
import { useState } from "react";
import useTitle from "@/hooks/useTitle";

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  username: string;
  phone: string;
  website: string;
};

export default function UsersPage() {
  useTitle("zettabyte | Users");

  const { data, loading, error, refetch } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    { retry: 1 }
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<User | null>(null);

  if (loading)
    return (
      <div className="overflow-x-auto rounded-2xl border border-neutral-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-neutral-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
            </tr>
          </thead>
          <TableSkeletonRows rows={8} cols={3} />
        </table>
      </div>
    );
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data?.length)
    return <ErrorState message="No users found" onRetry={refetch} />;

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-neutral-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-neutral-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 hidden sm:table-cell">Company</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr
                key={u.id}
                className="cursor-pointer border-t border-neutral-800 hover:bg-neutral-900/60"
                onClick={() => {
                  setActive(u);
                  setOpen(true);
                }}
              >
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {u.company?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={active?.name}>
        <div className="space-y-2 text-sm">
          <div>Username: {active?.username}</div>
          <div>Email: {active?.email}</div>
          <div>Phone: {active?.phone}</div>
          <div>Website: {active?.website}</div>
          <div>Company: {active?.company?.name}</div>
        </div>
      </Modal>
    </>
  );
}
