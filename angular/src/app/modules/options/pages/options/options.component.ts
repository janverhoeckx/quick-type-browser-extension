import {Component} from '@angular/core';
import {TemplateService} from '../../services/template.service';
import Template from '../../../../../../../chrome/src/template.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})
export class OptionsComponent {

  public templates: Observable<Template[]>;

  constructor(private templateService: TemplateService) {
    this.templates = templateService.templates$;
  }

  public saveTemplates(templates: Template[]): void {
    this.templateService.saveTemplates(templates);
  }

  public deleteAllTemplates(): void {
    this.templateService.deleteAllTemplates();
  }

}
