import React from "react";

const NewRating = ({ setRating, rating }) => {
  return (
    <>
      <div className="rating my-2 d-flex">
        <span>
          <i
            className="fa-regular fa-face-frown fa-xl"
            style={{
              color: `${rating >= 1 ? "#db1600" : "#97a7c4"}`,
            }}
            onClick={() => setRating(1)}
          ></i>
        </span>
        <span>
          <i
            className="fa-regular fa-face-frown-open fa-xl"
            style={{ color: `${rating >= 2 ? "#f08000" : "#97a7c4"}` }}
            onClick={() => setRating(2)}
          ></i>
        </span>
        <span>
          <i
            className="fa-regular fa-face-meh fa-xl"
            style={{ color: `${rating >= 3 ? "#dba100" : "#97a7c4"}` }}
            onClick={() => setRating(3)}
          ></i>
        </span>
        <span>
          <i
            className="fa-regular fa-face-smile fa-xl"
            style={{ color: `${rating >= 4 ? " #a5b814" : "#97a7c4"}` }}
            onClick={() => setRating(4)}
          ></i>
        </span>
        <span>
          <i
            className="fa-regular fa-face-grin-hearts fa-xl"
            style={{ color: `${rating === 5 ? " #358301" : "#97a7c4"}` }}
            onClick={() => setRating(5)}
          ></i>
        </span>
      </div>
    </>
  );
};

export default NewRating;
