import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

function CentroCombateRedirect() {

  const { user_id } = useContext(AuthContext);

  useEffect(() => {
    window.location.href = `https://card-battle-phi.vercel.app/${user_id}`;
  }, []);

  return null; // o un mensaje indicando la redirección
}

export default CentroCombateRedirect;
