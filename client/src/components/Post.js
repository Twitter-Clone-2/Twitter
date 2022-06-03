import react from "react";
import { Link } from "react-router-dom";
import "../CSS/Post.css";
const Post = (props) => {
  return (
    <body className="main">
      <div>
        <h3 className="headliner">Post Now!</h3>

        <div className="area">
          <textarea row="30" cols="20" className="text-area" />
        </div>
      </div>
      <button className="button3">Post</button> <br />
      <button onClick={() => props.setPostForm(false)} className="but-del">
        Cancel
      </button>
    </body>
  );
};
export default Post;
