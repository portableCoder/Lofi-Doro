import { faArrowLeft, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { transform } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();
  useEffect(() => {}, []);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <div className="is-size-1"> OOPS! </div>
        <div className="is-size-3"> That one does not exist, chief </div>
        <div>
          {" "}
          <button
            onClick={() => {
              history.push("/");
            }}
            className="button is-primary"
          >
            {" "}
            <span>
              <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Go Back
            </span>{" "}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
