import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE = 'http://localhost:3000/api/estudiantes'

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }
  getEstudiantes(){
    return this.http.get<any>(BASE);
  }
}
