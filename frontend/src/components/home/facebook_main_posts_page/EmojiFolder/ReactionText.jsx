import React from "react";
import { FiThumbsUp } from "react-icons/fi";

const ReactionText = ({ type }) => {
  return (
    <>
      {type == "like" && (
        <>
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Like</h6>
        </>
      )}

      {type == "sad" && (
        <>
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600"> Sad</h6>
        </>
      )}
      {type == "love" && (
        <>
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600"> Love</h6>
        </>
      )}
      {type == "haha" && (
        <>
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600"> Haha</h6>
        </>
      )}
      {type == "wow" && (
        <>
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">WOW</h6>
        </>
      )}
      {type == "angray" && (
        <>
          <FiThumbsUp className="text-gray-600" />
          <h6 className="font-semibold text-sm text-gray-600">Angray</h6>
        </>
      )}
    </>
  );
};

export default ReactionText;
