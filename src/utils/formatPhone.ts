const clearPhone = (tel: string) => {
  if (!tel) return '';
  let cleaned = String(tel).replace(/\D/g, '');

  if (cleaned.startsWith('8')) {
    cleaned = '7' + cleaned.slice(1);
  }

  return cleaned.replace(/\D/g, '');
}

const formatPhoneForUI = (phone: string | number) => {
  let cleaned = String(phone).replace(/\D/g, '');

  if (cleaned.startsWith('8')) {
    cleaned = '7' + cleaned.slice(1);
  }

  if (cleaned.length !== 11) return cleaned ? `+${cleaned}` : '';

  return cleaned.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
}


export { clearPhone, formatPhoneForUI };
