import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (condition, content, nameEvent = null, callback = null) => {
    const info = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
    if (callback && nameEvent) {
        info[nameEvent] = callback;
    }

    return toast[condition](content, info);
}