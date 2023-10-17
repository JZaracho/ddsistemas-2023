import { Component,OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { CursosService } from '../../services/cursos.service';
import { TemasService } from '../../services/temas.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Temas } from '../../models/temas.model'
import { Curso } from '../../models/curso.model'


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit{

  agregarCursoForm !: FormGroup; 
  actionBtn: string = "Guardar";
  data: any = {};
  data2: Curso = {};


  vtemas : Temas[] = [];
 /*  vcurso: Curso = <Curso>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1,
    tema:{
      id:2
    }
  } */

  constructor(private formBuilder: FormBuilder, 
              private cursosService: CursosService,
              private temasService: TemasService, 
              @Inject(MAT_DIALOG_DATA) public editData: any, 
              private dialogRef : MatDialogRef<CursosComponent> ) {}

  ngOnInit(): void{
    this.agregarCursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tema: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      idDocente: ['', Validators.required]
    });
    
    if(this.editData){
      this.actionBtn = "Actualizar"
      this.agregarCursoForm.controls['nombre'].setValue(this.editData.nombre);
      this.agregarCursoForm.controls['tema'].setValue(this.editData.tema);
      this.agregarCursoForm.controls['fechaInicio'].setValue(this.editData.fechaInicio);
      this.agregarCursoForm.controls['idDocente'].setValue(this.editData.idDocente);
    }

    this.temasService.getTema()
    .subscribe({
      next: (temas) => {
        this.vtemas = temas;
      },
      error: (e) => {
        console.error(e);
      }
    });


  }

  agregarCurso(){
    if(!this.editData){
      if(this.agregarCursoForm.valid){
       
        this.data.nombre = this.agregarCursoForm.value.nombreCurso;
        this.data.tema = this.agregarCursoForm.value.temaCurso;
        this.data.fechaInicio = this.agregarCursoForm.value.fechaCurso;
        this.data.idDocente = this.agregarCursoForm.value.docenteCurso;
        
        this.cursosService.postCurso(this.agregarCursoForm.value)
        .subscribe({
          next:(res)=>{
            alert("El curso fue agregado con exito");
            this.agregarCursoForm.reset();
            this.dialogRef.close('guardar');
          },
          error:()=>{
            alert("Error al agregar el curso")
          }
        })
      }
    } else{
      this.updateCurso()
  }
    
  }


  updateCurso(){
    console.log(this.agregarCursoForm.value);
    console.log(this.editData.id)
    this.cursosService.putCurso(this.agregarCursoForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Curso actualizado exitosamente.");
        this.agregarCursoForm.reset();
        this.dialogRef.close('guardar');
      },
      error:()=>{
        alert("Error al actualizar el curso.")
      }
      
    })
  }

  

}
