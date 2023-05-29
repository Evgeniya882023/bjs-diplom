"use strict";
class LogoutButton {
    let logoutButton = new LogoutButton();
    logoutButton.action = () => {
        ApiConnector.logout(callback => {    
            if (callback.success) {
              location.reload();
            }
          });
    }
    ApiConnector.current (callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
          }
        });
let ratesBoard = new RatesBoard();
ratesBoard = () => {ApiConnector.getStocks(callback => {
    if (callback.success) {
        ratesBoard.clearTable(); 
        ratesBoard.fillTable(callback.data);
        }
     });
} 
RatesBoard();
setInterval(RatesBoard, 60000);

let moneyManager = new MoneyManager();
MoneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, callback => {    
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage("Ваш баланс успешно пополнен");
    } else {      
      moneyManager.setMessage("Запрос завершился ошибкой");
    }
  });
}
MoneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, callback => {    
    if (callback.success) {
      ProfileWidget.showProfile(callback.data);
      moneyManager.setMessage("Конвертирование выполнено успешно");
    } else {      
      moneyManager.setMessage("Запрос на ковертацию завершился ошибкой");
    }
  });
}
let favoritesWidget = new FavoritesWidget ();
ApiConnector.getFavorites(callback => {  
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    moneyManager.updateUsersList(callback.data);
  };
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, callback => {    
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage("Пользователь успешно добавлен в избранное");
    } else {      
      favoritesWidget.setMessage("Ошибка добавления пользователя в избранное");
    }
  });
};

favoritesWidget.removeUserCallback = (id) => {  
  ApiConnector.removeUserFromFavorites(id, callback => {    
    if (callback.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(callback.data);
      moneyManager.updateUsersList(callback.data);
      favoritesWidget.setMessage("Пользователь успешно удален из избранного");
    } else {      
      favoritesWidget.setMessage("Удаление пользователя из избранного не произошло");
    }
  });
};
}

