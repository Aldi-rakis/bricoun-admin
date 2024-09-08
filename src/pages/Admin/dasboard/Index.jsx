//import react  
import React from "react";

//import layout admin
import LayoutAdmin from "../../../layouts/Admin2";

function Dashboard() {

	//title page
    document.title = "Dashboard - Administrator Travel GIS";

    return(
        <React.Fragment>
            <LayoutAdmin>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header shadow bg-slate-700">
                                <span className="fw-bold w-full rounded"><i className="fa fa-tachometer-alt"></i> Dashboard</span>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </React.Fragment>
    )

}

export default Dashboard