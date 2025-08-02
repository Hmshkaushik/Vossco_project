import axios from 'axios';

// Mock data for different cities
const mockData = {
  hyderabad: [
    {
      name: "Prestige City Hyderabad",
      location: "Kokapet, Hyderabad",
      price: "₹75L - ₹1.5Cr",
      builder: "Prestige Group",
    },
    {
      name: "Aparna Zenon",
      location: "Nanakramguda, Hyderabad",
      price: "₹1.2Cr - ₹2.5Cr",
      builder: "Aparna Constructions",
    },
    // More projects...
  ],
  bangalore: [
    {
      name: "Brigade Utopia",
      location: "Whitefield, Bangalore",
      price: "₹1.5Cr - ₹3Cr",
      builder: "Brigade Group",
    },
    // More projects...
  ],
  // Add more cities as needed
};

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    // Simulate real-time scraping with delays
    const projects = mockData[city.toLowerCase()] || [];
    
    // Send projects one by one with delays to simulate real-time scraping
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    for (const project of projects) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      res.write(`data: ${JSON.stringify(project)}\n\n`);
    }
    
    res.end();
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
}