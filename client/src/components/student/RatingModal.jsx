import { useState } from "react";
import { request } from "../../utils";
import { useAuth } from "../AuthProvider";
import { Rating } from "react-simple-star-rating";

const RatingModal = ({ handleClose, revieweeId, courseId }) => {
  const user = useAuth().storedUser;
  const [ratingCooperation, setRatingCooperation] = useState(0);
  const [ratingConceptual, setRatingConceptual] = useState(0);
  const [ratingPractical, setRatingPractical] = useState(0);
  const [ratingWorkEthic, setRatingWorkEthic] = useState(0);
  const criteria = [
    setRatingCooperation,
    setRatingConceptual,
    setRatingPractical,
    setRatingWorkEthic,
  ];
  const [comments, setComments] = useState({
    Cooperation: "",
    Conceptual: "",
    Practical: "",
    WorkEthic: "",
  });

  const handleCommentChange = (field, value) => {
    setComments((prevComments) => ({
      ...prevComments,
      [field]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to submit?")) return;

    await request("/courses/add-review", "POST", {
      reviewer_id: user.user_id,
      reviewee_id: revieweeId,
      course_id: courseId,
      review: {
        cooperation: ratingCooperation,
        conceptual: ratingConceptual,
        practical: ratingPractical,
        work_ethic: ratingWorkEthic,
        cooperation_comment: comments.Cooperation,
        conceptual_comment: comments.Conceptual,
        practical_comment: comments.Practical,
        work_ethic_comment: comments.WorkEthic,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't add review");
        }
        return res;
      })
      .then(handleClose())
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="flex align-center justify-center text-white">
      <div className="bg-black w-fit text-white flex flex-col gap-4 p-40 rounded-xl">
        <h2 className="text-center text-white text-3xl">Enroll in a course</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4">
            {["Cooperation", "Conceptual", "Practical", "Work Ethic"].map(
              (field, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-4 border border-white rounded-lg"
                >
                  <label className="mb-2">{field}</label>
                  <Rating onClick={(rate) => criteria[idx](rate)} />
                  <textarea
                    className="text-black mt-2 w-full"
                    placeholder={`${field} Comment`}
                    value={comments[field]}
                    onChange={(e) =>
                      handleCommentChange(
                        field.replace(/\s+/g, ""),
                        e.target.value
                      )
                    }
                  />
                </div>
              )
            )}
          </div>
          <input
            type="submit"
            className="text-m w-fit self-center text-center border-solid border-white border-[3px] ease-in duration-50 p-1 rounded-lg hover:scale-110"
          />
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
          className="mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
