import * as yup from "yup";
import moment from "moment";

export const schema = yup.object().shape({
  name: yup.string().required("Please enter a name"),
  location: yup.string().required("Please enter a location"),
  allDay: yup
    .string()
    .required("Please select one of the options")
    .oneOf(["Yes", "No"], "Please chose one of the options"),
  start: yup
    .string()
    .test("StateDate", "Please enter a valid date", (value) =>
      moment(value).isSameOrAfter(moment().format("YYYY-MM-DD"))
    )
    .required("Please select a date"),
  end: yup
    .string()
    .test("EndDate", "Please enter a valid date", (value) =>
      moment(value).isSameOrAfter(moment().format("YYYY-MM-DD"))
    )
    .required("Please select a date"),
  dimension: yup.string().required("Please enter the dimension"),
  tags: yup.string().required("Please enter a value"),
  facilitators: yup.string().required("Please enter a value"),
  levelOfCare: yup.string().required("Please enter a value"),
  hobbies: yup.string().required("Please enter a value"),
  isRepeated: yup
    .string()
    .required("Please select one of the options")
    .oneOf(["Yes", "No"], "Please chose one of the options"),
});
