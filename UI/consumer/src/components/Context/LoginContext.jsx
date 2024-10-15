import { createContext, useState} from "react"
import PropTypes from 'prop-types'
import { useEffect } from "react";

// TODO: CHANGE THE NAME OF THIS CONTEXT TO MAIN_CONTEXT;


const loginContext = createContext();

export const LoginContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginLocal = () => {
        const token = localStorage.getItem('userJwtToken');
        const consumerId = localStorage.getItem('consumerId');
        // console.log(token)
        console.log(consumerId)
        if(consumerId){
            setIsLoggedIn(true);
        }
    }
    useEffect(()=>{
        handleLoginLocal();
    },[])


    return (
        <loginContext.Provider value={{
            isLoggedIn, setIsLoggedIn, handleLoginLocal
         }}>
            {children}
        </loginContext.Provider>
    )
}

LoginContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export default loginContext;