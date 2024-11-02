import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ToastContainerComponent } from './components/toast-container-component/toast-container.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent, ToastContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title in the header', () => {
    component.title = 'Tour of Heroes';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Tour of Heroes'
    );
  });

  it('should contain a navigation bar with the correct links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.navbar-nav .nav-link');

    expect(navLinks.length).toBe(2);

    expect(navLinks[0].getAttribute('routerLink')).toBe('/dashboard');
    expect(navLinks[1].getAttribute('routerLink')).toBe('/heroes');
  });

  it('should contain the toast container component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-toast-container')).toBeTruthy();
  });

  it('should have a navbar toggler button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const togglerButton = compiled.querySelector('.navbar-toggler');
    expect(togglerButton).toBeTruthy();
  });
});
