import SweetAlert from 'react-bootstrap-sweetalert';
export type swalModel = {
    onCancel: any;
    onConfirm: any;
    title: string;
    message?: string;
    showCancel: boolean;
    confirmBtnText: string;
    cancelBtnText: string;
    type: string;

};
export const Swal = ({ onCancel, onConfirm, title, message, showCancel, confirmBtnText, cancelBtnText, type }: swalModel) => {
    return (
        <div>
            <SweetAlert
                
                showCancel={showCancel}
                confirmBtnText={confirmBtnText}
                cancelBtnText={cancelBtnText}
                confirmBtnBsStyle="danger"
                title={title}
                onConfirm={onConfirm}
                onCancel={onCancel}
            >
                {message}
            </SweetAlert>
        </div>
    );
};