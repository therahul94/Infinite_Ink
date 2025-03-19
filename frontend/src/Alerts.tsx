import Swal, { SweetAlertIcon } from 'sweetalert2';

export enum iconsEnum {
    success= "success",
    error= "error",
    warning = "warning",
    info="info",
    question="question"
}

interface alertParams {
    title: string;
    text: string;
    icon: SweetAlertIcon;
    footer: string;
}
export async function alertFn({title, text, icon, footer}: alertParams) {
    return Swal.fire({
                    title: title,
                    icon: icon,
                    text: text,
                    draggable: false,
                    footer: footer
                  });
}

