import { useState } from "react";

export function App() {
  var [time, tickTime] = useState(new Date());
  setInterval(() => tickTime((time = new Date())), 1000);
  return (
    <h1>{time.toString()}(time was rendered using a functional component)</h1>
  );
}
