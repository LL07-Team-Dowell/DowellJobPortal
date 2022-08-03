import NavigationBar from "../../../teamlead/components/NavigationBar/NavigationBar";

import "./style.css";


const AdminUserScreen = ({ currentUser }) => {
    return <>
        <div className="admin__Page__Container">
            <NavigationBar title={'User'} handleMenuIconClick={() => setSideNavbarActive(true)} />
            <div className="user__Page__Container">

                <div className="user__Intro__Item__Container">
                    <div className="user__Intro__Item">
                        <h2>User Name</h2>
                        <span>{ currentUser.username }</span>    
                    </div>
                    <div className="edit__Btn">
                        Edit
                    </div>
                </div>
                <div className="user__Intro__Item">
                    <h2>Email</h2>
                    <span>{currentUser.email}</span>
                </div>
                <div className="user__Intro__Item">
                    <h2>First Name</h2>
                    <span>{currentUser.first_name}</span>
                </div>
                {
                    currentUser.last_name !== "" &&
                    <div className="user__Intro__Item">
                        <h2>Last Name</h2>
                        <span>{currentUser.last_name}</span>
                    </div>
                }
                <div className="user__Intro__Item">
                    <h2>Role</h2>
                    <span>{currentUser.role}</span>
                </div>
                
            </div>
        </div>
    </>
}

export default AdminUserScreen;
