import { useState } from "react";
import { flushSync } from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Calculate = () => {
  const [valArr, setValArr] = useState([] as any[]);
  const [entering, setEntering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispValArr = valArr.join("");

  const portfolio_link = "https://rebecca-shoptaw.github.io/";

  const clearAll = () => {
    flushSync(() => {
      setValArr([]);
      setEntering(false);
    });
  };

  const addToVal = (n: string | number) => {
    if (document.readyState == "complete") {
      if (
        (typeof n == "number" &&
          !(
            n == 0 &&
            valArr
              .concat(n)
              .join("")
              .match(/^00+|[-+/*]00+$/)
          )) ||
        (typeof n == "string" &&
          n == "." &&
          !valArr.join("").match(/\d*[.]\d*$/)) ||
        (typeof n == "string" && n != ".")
      ) {
        flushSync(() => {
          setValArr(valArr.concat(n));
          setEntering(true);
        });
      }
    } else window.onload = () => addToVal(n);
  };

  const setResult = () => {
    flushSync(() => {
      setValArr([
        Math.round(
          eval(
            valArr
              .join("")
              .replace(/[+*/-]+[+]/g, "+")
              .replace(/[+*/-]+[/]/g, "/")
              .replace(/[+*/-]+[*]/g, "*")
          ) *
            100000 +
            Number.EPSILON
        ) / 100000,
      ]);
    });
  };

  interface button_arr {
    id: number | string;
    disp?: string;
    func?: Function;
  }

  const buttons: button_arr[] = [
    { id: "Backspace", disp: "AC", func: clearAll },
    { id: "*", disp: "×" },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: "/", disp: "÷" },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: "+" },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: "-" },
    { id: 0 },
    { id: "." },
    { id: "=", func: setResult },
  ];

  window.onload = () => {
    setLoaded(true);
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      document.getElementById(e.key)?.click();
    });
  };

  return (
    <>
      {!loaded && (
        <div id="loading">
          <ClipLoader color={"#ddd"} size={100} />
        </div>
      )}
      <div id="pg-body" className={`${!loaded ? "hidden" : ""}`}>
        <div id="close-btn">
          <a href={portfolio_link}>
            <i className="bi bi-x-lg" />
          </a>
        </div>
        <div
          id="calc-body"
          className="d-flex flex-row flex-wrap justify-content-center"
        >
          <div id="title-box" className="d-flex flex-row">
            <p>ART DECO CALCULATOR</p>
          </div>
          <div id="display-box">
            <div id="display-contain">
              <p id="display">{entering ? dispValArr : 0}</p>
            </div>
          </div>
          <div
            id="num-buttons"
            className="d-flex flex-row flex-wrap justify-content-center"
          >
            {buttons.map((button) => (
              <button
                id={button.id.toString()}
                key={button.id}
                className={`${
                  typeof button.id == `number`
                    ? `num-btn ${button.id == 0 ? "zero" : ""}`
                    : "op-btn"
                }`}
                onClick={
                  button.func
                    ? () => button.func?.()
                    : () => addToVal(button.id)
                }
              >
                {button.disp ? button.disp : button.id}
              </button>
            ))}
          </div>
        </div>
        <div id="footer" className="d-flex flex-column">
          Design & coding by <a href={portfolio_link}>Rebecca Shoptaw</a>
        </div>
      </div>
    </>
  );
};

export default Calculate;
