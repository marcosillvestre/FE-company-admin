import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu
} from 'cdbreact'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import { LinkMenu, MenuList } from './styles'


export const Sidebar = ({ name, path }) => {
    const { logOut } = useUser()
    const { push } = useHistory()

    console.log(path)
    async function logingOut() {
        logOut()
        push(paths.login)
    }
    return (

        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <p className="text-decoration-none" style={{ color: 'inherit' }}>
                        Olá {name}
                    </p>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <LinkMenu isActive={path === '/'} >
                            <MenuList href={paths.home}>Enviar produção </MenuList>
                        </LinkMenu>
                        <LinkMenu isActive={path === '/editar-prod'} >
                            <MenuList href={paths.edit} >Editar produção enviada</MenuList>
                        </LinkMenu>
                        <LinkMenu isActive={path === '/lista-prod'} >
                            <MenuList href={paths.show}>Produções enviadas</MenuList>
                        </LinkMenu>
                        {/* <MenuList exact to="/analytics" >
                            <MenuList icon="chart-line">Analytics</MenuList>
                        </MenuList>

                        <MenuList exact to="/hero404" target="_blank" >
                            <MenuList icon="exclamation-circle">404 page</MenuList>
                        </MenuList> */}
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
    )
}

Sidebar.propTypes = {
    name: PropTypes.string,
    path: PropTypes.any
}