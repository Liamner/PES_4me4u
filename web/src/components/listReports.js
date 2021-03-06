import React, { Component } from "react";
import Report from "./report";

export default class ListPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: props.reports
    };
  }

  render() {
    const { reports } = this.state;

    return (
      <div className="reports">
        <table className="reports">
          <tbody>
            <tr>
              <th>Tipo</th>
              <th>Reportado</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
            {reports.map(element => {
              return <Report key={element._id} report={element} />
            })}
          </tbody>
        </table>
      </div>
    );
  }
}