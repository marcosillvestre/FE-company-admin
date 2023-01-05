import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [data, setData] = useState({})
    const [name, setName] = useState([])
    const [totalProduction, setTotalProduction] = useState([])

    const putInfoOnLocalS = async (userInfos) => {
        setData(userInfos)

        await localStorage.setItem('admCo:userData', JSON.stringify(userInfos))
    }

    useEffect(() => {
        const namesInfo = async () => {
            const nameUser = await localStorage.getItem('admCo:userData')
            if (nameUser) {
                setName(JSON.parse(nameUser).name)
            }
        }
        namesInfo()
    }, [])

    // const actualizeDate = (date) => {
    //     date.split(' ')[3].split(':')[0] <= 5 ? '1º turno' :
    //         date.split(' ')[3].split(':')[0] <= 15 ? '2º turno' :
    //             date.split(' ')[3].split(':')[0] >= 15 ? '3º turno' : ''
    // }

    const logOut = async () => {
        await localStorage.removeItem('admCo:userData')
    }

    useEffect(() => {

        const loadUser = async () => {
            const user = await localStorage.getItem('adcCo:userData')

            if (user) {
                setData(JSON.parse(user))
            }
        }
        loadUser()
    }, [])


    return (
        <UserContext.Provider value={{ putInfoOnLocalS, logOut, data, name, totalProduction, setTotalProduction, }}>

            {children}

        </UserContext.Provider>
    )

}
export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('user most be used with UserCongtext')
    }
    return context
}

UserProvider.propTypes = {
    children: Proptypes.node
}