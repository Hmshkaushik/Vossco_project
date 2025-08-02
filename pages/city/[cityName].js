import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useProjects } from '../../context/ProjectsContext';
import ProjectCard from '../../components/ProjectCard';
import MapComponent from '../../components/MapComponent';
import LoadingSpinner from '../../components/LoadingSpinner';

const CityPage = () => {
  const router = useRouter();
  const { cityName } = router.query;
  const { 
    projects, 
    addProject, 
    clearProjects, 
    isLoading, 
    setIsLoading,
    mapCenter,
    setMapCenter
  } = useProjects();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    const fetchProjects = async () => {
      setIsLoading(true);
      clearProjects();
      setError(null);

      try {
        const eventSource = new EventSource(`/api/scrape?city=${cityName}`);
        
        eventSource.onmessage = async (event) => {
          const project = JSON.parse(event.data);
          
          // Get coordinates for the project
          try {
            const response = await axios.get('/api/geocode', {
              params: { location: project.location }
            });
            project.coordinates = response.data;
            
            // Update map center to first project
            if (projects.length === 0) {
              setMapCenter([response.data.lat, response.data.lng]);
            }
          } catch (geocodeError) {
            console.error('Geocoding failed:', geocodeError);
            project.coordinates = null;
          }
          
          addProject(project);
        };

        eventSource.onerror = () => {
          eventSource.close();
          setIsLoading(false);
        };

        return () => {
          eventSource.close();
        };
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch projects. Please try again.');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [cityName]);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Real Estate Projects in {cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1) : ''}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Projects List</h2>
          {isLoading && projects.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Project Locations</h2>
          <MapComponent projects={projects} center={mapCenter} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;