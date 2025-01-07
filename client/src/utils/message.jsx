import { FaInfoCircle,FaCheckCircle } from "react-icons/fa"

export const Successmessage = ({message}) =>{
    return(
        <div className={`flex flex-row gap-4 bg-green-200 items-center justify-center py-2 rounded border-2 w-96 absolute bottom-5 right-3 border-green-700 px-3`} >
            <FaCheckCircle />
            <div className="font-bold">{message}</div>
        </div>
    )
}

export const Errormessage = ({message}) =>{
    return(
        <div className={`flex flex-row gap-4 bg-red-200 items-center justify-center py-2 rounded border-2 w-96 absolute bottom-5 right-3 border-red-700 px-3 `} >
            <FaInfoCircle/>
            <div className="font-bold">{message}</div>
        </div>
    )
}