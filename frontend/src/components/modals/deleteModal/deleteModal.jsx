import React from 'react';
import '../Modal.css';
import ModalHeader from '../ModalHeader';

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <ModalHeader onClose={onClose}></ModalHeader>
                <div className="modal-body">
                    <p>Are you sure you want to delete {itemName}?</p>
                    <button onClick={onConfirm}>Yes, Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
