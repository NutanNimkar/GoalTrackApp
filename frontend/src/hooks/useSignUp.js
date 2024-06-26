import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignUp =()=>
    {
        const [error, setError] = useState (null)
        const [isLoading, setisLoading] = useState (null)
        const {dispatch} = useAuthContext

        const signup = async (email, password) =>{

            setisLoading(true);
            setError(null)

            const response = await fetch ("/api/auth/signup", 
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                }
            )
            const json = await response.json()
            if (!response.ok){

                setisLoading(false)
                setError(json.error)
            }
            if (response.ok){

                //save user to local storage
                setisLoading(false)
               
                localStorage.setItem('user', JSON.stringify(json))
                //update auth context

                dispatch({type: 'LOGIN', payload: json})
                
            }
        }

        return {signup, isLoading, error}

    } 