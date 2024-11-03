import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroNameDirective } from './hero-name.directive';

@Component({
  template: `<span [appHeroName]="heroName"></span>`,
})
class TestComponent {
  heroName: string = '';
}

describe('HeroNameDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  const maxLength = 10;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroNameDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement.query(By.directive(HeroNameDirective));
  });

  it('should display full hero name if length is within max limit', () => {
    const shortName = 'Superman';
    fixture.componentInstance.heroName = shortName;
    fixture.detectChanges();

    expect(debugElement.nativeElement.innerText).toBe(shortName);
    expect(debugElement.nativeElement.title).toBe('');
  });

  it('should trim hero name and add tooltip if length exceeds max limit', () => {
    const longName = 'Wonder Woman the Hero';
    fixture.componentInstance.heroName = longName;
    fixture.detectChanges();

    const expectedTrimmedName = `${longName.substring(0, maxLength)}...`;

    expect(debugElement.nativeElement.innerText).toBe(expectedTrimmedName);
    expect(debugElement.nativeElement.title).toBe(longName);
  });
});
