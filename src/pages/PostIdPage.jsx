import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { useState } from "react";
import PostService from "../API/PostServise";
import Loader from "../components/UI/loader/Loader";
const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>You've opened a post page with ID {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}.{post.title}
        </div>
      )}
      <h2>Comments</h2>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PostIdPage;
