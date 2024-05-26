import React, { useEffect, useState } from "react";
import "./MainBody.css";

function MainBody() {
  const [datas, setData] = useState([]);
  const [rows, setRows] = useState("");
  const [column, setColumn] = useState("");

  const url = "https://random-word-api.herokuapp.com/word?number=100&length=5";

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch(url);
        const words = await response.json();

        // Create an array to store the selected words
        const selectedWords = [];
        for (let i = 0; i < 6; i++) {
          let randomIndex = Math.floor(Math.random() * words.length);
          selectedWords.push(words[randomIndex]);
        }
        setRows(selectedWords.length);
        console.log(selectedWords.length);
        setColumn(selectedWords[0].split("").length);
        console.log(selectedWords[0].split("").length);

        setData(selectedWords);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWord();
  }, []);

  return (
    <div className="main-container">
      {rows && column
        ? Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="row">
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <input key={colIndex} type="text" />
              ))}
            </div>
          ))
        : null}
    </div>
  );
}

export default MainBody;
