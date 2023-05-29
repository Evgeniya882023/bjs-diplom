"use strict";
class UserForm {
let userForm = new UserForm ();
data () {
    this.login = login;
    this.password = password;
        }
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, callback => {
        console.log(callback);
        if (callback.success) {
          location.reload();
        } else {
          console.log(callback.data);
          userForm.setLoginErrorMessage(callback.data);
        }
      });
};
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, callback => {
        console.log(callback);
        if (callback.success) {
          location.reload();
        } else {
          console.log(callback.data);
          userForm.setRegisterErrorMessage(callback.data);
        }
      });
};
}

