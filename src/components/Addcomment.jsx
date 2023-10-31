import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import axios from 'axios';
import { axiosRequest, getToken } from '../utilities/axiosRequest';

const CommentInput = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
  
    if (isSubmitting) {
      // Prevent multiple submissions
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const userId = getToken()?.sid; // Get the userId from your authentication token
      const { data } = await axiosRequest.post(`Post/add_comment`, {
        "comment": comment,
        "postId": postId,
        "userId": userId // Include the userId in your request
      });
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 p-2">
      <IconButton>
        <InsertEmoticonIcon />
      </IconButton>
      <TextField 
        fullWidth 
        value={comment} 
        onChange={handleCommentChange} 
        placeholder="Add a comment..." 
        InputProps={{ style: { fontSize: 12 } }} 
      />
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default CommentInput;
