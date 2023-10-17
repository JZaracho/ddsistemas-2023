import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaterialesService } from '../../services/materiales.service';
import { CursosService } from '../../services/cursos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../models/material.model'
import { Curso } from '../../models/curso.model'

@Component({
  selector: 'app-dialog',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent implements OnInit {

  agregarMaterialForm !: FormGroup;
  actionBtn: string = "Guardar";
  data: any = {};

  listacurso: Curso[] = [];
 /*  vcurso: Curso = <Curso>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1,
    tema: {
      id: 2
    }
  }; */

  constructor(private formBuilder: FormBuilder,
    private materialesService: MaterialesService,
    private cursosService: CursosService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MaterialesComponent>) { }

  ngOnInit(): void {
    this.agregarMaterialForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      costo: ['', Validators.required],
      idCurso: ['', Validators.required],
      stock: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Actualizar"
      this.agregarMaterialForm.controls['titulo'].setValue(this.editData.titulo);
      this.agregarMaterialForm.controls['costo'].setValue(this.editData.costo);
      this.agregarMaterialForm.controls['idCurso'].setValue(this.editData.idCurso);
      this.agregarMaterialForm.controls['stock'].setValue(this.editData.stock);
    }

    this.cursosService.getCurso()
      .subscribe({
        next: (cursos) => {
          this.listacurso = cursos;
        },
        error: (e) => {
          console.error(e);
        }
      })
  }

  agregarMateriales() {

    if (!this.editData) {
      if (this.agregarMaterialForm.valid) {

        this.data.titulo = this.agregarMaterialForm.value.titulo;
        this.data.costo = this.agregarMaterialForm.value.costo;
        this.data.idCurso = this.agregarMaterialForm.value.idCurso;
        this.data.stock = this.agregarMaterialForm.value.stock;

        this.materialesService.postMaterial(this.agregarMaterialForm.value)
          .subscribe({
            next: (res) => {
              alert("El Material fue agregado con exito");
              this.agregarMaterialForm.reset();
              this.dialogRef.close('guardar');
            },
            error: (err) => {
              alert("Error al agregar Material")
            }
          })
      }
    } else {
      this.updateMaterial();
      }

  }

  updateMaterial() {
    this.materialesService.putMaterial(this.agregarMaterialForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Material actualizado exitosamente.");
          this.agregarMaterialForm.reset();
          this.dialogRef.close('guardar');
        },
        error: (err) => {
          alert("Error al actualizar el Material.")
        }

      })
  }

}
