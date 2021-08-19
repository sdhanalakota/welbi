import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import CustomModal from "../Modal/CutomModal";
import { addProgram } from "../../services/services";
import { schema } from "../../validations/programValidation";
import { PROGRAM_INIT_VALUES } from "../../utils/constants";
import {
  primaryBtn,
  primaryText,
  formInputStyle,
  errorWarningStyle,
} from "../common.style";

export default function AddProgram({ setProgramsList }) {
  const [showAddProgramFormModal, setShowAddProgramFormModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...PROGRAM_INIT_VALUES,
    },
  });

  const formSubmitHandle = async (data) => {
    const programDetails = { ...data };
    try {
      const addProgramResponse = await addProgram(programDetails);
      if (
        addProgramResponse.id &&
        addProgramResponse.author === sessionStorage.getItem("authToken")
      ) {
        setProgramsList((prevVal) => [...prevVal, addProgramResponse]);
        setShowAddProgramFormModal(!showAddProgramFormModal);
      }
    } catch (e) {
      alert("Something went wrong, try reloading!!");
    }
  };

  const FormComponent = (
    <>
      <form onSubmit={handleSubmit(formSubmitHandle)}>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Name</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter a name.."
              name="name"
              {...register("name")}
              className={formInputStyle(errors.name?.message)}
            />
            {errors.name?.message && (
              <div className={errorWarningStyle()}>{errors.name?.message}</div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Location</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter a location.."
              name="location"
              {...register("location")}
              className={formInputStyle(errors.location?.message)}
            />
            {errors.location?.message && (
              <div className={errorWarningStyle()}>
                {errors.location?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>All Day</Form.Label>
            <br />
            <select
              type="select"
              name="allDay"
              {...register("allDay")}
              className={formInputStyle(errors.allDay?.message)}
              title={"Select"}
            >
              <option defaultValue>Select</option>
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
            </select>
            {errors.allDay?.message && (
              <div className={errorWarningStyle()}>
                {errors.allDay?.message}
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Start Date</Form.Label>
            <br />
            <input
              type="date"
              name="start"
              className={formInputStyle(errors.start?.message)}
              {...register("start")}
            />
            {errors.start?.message && (
              <div className={errorWarningStyle()}>{errors.start?.message}</div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>End Date</Form.Label>
            <br />
            <input
              type="date"
              name="end"
              className={formInputStyle(errors.end?.message)}
              {...register("end")}
            />
            {errors.end?.message && (
              <div className={errorWarningStyle()}>{errors.end?.message}</div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Dimension</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter demension.."
              name="dimension"
              className={formInputStyle(errors.dimension?.message)}
              {...register("dimension")}
            />
            {errors.dimension?.message && (
              <div className={errorWarningStyle()}>
                {errors.dimension?.message}
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Tags</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Use comma to add multiple.."
              name="tags"
              className={formInputStyle(errors.tags?.message)}
              {...register("tags")}
            />
            {errors.tags?.message && (
              <div className={errorWarningStyle()}>{errors.tags?.message}</div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Facilitators</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Use comma to add multiple.."
              name="facilitators"
              className={formInputStyle(errors.facilitators?.message)}
              {...register("facilitators")}
            />
            {errors.facilitators?.message && (
              <div className={errorWarningStyle()}>
                {errors.facilitators?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Repeated</Form.Label>
            <br />
            <select
              type="select"
              name="isRepeated"
              className={formInputStyle(errors.isRepeated?.message)}
              {...register("isRepeated")}
              title={"Select"}
            >
              <option defaultValue>Select</option>
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
            </select>
            {errors.isRepeated?.message && (
              <div className={errorWarningStyle()}>
                {errors.isRepeated?.message}
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Level of Care</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Use comma to add multiple.."
              name="levelOfCare"
              className={formInputStyle(errors.levelOfCare?.message)}
              {...register("levelOfCare")}
            />
            {errors.levelOfCare?.message && (
              <div className={errorWarningStyle()}>
                {errors.levelOfCare?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Hobbies</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Use comma to add multiple.."
              name="hobbies"
              {...register("hobbies")}
              className={formInputStyle(errors.hobbies?.message)}
            />
            {errors.hobbies?.message && (
              <div className={errorWarningStyle()}>
                {errors.hobbies?.message}
              </div>
            )}
          </Col>
        </Row>
        <div style={{ float: "right" }}>
          <Button
            size="sm"
            onClick={() => {
              setShowAddProgramFormModal(!showAddProgramFormModal);
              reset(PROGRAM_INIT_VALUES);
            }}
            className={`${primaryBtn()} m-1`}
          >
            Close
          </Button>
          <Button size="sm" type="submit" className={`${primaryBtn()} m-1`}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );

  return (
    <div className="m-4 mb-0">
      <Button
        className={primaryBtn()}
        onClick={() => setShowAddProgramFormModal(!showAddProgramFormModal)}
      >
        <h6>{"Add Program"}</h6>
      </Button>
      <CustomModal
        title={"Add Program"}
        showModal={showAddProgramFormModal}
        onHide={() => setShowAddProgramFormModal(!showAddProgramFormModal)}
        Content={FormComponent}
        ExtraContent={null}
        showFooter={false}
      />
    </div>
  );
}
