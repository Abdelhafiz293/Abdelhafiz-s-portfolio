import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetServices, Project } from '../../services/get-services';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects: Project[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private getServices: GetServices) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.getServices.getProjects().subscribe({
      next: (response) => {
        console.log('Projects response:', response);
        if (Array.isArray(response)) {
          this.projects = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.projects = response.data;
        } else if (
          response &&
          response.success &&
          Array.isArray(response.allProjects)
        ) {
          this.projects = response.allProjects;
        } else {
          this.projects = [];
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.error = 'Failed to load projects. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onImageError(event: any) {
    console.log('Project image failed to load:', event.target.src);
    event.target.style.display = 'none';
  }

  openProject(link: string) {
    if (link) {
      window.open(link, '_blank');
    }
  }
}
