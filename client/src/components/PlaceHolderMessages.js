import React from 'react'
import FollowersAndFollowingModal from "../components/FollowersAndFollowingModal";
import "../CSS/followersAndFollowingModal.css";

const PlaceHolderMessages = ({followingInfo}) => {
  return (
    <div className="messagesConvoSection">
        <div id='messagesConvoSectionHeader'>Select a message</div>
        <div id="messagesConvoSectionSubHeader">Choose from your existing conversations, start a new one, or just keep swimming.</div>
        <div>
            <FollowersAndFollowingModal
            num={`New Message`}
            relationship={followingInfo}
            />
        </div>
  </div>
  )
}

export default PlaceHolderMessages