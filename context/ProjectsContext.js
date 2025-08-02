import { createContext, useState, useContext } from 'react';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India center

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  const clearProjects = () => {
    setProjects([]);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        clearProjects,
        isLoading,
        setIsLoading,
        mapCenter,
        setMapCenter,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);