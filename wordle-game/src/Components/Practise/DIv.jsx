import React, { useState, useEffect } from "react";
import "./Div.css";

function DIv() {
  const [data, setData] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=6&length=5"
        // fetching the 5 letter random word from this api 
      );
      const words = await response.json();
    //   changes into uppercase and spillited to fit each letter in each input field
      const newData = words.map((word) => word.toUpperCase().split(""));
      setData(newData);
      setUpdates(
        Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""))
        // this is to create 6*5 placment area
        // the first array from create 6 places vertically and 2nd one create 5 on each line horizontally and the last function is to initially assign null value
        
      );
    };
    fetchData();
  }, []);
  const comparePrevious = (event, rowIndex, colIndex) => {
    const newValue = event.target.value.toUpperCase();
    const originalValue = data[rowIndex][colIndex];
    const newUpdates = [...updates];
    newUpdates[rowIndex][colIndex] = newValue;
    setUpdates(newUpdates);
  };

  return (
    <>
    <h1>Wordle Like shit</h1>
      <div className="outer-box">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="rowData">
            {row.map((item, colIndex) => (
              <input
                key={colIndex}
                type="text"
                readOnly
                value={item.toUpperCase()}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="outer-box2">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="rowData">
            {row.map((item, colIndex) => {
              const currentInput = updates[rowIndex][colIndex];
              const isCorrect = currentInput === item.toUpperCase();
              const isEmpty = currentInput === "";
              return (
                <input
                  key={colIndex}
                  type="text"
                  value={currentInput}
                  onChange={(event) =>
                    comparePrevious(event, rowIndex, colIndex)
                  }
                  style={{
                    backgroundColor: isEmpty ? "" : isCorrect ? "green" : "red",
                  }}
                  maxLength="1"
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default DIv;
