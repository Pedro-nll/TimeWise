import simpleLogo from '../../assets/simpleLogo.png'

const ModalHeader = ({onClose}) => {
    return (
        <>
            <div className="modal-content">
                <img src={simpleLogo} alt="Logo" className="modal-logo" />
                <button className="modal-close" onClick={onClose}>X</button>
            </div>
            <div className="modal-separator"></div>
        </>
    )
}

export default ModalHeader