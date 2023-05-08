import { signOut } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  async function logoutClicked() {
    await signOut();
    navigate("/auth");
  }

  return (
    <div>
      <button onClick={logoutClicked}>Kijelentkezés</button>
    </div>
  );
}

export default Home;