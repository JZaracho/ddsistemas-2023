import { Component,OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlumnosService } from '../../services/alumnos.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit{

  agregarAlumnosForm !: FormGroup; 
  actionBtn: string = "Guardar";
  data: any = {};
  constructor(private formBuilder: FormBuilder, 
              private alumnosService: AlumnosService, 
              @Inject(MAT_DIALOG_DATA) public editData: any, 
              private dialogRef : MatDialogRef<AlumnosComponent> ) {}

  ngOnInit(): void{
    console.log("llega init por curso");
    this.agregarAlumnosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
    
    if(this.editData){
      this.actionBtn = "Actualizar";
      this.agregarAlumnosForm.controls['nombre'].setValue(this.editData.nombre);
      this.agregarAlumnosForm.controls['fechaNacimiento'].setValue(this.editData.fechaNacimiento);
  
    }
  }

  agregarAlumno(){
    if(!this.editData){
      if(this.agregarAlumnosForm.valid){
         this.data.nombre = this.agregarAlumnosForm.value.nombre;
        this.data.fechaNacimiento = this.agregarAlumnosForm.value.fechaNacimiento;

        this.alumnosService.postAlumno(this.agregarAlumnosForm.value)
        .subscribe({
          next:(res)=>{
            alert("El alumno fue agregado con exito");
            this.agregarAlumnosForm.reset();
            this.dialogRef.close('guardar');
          },
          error:(err)=>{
            alert("Error al agregar el alumno");
          }
        })
      }
    }else{
      
      this.updateAlumno();
  }
    
  }

  updateAlumno(){
    console.log(this.agregarAlumnosForm.value);
    console.log(this.editData.id);
    this.alumnosService.putAlumno(this.agregarAlumnosForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        console.log(this.agregarAlumnosForm.value);

        alert("Alumno actualizado exitosamente.");
        this.agregarAlumnosForm.reset();
        this.dialogRef.close('guardar');
      },
      error:(err)=>{
        console.log(this.agregarAlumnosForm.value);
        alert("Error al actualizar el Alumno.");
      }
      
    })
  }

}