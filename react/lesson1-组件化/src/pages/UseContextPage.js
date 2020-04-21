import React, {useContext} from "react";
import {ThemeContext, UserContext} from "../Context";

export default function UseContextPage(props) {
  const context = useContext(ThemeContext);
  const usercontext = useContext(UserContext);
  console.log("use---", usercontext); 
  return (
    <div className="border">
      <h3 className={context.themeColor}>UseContextPage</h3>
      <p>{usercontext.name}</p>
    </div>
  );
}
