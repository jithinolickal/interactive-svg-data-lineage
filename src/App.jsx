// https://www.productboard.com/blog/how-we-implemented-svg-arrows-in-react-the-basics-1-3/

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Arrow from "./arrow";

function App() {
  const [count, setCount] = useState(0);

  const featureAPosition = {
    x: 200,
    y: 200,
  };

  // --------
  const featureBPosition = {
    x: 100,
    y: 200,
  };
  const [mousePosition, setMousePosition] = useState({ x: 10, y: 10 });
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  // --------

  return (
    <div className="App">
      <div>sdsdfsdf</div>
      <Arrow startPoint={featureAPosition} endPoint={mousePosition} />
    </div>
  );
}

export default App;
