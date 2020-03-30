import React from 'react';
import Modal from 'react-bootstrap4-modal';

const CustomModal = (props) => {
    let { details, confirmBtn, cancelBtn, enableBackDrop, modalType, showBtns } = props
    let __style = `modal-content rounded-0 dark-theme ${(modalType === "danger") ? "border-top-red" : "border-top-theme"}`

    return (
        <Modal visible={props.visibility} onClickBackdrop={enableBackDrop ? cancelBtn.action : null}>
            <div className={__style}>
                <div className="modal-header">
                    <h5 className="modal-title fs-25">{details.info}</h5>
                    <button type="button create_project_btn_close" className="close" onClick={cancelBtn.action}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {details.msg}
                </div>
                {
                    (showBtns) ?
                        <div className="modal-footer">
                            <button type="button" className={modalType === "danger" ? "btn btn-danger" : "btn btn-theme"} onClick={confirmBtn.action}>{confirmBtn.label}</button>
                            <button type="button" className="btn btn-theme-cancel" onClick={cancelBtn.action}>{cancelBtn.label}</button>
                        </div>
                        : ""
                }
            </div>
        </Modal>
    )
}
export default CustomModal

CustomModal.defaultProps = {
    modalType: 'confirmation',
    visibility: true,
    showBtns: true,
    enableBackDrop: true,
    details: {
        info: 'N/A',
        msg: 'N/A'
    },
    confirmBtn: {
        label: 'Confirm',
        action: null
    },
    cancelBtn: {
        label: 'Cancel',
        action: null
    }


}