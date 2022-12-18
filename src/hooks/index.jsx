import React from "react";

import Proptypes from 'prop-types';

import { UserProvider } from "./UserContext";

const AppProvider = ({ children }) => (

    <UserProvider> {children} </UserProvider>
)

AppProvider.proptypes = {
    children: Proptypes.node
}

export default AppProvider