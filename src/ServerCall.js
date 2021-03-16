import books from  './db.json';


function SendLoginResponse(response) {
    // server inputs new user or not if not needed
    // server returns userId and imageUrl which is set to local storagge for further calls to server
    sessionStorage.setItem("userId", response.profileObj.googleId);
    sessionStorage.setItem("userImageUrl", response.profileObj.imageUrl);
    // server returns mybooks for that user
    sessionStorage.setItem("userBooks", JSON.stringify(books.mybooks));
}


// searchu treba dodat mogucnost nalaska dva ili vise rezultata
function Search() {
    const data = document.getElementById("search-input").value;
    const arrayFreeBooks = books.freebooks;
    
    const searchResult = arrayFreeBooks.filter(element => element.author.indexOf(data) > -1 || element.name.indexOf(data) > -1);
    // send data to server
    // server returns google books search and our database search
    document.getElementById("search-input").value = " ";
    return searchResult;
  }

function FreeBooks() {
    // Fetch data from server
    // Server returns data from list of books that are free
    // returns book data, user ID and user location
    const response = books.freebooks
    return response;
}

function SendToWishList(bookId, userId) {
    // Send book ID and ID of user to add to wishlist of user
    // by book ID we have data who is giving book in table freebooks
    const freeBooks = books.freebooks;
    const wishList = books.wishlist;
    const bookToAdd = freeBooks.find(element => element.id === parseInt(bookId) );
    wishList.push(bookToAdd);
    sessionStorage.setItem("wishList", JSON.stringify(books.wishlist));
}

function GetUserInfo(id) {
    // send request to server to get data of user giving book; provided bookId
    // server returns user name and imageUrl
    const arrayUsers = books.users;
    const arrayFreeBooks = books.freebooks;
    const freeBook = arrayFreeBooks.find(element => element.id === parseInt(id));
    const user = arrayUsers.find(element => element.id === freeBook.userId);
    return user;
}


async function SendImageToServer(imageSrc) {
    // const url = 'https://bookjungle.azurewebsites.net/api/Recognition';
    const img = imageSrc.substring(23);
    const url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBC0x6c0dJ5T7URQm68zrtZecjHeGW5UpY';
    const data = {
      "requests":[
         {
           "image":{
                    "content": img
            },
            "features": [
              {
                "maxResults": 50,
                "type": "DOCUMENT_TEXT_DETECTION"
              },
              {
                "maxResults": 50,
                "type": "OBJECT_LOCALIZATION"
              }
            ]
          }
       ]
     }
    
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });
    return response.json(); 
  }

 
      
  async function SendText(keywords) {
    // const url = 'https://bookjungle.azurewebsites.net/api/Recognition';
    const bookName = keywords[0].join("+");
    const author = keywords[1].join("+");
    const url =  `https://www.googleapis.com/books/v1/volumes?q=intitle:`+ bookName + `+inauthor:` + author +`&maxResults=5&key=AIzaSyBC0x6c0dJ5T7URQm68zrtZecjHeGW5UpY`;
    const response = await fetch(url, {
      method: 'GET', 
    });
    return response.json(); 
  }   
    
  export { SendLoginResponse, Search, FreeBooks, SendToWishList, GetUserInfo, SendImageToServer, SendText };
