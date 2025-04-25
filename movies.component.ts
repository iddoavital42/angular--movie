import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  searchText: string = '';
  selectedGenre: string = 'All';

  title: string = '';
  director: string = '';
  releaseDate: string = '';
  genre: string = '';

  genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy'];

  movies: any[] = [];

  ngOnInit() {
    const saved = localStorage.getItem('movies');
    this.movies = saved ? JSON.parse(saved) : [
      { title: 'Inception', director: 'Christopher Nolan', releaseDate: '2010', genre: 'Sci-Fi' },
      { title: 'The Dark Knight', director: 'Christopher Nolan', releaseDate: '2008', genre: 'Action' }
    ];
  }

  get filteredMovies() {
    return this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedGenre === 'All' || movie.genre === this.selectedGenre)
    );
  }

  addMovie() {
    if (this.title && this.director && this.releaseDate && this.genre) {
      const newMovie = {
        title: this.title,
        director: this.director,
        releaseDate: this.releaseDate,
        genre: this.genre
      };
      this.movies.push(newMovie);
      this.saveMovies();
      this.clearForm();
    }
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.saveMovies();
  }

  clearForm() {
    this.title = '';
    this.director = '';
    this.releaseDate = '';
    this.genre = '';
  }

  saveMovies() {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  resetFilters() {
    this.searchText = '';
    this.selectedGenre = 'All';
  }
}
