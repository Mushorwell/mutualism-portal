import React, {useEffect, useState} from 'react';
import MakePayment from "./payments/MakePayment";
import Chart from 'chart.js';
import Loader from "react-loader-spinner";
import Popup from "reactjs-popup";
import dateFormat from "dateformat";
import {authentication} from '../firebase/firebase';


const Financials = (props)=>{

    // state to check if data fetch is complete
    const [fetchInProgress, setFetchInProgress]= useState(true);

    // financials data states
    const [financials, setFinancials]= useState([]);
    const [repayments, setRepayments]= useState([]);
    const [nextRepaymentDate, setNextRepaymentDate]= useState();
    const [owing, setOwing]=useState(false);
    

    useEffect(()=>{
        // get financials if user is logged in
        authentication.onAuthStateChanged(user=>{
            if(user){
                var userId = user.uid;
                fetch(`https://mutualism-test.herokuapp.com/api/getFinancials?userId=${userId}`)
                .then((response)=>response.json())
                .then(userData=> {
                    setFinancials(JSON.parse(userData.financials));
                    setRepayments(JSON.parse(userData.repayments));
                    setNextRepaymentDate(userData.next_payment_date);
                    // check if partner is owing
                    setOwing(userData.user_owing);

                    //verify financials data fully loaded to remove loader
                    !(financials && repayments)?setFetchInProgress(true):setFetchInProgress(false);
                })
            }
        })

    }, [fetchInProgress]);

    // loader settings
    const viewLoad = ()=>{
            return(
                <Popup modal position="right center" open={true} closeOnDocumentClick={false}>
                    <Loader type="Grid" color="#212529" height={100} width={100}/>
                </Popup>
            );
    }

    const viewPage = () => {
        // currency display configurations
        let localization = {style:'currency', currency: 'ZAR'};
        // method to display currency data
        let displayAsCurrency = (value) => new Intl.NumberFormat('en-ZA', localization).format(value);
        // set financials data
        let repaymentAmount = financials[0].fields.repayment_amount;
        let investmentSize = financials[0].fields.financial_plan_amount;
        let amountRepaid;
        // extract monthly payments array from repayments data
        let installmentsToDate=repayments.map(obj=>obj.fields.payment_amount);
        // calculate the total repayments made to date
        if(installmentsToDate.length===0){
            amountRepaid = 0;
        }else{
            amountRepaid = installmentsToDate.reduce((accummulator, currentValue)=> accummulator+ currentValue);
        }

        // total repayments chart configuration settings
        var data = {
            datasets: [{
                data: [amountRepaid, investmentSize],
                backgroundColor:["#46A16E","#E7E8ED"]
            }],
        
            labels: [
                'Amount repaid',
                'Investment size',
            ]
        };
        var canvas_ready = document.getElementById("chart");
        if(canvas_ready){
            var ctx = document.getElementById('chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
            });
        }


        return(
            <>
                {owing? <MakePayment paymentSuccess={()=>setFetchInProgress(true)} email={authentication.currentUser.email} repaymentDate={dateFormat(nextRepaymentDate,"dddd dS mmmm, yyyy")} repaymentAmount={displayAsCurrency(repaymentAmount)} paystackamount={repaymentAmount}/> : ""}
                <div>
                    <div className="row dashboard-components">
                        <div className="col-12 col-lg-3 dashboard-summary">
                            <div className=" dashboard-summary-head">
                                Next Payment
                            </div>
                            <div className=" dashboard-summary-body">
                                {dateFormat(nextRepaymentDate,"mmmm dS, yyyy")}
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 dashboard-summary">
                            <div className=" dashboard-summary-head">
                                Monthly Repayment Amount
                            </div>
                            <div className=" dashboard-summary-body" style={{color:'#D90E31'}}>
                                {displayAsCurrency(repaymentAmount)}
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 dashboard-summary">
                            <div className=" dashboard-summary-head">
                                Amount Repaid
                            </div>
                            <div className=" dashboard-summary-body" style={{color:'#007A4D'}}>
                                {displayAsCurrency(amountRepaid)}
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 dashboard-summary">
                            <div className=" dashboard-summary-head">
                                Investment Size
                            </div>
                            <div className=" dashboard-summary-body">
                                {displayAsCurrency(investmentSize)}
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="chart-repayments-section">
                    <div className="col-12 col-lg-4 chart-col">
                        <div className="dashboard-components middle-dash left-chart" style={{height:412}}>
                            <div className="row dashboard-section-title">
                                Repayment %
                            </div>
                            <div className="row financialsSubHeading">Percentage of investment size repaid</div>
                            <div className="chartSection">
                                <canvas id="chart"></canvas>
                                <br/>
                                <p style={{color:"gray",opacity:0.6}}>{(amountRepaid/investmentSize*100).toFixed(2)}% repaid</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 past-payments-table">
                        <div className="dashboard-components middle-dash right-table">
                            <div className="row dashboard-section-title">
                                Payment History
                            </div>
                            <div className="row financialsSubHeading">
                                {installmentsToDate.length===0?"You have no repayments history currently.":"A look at your previous payments."}
                            </div>
                            <div className="row paymentHistoryRow">
                                <table className="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col" className="amount">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {repayments.map((obj,index)=>(
                                    <tr key={index} className={index%2 == 0?"shadeRow":null}>
                                        <td>{dateFormat(obj.fields.payment_date,"mmmm dS, yyyy")}</td>
                                        <td className="amount">{displayAsCurrency(obj.fields.payment_amount)}</td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return(
        <div>
            { fetchInProgress ? viewLoad() : viewPage() }
        </div>
    )
}
export default Financials