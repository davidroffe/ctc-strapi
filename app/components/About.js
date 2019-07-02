import React from 'react';
import superagent from 'superagent';
//import firebase from 'firebase/app';
// import 'firebase/firestore';
// import flamelink from "flamelink";
//
// const firebaseApp = firebase.initializeApp({
//   "apiKey": process.env.FB_API_KEY,
//   "databaseURL": process.env.FB_DB_URL,
//   "storageBucket": process.env.FB_STORAGE_BUCKET,
//   "authDomain": process.env.FB_AUTH_DOMAIN,
//   "messagingSenderId": process.env.FB_MESSAGING_SENDER_ID,
//   "projectId": process.env.FB_PROJECT_ID,
//   "appId": process.env.FB_APP_ID
// });

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'login',
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitchForm = this.handleSwitchForm.bind(this);
  }
  componentDidMount() {}
  handleChange(event) {
    let value = event.target.value;
    let newState = {};

    newState[event.target.id] = value;
    this.setState(newState);
  }
  handleSubmit(e) {
    e.preventDefault();

    let form = this.state.form;
    let errorMessage = [];
    let email = this.state.email;
    let password = this.state.password;
    let passwordConfirm = this.state.passwordConfirm;
    let splashClass = this;
    const url = form === 'login' ? '/api/login' : '/api/signup';

    if (email === undefined || email === '') {
      errorMessage.push('Please enter an email.');
    }
    if (password === undefined || password === '') {
      errorMessage.push('Please enter a password.');
    }
    if (form === 'signUp') {
      if (password !== passwordConfirm) {
        errorMessage.push('Passwords do not match.');
      }
      if (password.length < 8) {
        errorMessage.push('Password must be at least 8 characters.');
      }
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessage
      });
    } else {
      axios
        .post(url, {
          email: email,
          password: password
        })
        .then(response => {
          splashClass.props.history.push('/panel/cars');
        })
        .catch(error => {
          errorMessage = [error.message];
        });
    }
  }
  handleSwitchForm(e) {
    e.preventDefault();

    let form = this.state.form === 'login' ? 'signUp' : 'login';

    this.setState({
      form
    });
  }
  render() {
    return (
      <section id="about">
        <h1>
          <span>About</span>
        </h1>
        <p>
          <span>
            CTC (Classic Team Championship) is a competition that runs on top of
            the official Lotus 79 iRacing series. It aims to recreate races from
            the late 70's and early 80's. For that every participant runs
            official race paints from the era, provided by the CTC community.
          </span>
        </p>
        <p>
          <span>
            Newcomers will be assigned to Aurora teams and are invited to fight
            for a promotion to a championship team. Your participation in the
            official iRacing series and good results in the races will trigger
            the promotion
          </span>
        </p>
        <p>
          <span>
            CTC is not a league nor a restricted group, just a group of guys
            taking the most from the series
          </span>
        </p>
        <p>
          <span>
            The Championship is decided on the official series, we'll just
            dempand good sportsmanship and that you race with the official CTC
            pain that we provide you. In return we will help you with setups and
            unveil the secrets the Lotus 79.
          </span>
        </p>
        <p>
          <span>
            Have fun and see you on the tracks once you understand the Lotus 79
            and become part of this community you'll never look back
          </span>
        </p>
      </section>
    );
  }
}

export default About;
