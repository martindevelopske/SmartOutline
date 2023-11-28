import { useEffect } from "react";
import "./App.css";

function App() {
  const getData = async () => {
    const res = await fetch("http://localhost:4000/");
    console.log(await res.json());

    return res;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>testing on docker files</div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
