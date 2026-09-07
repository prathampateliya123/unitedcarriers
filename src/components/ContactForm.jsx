"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line bg-brand-soft p-8">
        <h3 className="font-display text-2xl text-ink-dark">Thanks</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your message is ready to send. Wire this form to your CRM or email
          provider when you go live.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-mono-label text-[10px] text-muted">Name</span>
          <input
            required
            name="name"
            className="border border-line bg-white px-4 py-3 outline-none focus:border-brand"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-mono-label text-[10px] text-muted">Email</span>
          <input
            required
            type="email"
            name="email"
            className="border border-line bg-white px-4 py-3 outline-none focus:border-brand"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="font-mono-label text-[10px] text-muted">Company</span>
        <input
          name="company"
          className="border border-line bg-white px-4 py-3 outline-none focus:border-brand"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-mono-label text-[10px] text-muted">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          className="resize-y border border-line bg-white px-4 py-3 outline-none focus:border-brand"
        />
      </label>
      <div>
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
}
