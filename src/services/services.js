import axios from "axios";

export const setAuthToken = async () => {
  const requestData = JSON.stringify({
    email: process.env.REACT_APP_EMAIL,
  });

  return fetch(`start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestData,
  }).then((response) => response.json());
};

export const getResidents = async () => {
  const { data } = await axios.get(
    `residents?token=${sessionStorage.getItem("authToken")}`
  );

  return data;
};

export const getPrograms = async () => {
  const { data } = await axios.get(
    `programs?token=${sessionStorage.getItem("authToken")}`
  );

  return data;
};

export const enrollAResident = async (programId, residentId, status) => {
  const requestData = JSON.stringify({
    residentId: residentId,
    status: status,
  });

  return fetch(
    `programs/${programId}/attend?token=${sessionStorage.getItem("authToken")}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    }
  ).then((response) => response.json());
};

export const addProgram = async (programDetails) => {
  const requestData = JSON.stringify({
    name: programDetails.name,
    location: programDetails.location,
    allDay: programDetails.allDay === "Yes" ? true : false,
    start: new Date(programDetails.start).toISOString(),
    end: new Date(programDetails.end).toISOString(),
    tags: programDetails.tags.split(","),
    attendance: [],
    dimension: programDetails.dimension,
    facilitators: programDetails.facilitators.split(","),
    levelOfCare: programDetails.levelOfCare.split(","),
    hobbies: programDetails.hobbies.split(","),
    isRepeated: programDetails.isRepeated === "Yes" ? true : false,
  });

  return fetch(`programs?token=${sessionStorage.getItem("authToken")}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestData,
  }).then((response) => response.json());
};

export const addResident = async (residentDetails) => {
  const requestData = JSON.stringify({
    name: `${residentDetails.firstName} ${residentDetails.lastName}`,
    firstName: residentDetails.firstName,
    lastName: residentDetails.lastName,
    preferredName: residentDetails.preferredName,
    ambulation: residentDetails.ambulation,
    status: true,
    room: residentDetails.room,
    levelOfCare: residentDetails.levelOfCare,
    birthDate: new Date(residentDetails.birthDate).toISOString(),
    moveInDate: new Date(residentDetails.moveInDate).toISOString(),
    attendance: [],
  });

  return fetch(`residents?token=${sessionStorage.getItem("authToken")}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestData,
  }).then((response) => response.json());
};
