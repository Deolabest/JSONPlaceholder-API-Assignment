import React, { useState } from 'react';
import axios from 'axios';

const EditPost = ({ post, onUpdate }) => {
  const [editedPost, setEditedPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${editedPost.id}`, editedPost)
    .then(() => {
      onUpdate(editedPost);
      setIsEditing(false);
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            type='text'
            value={editedPost.title}
            onChange={e => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <textarea
            value={editedPost.body}
            onChange={e => setEditedPost({ ...editedPost, body: e.target.value })}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{editedPost.title}</h2>
          <p>{editedPost.body}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditPost;