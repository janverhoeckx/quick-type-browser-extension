import {Injectable} from '@angular/core';
import Template from '../../../../../../chrome/src/template.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templatesSubject = new BehaviorSubject<Template[]>([]);
  public readonly templates$ = this.templatesSubject.asObservable();

  constructor() {
    this.syncTemplates();
  }

  private syncTemplates(): void {
    chrome.storage.sync.get('templates', (data) => {
      this.templatesSubject.next(data.templates);
    });
  }

  public saveTemplates(templates: Template[]): void {
    chrome.storage.sync.set({templates});
    this.syncTemplates();
  }

  public deleteAllTemplates(): void {
    chrome.storage.sync.set({templates: []});
    this.syncTemplates();
  }

}
