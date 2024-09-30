import { useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

function CentroCombateRedirect() {

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    window.location.href = `https://card-battle-phi.vercel.app/arena/${userId}`;
  }, []);

  return null; // o un mensaje indicando la redirección
}

export default CentroCombateRedirect;
