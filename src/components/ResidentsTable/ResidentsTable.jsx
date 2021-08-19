/* eslint-disable array-callback-return */
import { Button, Table } from "react-bootstrap";
import { enrollAResident } from "../../services/services";
import { secondaryBtn } from "../common.style";

export default function ResidentsTable({
  residents,
  program,
  showResidentModal,
  setShowResidentModal,
  attendanceList,
  setAttendanceList,
}) {
  async function onEnroll(programId, residentId, status) {
    const enrollResidentResponse = await enrollAResident(
      programId,
      residentId,
      status
    );

    if (
      enrollResidentResponse.residentId === residentId &&
      enrollResidentResponse.status === status &&
      enrollResidentResponse.author === sessionStorage.getItem("authToken")
    ) {
      const newResident = {
        residentId: enrollResidentResponse.residentId,
        status: enrollResidentResponse.status,
        author: enrollResidentResponse.author,
      };

      setAttendanceList((prevArray) => [...prevArray, newResident]);
      setShowResidentModal(!showResidentModal);
    }
  }

  const getResidentsList = () => {
    const list = [];
    residents.map((resident) => {
      let exist = false;
      attendanceList.map((attendant) => {
        if (resident.id === attendant.residentId) {
          exist = true;
        }
      });
      if (!exist) {
        list.push(
          <tr key={list.length}>
            <td>{resident.name}</td>
            <td>{new Date(resident.birthDate["@ts"]).toLocaleDateString()}</td>
            <td>
              <span style={{ float: "right" }}>
                <Button
                  size={"sm"}
                  onClick={() =>
                    onEnroll(program.id, resident.id, "Active", program)
                  }
                  className={secondaryBtn()}
                >
                  {"Enroll"}
                </Button>
              </span>
            </td>
          </tr>
        );
      }
    });
    return list;
  };

  return (
    <>
      <Table variant="light">
        <tbody>
          <tr>
            <th>{"Name"}</th>
            <th>{"Birth Date"}</th>
            <th>{""}</th>
          </tr>
          {getResidentsList()}
        </tbody>
      </Table>
    </>
  );
}
