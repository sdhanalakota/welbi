/* eslint-disable array-callback-return */
import { Table } from "react-bootstrap";

export default function EnrolledProgramsTable({
  enrolledProgramsList,
  programs,
}) {
  const getEnrolledProgramsList = () => {
    const list = [];
    enrolledProgramsList.map((item) => {
      const { programId, status } = item;
      programs.map((program) => {
        if (program.id === programId) {
          list.push(
            <tr key={list.length}>
              <td>{program.name}</td>
              <td>{status}</td>
            </tr>
          );
        }
      });
    });
    return list;
  };

  return (
    <>
      <Table variant="light">
        <tbody>
          <tr>
            <th>Program Name</th>
            <th>Status</th>
          </tr>
          {getEnrolledProgramsList()}
        </tbody>
      </Table>
    </>
  );
}
