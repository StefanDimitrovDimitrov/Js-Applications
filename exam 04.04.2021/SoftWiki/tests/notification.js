// const box = document.getElementById('errorBox');

// export function notify(message){
//     box.innerHTML = `<span>${message}</span>`;
//     box.style.display='block';

//     setTimeout(()=>{
//         box.style.display='none';
//     },3000);
// }

// // STEP 1 
// // api change importnatn
// // }
// // } catch (err) {
// //     //alert(err.message);
// //     throw err;
// // }
// // }

// // STEP 2
// // try{
// //     replace return alert with throw new Error

// // }catch(err){
// //     notify(err.messege)
// // }



// // register
// // try{

// //     if (email == '' || password == '' ||repass == '' ||gender =="" ||username==''){
// //         ctx.render(registerTemplate(onSubmit, email == '', password == '', repass == '', username=''))
// //         throw new Error('All fields are required')
// //     }
// //     if(password != repass){
// //         ctx.render(registerTemplate(onSubmit, false, true, true))
// //         throw new Error('Passwords don\'t match')
// //     }

// //     await register(email, username, password, gender);
// //     ctx.setUserNav();
// //     ctx.page.redirect('/');
// // }catch(err){
// //     notify(err.message)
// // }
// // }

// // login

// // try{
// //     if(!email || !password){
// //         throw new Error("All fields are required")
// //     }
// //     await login(email, password);
// // ctx.setUserNav();
// // ctx.page.redirect('/catalog');
// // }catch(err){
// //     notify(err.message)
// // }
// // }

// // create


// // try{
// //     if(title == '' ||description ==''||imageUrl ==''){
// //         throw new Error ('All fields are required')
// //     }


// //     const data = {title, description, imageUrl}
// //     // const field4 = formData.get('fieldName').trim();
// //     // const field5 = formData.get('fieldName').trim();
// //     await createRecord(data);
    
// //     ctx.page.redirect('/allMemes');

// // }catch(err){
// //     notify(err.message)
// // }
// // }
// // }


// // edit

// // if(title == '' ||description ==''||imageUrl ==''){
// //     throw new Erroor('All fields are required')
// //  }

// //  const data = {title, description, imageUrl}
 
// //   await editRecord(id, data);
// //  ctx.page.redirect('/details/' + id);
// // }catch(err){
// //  notify(err.message)
// // }

// // }
// // }