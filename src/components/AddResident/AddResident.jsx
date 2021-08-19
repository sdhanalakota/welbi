import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Button } from "react-bootstrap";
import CustomModal from "../Modal/CutomModal";
import { addResident } from "../../services/services";
import { schema } from "../../validations/residentValidation";
import { RESIDENT_INIT_VALUES } from "../../utils/constants";
import {
  primaryBtn,
  primaryText,
  errorWarningStyle,
  formInputStyle,
} from "../common.style";

export default function AddResident({ setResidentsList }) {
  const [showAddResidentFormModal, setShowAddResidentFormModal] =
    useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...RESIDENT_INIT_VALUES,
    },
  });

  const formSubmitHandle = async (data) => {
    const residentDetails = { ...data };
    try {
      const addResidentResponse = await addResident(residentDetails);
      if (addResidentResponse.author === sessionStorage.getItem("authToken")) {
        setResidentsList((prevVal) => [...prevVal, addResidentResponse]);
        setShowAddResidentFormModal(!showAddResidentFormModal);
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
            <Form.Label className={primaryText()}>First Name</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter first name.."
              name="firstName"
              {...register("firstName")}
              className={formInputStyle(errors.firstName?.message)}
            />
            {errors.firstName?.message && (
              <div className={errorWarningStyle()}>
                {errors.firstName?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Last Name</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter last name.."
              name="lastName"
              {...register("lastName")}
              className={formInputStyle(errors.lastName?.message)}
            />
            {errors.lastName?.message && (
              <div className={errorWarningStyle()}>
                {errors.lastName?.message}
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Preferred Name</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter preffered name.."
              name="preferredName"
              {...register("preferredName")}
              className={formInputStyle(errors.preferredName?.message)}
            />
            {errors.preferredName?.message && (
              <div className={errorWarningStyle()}>
                {errors.preferredName?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Room Number</Form.Label>
            <br />
            <input
              type="text"
              placeholder="Enter room number.."
              name="room"
              {...register("room")}
              className={formInputStyle(errors.room?.message)}
            />
            {errors.room?.message && (
              <div className={errorWarningStyle()}>{errors.room?.message}</div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Birth Date</Form.Label>
            <br />
            <input
              type="date"
              name="birthDate"
              {...register("birthDate")}
              className={formInputStyle(errors.birthDate?.message)}
            />
            {errors.birthDate?.message && (
              <div className={errorWarningStyle()}>
                {errors.birthDate?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Move-In Date</Form.Label>
            <br />
            <input
              type="date"
              name="moveInDate"
              {...register("moveInDate")}
              className={formInputStyle(errors.moveInDate?.message)}
            />
            {errors.moveInDate?.message && (
              <div className={errorWarningStyle()}>
                {errors.moveInDate?.message}
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label className={primaryText()}>Level of Care</Form.Label>
            <select
              type="select"
              name="levelOfCare"
              {...register("levelOfCare")}
              className={formInputStyle(errors.levelOfCare?.message)}
              title={"Select"}
            >
              <option defaultChecked>Select</option>
              <option value={"INDEPENDENT"}>INDEPENDENT</option>
              <option value={"ASSISTED"}>ASSISTED</option>
              <option value={"MEMORY"}>MEMORY</option>
              <option value={"LONGTERM"}>LONGTERM</option>
            </select>
            {errors.levelOfCare?.message && (
              <div className={errorWarningStyle()}>
                {errors.levelOfCare?.message}
              </div>
            )}
          </Col>
          <Col>
            <Form.Label className={primaryText()}>Ambulation</Form.Label>
            <select
              type="select"
              name="ambulation"
              {...register("ambulation")}
              className={formInputStyle(errors.ambulation?.message)}
            >
              <option defaultChecked>Select</option>
              <option value={"NOLIMITATIONS"}>NOLIMITATIONS</option>
              <option value={"CANE"}>CANE</option>
              <option value={"WALKER"}>WALKER</option>
              <option value={"WHEELCHAIR"}>WHEELCHAIR</option>
            </select>
            {errors.ambulation?.message && (
              <div className={errorWarningStyle()}>
                {errors.ambulation?.message}
              </div>
            )}
          </Col>
        </Row>
        <div style={{ float: "right" }}>
          <Button
            size="sm"
            onClick={() => {
              setShowAddResidentFormModal(!showAddResidentFormModal);
              reset(RESIDENT_INIT_VALUES);
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
        onClick={() => setShowAddResidentFormModal(!showAddResidentFormModal)}
      >
        <h6>{"Add Resident"}</h6>
      </Button>
      <CustomModal
        title={"Add Resident"}
        showModal={showAddResidentFormModal}
        onHide={() => setShowAddResidentFormModal(!showAddResidentFormModal)}
        Content={FormComponent}
        ExtraContent={null}
        showFooter={false}
      />
    </div>
  );
}
