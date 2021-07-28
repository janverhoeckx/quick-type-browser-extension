import {Injectable} from '@angular/core';
import Template from '../../../../chrome/template.interface';
import {BehaviorSubject} from 'rxjs';
import {take} from "rxjs/operators";

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

  public deleteTemplate(templateId: number): void {
    this.templates$.pipe(take(1)).subscribe((templates) => {
      this.saveTemplates(templates.filter((template) => template.id !== templateId));
    })
  }

  public deleteAllTemplates(): void {
    chrome.storage.sync.set({templates: []});
    this.syncTemplates();
  }

}
