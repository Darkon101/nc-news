const baseUrl = `https://nc-news-ldgq.onrender.com/api`;

const fetchArticles = async (topic = null) => {
  try {
    let url = `${baseUrl}/articles`
    if(topic) {
      url += `?topic=${topic}`
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error.message, "<<fetchArticles");
    throw error;
  }
};

const fetchTopics = async () => {
  try {
    const response = await fetch(`${baseUrl}/topics`)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error.message, "<<fetchTopics");
    throw error
  }
}

const fetchArticleById = async (articleId) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${articleId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error.message, "<<fetchArticleById");
    throw error;
  }
};

const fetchCommentsById = async (articleId) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${articleId}/comments`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error.message, "<<fetchCommentsById");
    throw error;
  }
};

const updateVotes = async (articleId, voteChange) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${articleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inc_votes: voteChange }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error.message, "<<updateVotes");
    throw error;
  }
};

const postComment = async (articleId, user, commentBody) => {
  try {
    const response = await fetch(`${baseUrl}/articles/${articleId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, body: commentBody }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error.message, "<<updateVotes");
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/users`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message, "<<fetchUsers");
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${baseUrl}/comments/${commentId}`, {
      method: "DELETE"
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.log(error.message, "<<deleteComment");
    throw error;
  } 
}

export {
  fetchArticles,
  fetchArticleById,
  fetchCommentsById,
  updateVotes,
  postComment,
  fetchUsers,
  deleteComment,
  fetchTopics
};
