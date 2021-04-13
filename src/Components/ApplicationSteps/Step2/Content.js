import IndustryType from "./IndustryType";
import TeamSize from "./TeamSize";
import BusinessDescription from "./BusinessDescription";
import BusinessRegistrationProof from "./BusinessRegistrationProof";
import BusinessFinances from "./BusinessFinances";
import DebtHistory from "./DebtHistory";
import React, {useEffect, useState} from "react";
import _ from "lodash";

const isEmpty = (value) => {
    return ((value.trim() === null) || (value.trim() === ''));
}

const Content = (props) => {
    const [industryTypeState, setIndustryTypeState] = useState(()=>{
            const industry = localStorage.getItem('industryType');
            return industry !== null
                ? JSON.parse(industry)
                :{
                    value: "industry",
                    label: "Choose industry sector..."
                };
        }
    );

    const [teamSize, setTeamSize] = useState(()=>{
        const teamSize = localStorage.getItem('teamSize');
        return teamSize !== null || !isNaN(Number(teamSize))
            ? Number(teamSize)
            : 1 ;
    });

    const [summary, setSummary] = useState(()=>{
        const businessDescription = localStorage.getItem('businessDescription');
        return businessDescription !== null
            ? businessDescription
            : '';
    });
    const [cipcReg, setCipcReg] = useState(()=>{
        const businessRegistrationProofCipc = localStorage.getItem('businessRegistrationProofCipc');
        return businessRegistrationProofCipc !== null
            ? businessRegistrationProofCipc
            : '';
    });
    const [sarsReg, setSarsReg] = useState(()=>{
        const businessRegistrationProofSars = localStorage.getItem('businessRegistrationProofSars');
        return businessRegistrationProofSars !== null
            ? businessRegistrationProofSars
            : '';
    });
    const [hasFinancials,setHasFinancials] = useState(()=>{
        const hasFinancials = localStorage.getItem('hasFinancials');
        return hasFinancials !== null
            ? JSON.parse(hasFinancials)
            : false;
    });
    const [financialsPeriod, setFinancialsPeriod] = useState(()=>{
        const periodStartDate = localStorage.getItem('financialsStartDate');
        const periodEndDate = localStorage.getItem('financialsEndDate');
        return ((periodStartDate!==null) && (periodEndDate!== null))
            ? {
                startDate: periodStartDate,
                endDate: periodEndDate
            }
            :{
                startDate: '',
                endDate: ''
            };
    });
    const [hasDebtHistory, setHasDebtHistory] = useState(()=>{
        const hasDebtHistory = localStorage.getItem('hasDebtHistory');
        return hasDebtHistory!==null
            ? JSON.parse(hasDebtHistory)
            : false;
    });
    const [status, setStatus] = useState('');
    const [debtHistory, setDebtHistory] = useState(()=>{
        const debtStatus = localStorage.getItem('debtStatus');
        const borrowedAmount = localStorage.getItem('borrowedAmount');
        const dateBorrowed = localStorage.getItem('dateBorrowed');
        const dateCleared = localStorage.getItem('dateDebtCleared');
        return (((debtStatus!==null) && (borrowedAmount!==null) && (dateBorrowed!==null)) || dateCleared!==null)
            ? {
                debtStatus: JSON.parse(debtStatus),
                borrowedAmount: Number(borrowedAmount),
                dateBorrowed: dateBorrowed,
                dateCleared: dateCleared!==null?dateCleared:''
            }
            :{
                debtStatus: {
                    value: "status",
                    label: "Choose a status..."
                },
                borrowedAmount: 0,
                dateBorrowed: '',
                dateCleared: ''
            };
    });

    useEffect(()=>{
        localStorage.setItem('industryType', JSON.stringify(industryTypeState));
        localStorage.setItem('teamSize', teamSize.toString());
        localStorage.setItem('businessDescription', summary);
        localStorage.setItem('businessRegistrationProofCipc', cipcReg);
        localStorage.setItem('businessRegistrationProofSars', sarsReg);
        localStorage.setItem('hasFinancials', hasFinancials.toString());
        localStorage.setItem('financialsStartDate', financialsPeriod.startDate.toString());
        localStorage.setItem('financialsEndDate', financialsPeriod.endDate.toString());
        localStorage.setItem('debtStatus', JSON.stringify(debtHistory.debtStatus));
        localStorage.setItem('hasDebtHistory', hasDebtHistory.toString());
        localStorage.setItem('dateBorrowed', debtHistory.dateBorrowed.toString());
        localStorage.setItem('dateDebtCleared', debtHistory.dateCleared.toString());
        localStorage.setItem('borrowedAmount', debtHistory.borrowedAmount.toString());
    },[
        industryTypeState,
        teamSize,
        summary,
        cipcReg,
        sarsReg,
        hasFinancials,
        financialsPeriod,
        status,
        hasDebtHistory,
        debtHistory
    ]);

    switch(props.businessDetailsStage){
        case 1: return (
            <div className="applicationInfo application-form">
                <IndustryType
                    show={true}
                    industryType={industryTypeState}
                    setIndustryType={setIndustryTypeState}
                    errors={props.errors.industryInputNoSelect?props.errors.industryInputNoSelect:''}
                />
                <TeamSize
                    show={industryTypeState.value!=="industry"}
                    teamSize={teamSize}
                    setTeamSize={setTeamSize}
                    errors={props.errors.teamSizeNoInput?props.errors.teamSizeNoInput:''}
                />
                <BusinessDescription
                    show={teamSize!==0}
                    summary={summary}
                    setSummary={setSummary}
                    errors={{
                        businessDescriptionNoText: props.errors.businessDescriptionNoText,
                        businessDescriptionTextTooShort: props.errors.businessDescriptionTextTooShort
                    }}
                />
            </div>
        );
        case 2:
            return(
            <div className="applicationInfo application-form">
                <BusinessRegistrationProof
                    show={true}
                    cipc={cipcReg}
                    setCipc={setCipcReg}
                    sars={sarsReg}
                    setSars={setSarsReg}
                    errors={{
                        cipcInputNoText: props.errors.cipcInputNoText,
                        sarsInputNoText: props.errors.sarsInputNoText
                    }}
                />
                <BusinessFinances
                    show={!isEmpty(cipcReg)&&!isEmpty(sarsReg)}
                    hasFinances={hasFinancials}
                    setHasFinances={setHasFinancials}
                    financialsPeriod={financialsPeriod}
                    setFinancialsPeriod={setFinancialsPeriod}
                    errors={{
                        financialsStartDateInputNull: props.errors.financialsStartDateInputNull,
                        financialsEndDateInputNull: props.errors.financialsEndDateInputNull
                    }}
                />
                <DebtHistory
                    show={!isEmpty(cipcReg)&&!isEmpty(sarsReg)}
                    hasHistory={hasDebtHistory}
                    setHasHistory={setHasDebtHistory}
                    debtStatus={status}
                    setDebtStatus={setStatus}
                    debtHistory={debtHistory}
                    setDebtHistory={setDebtHistory}
                    emptyCheck={isEmpty}
                    errors={{
                        borrowedAmountEqualsZero: props.errors.borrowedAmountEqualsZero,
                        debtStatusNoInput: props.errors.debtStatusNoInput,
                        dateBorrowedInputNull: props.errors.dateBorrowedInputNull,
                        dateClearedInputNull: props.errors.dateClearedInputNull
                    }}
                />
            </div>
        );
    }
}

export default Content;