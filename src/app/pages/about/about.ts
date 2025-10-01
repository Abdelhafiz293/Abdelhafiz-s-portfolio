import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  GetServices,
  About as AboutInterface,
} from '../../services/get-services';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  aboutInfo: AboutInterface | null = null;
  isLoading: boolean = true;
  error: string = '';

  constructor(private getServices: GetServices) {}

  ngOnInit() {
    this.loadAboutData();
  }

  loadAboutData() {
    this.isLoading = true;
    this.getServices.getAbout().subscribe({
      next: (response) => {
        console.log('About data response:', response);
        if (response && response.success && response.data) {
          this.aboutInfo = response.data;
        } else if (response && response.profileImageUrl) {
          // Fallback for direct data response
          this.aboutInfo = response;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.error =
          'Failed to load about information. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onImageError(event: any) {
    console.log('Profile image failed to load:', event.target.src);
    event.target.style.display = 'none';
  }
}
