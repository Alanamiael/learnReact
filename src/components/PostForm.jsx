//import React from "react";
import { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({ create }) => {
  //Инода формы и инпуты могут быть большими и громозкдими и поэтому чтобы не создавать для каждого инпута отдельное состояние иногда лучше создавать не строку а обьект
  // и для кадого инпута использовать какое-то поле этого объекта

  const [post, setPost] = useState({
    title: "",
    body: "",
  });
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");

  // Неуправляемый/неконтролируемый компонент
  //const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };

    create(newPost);
    //setPosts([...posts, { ...post, id: Date.now() }]);
    setPost({ title: "", body: "" });

    // Неуправляемый/неконтролируемый компонент
    // console.log(bodyInputRef.current.value);
    //console.log(bodyInputRef.current);
    //в целом манипулировать DOM деревом в реакт не рекомендуеться но бывают случаи когда это необходимо
  };
  return (
    <form>
      {/* Управляемый компонент */}
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Post Name"
      ></MyInput>
      {/* <input ref={bodyInputRef} type="text"></input> */}

      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post Description"
      ></MyInput>
      <MyButton onClick={addNewPost}>Create Post</MyButton>

      {/* Неуправляемый/неконтролируемый компонент */}
      {/* <MyInput
          ref={bodyInputRef}
          type="text"
          placeholder="Post Description"
        ></MyInput>
        <MyButton onClick={addNewPost}>Create Post</MyButton> */}
    </form>
  );
};

export default PostForm;
