import { useState, useEffect } from "react";
import { backendClient } from "../clients/backendClient";


function FeedPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
 const [posts, setPosts] = useState([]);


useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await backendClient.get("/posts", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("social-app-token"),
            )}`,
          },
        });

        setPosts(res.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await backendClient.post('/posts', {title, body}, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('social-app-token'))}`
            }
        });

        console.log(res);
        

    } catch (error) {
        console.error(error);
    }
  }

  return (
    <main>
      <h1>Feed Page</h1>

      <form onSubmit={handleSubmit}>
        <h2>What's in your mind?</h2>
        <label htmlFor="title" />
        <input
          type="text"
          title={title}
          placeholder="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="body" />
        <input
          type="text"
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input type="submit" value="Post" />
      </form>
     <div>
        {posts.length > 0 && (
          <>
            <h2>Posts</h2>
            {posts.map((post) => (
              <div key={post._id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

export default FeedPage;