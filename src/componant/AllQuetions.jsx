import  { useState, useEffect } from "react";
import Qutions from "./Qutions";
// import '../index.css'



const fetchData = async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
    console.log('see');
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};








export default function AllQuetions() {
  // *********************1.fecth data set use ful information

  // all api call data
  const [Data, setData] = useState([]);

  // quetions,answers ,option and selectAnswer

  const [quetionsAnswers, setquetionsAnswers] = useState([]);

  // check show result
  const [result, setresult] = useState(false);

  // show warning
  const [warnings, setwarnings] = useState(false);

  // check right ans

  const [ansCount, setansCount] = useState(0);

  // set state

  useEffect(() => {
    if (Data.length === 0) {
      const callApi = async () => {
        let apiC = await fetch("https://opentdb.com/api.php?amount=5");
        let data = await apiC.json();

        setData(data.results);
        
        setquetionsAnswers(
          data.results.map((obj) => {
            {
              // console.log(obj.question);
              return {
                question: obj.question,
                option: createOptions(
                  obj.correct_answer,
                  obj.incorrect_answers
                ),
                selectedAns: "",
                correctAns: obj.correct_answer,
              };
            }
          })
        );
      };

      callApi();
    }
  }, [Data]);



  // 2.make all functions

  // suffle option
  function createOptions(correct, incorrect) {
    const allOptions = [...incorrect, correct];

    // shuffle(allOptions);
    for (let i = allOptions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    return allOptions;
  }

  // show result
  function checkAns() {
    let allAnsSubmit = quetionsAnswers.every((obj) => {
      return obj.selectedAns !== "";
    });
    if (allAnsSubmit) {
      setwarnings(false);
      setresult(true);
      quetionsAnswers.forEach((obj) => {
        obj.selectedAns === obj.correctAns && setansCount((prev) => prev + 1);
      });
    } else {
      setwarnings(true);
    }
  }

  // select option

  function selectOptions(question, selectAns) {
    setquetionsAnswers((prevval) => {
      return prevval.map((obj) => {
        return obj.question === question
          ? { ...obj, selectedAns: selectAns }
          : obj;
      });
    });
  }
  // selectOptions()

  function newGame() {
    setData([]);
    setquetionsAnswers([]);
    setwarnings(false);
    setresult(false);
    setansCount(0);
  }

  // 3.set qution componant
  let QuetionAndAnswer = quetionsAnswers.map((obj, i) => {
    return (
      <Qutions
        key={i}
        question={obj.question}
        options={obj.option}
        selectOption={selectOptions}
        selectedAns={obj.selectedAns}
        correct={obj.correctAns}
        result={result}
      />
    );
  });

  return (
    <div className="container">
      <div className="questions-container">
        {QuetionAndAnswer}
        </div>
        <div className="text-center">
      {warnings && <p className="warning-message">please select all answers</p>}
      {QuetionAndAnswer[4] ? (
        <button className="check-btn" onClick={result ? newGame : checkAns}>
          {result ? "new game" : "Show Answers"}
        </button>
      ) : (
        <h1 className="loading">Loading...</h1>
      )}
      {result && 
      <div className="result-container">
      <p className="result-message">you have {ansCount} Right answers</p>
      </div>
      }
      </div>
    </div>
  );
}
