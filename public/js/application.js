// // let globaluser;
// // document.getElementById('input-name').innerHTML = `Hi, ${globaluser.username}! Welcome`;
//
// document.forms[0].addEventListener('submit', async (event) => {
//   event.preventDefault();
//   event.stopPropagation();
//   const login = document.getElementById('username-input').value;
//   const password = document.getElementById('password-input').value;
//   const email = document.getElementById('email-input').value;
//     console.log(login);
//   const response = await fetch('/signup', {
//     method: 'POST', headers: {
//       'Content-Type': 'application/json',
//     }, body: JSON.stringify({
//       username: login,
//       password: password,
//       email: email
//     })
//   });
//   const result= await response.json()
//   console.log(result);
//   globaluser = result;
//   // if(result.username === true)
//   // window.location='http://localhost:3000/channel';
//   // document.getElementById('input-name').innerHTML = `Hi, ${result.username}! Welcome`
//   // if (result.password === false){
//   //   window.location='http://localhost:3000/moderator'};
//   // if(result.status === false) {
//   //   alert("Неправильный Логин")};
// });
// //
// // document.getElementById('input-name').innerHTML = `Hi, ${globaluser.username}! Welcome`;
//
// document.forms[0].addEventListener('submit', async (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const username = document.getElementById('username-input').value;
//     const password = document.getElementById('password-input').value;
//     const response = await fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username,
//             password,
//         }),
//     });
//     const result = await response.json();
//     if (result.status) { window.location = '/channel';}
//     else {
//         document.getElementById('error-input').innerHTML = 'Введен неверный username или e-mail';
//     }
// });