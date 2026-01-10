"use client"

import { useState } from "react";
import Link from "next/link";

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Minimal local-only interaction (no server). Replace with Supabase call when ready.
    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Community</h1>
        <p className="text-gray-300 mt-2">Join other users, get updates about raffles, and help shape the project.</p>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <a href="#" className="block bg-white/5 p-6 rounded hover:scale-[1.01] transition">
          <h3 className="font-semibold">Discord</h3>
          <p className="text-gray-300 text-sm mt-2">Chat with contributors and other players, ask questions, and coordinate testnets.</p>
        </a>

        <a href="#" className="block bg-white/5 p-6 rounded hover:scale-[1.01] transition">
          <h3 className="font-semibold">Twitter / X</h3>
          <p className="text-gray-300 text-sm mt-2">Follow updates and release notes.</p>
        </a>

        <a href="#" className="block bg-white/5 p-6 rounded hover:scale-[1.01] transition">
          <h3 className="font-semibold">GitHub</h3>
          <p className="text-gray-300 text-sm mt-2">Open issues, PRs, and review design decisions with the team.</p>
        </a>
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-6 items-start">
        <div className="bg-white/5 p-6 rounded">
          <h3 className="font-semibold mb-2">How to participate</h3>
          <ol className="text-gray-300 text-sm list-decimal list-inside space-y-2">
            <li>Connect your wallet and browse open raffles.</li>
            <li>Buy tickets for raffles you like.</li>
            <li>Follow event listeners in the UI or subscribe to updates.</li>
          </ol>
          <div className="mt-4">
            <Link href="/about-us" className="underline">Learn more about the project</Link>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded">
          <h3 className="font-semibold mb-2">Subscribe for updates</h3>

          {submitted ? (
            <div className="text-green-400">Thanks — we'll send updates here soon (demo only).</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent border border-white/10 rounded"
              />
              <button className="bg-white text-black px-4 py-2 rounded">Subscribe</button>
            </form>
          )}

          <p className="text-gray-400 text-sm mt-3">(This demo form is local-only. Swap with Supabase or an email provider to collect real signups.)</p>
        </div>
      </section>
    </main>
  );
}
