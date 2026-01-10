"use client";

import { useAdmin } from "@/lib/useAdmin";

import { Info } from "lucide-react";

export default function AdminBanner() {
  const { isDemoAdmin } = useAdmin();

  if (!isDemoAdmin) return null;

  return (
    <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-md p-3 mb-4 flex items-center gap-3">
      <Info className="text-yellow-700" />
      <div>
        <div className="font-semibold">Demo mode (view-only)</div>
        <div className="text-sm">Connect the contract-owner wallet to enable full admin features. Privileged actions are disabled in demo mode.</div>
      </div>
    </div>
  );
}
