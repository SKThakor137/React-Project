import { useEffect, useRef, useState } from "react";
const Quiz = () => {
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
  let [data, setData] = useState([]);
  let [index, setIndex] = useState(0);
  let [questions, setQuestions] = useState([]);
  let [answer, setAnswer] = useState([]);
  let [score, setScore] = useState(0);
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);
  let [newData, setNewData] = useState(false);

  let options = useRef([]);
  useEffect(() => {
    // Fetch Data Function
    async function fetchData() {
      try {
        const response = await fetch(apiKey);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const dataJson = await response.json();
        setData(dataJson);

        // Modify this data

        // store question in array
        let questionsArray = dataJson.map((ele) => ele.question.text);
        setQuestions(questionsArray);

        // store answer in array
        let array = dataJson.map((ele) => {
          let correctAnswer = ele.correctAnswer;
        //   console.log(correctAnswer);
          let incorrectAnswers = ele.incorrectAnswers;
          let mixUp = [correctAnswer, ...incorrectAnswers];

          let obj = mixUp.map((ele, idx) => {
            return {
              text: ele,
              correct: idx === 0 ? true : false,
            };
          });
          let answer = obj.sort(() => Math.random() - 0.5);
          return answer;
        });
        setAnswer(array);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [newData, apiKey]);
//   console.log(questions);
    

  // Handle Multiple Options
  const handleAnswerClick = (event, correct) => {
    if (lock == false) {
      if (correct === true) {
        event.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        event.target.classList.add("incorrect");
        options.current.forEach((button, idx) => {
          if (answer[index][idx].correct) {
            button.classList.add("correct");
          }
        });
      }
      setLock(true);
    }
  };

  const nextAnswer = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      // setIndex(++index);
      setIndex((prevIndex) => prevIndex + 1);
      setLock(false);

      options.current.forEach((button) => {
        button.classList.remove("correct", "incorrect");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setNewData((prev) => !prev);
  };


  return (
    <>
      <>
        {!data ? (
          <>
            <h2>Loading...</h2>
          </>
        ) : (
          <>
            <div className="app">
              {result ? (
                <></>
              ) : (
                <>
                  <h2 id="questions">
                    {index + 1}. {questions[index]}
                  </h2>
                  <div id="answer-buttons">
                    {answer.length > 0 &&
                      answer[index].map((ans, id) => {
                        const { text, correct } = ans;
                        return (
                          <button
                            key={id}
                            ref={(el) => (options.current[id] = el)}
                            disabled={lock}
                            className="btn"
                            onClick={(event) =>
                              handleAnswerClick(event, correct)
                            }
                          >
                            {text}
                          </button>
                        );
                      })}
                  </div>
                </>
              )}
              {result ? (
                <>
                  <h4>
                    Your Scored {score} out of {data.length}
                  </h4>
                </>
              ) : (
                <></>
              )}

              <button
                id="next-btn"
                style={{ display: "block" }}
                disabled={!lock}
                onClick={result ? reset : nextAnswer}
              >
                {result ? "Reset" : "Next"}
              </button>

              {result ? (
                <></>
              ) : (
                <>
                  <div className="index">
                    {index + 1} of {data.length} questions
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Quiz;
