import { ProjectsProvider } from '../context/ProjectsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ProjectsProvider>
      <Component {...pageProps} />
    </ProjectsProvider>
  );
}

export default MyApp;