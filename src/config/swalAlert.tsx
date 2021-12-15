import SweetAlert from 'react-bootstrap-sweetalert';
export type swalModel = {
    onCancel: any;
    onConfirm: any;
};
export const Swal = ({onCancel,onConfirm}: swalModel)=>{
    return (
        <div>
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={onConfirm}
                onCancel={onCancel}
                focusCancelBtn
            >
                You will not be able to recover this imaginary file!
            </SweetAlert>
        </div>
    );
};