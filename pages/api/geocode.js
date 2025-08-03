
// Mock geocoding - in a real app, you'd use PositionStack API
const mockGeocoding = {
  "Kokapet, Hyderabad": { lat: 17.4833, lng: 78.3333 },
  "Nanakramguda, Hyderabad": { lat: 17.4333, lng: 78.3667 },
  "Whitefield, Bangalore": { lat: 12.9698, lng: 77.7499 },
  // Add more locations as needed
};

export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const coordinates = mockGeocoding[location] || { 
      lat: 17.3850 + (Math.random() * 0.1 - 0.05), 
      lng: 78.4867 + (Math.random() * 0.1 - 0.05) 
    };
    
    res.status(200).json(coordinates);
  } catch (error) {
    console.error('Geocoding error:', error);
    res.status(500).json({ error: 'Failed to geocode location' });
  }
}