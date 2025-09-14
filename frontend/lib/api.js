export async function fetchTranscript(url) {
  const baseUrl = import.meta.env.VITE_API_URL || ""; // local if defined, else same-domain

  const res = await fetch(`${baseUrl}/api/transcript`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error("Failed to fetch transcript.");
  return await res.json();
}
