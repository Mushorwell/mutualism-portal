import React from 'react';

const StatusBlock = (props) => {
    return(
        <div className="row dashboard-components overview">
            <div className="col-sm-12 status-head">
                <div className="status-heading">{props.heading}</div>
                <div className="status-body">{props.body}</div>
            </div>
        </div>
    )
}
export default StatusBlock;
