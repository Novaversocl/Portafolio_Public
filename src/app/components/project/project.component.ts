import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { project } from 'src/app/modules/data-model/data.module';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  @Input() projectsData!: project[];
  categories: string[] = [];
  projects: project[] = [];
  filteredProjects: project[] = [];
  viewAll: boolean = false;
  category!: string;

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.projects = [...this.projectsData].reverse() as project[];
    this.categories = [
      ...Array.from(new Set(this.projects.map((s) => s.category))),
    ];
    this.filterProjects(
      this.categories.includes('Freelance') ? 'Freelance' : this.categories[0]
    );
  }

  filterProjects(cat: string) {
    this.viewAll = false;
    this.category = cat;
    this.filteredProjects = this.projects.filter(
      (p: project) => p.category.toLowerCase() === cat.toLowerCase()
    );
  }

  viewAllClick() {
    this.viewAll = !this.viewAll;
    this.viewportScroller.scrollToAnchor('projects');
  }
}
