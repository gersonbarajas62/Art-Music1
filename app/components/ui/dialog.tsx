"use client";
import { useState } from "react";

export function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">{children}</div>;
}

export function DialogTrigger({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick}>{children}</button>;
}

export function DialogContent({ children, open }: { children: React.ReactNode; open: boolean }) {
  return open ? <div className="bg-gray-900 p-6 rounded-lg">{children}</div> : null;
}
