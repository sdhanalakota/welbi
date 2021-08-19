/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Badge, Card, Button, Row, Col } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import AttendanceTable from "../AtendanceTable/AttendanceTable";
import ResidentsTable from "../ResidentsTable/ResidentsTable";
import uuid from "react-uuid";
import CustomModal from "../Modal/CutomModal";
import {
  cardStyle,
  badgeEnabled,
  primaryBtn,
  primaryText,
  secondaryBtn,
  secondaryText,
  cardHeaderStyle,
} from "../common.style";

export default function Program({ program, residents }) {
  const [attendanceList, setAttendanceList] = useState(program.attendance);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showResidentModal, setShowResidentModal] = useState(false);

  const Hobbies =
    program.hobbies.length > 0
      ? program.hobbies.map((hobbie) => {
          if (typeof hobbie === "string") {
            return (
              <span className="mr-1" key={uuid()}>
                <Badge className={badgeEnabled("#26A69A")}>{hobbie}</Badge>
              </span>
            );
          }
          return null;
        })
      : null;

  const Location = (
    <>
      <div className={primaryText()}>{"Location"}</div>
      <div className={secondaryText()}>{program.location}</div>
    </>
  );

  const LevelOfCare =
    program.levelOfCare.length > 0
      ? program.levelOfCare.map((item) => {
          if (typeof item === "string") {
            const i = item.toLowerCase();
            return (
              <span className="mr-1" key={uuid()}>
                <Badge className={badgeEnabled("#E57373")}>
                  {`${i.charAt(0).toUpperCase()}${i.slice(1)}`}
                </Badge>
              </span>
            );
          }
          return null;
        })
      : null;

  const residentsListModal = (
    <CustomModal
      title={"Residants List"}
      showModal={showResidentModal}
      onHide={() => setShowResidentModal(!showResidentModal)}
      Content={
        <ResidentsTable
          residents={residents}
          program={program}
          showResidentModal={showResidentModal}
          setShowResidentModal={setShowResidentModal}
          attendanceList={attendanceList}
          setAttendanceList={setAttendanceList}
          showFooter={true}
        />
      }
      ExtraContent={null}
      showFooter={true}
    />
  );

  const enrollAResident = (
    <span style={{ float: "right" }}>
      <Button
        size="sm"
        onClick={() => setShowResidentModal(!showResidentModal)}
        className={primaryBtn()}
      >
        {"Enroll a new Resident"}
      </Button>
    </span>
  );

  const HiddenContent = (
    <>
      <div style={{ marginTop: "1rem" }}></div>
      <CustomModal
        title={"Attendance List"}
        showModal={showAttendanceModal}
        onHide={() => setShowAttendanceModal(!showAttendanceModal)}
        Content={
          <AttendanceTable
            residents={residents}
            attendanceList={attendanceList}
          />
        }
        ExtraContent={{ enrollAResident, residentsListModal }}
        showFooter={true}
      />
    </>
  );

  const StartDate = (
    <>
      <div className={primaryText()}>{"Start Date"}</div>
      <div className={secondaryText()}>
        {new Date(program.start).toLocaleDateString()}
      </div>
    </>
  );

  const EndDate = (
    <>
      <div className={primaryText()}>{"End Date"}</div>
      <div className={secondaryText()}>
        {new Date(program.end).toLocaleDateString()}
      </div>
    </>
  );

  const AllDay = (
    <>
      <div className={primaryText()}>{"All Day"}</div>
      <div className={secondaryText()}>{program.allDay ? "Yes" : "No"}</div>
    </>
  );

  const CardHeader = (
    <div>
      <span className={cardHeaderStyle()}>{program.name.toUpperCase()}</span>
    </div>
  );

  return (
    <Card className={cardStyle("19vw")}>
      <Card.Body style={{ width: "95%" }}>
        <div>
          <div>
            <Row
              className="d-flex justify-content-start align-items-center mb-1"
              style={{ height: "auto" }}
            >
              <Col sm={8}>
                {program.name.length > 7 ? (
                  <Marquee
                    gradientColor="#ffffff"
                    play={false}
                  >
                    {CardHeader}
                  </Marquee>
                ) : (
                  CardHeader
                )}
              </Col>
              <Col sm={4}>
                <Button
                  size="sm"
                  onClick={() => setShowAttendanceModal(!showAttendanceModal)}
                  className={secondaryBtn()}
                >
                  {"Attendants"}
                </Button>
              </Col>
            </Row>
            <div>
              <Row className="justify-content-start">
                <Col xs={6}>{Location}</Col>
                <Col xs={6}>{AllDay}</Col>
              </Row>
            </div>
            <div>
              <Row className="justify-content-start mt-1">
                <Col xs={6}>{StartDate}</Col>
                <Col xs={6}>{EndDate}</Col>
              </Row>
            </div>
            <div>
              {Hobbies ? (
                <>
                  <div className={`${primaryText()} mt-1`}>{"Hobbies"}</div>
                  <div>{Hobbies}</div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <div>
                {LevelOfCare ? (
                  <>
                    <div className={`${primaryText()} mt-1`}>
                      {"Level of care"}
                    </div>
                    <div>{LevelOfCare}</div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {HiddenContent}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
