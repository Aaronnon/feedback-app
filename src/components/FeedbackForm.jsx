import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from './shared/Button'

function FeedbackForm() {

    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, sebtnDisabled] = useState(true)
    const [message, setmessage] = useState('')
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            sebtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])
    const hanldeTextChange = (e) => {
        if (text === '') {
            sebtnDisabled(true)
            setmessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            sebtnDisabled(true)
            setmessage('Text must be at least 10 characters')
        } else {
            setmessage(null)
            sebtnDisabled(false)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }

            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
                feedbackEdit.edit = false
                setText('')
            } else {
                addFeedback(newFeedback)
                setText('')
            }

        }
    }
    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className="input-group">
                    <input onChange={hanldeTextChange} value={text} type="text" placeholder="Write a review" />
                    <Button type="submit" isDisabled={btnDisabled} version='secondary'>Send</Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm
