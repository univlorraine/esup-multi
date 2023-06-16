import { Injectable } from '@angular/core';
import tinycolor from 'tinycolor2';
import { isDarkTheme } from './theme.repository';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  constructor() {}

  isBackgroundFromCmsDarkOrIsDarkTheme(color: string): boolean {
    const colorObj = color ? tinycolor(color) : null;
    return colorObj ? colorObj.isDark() : isDarkTheme();
  }
}
