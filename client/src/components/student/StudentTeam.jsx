import { useState, useEffect } from "react";
import RatingModal from "./RatingModal";
import { Modal } from "@mui/material";
import { request } from "../../utils";

export default function StudentTeam({ courseId, teamMember }) {
  const [isReviewing, setIsReviewing] = useState(false);

  const handleOpen = () => setIsReviewing(true);
  const handleClose = () => setIsReviewing(false);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    const getGroup = async () => {
      try {
        const group = await request(
          "/courses/group-from-course-member",
          "POST",
          {
            course_id: courseId,
            member_id: teamMember,
          }
        );
        if (!group.ok) {
          throw new Error("No group found");
        }
        setGroupId(group._id);
      } catch (e) {
        console.log(e);
      }
    };
    getGroup();
  }, [courseId, teamMember]);

  if (groupId === null) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <Modal onClose={handleClose} open={isReviewing}>
          <RatingModal
            revieweeId={teamMember}
            courseId={courseId}
            groupId={groupId}
            handleClose={handleClose}
          />
        </Modal>
        <button onClick={handleOpen}>Rate</button>
      </>
    );
  }
}
