import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown";

import "./style.css";


const PaymentDetails = () => {
    return <>
        <div className="payment-details-container">
            <div className="payment-info-container">
                <p>Payment</p>
                <DropdownButton currentSelection={'$30'} selections={['$30', '$35']} />
            </div>
            <div className="payment-info-container">
                <p>Platform</p>
                <DropdownButton currentSelection={'Upwork'} selections={['Fiverr', 'PeoplePerHour', 'Truelancer', 'Freelancer']} />
            </div>
        </div>
    </>
}

export default PaymentDetails;
