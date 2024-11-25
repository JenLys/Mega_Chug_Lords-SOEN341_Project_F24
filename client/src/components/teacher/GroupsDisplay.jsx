import AddStudentToGroupForm from "./AddStudentToGroupForm";

export default function GroupsDisplay({ groups, handleAddStudent }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {groups.map((group, index) => (
        <div
          key={index}
          className="border rounded-md p-7 text-center"
          style={{
            border: "3px solid #FFFFFF",
            borderRadius: "14px",
          }}
        >
          <span className="font-bold">{group.group.name}</span>
          <div className="mt-2">
            {group.students.map((student, idx) => (
              <div key={idx} className="text-sm">
                Student ID: {student.user_id}
              </div>
            ))}
          </div>
          <AddStudentToGroupForm
            handleAddStudent={handleAddStudent}
            groupId={group.group._id}
            groupIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
