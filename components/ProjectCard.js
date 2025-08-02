const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Location:</span> {project.location}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Price:</span> {project.price}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Builder:</span> {project.builder}
      </p>
      {project.coordinates && (
        <p className="text-gray-500 text-sm mt-2">
          Coordinates: {project.coordinates.lat.toFixed(4)}, {project.coordinates.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default ProjectCard;