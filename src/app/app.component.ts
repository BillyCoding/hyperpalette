import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NgFor,
  NgStyle
} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'angular-color-pallete';

  paletteSize = 5
  paletteMode = 'monochrome'
  loading = false
  colors: string[] = ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b']


  constructor(private http: HttpClient) { }

  async handleGenerateRandomColorPalleteApi() {
    if (!this.loading) {
      this.loading = true
      const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const apiUrl = `https://www.thecolorapi.com/scheme?hex=${randomColor}&mode=${this.paletteMode}&count=${this.paletteSize}`;
      this.http.get<any>(apiUrl).subscribe(
        (response) => {
          this.colors = response.colors.map((color: any) => color.hex.value);
        },
        (error) => {
          console.error('Erro ao buscar a paleta de cores:', error);
        },
        () => {
          this.loading = false
        }
      );
    }
  }

  handleGenerateRandomColorPallete() {
    const newColors: string[] = [];

    for (let i = 0; i < this.paletteSize; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      newColors.push(randomColor);
    }

    this.colors = newColors
  }

  handleChangeMode(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.paletteMode = target.value
    this.handleGenerateRandomColorPalleteApi()
  }
}
