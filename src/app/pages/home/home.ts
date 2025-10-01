import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetServices, About } from '../../services/get-services';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  profileImageUrl: string = '';
  aboutInfo: About | null = null;
  isLoading: boolean = true;
  skillsCount: number = 0;
  projectsCount: number = 0;
  isLoadingStats: boolean = true;

  constructor(private getServices: GetServices, private router: Router) {}

  ngOnInit() {
    this.loadAboutData();
    this.loadStats();
  }

  loadAboutData() {
    this.getServices.getAbout().subscribe({
      next: (response) => {
        console.log('About data response:', response);
        if (response && response.success && response.data) {
          this.aboutInfo = response.data;
          this.profileImageUrl = this.aboutInfo?.profileImageUrl || '';
          console.log('Profile image URL set to:', this.profileImageUrl);
        } else if (response && response.profileImageUrl) {
          // Fallback for direct data response
          this.aboutInfo = response;
          this.profileImageUrl = response.profileImageUrl;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.isLoading = false;
      },
    });
  }

  onImageError(event: any) {
    console.log('Profile image failed to load:', event.target.src);
    event.target.style.display = 'none';
  }

  loadStats() {
    this.isLoadingStats = true;
    let skillsLoaded = false;
    let projectsLoaded = false;

    const checkIfAllLoaded = () => {
      if (skillsLoaded && projectsLoaded) {
        this.isLoadingStats = false;
      }
    };

    // Load skills count
    this.getServices.getSkills().subscribe({
      next: (response) => {
        console.log('Skills response for count:', response);
        if (Array.isArray(response)) {
          this.skillsCount = response.length;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.skillsCount = response.data.length;
        } else if (
          response &&
          response.success &&
          Array.isArray(response.skills)
        ) {
          this.skillsCount = response.skills.length;
        } else {
          this.skillsCount = 0;
        }
        console.log('Skills count set to:', this.skillsCount);
        skillsLoaded = true;
        checkIfAllLoaded();
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.skillsCount = 0;
        skillsLoaded = true;
        checkIfAllLoaded();
      },
    });

    // Load projects count
    this.getServices.getProjects().subscribe({
      next: (response) => {
        console.log('Projects response for count:', response);
        if (Array.isArray(response)) {
          this.projectsCount = response.length;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.projectsCount = response.data.length;
        } else if (
          response &&
          response.success &&
          Array.isArray(response.allProjects)
        ) {
          this.projectsCount = response.allProjects.length;
        } else {
          this.projectsCount = 0;
        }
        console.log('Projects count set to:', this.projectsCount);
        projectsLoaded = true;
        checkIfAllLoaded();
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.projectsCount = 0;
        projectsLoaded = true;
        checkIfAllLoaded();
      },
    });
  }

  // Navigation methods
  navigateToAbout() {
    console.log('Navigating to about...');
    this.router.navigate(['/about']);
  }

  navigateToSkills() {
    console.log('Navigating to skills...');
    this.router.navigate(['/skills']);
  }

  navigateToProjects() {
    console.log('Navigating to projects...');
    this.router.navigate(['/projects']);
  }

  navigateToContact() {
    console.log('Navigating to contact...');
    this.router.navigate(['/contact']);
  }
}
