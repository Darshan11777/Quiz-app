import React, { useState, useEffect } from "react";

const fetchData = async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const createOptions = (correctAnswer, incorrectAnswers) => {
  const options = [...incorrectAnswers, correctAnswer];
  return options.sort(() => Math.random() - 0.5);
};

const Try = () => {
  const [data, setData] = useState([]);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
console.log(data);
console.log(questionsAnswers);
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  const fetchAndSetData = debounce(async () => {
    const fetchedData = await fetchData();
    setData(fetchedData);
    setQuestionsAnswers(
      fetchedData.map((obj) => {
        return {
          question: obj.question,
          option: createOptions(
            obj.correct_answer,
            obj.incorrect_answers
          ),
          selectedAns: "",
          correctAns: obj.correct_answer,
        };
      })
    );
  }, 500);

  useEffect(() => {
    fetchAndSetData();
    console.log("nhh",data);
  }, []);


  return (
    <div>
      {/* Render the questions and answers here */}
    </div>
  );
};

export default Try;