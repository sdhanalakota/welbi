import * as yup from "yup";
import moment from "moment";

export const schema = yup.object().shape({
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  preferredName: yup.string().required("Please enter preferred name"),
  room: yup.string().required("Please enter room number"),
  levelOfCare: yup
    .string()
    .required("Please choose one of the options")
    .oneOf(
      ["INDEPENDENT", "ASSISTED", "MEMORY", "LONGTERM"],
      "Please chose one of the options"
    ),
  ambulation: yup
    .string()
    .required("Please choose one of the options")
    .oneOf(
      ["NOLIMITATIONS", "CANE", "WALKER", "WHEELCHAIR"],
      "Please chose one of the options"
    ),
  birthDate: yup
    .string()
    .test(
      "DOB",
      "Please enter a valid DOB",
      (value) => moment().diff(moment(value), "years") >= 1
    )
    .required("Please select a date"),
  moveInDate: yup
    .string()
    .test("MoveIn", "Date should be future", (value) =>
      moment(value).isAfter(new Date().toISOString())
    )
    .required("Please select a date"),
});
