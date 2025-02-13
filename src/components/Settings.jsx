import React from 'react'

function Settings() {
    return (
        <div className="flex">
            <div className="flex-none w-64">
                <Sidebar />
            </div>
            <div className="flex-grow">
                {/* Main content goes here */}
            </div>
        </div>
    )
}

export default Settings
