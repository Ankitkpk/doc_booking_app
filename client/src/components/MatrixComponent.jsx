import React, { useState } from "react";

const MatrixComponent = () => {
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill("white"))
  );
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    const newMatrix = matrix.map((rowArray, rowIndex) =>
      rowArray.map((box, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return "green";
        }
        return box;
      })
    );

    setMatrix(newMatrix);
    setClickOrder((prevOrder) => [...prevOrder, { row, col }]);

    if (row === 2 && col === 2) {
      playOrangeSequence([...clickOrder, { row, col }], newMatrix);
    }
  };

  const playOrangeSequence = (clickOrder, initialMatrix) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= clickOrder.length) {
        clearInterval(interval);
        return;
      }

      const { row, col } = clickOrder[index];
      const updatedMatrix = initialMatrix.map((rowArray, rowIndex) =>
        rowArray.map((box, colIndex) =>
          rowIndex === row && colIndex === col ? "orange" : box
        )
      );

      setMatrix(updatedMatrix);
      index++;
    }, 500);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
      {matrix.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleClick(rowIndex, colIndex)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: color,
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default  MatrixComponent;
