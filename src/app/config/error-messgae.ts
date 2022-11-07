export const ERROR_MESSAGE: any = {
  required: () => `Không được để trống`,
  email: () => `Email không hợp lệ`,
  confirmedValidator: () => `Mật khẩu không khớp`,
  minlength: (par: any) => `Nhập ít nhất ${par.requiredLength} ký tự`,
  taken: (message: string) => `${message}`,
  pattern: () => `Nhập sai định dạng`,
};
