import React from "react";
import Scheduler from "devextreme-react/scheduler";
import CustomStore from "devextreme/data/custom_store";
import Student from "layouts/Student";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

import { SampleBase } from "../../components/sample-base";
import { extend } from "@syncfusion/ej2-base";

export default class RemoteData extends SampleBase {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:4000/planning")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
        });
      });
  }
  render() {
    const { items } = this.state;
    const data = extend([], items, null, true);

    return (
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <div className="col-lg-9 control-section">
          <div className="schedule-control-section">
            <div className="control-section">
              <div className="control-wrapper">
                <ScheduleComponent
                  width="100%"
                  height="650px"
                  currentView="WorkWeek"
                  eventSettings={{ dataSource: data }}
                  readonly={true}
                  timezone="Europe/Paris"
                  timeFormat="HH:mm"
                >
                  <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RemoteData.layout = Student;
