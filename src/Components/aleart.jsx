import Swal from "sweetalert2";

const Toast = {
     userJoin:Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }),
    


}
 

export default Toast