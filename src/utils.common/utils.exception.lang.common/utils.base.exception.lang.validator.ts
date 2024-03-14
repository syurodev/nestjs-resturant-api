export class UtilsBaseExceptionLangValidator {
  static exceptionUsername() {
    return `username đăng nhập`;
  }

  static exceptionFullName() {
    return `Tên nhân viên`;
  }

  static exceptionPhoneNumber() {
    return `Số điện thoại nhân viên`;
  }

  static exceptionPassword() {
    return `Mật khẩu đăng nhập`;
  }

  static exceptionName(name: string) {
    return `Tên ${name}`;
  }
}
