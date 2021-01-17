import React, { Component, Fragment } from "react";
import Talk from "talkjs";
import { AuthContext } from "../Authentication";

class Messages extends Component {
  static contextType = AuthContext;
  state = {
    me: ""
  };

  componentDidUpdate(prevProps, prevState) {
    Talk.ready
      .then(() => {
        const me = new Talk.User(this.state);

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tP8HPC7p",
            me: me
          });
        }

        this.inbox = window.talkSession.createInbox();
        this.inbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  componentDidMount() {
    const user = this.context.currentUser;

    const userInfo = {
      id: user.id,
      name: user.name,
      role: "Member",
      photoUrl: "https://static.thenounproject.com/png/363640-200.png"
    };

    this.setState(userInfo);
  }

  render() {
    return (
      <div>
        <h2>Inbox</h2>
        <Fragment>
          <div
            style={{ height: "500px" }}
            className='inbox-container'
            ref={(c) => (this.container = c)}
          >
            Loading...
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Messages;
