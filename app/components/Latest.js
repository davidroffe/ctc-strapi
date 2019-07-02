import React from "react";
import superagent from "superagent";
import placeHolderImage from "../assets/images/blog_image_placeholder.png";

class Latest extends React.Component {
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
      <section id="latest">
        <ul class="blog-list">
          <li class="list-item">
            <img src={placeHolderImage} alt="Blog post placeholder image" />
            <div class="info">
              <h2>Blog Post Title</h2>
              <p>Blog post blurb</p>
            </div>
          </li>
          <li class="list-item">
            <img src={placeHolderImage} alt="Blog post placeholder image" />
            <div class="info">
              <h2>Blog Post Title</h2>
              <p>Blog post blurb</p>
            </div>
          </li>
          <li class="list-item">
            <img src={placeHolderImage} alt="Blog post placeholder image" />
            <div class="info">
              <h2>Blog Post Title</h2>
              <p>Blog post blurb</p>
            </div>
          </li>
          <li class="list-item">
            <img src={placeHolderImage} alt="Blog post placeholder image" />
            <div class="info">
              <h2>Blog Post Title</h2>
              <p>Blog post blurb</p>
            </div>
          </li>
        </ul>
      </section>
    );
  }
}

export default Latest;
