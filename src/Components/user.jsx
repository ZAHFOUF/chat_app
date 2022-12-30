var user = window.localStorage.getItem("user_chat_app")

typeof user === "string" ? user = JSON.parse(user) : user = user


export default user