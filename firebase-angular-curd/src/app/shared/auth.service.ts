import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'
import { user } from '../datatypes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private router:Router
  ) { }

  // login method
  login(user: user){
    this.fireauth.signInWithEmailAndPassword(user.email,user.password)
    .then((response)=>{
      if(response){
        alert('login successful')
        console.log("response: ", response );
        localStorage.setItem('token','true')

        if(response.user?.emailVerified === true){
          this.router.navigate(['/dashboard']);
        }
        else{
          this.router.navigate(['/verify-email']);
        }
      }
    }).catch((error)=>{
        alert(error.message)
        this.router.navigate(['/login']);
    })
  }

  // sign in method
  signUp(user: user){
    this.fireauth.createUserWithEmailAndPassword(user.email, user.password)
    .then((response) =>{
      if(response){
        alert('sign up successful')
        this.router.navigate(['/login']);
        this.sendEmailForVerification(response.user);
      }
    })
    .catch((error) =>{
      alert('sign up failed')
      this.router.navigate(['/register']);
    })
  }

  // logout method
  logout(){
    this.fireauth.signOut().then(()=>{
        alert('logout successful')
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    })
  }

  // forgot password
  forgotPassword(user: user){
    this.fireauth.sendPasswordResetEmail(user.email)
    .then((res:any)=>{
        if(res){
          this.router.navigate(['/verify-email'])
        }
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  // verify email
  sendEmailForVerification(user:any) {
    user.sendEmailVerification().then((res:any)=>{
      if(res){
        this.router.navigate(['/verify-email']);
      }
    })
    .catch((err:any)=>{
        alert(err.message)
    });
  }

  // sign in with google
  signInWithGoogle(){
    this.fireauth.signInWithPopup(new GoogleAuthProvider)
    .then((res)=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    })
    .catch((err)=>{
      alert(err.message)
    })
  }
}
