// CNPJ Validation
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let soma = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj[i]) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  soma = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj[i]) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return (
    parseInt(cnpj[12]) === digito1 && parseInt(cnpj[13]) === digito2
  );
};

// Email Validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone Validation (Brazilian format)
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
};

// Format CNPJ
export const formatCNPJ = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return cnpj;
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

// Format Phone
export const formatPhone = (phone: string): string => {
  phone = phone.replace(/\D/g, '');
  if (phone.length === 11) {
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (phone.length === 10) {
    return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  return phone;
};

// Form Validation
export interface FormErrors {
  [key: string]: string;
}

export const validateLeadForm = (data: any): FormErrors => {
  const errors: FormErrors = {};

  if (!data.cnpj) {
    errors.cnpj = 'CNPJ é obrigatório';
  } else if (!validateCNPJ(data.cnpj)) {
    errors.cnpj = 'CNPJ inválido';
  }

  if (!data.empresa || data.empresa.trim() === '') {
    errors.empresa = 'Nome da empresa é obrigatório';
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (data.telefone && !validatePhone(data.telefone)) {
    errors.telefone = 'Telefone inválido';
  }

  return errors;
};
