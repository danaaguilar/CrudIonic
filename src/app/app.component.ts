import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EstudianteService } from './services/estudiante.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  estudiantes:any[]=[]
  constructor(private estudianteService:EstudianteService, private http:HttpClient ) {}
  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string=''
  apellido: string=''
  ngOnInit(): void {
    this.estudianteService.getEstudiantes().subscribe((resp)=>{
      this.estudiantes = resp.estudiantes
    })
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  onSubmit(data:any){
    this.http.post('http://localhost:3000/api/estudiantes',data)
    .subscribe((result)=>{
      console.warn('resultado',result)
    })
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
