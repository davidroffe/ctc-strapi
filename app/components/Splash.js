import React from "react";
import superagent from "superagent";

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: "login",
      email: "",
      password: "",
      passwordConfirm: "",
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
    const url = form === "login" ? "/api/login" : "/api/signup";

    if (email === undefined || email === "") {
      errorMessage.push("Please enter an email.");
    }
    if (password === undefined || password === "") {
      errorMessage.push("Please enter a password.");
    }
    if (form === "signUp") {
      if (password !== passwordConfirm) {
        errorMessage.push("Passwords do not match.");
      }
      if (password.length < 8) {
        errorMessage.push("Password must be at least 8 characters.");
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
          splashClass.props.history.push("/panel/cars");
        })
        .catch(error => {
          errorMessage = [error.message];
        });
    }
  }
  handleSwitchForm(e) {
    e.preventDefault();

    let form = this.state.form === "login" ? "signUp" : "login";

    this.setState({
      form
    });
  }
  render() {
    return (
      <section id="splash">
        <div id="splash-center">
          <h1>If everything seems under control, you're just not going fast enough.</h1>
          <h1><span>- Mario Andretti</span></h1>
        </div>
      </section>
    );
  }
}

export default Splash;
