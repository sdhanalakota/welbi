import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useFetchJobs } from "../hooks/useFetchJobs";
import Program from "./Program/Program";
import ResidentCard from "./ResidentCard/ResidentCard";
import AddProgram from "./AddProgram/AddProgram";
import AddResident from "./AddResident/AddResident";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import Loader from "./Loader/Loader";
import {
  containerStyle,
  headerContainerStyle,
  contentBodyStyle,
  errorHeaderStyle
} from "./app.style";
import uuid from "react-uuid";

function App() {
  const { state } = useFetchJobs();
  const { programs, residents, loading, error } = state;
  const [programsList, setProgramsList] = useState([]);
  const [residentsList, setResidentsList] = useState([]);

  useEffect(() => {
    if (programs) {
      setProgramsList(programs);
    }
    if (residents) {
      setResidentsList(residents);
    }
  }, [programs, residents]);

  return (
    <div>
      <div>
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <div className={containerStyle()}>
                <div className={headerContainerStyle()}>
                  <AddProgram setProgramsList={setProgramsList} />
                </div>
                <div className={contentBodyStyle()}>
                  {loading && <Loader />}
                  {error && (
                    <h5 className={errorHeaderStyle()}>
                      Error, Try refreshing
                    </h5>
                  )}
                  {programsList && (
                    <div>
                      <Row className="justify-content-md-center">
                        {programsList.map((program) => (
                          <Program
                            key={uuid()}
                            loading={loading}
                            program={program}
                            residents={residents}
                          />
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
              </div>
            </Route>
            <Route exact path="/residents">
              <div className={containerStyle()}>
                <div className={headerContainerStyle()}>
                  <AddResident setResidentsList={setResidentsList} />
                </div>
                <div className={contentBodyStyle()}>
                  {loading && <Loader />}
                  {error && (
                    <h5 className={errorHeaderStyle()}>
                      Error, Try refreshing
                    </h5>
                  )}
                  {residentsList && (
                    <div>
                      <Row className="justify-content-md-center">
                        {residentsList.map((resident) => (
                          <ResidentCard
                            key={resident.id}
                            resident={resident}
                            programs={programs}
                          />
                        ))}
                      </Row>
                    </div>
                  )}
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
