import React, { useState } from 'react';
import ProfileOptions from './ProfileOptions';

const ProfileSidebar = ({userData, active}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    
    const toggleCollapse = () => { 
        setIsCollapsed(!isCollapsed); 
    };
    
    return(
        <>
            {/* Sidebar para pantallas grandes */}
            <div className="d-none d-md-block">
                <h5 className="mb-3 text-golden fs-4">Mi perfil</h5>
                <ProfileOptions active = {active}/> 
            </div>

            {/* Sidebar para pantallas pequeñas */}
            <nav className="navbar navbar-light d-md-none justify-content-between b-container"> 
                <span className="text-white ps-2 pe-2"> 
                    {userData?.apodo}
                </span>
                <button 
                    className="btn"
                    type="button"
                    onClick={toggleCollapse}
                    aria-expanded={!isCollapsed}
                    aria-controls="collapseMenu"
                >
                    <i className={`bi ${isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'} text-white`}></i>
                </button>
            </nav>

            <div className={`collapse ${!isCollapsed ? 'show' : ''} d-md-none`} id="collapseMenu">
                <div className="p-3">
                    <ProfileOptions active = {active}/>
                </div>
            </div>
        </>
    );
};

export default ProfileSidebar;