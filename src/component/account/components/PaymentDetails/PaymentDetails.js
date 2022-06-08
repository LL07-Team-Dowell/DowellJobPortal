import DropdownButton from "../../../teamlead/components/DropdownButton/Dropdown";

import "./style.css";


const PaymentDetails = ({ showTask }) => {
    return <>
        <div className="payment-details-container">
            <div className="payment-info-container">
                <p>Payment</p>
                <DropdownButton currentSelection={'$30'} selections={['$30', '$35']} />
            </div>
        </div>
    </>
}

export default PaymentDetails;
