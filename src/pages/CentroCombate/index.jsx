import { useEffect } from "react";

function CentroCombateRedirect() {
  useEffect(() => {
    window.location.href = "https://react-tcg.netlify.app/";
  }, []);

  return null; // o un mensaje indicando la redirección
}

export default CentroCombateRedirect;
