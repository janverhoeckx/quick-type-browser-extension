import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import Template from '../../../../../../../chrome/src/template.interface';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  @Input() public templates$: Observable<Template[]>;
  @Output() public newTemplateEvent = new EventEmitter<Template>();

  public templateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef) {
    this.templateForm = this.formBuilder.group({
      templates: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.templates$.subscribe({
      next: (templates) => {
        this.resetFormArray();
        templates.forEach((template) => this.getTemplatesFormArray().push(this.createTemplateForm(template)));
        this.changeDetector.detectChanges();
      }
    });
  }

  public addEmptyTemplateForm(): void {
    this.getTemplatesFormArray()?.push(this.createTemplateForm());
  }

  private createTemplateForm(template?: Template): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(this.getTemplatesFormArray()?.length || 0),
      key: new FormControl(template?.key || ''),
      value: new FormControl(template?.value || '')
    });
  }

  private getTemplatesFormArray(): FormArray | undefined {
    return this.templateForm?.get('templates') as FormArray;
  }

  private resetFormArray(): void {
    while (this.getTemplatesFormArray().length !== 0) {
      this.getTemplatesFormArray().removeAt(0)
    }
  }

  public submit(): void {
    this.newTemplateEvent.emit(this.templateForm.value.templates);
  }
}
