import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadData } from "../services/services";
import "../App.css";





function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

 useEffect(() => { 
  async function loadUsers() {
    try {
      const data = await loadData();
      setUsers(data.data || data);
    } catch (err) {
      console.error(err);
      setErrorMessage("Impossible de charger les utilisateurs.");
    } finally {
      // On force le loader à rester visible au moins 800 ms
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  loadUsers();
}, []);




  // états de chargement / erreur
  if (loading) {
    return (
      
      <div className="app">
        <main className="profile-page">
          <div className="loader-wrapper">
            <div className="loader" />
            <p className="loader-text">Chargement des utilisateurs…</p>
      <span class="loader"></span>
            </div>
        </main>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="app">
        <main className="profile-page">
          <div className="error-box">
            <p>{errorMessage}</p>
          </div>
        </main>
      </div>
    );
  }

  // ----- rendu normal -----
  return (
    <div className="app">
      <main className="profile-page">
        <header className="profile-header">
          <h1 className="profile-title">Utilisateurs</h1>
          <p className="profile-subtitle">
            Liste des utilisateurs 
          </p>
        </header>

        <section className="user-list">
          {users.map((user) => (
            <article key={user.id} className="user-card">
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

              <div className="user-actions">
                <Link to={`/users/${user.id}`} className="user-link-btn">
                  Voir le profil →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Profile;
