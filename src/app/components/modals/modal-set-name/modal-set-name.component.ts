import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-set-name',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-set-name.component.html',
  styleUrls: ['./modal-set-name.component.scss']
})
export class ModalSetNameComponent implements OnInit {

  form: FormGroup;
  submitting = false;

  constructor(
    private builder: FormBuilder,
    private modalController: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: [null, [Validators.required]]
    });
  }

  dismiss(value = null){
    this.modalController.dismiss(value);
  }

  async submit() {
    this.submitting = true;
    if(this.form.invalid || !this.form.controls['name'].value.trim()){
      this.submitting = false;
      const toastr = await this.toast.create(
        {
          position: 'top',
          message: 'Digite um nome',
          color: 'danger',
          duration: 2000
        }
      );
      await toastr.present();
      this.form.controls['name'].setValue('');
      return;
    }


    const { name } = this.form.value;
    this.submitting = false;
    this.dismiss(name);
  }
}
