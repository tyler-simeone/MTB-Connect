import React from "react";

const FriendCard = props => {

  return (
    <>
      <div className="friendCardContainer">
        <figure className="riderImageContainer">
          {/* <img src={require(`${props.trail.img}`)} alt="Trail Image" /> */}
        </figure>
        <section className="trailRiderCard">
          <h2>{props.friend.user.fullName}</h2>
          <p>{props.friend.user.username}</p>
        </section>
      </div>
    </>
  );
};

export default FriendCard;
