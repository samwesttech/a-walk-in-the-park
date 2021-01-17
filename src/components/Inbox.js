import React from "react";
import Talk from "talkjs";
import { AuthContext } from "../Authentication";
import { fetchUsers } from "../utils/fetchUsers";

class Inbox extends React.Component {
  static contextType = AuthContext;

  state = {
    me: "",
    users: []
  };

  componentDidMount() {
    const user = this.context.currentUser;

    const userInfo = {
      id: user.id,
      name: user.name,
      role: "Member",
      photoUrl: "https://static.thenounproject.com/png/363640-200.png"
    };
    fetchUsers().then((res) => {
      const user = res.find((user) => user.id === this.props.username);
      Talk.ready
        .then(() => {
          const me = new Talk.User(userInfo);
          const other = new Talk.User(user);

          window.talkSession = new Talk.Session({
            appId: "tP8HPC7p",
            me: me
          });

          const conversationId = Talk.oneOnOneId(me, other);
          const conversation = window.talkSession.getOrCreateConversation(
            conversationId
          );

          conversation.setParticipant(me);
          conversation.setParticipant(other);

          this.chatbox = window.talkSession.createChatbox(conversation);
          this.chatbox.mount(this.container);
        })
        .catch((e) => console.error(e));
      this.setState({ users: res, me: userInfo });
    });
  }

  render() {
    const currentUser = this.state;

    return (
      <div className='users-container'>
        <div
          style={{ height: "500px" }}
          className='inbox-container'
          ref={(c) => (this.container = c)}
        ></div>
        <i></i>
      </div>
    );
  }
}
export default Inbox;
