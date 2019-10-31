/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import React from "react";
import { StaticQuery, graphql } from "gatsby";

import theme from "../../theme/theme.yaml";

class Contact extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "aneta.jankowska@wp.pl", // honeypot
      emailReal: "",
      message: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email != "") return // honeypot

    const b = document.getElementById("submitButton")
    b.disabled = true
    b.value = "Sending..."
    b.style.transition = "200ms ease-in-out"
    b.style.backgroundColor = theme.color.brand.primaryLight
    b.style.borderColor = theme.color.brand.primaryLight
    b.style.color = "#666"

    fetch(this.contactPostAddress, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.encode({ "form-name": "contact", ...this.state })
    })
      .then(function(rawResponse) {
        return rawResponse.json();
      })
      .then(function(response) {
        console.log(response)
        if (response.result == 'success') {
          console.log("Form submission success");
          navigate("/success");
        } else {
          console.error(response);
          alert("Server responded with error! Sorry about this.")
        }
      })
      .catch(error => {
        console.error(error);
        alert("Unable to deliver. Is your internet connection down?")
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <StaticQuery
      query={graphql`
        query ContactQuery {
          site {
            siteMetadata {
              contactPostAddress
            }
          }
        }
      `}
      render={ queryResults => {

        // It's very ugly to update this.contactPostAddress inside render(), but Gatsby currently
        // offers only two ways of using StaticQuery: this way (inside render), and as a React Hook
        // (which would be incompatible with a class component).
        const contactPostAddress = queryResults.site.siteMetadata.contactPostAddress
        this.contactPostAddress = contactPostAddress

        return (
          <>
            <div className="form">
              <form
                name="contact"
                method="post"
                action={contactPostAddress}
                onSubmit={this.handleSubmit}
                data-netlify="true"
              >
                <label className="formItem" >
                  Imię:<br/>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </label>
                <br/><br/>
                <label className="formItem" >
                  E-mail:<br/>
                  <input
                    type="email"
                    name="emailReal"
                    value={this.state.emailReal}
                    onChange={this.handleChange}
                  />
                </label>
                <br/><br/>
                <input
                  type="email"
                  name="email" // actually honeypot
                  value={this.state.email}
                  onChange={this.handleChange}
                  style={{display: "none"}}
                />
                <label className="formItem" >
                  Wiadomość:<br/>
                  <textarea
                    name="message"
                    required={true}
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                </label>
                <br/><br/>
                <input
                  type="submit"
                  value="Wyślij"
                  id="submitButton"
                  className="formItem" 
                />
                {contactPostAddress === "" && (
                  <h1><br></br></h1>
                )}
              </form>
              <h2>Kontakt email : aneta.jaworska@wp.pl<br>
              </br> </h2><h3>Kontakt telefoniczny: +48 634-273-011
              </h3>

              {/* --- STYLES --- */}
              <style jsx>{`
                .formItem input,textarea {
                  width: 100%;
                  border-radius: 5px;
                  border-width: 2px;
                  font-family: Roboto;
                  font-weight: 400;
                  font-size: 1em;
                }
                .formItem input {
                  height: 30px;
                  max-width: 300px;
                }
                .formItem textarea {
                  height: 100px;
                  max-width: 600px;
                }
                #submitButton {
                  color: white;
                  height: auto;
                  font-family: Open Sans;
                  font-size: 1.2em;
                  font-weight: 400;
                  padding: 0.5em 3em;
                  border-radius: 5px;
                  background: ${theme.color.brand.primary};
                  border: 1px solid ${theme.color.brand.primary};
                }
                #submitButton:hover {
                  background: ${theme.color.brand.primaryDark};
                  cursor: pointer;
                }
              `}</style>
            </div>
          </>
        )
      }}
      />
    )
  }
};

export default Contact;
