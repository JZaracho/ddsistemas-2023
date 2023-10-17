import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemasService } from '../../services/temas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Temas } from '../../models/temas.model'


@Component({
  selector: 'app-dialog',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.scss']
})
export class TemasComponent implements OnInit {

  agregarTemaForm !: FormGroup;
  actionBtn: string = "Guardar";
  data: any = {};
  
  constructor(private formBuilder: FormBuilder,
    private temasService: TemasService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<TemasComponent>) { }

  ngOnInit(): void {
    this.agregarTemaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      duracion: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Actualizar"
      this.agregarTemaForm.controls['nombre'].setValue(this.editData.nombre);
      this.agregarTemaForm.controls['duracion'].setValue(this.editData.duracion);
    }
  }

  agregarTema() {
    if (!this.editData) {
      if (this.agregarTemaForm.valid) {

        this.data.nombre = this.agregarTemaForm.value.nombre;
        this.data.duracion = this.agregarTemaForm.value.duracion;

        this.temasService.postTema(this.agregarTemaForm.value)
          .subscribe({
            next: (res) => {
              alert("El tema fue agregado con exito");
              this.agregarTemaForm.reset();
              this.dialogRef.close('guardar');
            },
            error:(err) => {
              alert("Error al agregar el tema")
            }
          })
      }
    } else {
      this.updateTema()
    }

  }

  updateTema() {
    this.temasService.putTema(this.agregarTemaForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          console.log(this.agregarTemaForm.value);
          alert("Tema actualizado exitosamente.");
          this.agregarTemaForm.reset();
          this.dialogRef.close('guardar');
        },
          error: (err) => {
          alert("Error al actualizar el tema.");
          alert(err);
        }

      })
  }

}
