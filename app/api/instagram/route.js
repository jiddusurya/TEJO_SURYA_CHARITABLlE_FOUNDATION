export default async function handler(req, res) {
  // IMPORTANT: Store your access token securely in environment variables.
  // Create a file named .env.local in your project root and add:
  // INSTAGRAM_ACCESS_TOKEN=YOUR_LONG_LIVED_ACCESS_TOKEN
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = "tejosuryafoundation"; // Replace with your Instagram User ID
  const fields = 'id,caption,media_url,timestamp,media_type,permalink';
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }
    const data = await response.json();

    // Filter out videos if you only want images
    const imagePosts = data.data.filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM');

    // Format the data to match what your component expects
    const formattedPosts = imagePosts.map(post => ({
      id: post.id,
      src: post.media_url,
      caption: post.caption || 'Visit our Instagram for more!',
    }));

    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
}