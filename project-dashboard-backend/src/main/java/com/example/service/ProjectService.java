import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Project;
import com.example.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Iterable<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
}