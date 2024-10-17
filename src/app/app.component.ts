import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NgFor,
  NgStyle
} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'angular-color-pallete';

  palleteSize = 5
  colors: string[] = ['#ffce00', '#ff2424', '#3eff45', '#ecbF90', '#fefefe']

  handleGenerateRandomColorPallete() {
    const newColors: string[] = [];

    for (let i = 0; i < this.palleteSize; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      newColors.push(randomColor);
    }

    this.colors = newColors
  }
}
