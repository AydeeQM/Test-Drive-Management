import store from './store';
import firebase from "./Firebase";
import { auth, database } from './Firebase';

export function signUp(fullname, lastname,fechaNacimiento,genero, email, pass) {

    auth.createUserWithEmailAndPassword(email, pass).then(user => {
        let newuser = {
            fullname, lastname, fechaNacimiento,genero,email, pass
        }
        database.ref('users/' + user.uid).set(newuser);
        database.ref('users/' + user.uid).once('value').then(res => {
            const fullUserInfo = res.val();
            console.log('full info ', fullUserInfo);
            store.setState({
                user: {
                    id: user.uid,
                    email: fullUserInfo.email,
                    fechaNacimiento:fullUserInfo.fechaNacimiento,
                    genero:fullUserInfo.genero,
                    fullname: fullUserInfo.fullname,
                    lastname: fullUserInfo.lastname,
                    password: fullUserInfo.password,
                }
            })
        })

    })

}

export function signOut() {
    auth.signOut();
    store.setState({
        successLogin: false,
        user: {
            id: '',
            email: ''
        }
    })
}

export function signIn(user, pass) {
    auth.signInWithEmailAndPassword(user, pass).then(userObj => {

        database.ref('users/' + userObj.uid).once('value').then(res => {
            const fullUserInfo = res.val();

            console.log('full info ', fullUserInfo);
            store.setState({
                user: {
                    id: userObj.uid,
                    email: fullUserInfo.email,
                    fullname: fullUserInfo.fullname,
                    password: fullUserInfo.password,  

                }
            })
        })
    })
}

// export const setView = (index) => {
//     store.setState({
//         idBoard: index
//     })
// }