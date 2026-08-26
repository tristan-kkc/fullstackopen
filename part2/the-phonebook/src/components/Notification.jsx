const Notification = ({ content, type}) => {
    if (content === null) {
        return null
    }
    
    return (
        <div className={`notification ${type}`}>
            {content}
        </div>
    )
}

export default Notification