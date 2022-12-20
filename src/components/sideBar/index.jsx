import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from 'cdbreact';
import React from 'react';
import { useHistory } from 'react-router-dom';
import paths from '../../constants/paths';
import { useUser } from '../../hooks/UserContext';
import { NavLink } from './styles';

export const Sidebar = () => {
    const { logOut } = useUser()
    const { push } = useHistory()


    async function logingOut() {
        logOut()
        push(paths.login)
    }
    return (

        <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to={paths.send} activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Enviar produção</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to={paths.edit} activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Editar produção enviada</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to={paths.show} activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Produções enviadas</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div onClick={logingOut}

                        style={{ padding: '20px 5px', }} >
                        Log Out
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};
