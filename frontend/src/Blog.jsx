import React, { useState, useEffect } from 'react';

function Blog() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState(() => {
    const permanentPost = {
      id: 'permanent 0',
      title: 'Magical Glow Moss: A Beginner’s Guide🪻✨',
      subtitle: 'How to grow and care for bioluminescent moss at home',
      content: 'Glowing moss creates an enchanting atmosphere in any garden. These tiny plants emit a faint blue-green light thanks to bioluminescence, which you can nurture indoors or outdoors with proper humidity and minimal direct sunlight. In this guide, I’ll share tips for propagation, watering, and placement to help you make your moss garden truly magical.',
      image: '/images/glow-moss.jpg',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      createdAt: new Date().toISOString()
    };
    // Clear all posts except permanent post on load
    localStorage.setItem('flowerBlogs', JSON.stringify([permanentPost]));
    return [permanentPost];
  });

  // Save blogs to localStorage whenever blogs state changes
  useEffect(() => {
    localStorage.setItem('flowerBlogs', JSON.stringify(blogs));
  }, [blogs]);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') return;

    const currentDate = new Date();
    const newBlog = {
      id: editingId || Date.now(),
      title,
      subtitle,
      content,
      image,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
      createdAt: currentDate.toISOString()
    };

    if (editingId) {
      setBlogs(blogs.map(blog => blog.id === editingId ? newBlog : blog));
      setEditingId(null);
    } else {
      setBlogs([newBlog, ...blogs]);
    }
    
    setTitle('');
    setSubtitle('');
    setContent('');
    setImage(null);
  };

  // Handle edit
  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setImage(blog.image);
    window.scrollTo(0, 0);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (id === 'permanent 0') return; // Prevent deleting permanent post
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (password === 'admin123') { // Default password
      setBlogs(blogs.filter(blog => blog.id !== deleteId));
      setShowDeleteConfirm(false);
      setDeleteId(null);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
    setPassword('');
  };

  return (
    <div className="container">
      <h1>Simple Blog App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Blog Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <textarea
          rows="5"
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">{editingId ? 'Update Blog' : 'Post Blog'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setTitle('');
            setSubtitle('');
            setContent('');
            setImage(null);
          }} style={{marginLeft: '10px'}}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Confirm Delete</h3>
            <p>Enter password to delete this post:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div>
              <button onClick={confirmDelete}>Confirm</button>
              <button onClick={cancelDelete} style={{marginLeft: '10px'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs yet. Start posting</p>
        ) : (
          blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-image"
                />
              )}
              <h2 className="blog-title">{blog.title}</h2>
              <h4 className="blog-subtitle">{blog.subtitle}</h4>
              <p className="blog-content">{blog.content}</p>
              <div className="blog-meta">
                <small>Posted on: {blog.date} at {blog.time}</small>
              </div>
              <div className="blog-actions">
                <button onClick={() => handleEdit(blog)}>Edit</button>
                <button onClick={() => handleDelete(blog.id)} style={{marginLeft: '10px'}}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;