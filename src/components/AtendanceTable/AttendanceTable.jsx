/* eslint-disable array-callback-return */
import { Table } from "react-bootstrap";

export default function AttendanceTable({ residents, attendanceList }) {
  const getAttendanceList = () => {
    const list = [];
    attendanceList.map((item) => {
      const { residentId, status } = item;
      residents.map((resident) => {
        if (resident.id === residentId) {
          list.push(
            <tr key={list.length}>
              <td>{resident.firstName}</td>
              <td>{resident.lastName}</td>
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
          </tr>
          {getAttendanceList()}
        </tbody>
      </Table>
    </>
  );
}
