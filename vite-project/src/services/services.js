const API_USER_URL = "https://reqres.in/api/users";
const API_KEY = import.meta.env.VITE_API_KEY;


//logique du fetch ppour aafficher les utilisateurs

export async function loadData() {
  const res = await fetch(`${API_USER_URL}?page=1`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });

  console.log("STATUS", res.status);

  if (!res.ok) {
    const text = await res.text();
    console.error("Réponse non OK:", res.status, text);
    throw new Error("Erreur HTTP " + res.status);
  }

  const data = await res.json();

  return data;
}
