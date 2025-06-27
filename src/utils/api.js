const baseUrl = `https://nc-news-ldgq.onrender.com/api`;

const fetchArticles = async () => {
  try {
    const response = await fetch(`${baseUrl}/articles`);
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
        "Content-Type": "application/json"
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

export { fetchArticles, fetchArticleById, fetchCommentsById, updateVotes };
