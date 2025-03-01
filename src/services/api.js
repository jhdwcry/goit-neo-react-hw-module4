import axios from "axios";

const API_KEY = "iTPXflvW35Z-D2VutPPFXS0gY6LpWdSem1S2v8VQBxI";
const API_URL = "https://api.unsplash.com/search/photos";

const FetchImages = async (query, page) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        query,
        page,
        per_page: 12,
        client_id: API_KEY,
      },
    });
    return response.data.results;
  } catch {
    throw new Error("Failed to fetch images. Try again later.");
  }
};

export default FetchImages