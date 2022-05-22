import { useState, useEffect } from "react"

const Feedback = (props) => {
    const [feedback, setFeedback] = useState("")

    const getFeedback = (string) => {
        setFeedback(string)
    }

    useEffect(() => {
        getFeedback(props.feedback)
    }, [props])

    return(
        <>
        <div className="feedback">
            {feedback.show && <h2 className={`${feedback.color} text-center`}>{feedback.txt}</h2>}
        </div>
        </>
    )
}

export default Feedback