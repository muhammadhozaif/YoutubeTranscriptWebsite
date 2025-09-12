export async function fetchTranscript(url) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/transcript`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error("Failed to fetch transcript");
  return await res.json();
}
