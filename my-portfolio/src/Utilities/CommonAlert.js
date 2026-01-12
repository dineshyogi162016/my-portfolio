import Swal from 'sweetalert2'

const CommonAlert = (message, icon) => {
   const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
      }
   });
   
   Toast.fire({
      icon: icon,
      title: message
   });

}

export default CommonAlert