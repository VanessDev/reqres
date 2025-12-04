import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const API_USER_URL = "https://reqres.in/api/users"; 
const API_KEY = "reqres_2dc7bae6849a4907b4cb221c4b246fdf"; 

function UserDetail() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${API_USER_URL}/${id}`, {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
          },
        });

        console.log("STATUS USER", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("Réponse non OK:", res.status, text);
          throw new Error("Erreur HTTP " + res.status);
        }

        const data = await res.json();
        setUser(data.data || data);
      } catch (err) {
        console.error(err);
        setErrorMessage("Impossible de charger cet utilisateur.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className="app">
        <main className="profile-page">
          <div className="loader-wrapper">
            <div className="loader" />
            <p className="loader-text">Chargement de l’utilisateur…</p>
          </div>
        </main>
      </div>
    );
  }

  if (errorMessage || !user) {
    return (
      <div className="app">
        <main className="profile-page">
          <div className="error-box">
            <p>{errorMessage || "Utilisateur introuvable."}</p>
          </div>
          <Link to="/" className="back-link">
            ← Retour à la liste
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="profile-page">
        <header className="profile-header">
          <h1 className="profile-title">Détails de l’utilisateur</h1>
          <p className="profile-subtitle">
            Informations pour l’utilisateur #{user.id}.
          </p>
        </header>

        <article className="user-card user-card--detail">
          <div className="user-avatar-wrapper">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.first_name}
                className="user-avatar"
              />
            ) : (
              <div className="user-avatar user-avatar--placeholder">
                {user.first_name?.[0] || user.last_name?.[0] || "?"}
              </div>
            )}
          </div>

          <div className="user-info">
            <div className="user-id">#{user.id}</div>
            <div className="user-name">
              {user.first_name} {user.last_name}
            </div>
            <div className="user-email">{user.email}</div>
          </div>
        </article>

        <Link to="/" className="back-link">
          ← Retour à la liste des utilisateurs
        </Link>
      </main>
    </div>
  );
}

export default UserDetail;
