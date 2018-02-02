import React, {Component} from 'react'

export default (props) => {
    const tabs = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            path: 'admin'
        },
        {
            id: 'reviewPosts',
            name: 'Review Posts',
            path: 'admin/review'
        }
    ]

    return (
        <div className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Main Menu</span>
                </h6>
                <ul className="nav flex-column">

                    {
                        tabs.map((tab) => {
                            
                            if (tab.id === props.activeTab) {
                                return (
                                    <li key={tab.id} className="nav-item">
                                        <a className="nav-link active" href={`/${tab.path}`}>
                                            <span data-feather="home"></span>
                                            {tab.name} <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={tab.id} className="nav-item">
                                        <a className="nav-link" href={`/${tab.path}`}>
                                            {tab.name}
                                        </a>
                                    </li>
                                )
                            }

                        })
                    }
                </ul>
            </div>
        </div>
    )

}