import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) => {
     setTimeout(()=> {
        setResultData(prev => prev + nextWord)
     }, 75 * index)   
    }
    
    const onSent = async(prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            setRecentPrompt(prompt)
            response = await run(prompt)
            } else {
                setRecentPrompt(input)
                response = await run(input)
                setPrevPrompts(prev => [...prev, input])
            }
            let responseArray = response.split("**")
            let newResponse = "";
            for(let i = 0; i < responseArray.length; i++) {
                if ( i % 2 == 0 ) {
                    newResponse += responseArray[i]
            } else {
                newResponse += '<b>' + responseArray[i] + '</b>'
            }
        }
        let newResponse2 = newResponse.split('*').join('<br>')
        let newResponseArray = newResponse.split(" ")
        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + " ")
        }
        setLoading(false)
        setInput("")
        console.log(prevPrompts)
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider