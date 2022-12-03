import React from "react";
import MyRouter from "routers/index";
import MessengerCustomerChat from "react-messenger-customer-chat";

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
      <MessengerCustomerChat
        pageId="100088111072986"
        appId="5766874846710177"
      />
    </div>
  );
}

export default App;
