import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHeroName]',
})
export class HeroNameDirective implements OnInit {
  @Input('appHeroName') heroName: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this._displayHeroName();
  }

  /**
   * Trims the hero's name if it exceeds a specified maximum length and updates the element's inner text.
   * If the hero's name is trimmed, the full name is set as the element's title attribute.
   *
   * @private
   * @method displayHeroName
   * @returns {void}
   */
  private _displayHeroName(): void {
    const maxLength = 10;

    if (this.heroName.length > maxLength) {
      const trimmedName = `${this.heroName.substring(0, maxLength)}...`;
      this.el.nativeElement.innerText = trimmedName;
      this.el.nativeElement.title = this.heroName;
    } else {
      this.el.nativeElement.innerText = this.heroName;
    }
  }
}
