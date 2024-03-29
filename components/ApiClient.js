"use strict";

import{
  AsyncStorage,
} from 'react-native';

var API = class{
  constructor () {
    //console.log('API class called');
  }

  async test(){
    let token = await AsyncStorage.getItem('@authToken:token');
  }

  login (username, password){
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    };

    var promise = fetch(SETTINGS.API_URL + 'token-auth/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      try {

        if ('token' in responseJson){
        //   console.log(responseJson);
          AsyncStorage.setItem('@authToken:token', responseJson['token']);
          AsyncStorage.setItem('@username', username);
          AsyncStorage.setItem('@password', password);

          return true
        }
        else {
          return responseJson
        }
      } catch (error) {
        console.log('async error:');
        console.error(error);
      }
      //return responseJson;
      return true
    })
    .catch((error) => {
      console.error(error);
      //return error

      return false
    });
    return promise
  }

  async check_token(){
    try {
      let token = await AsyncStorage.getItem('@authToken:token');
      //hata burada uygulama yeniden baslatilinca AsyncStorage null donuyor
      if (token !== null){
        var options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token
          })
        };

        const fetchRes = await fetch(SETTINGS.API_URL + 'token-verify/', options)
        .then((response) => response.json())
        .then((responseJson) => {
          if ('token' in responseJson){
            return true
          }
          else {
            return false
          }
        })
        .catch((error) => {
          console.error(error);
          return false
        });

        return fetchRes
      }
    } catch (error) {
        console.log(error);
    }
  }

  async get_myLikedPosts(){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let promise = fetch(SETTINGS.API_URL + 'mylikedposts/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error

      return false
    });

    return promise
  }

  async get_posts(page=1){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let promise = fetch(SETTINGS.API_URL + 'posts/?page=' + page, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error

      return false
    });

    return promise
  }

  async get_user_posts(userID){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };
    let promise = fetch(SETTINGS.API_URL + 'posts/?owner=' + userID, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error

      return false
    });

    return promise
  }

  async get_post(ID){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };
    let promise = fetch(SETTINGS.API_URL + 'posts/' + ID, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error

      return false
    });

    return promise
  }

  async logout(){
    let keys = ['@authToken:token', '@username', '@password'];
    let promise = await AsyncStorage.multiRemove(keys, (err) => {
        return true
    });

    return promise
  }

  async publishPost(image, comment, interest, location, type=1){

    const token = await AsyncStorage.getItem('@authToken:token');

    let body =  {
      type: 1,
      path: image.base64,
      location: {name: location},
      interest: {name: interest},
      background: {id:1, name:'The Orange', path:'/static/images/orange_background.png'},
      comment : comment,
      status: 1,
    };

    if(type == 2){
        body =  {
          type: 2,
          path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==',
          text: image.text,
          background: image.image,
          location: {name: location},
          interest: {name: interest},
          comment : comment,
          status: 1,
        }
    }
    console.log(body);

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify(body),
    };

    let promise = await fetch(SETTINGS.API_URL + 'posts/', options)
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((responseJson) => {
        console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error

      return false
    });
    return promise
  }

  async sendCommand(commandText, post_id){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        text: commandText,
        post_id: post_id
      }),
    };
    let promise = await fetch(SETTINGS.API_URL + 'comments/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });
    return promise
  }

  async sendStarRate(post_id, rate){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        post_id: post_id,
        rate: rate,
      }),
    };
    let promise = await fetch(SETTINGS.API_URL + 'rates/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });
    return promise

  }

  async sendReaction(post_id, reaction_type){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        post_id: post_id,
        type: reaction_type,
      }),
    };
    let promise = await fetch(SETTINGS.API_URL + 'reactions/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });
    return promise

  }

  async searchProfile(name){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let params = '';
    if(name){
        params = params + '?user__name__contains=' + name;
    }

    let operator = '&';
    if (params == ''){
        operator = '?';
    }


    params = params + operator +'ordering=-point';
    let promise = await fetch(SETTINGS.API_URL + 'profiles/' + params, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }

  async searchPost(text, max_time, min_time){
    const token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    //localhost:8000/api/posts/?interest__name=popilicity&location__name=san francisco&ordering=-point
    let params = '';
    if(text){
        params = params + '?interest__name=' + text;
    }
    if (max_time){
        let operator = '&';
        if (params == ''){
            operator = '?';
        }
        params = params + operator + 'max_create_date=' + max_time;
    }
    if (min_time){
      params = params + '&min_create_date=' + min_time;
    }

    params = params + '&ordering=-point';
    let promise = await fetch(SETTINGS.API_URL + 'posts/' + params, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }

  async getloggedUser(){
    let token = await AsyncStorage.getItem('@authToken:token');
    let username = await AsyncStorage.getItem('@username');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let promise = await fetch(SETTINGS.API_URL + 'users/?username='+username, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }

  async getProfile(userID){
    let token = await AsyncStorage.getItem('@authToken:token');
    let username = await AsyncStorage.getItem('@username');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let promise = await fetch(SETTINGS.API_URL + 'profiles/?user=' + userID, options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }

  async getNotifications(){
    let token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let promise = await fetch(SETTINGS.API_URL + 'notifications/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }

  async getNotificationCount(){
    let token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };

    let promise = await fetch(SETTINGS.API_URL + 'notificationCount/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }

  async blockUser(blocked_user_id){
    let token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        user_is_blocked: blocked_user_id,
      }),
    };

    let promise = await fetch(SETTINGS.API_URL + 'blocks/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }


  async reportPost(postID, reason){
    let token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        post_is_reported: postID,
        reason, reason
      }),
    };

    let promise = await fetch(SETTINGS.API_URL + 'report/', options)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }


  async call(endPoint, method='GET', bodyData=null, queryString=false){
    let token = await AsyncStorage.getItem('@authToken:token');
    let options = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      }
    };


    if (bodyData){
        options['body'] = JSON.stringify(bodyData)
    }

    let querStr = ''
    if (queryString){
        var list = [];
        for(var p in queryString){
           if (queryString.hasOwnProperty(p)) {
               list.push(encodeURIComponent(p) + "=" + encodeURIComponent(queryString[p]));
           }
        }
        querStr = '?' + list.join("&");
    }


    let promise = await fetch(SETTINGS.API_URL + endPoint + '/' + querStr, options)
    .then((response) => {
        try {
            let responseJson = response.json();
            if (responseJson && responseJson.error)
              throw new Error(responseJson.error);
            return responseJson
        } catch (e) {
            console.log('buyuk bir hata nedenn')
            console.log(e)
            return response.text();
        }
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      //return error
      return false
    });

    return promise
  }
};

module.exports = API;
