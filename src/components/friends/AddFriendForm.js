// import React, { useState } from "react";
// import { Link } from "react-router-dom"
// import "./AddFriendForm.css";

// const AddFriendForm = props => {
//     const [message, setMessage] = useState({ userId: "", senderId: props.activeUser, message: "" });

//     const handleFieldChange = evt => {
//       const stateToChange = { ...message };
//       stateToChange[evt.target.id] = evt.target.value;
//       setMessage(stateToChange);
//     };

//     const constructNewMessage = () => {
        
//     }

//   return (
//     <>
//       <header className="header">
//         <div className="header-banner-one"></div>
//         <div className="header-banner-two">
//           {/* Insert React Burger here */}
//           <h1 className="text-size--large">MTB Connect</h1>
//           {/* Insert avatar/link here */}
//         </div>
//       </header>
//       <form className="addFriendFormContainer">
//         <fieldset>
//           <label htmlFor="addFriend">Add Friend</label>
          
//           <button type="submit">Confirm</button>
//           <Link to="/trails">
//             <button type="submit">Cancel</button>
//           </Link>
//         </fieldset>
//       </form>
//     </>
//   );
// };

// export default AddFriendForm;
