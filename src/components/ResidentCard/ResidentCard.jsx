import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import CustomModal from "./../Modal/CutomModal";
import EnrolledProgramsTable from "./../EnrolledProgramsTable/EnrolledProgramsTable";
import {
  primaryText,
  cardStyle,
  secondaryBtn,
  secondaryText,
  cardHeaderStyle,
} from "./../common.style";

export default function ResidentCard({ resident, programs }) {
  const residentDetails = resident;
  const [showEnrolledProgramsModal, setShowEnrolledProgramsModal] =
    useState(false);

  const CardHeader = (
    <div>
      <span className={cardHeaderStyle()}>{residentDetails.name}</span>
    </div>
  );

  const PreferredName = (
    <>
      <div className={primaryText()}>{"Preferred Name"}</div>
      <div className={secondaryText()}>
        {residentDetails.preferredName ? residentDetails.preferredName : "n/a"}
      </div>
    </>
  );

  const Status = (
    <>
      {residentDetails.status ? (
        <>
          <div className={primaryText()}>{"Status"}</div>
          <div className={secondaryText()}>{residentDetails.status}</div>
        </>
      ) : null}
    </>
  );

  const DOB = (
    <>
      <div className={primaryText()}>{"DOB"}</div>
      <div className={secondaryText()}>
        {new Date(residentDetails.birthDate["@ts"]).toLocaleDateString()}
      </div>
    </>
  );

  const MoveInDate = (
    <>
      <div className={primaryText()}>{"Move in Date"}</div>
      <div className={secondaryText()}>
        {new Date(residentDetails.moveInDate["@ts"]).toLocaleDateString()}
      </div>
    </>
  );

  return (
    <>
      {residentDetails.hasOwnProperty("name") && (
        <>
          <Card className={cardStyle("19vw")}>
            <Card.Body style={{ width: "95%" }}>
              <div>
                <div>
                  <Row
                    className="d-flex justify-content-start align-items-center mb-1"
                    style={{ height: "auto" }}
                  >
                    <Col sm={8}>
                      {residentDetails.name.length > 10 ? (
                        <Marquee
                          gradientColor="rgb(255,255,255)"
                          play={false}
                          style={{ width: "70%" }}
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
                        className={secondaryBtn()}
                        onClick={() =>
                          setShowEnrolledProgramsModal(
                            !showEnrolledProgramsModal
                          )
                        }
                      >
                        {"Programs"}
                      </Button>
                      <CustomModal
                        title={"Enrolled Programs"}
                        showModal={showEnrolledProgramsModal}
                        onHide={() =>
                          setShowEnrolledProgramsModal(
                            !showEnrolledProgramsModal
                          )
                        }
                        Content={
                          <EnrolledProgramsTable
                            enrolledProgramsList={residentDetails.attendance}
                            programs={programs}
                          />
                        }
                        ExtraContent={null}
                        showFooter={true}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="mt-2">
                  <Row>
                    <Col>{PreferredName}</Col>
                    <Col>{Status}</Col>
                  </Row>
                </div>
                <div className="mt-2">
                  <Row>
                    <Col>{DOB}</Col>
                    <Col>{MoveInDate}</Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
