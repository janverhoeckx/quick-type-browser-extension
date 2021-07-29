import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {TemplateService} from '../../services/template.service';
import Template from "../../../../chrome/template.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  private templates$: Observable<Template[]>;

  public templateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private templateService: TemplateService,
    private snackBar: MatSnackBar
  ) {
    this.templates$ = this.templateService.templates$;
    this.templateForm = this.formBuilder.group({
      templates: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.templates$.subscribe({
      next: (templates) => {
        this.resetFormArray();
        templates?.forEach((template) => this.getTemplatesFormArray().push(this.createTemplateForm(template)));
        this.changeDetector.detectChanges();
      }
    });
  }

  public getFormControls(): FormControl[] {
    return (this.templateForm.controls['templates'] as FormGroup).controls as unknown as FormControl[] || [];
  }

  public addEmptyTemplateForm(): void {
    this.getTemplatesFormArray().push(this.createTemplateForm());
  }

  private createTemplateForm(template?: Template): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(this.getTemplatesFormArray().length || 0),
      key: new FormControl(template?.key || '', Validators.required),
      value: new FormControl(template?.value || '', Validators.required)
    });
  }

  public getTemplatesFormArray(): FormArray {
    return this.templateForm.get('templates') as FormArray;
  }

  private resetFormArray(): void {
    while (this.getTemplatesFormArray().length !== 0) {
      this.getTemplatesFormArray().removeAt(0)
    }
  }

  public delete(templateId: number, formArrayIndex: number): void {
    this.templateService.deleteTemplate(templateId);
    this.getTemplatesFormArray().removeAt(formArrayIndex);
  }

  public deleteAllTemplates(): void {
    this.templateService.deleteAllTemplates();
  }

  public submit(): void {
    this.templateService.saveTemplates(this.templateForm.value.templates);
    this.snackBar.open("Saved!", "Ok", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}
