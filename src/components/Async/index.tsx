import React, { useEffect, useState } from "react";

function Async() {
  const [isLoad, setIsLoad] = useState(false);
  const [remove, setRemove] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 500);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setRemove(false);
    }, 500);
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      {remove ? <p>existe</p> : ""}
      {isLoad && (
        <>
          <button>button</button>
          <p>Paragraph</p>
        </>
      )}
    </div>
  );
}

export default Async;
