import { Injectable } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router, NavigationEnd} from "@angular/router";
import {Logger} from "angular2-logger/core";
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class WsTitleService {

  private greetingPath: string = 'greeting';
  private organizationsPath: string = 'organizations';
  private accountPath: string = 'account';
  private adminPath: string = 'admin';
  private topographyPath: string = 'topography';
  private _currentTitle: string = '';
  public currentTitleSubject: Subject<string> = new BehaviorSubject<string>(null);

  constructor(
    private titleService: Title,
    private router: Router,
    private logger: Logger
  ) { }

  handleGreetingTitle(pathComponents: string[]) {
    switch(pathComponents[0]) {
      case 'log-in':
        this.setTitle('Log In');
        break;
      case 'sign-up':
        this.setTitle('Sign Up');
        break;
      case 'forgot-password':
      case 'forgot-password-sent':
      case 'verify-forgot-password':
        this.setTitle('Forgot Password');
        break;
      case 'verify-email':
        this.setTitle('Verify Email');
        break;
      default:
        this.handleUnknownTitle(pathComponents, 'greeting');
    }
  }

  handleOrganizationsTitle(pathComponents: string[]) {
    switch(pathComponents[0]) {
      case 'mine':
        this.setTitle('My Organizations');
        break;
      case 'new':
        this.setTitle('New Organization');
        break;
      default:
        this.handleUnknownTitle(pathComponents, 'organizations');
    }
  }

  handleAccountTitle(pathComponents: string[]) {
    switch(pathComponents[0]) {
      case 'settings':
        this.setTitle('Settings');
        break;
      default:
        this.handleUnknownTitle(pathComponents, 'account');
    }
  }

  handleAdminTitle(pathComponents: string[]) {
    switch(pathComponents[0]) {
      case 'manage-users':
        this.setTitle('Manage Users');
        break;
      default:
        this.handleUnknownTitle(pathComponents, 'admin');
    }
  }

  private handleTopographyTitle(pathComponents: string[]) {
    switch(pathComponents[0]) {
      case 'home':
        this.setTitle('Topography Home');
        break;
      case 'web-services':
        this.setTitle('Web Services');
        break;
      default:
        this.handleUnknownTitle(pathComponents, 'topography');
    }
  }

  handleUnknownTitle(pathComponents: string[], handler: string) {
    this.logger.warn('Unable to set title for path components of ' + pathComponents + '. Handler was ' + handler + '.');
  }

  handleRouteChange(event) {
    if (event instanceof NavigationEnd) {
      let pathComponents = event.urlAfterRedirects.split('/');
      pathComponents = pathComponents.slice(1, pathComponents.length);
      switch(pathComponents[0]) {
        case this.greetingPath:
          this.handleGreetingTitle(pathComponents.slice(1, pathComponents.length));
          break;
        case this.organizationsPath:
          this.handleOrganizationsTitle(pathComponents.slice(1, pathComponents.length));
          break;
        case this.accountPath:
          this.handleAccountTitle(pathComponents.slice(1, pathComponents.length));
          break;
        case this.adminPath:
          this.handleAdminTitle(pathComponents.slice(1, pathComponents.length));
          break;
        case this.topographyPath:
          this.handleTopographyTitle(pathComponents.slice(1, pathComponents.length));
          break;
        default:
          this.handleUnknownTitle(pathComponents, 'route change');
      }
    }
  }

  init() {
    // this.router.events.subscribe(event => this.handleRouteChange(event));
  }

  setTitle(title) {
    this.titleService.setTitle('Web Sight | ' + title);
  }

  get currentTitle(): string {
    return this._currentTitle;
  }

  set currentTitle(title: string) {
    this._currentTitle = title;
    this.currentTitleSubject.next(title);
    this.titleService.setTitle('Web Sight | ' + title);
  }

}
