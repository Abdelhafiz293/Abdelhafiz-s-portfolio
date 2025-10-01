import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetServices, Skill } from '../../services/get-services';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, RouterModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  skills: Skill[] = [];
  isLoading: boolean = true;
  error: string = '';
  skillCategories: string[] = [];
  selectedCategory: string = 'all';

  constructor(private getServices: GetServices) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.isLoading = true;
    this.getServices.getSkills().subscribe({
      next: (response) => {
        console.log('Skills response:', response);
        if (Array.isArray(response)) {
          this.skills = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.skills = response.data;
        } else if (
          response &&
          response.success &&
          Array.isArray(response.skills)
        ) {
          this.skills = response.skills;
        }

        this.extractCategories();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.error = 'Failed to load skills. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  extractCategories() {
    const categories = [
      ...new Set(this.skills.map((skill) => skill.category || 'General')),
    ];
    this.skillCategories = ['all', ...categories];
  }

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'all') {
      return this.skills;
    }
    return this.skills.filter(
      (skill) => (skill.category || 'General') === this.selectedCategory
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  onImageError(event: any) {
    console.log('Skill icon failed to load:', event.target.src);
    event.target.style.display = 'none';
  }
}
