import Swal from 'sweetalert2';

export const showSuccessDialog = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Sukses',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const showErrorDialog = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Gagal',
    text: message || 'Terjadi kesalahan',
  });
};

export const showConfirmDialog = async (message) => {
  const result = await Swal.fire({
    title: 'Konfirmasi',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Lanjutkan',
    cancelButtonText: 'Batal',
  });
  return result.isConfirmed;
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};