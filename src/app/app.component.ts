import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosService } from './services/cursos.service';
import { TemasService } from './services/temas.service';
import { AlumnosService } from './services/alumnos.service';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule} from '@angular/material/tabs';
import { TemasComponent } from './components/temas/temas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { MaterialesService } from './services/materiales.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent implements OnInit{
  selectedIndex = 0;
  title = 'AngularCrud';
  displayedColumnsCursos: string[] = ['id', 'nombre', 'tema', 'fechaInicio', 'idDocente', 'action'];
  displayedColumnsTemas: string[] = ['id', 'nombre', 'duracion', 'action'];
  displayedColumnsAlumnos: string[] = ['id', 'nombre', 'fechaNacimiento', 'action'];
  displayedColumnsMateriales: string[] = ['id', 'titulo', 'costo', 'idCurso', 'stock', 'action'];

  dataSource!: MatTableDataSource<any>;
  dataSourceTemas!: MatTableDataSource<any>;
  dataSourceAlumno!: MatTableDataSource<any>;
  dataSourceMateriales!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private cursosService : CursosService,  private temasService : TemasService, private alumnosService : AlumnosService, private materialesService : MaterialesService){}
  
  ngOnInit(): void {
      this.getAllCursos();
      this.getAllAlumnos();
      this.getAllTemas();
      this.getAllMateriales();
      
      const index = localStorage.getItem('selectedIndex');
      if (index){
        this.selectedIndex = Number(index);
      }
  }
  
  tabChanged(index: number):void{
    localStorage.setItem('selectedIndex',String(index));
  }
  openDialog() {
    this.dialog.open(CursosComponent, {
    width:'30%'
    }).afterClosed().subscribe(val => {
      if(val === "guardar"){
        this.getAllCursos();
      }
    })
  }

  openTema(){
    this.dialog.open(TemasComponent, {
    width:'30%'
    }).afterClosed().subscribe(val => {
      console.log(val)
      if(val === "guardar"){
        this.getAllTemas();
      }
    })
  }

  openAlumnos(){
    this.dialog.open(AlumnosComponent, {
    width:'30%'
    }).afterClosed().subscribe(val => {
      if(val === "guardar"){
        this.getAllAlumnos();
      }
    })
  }

  openMateriales(){
    this.dialog.open(MaterialesComponent, {
    width:'30%'
    }).afterClosed().subscribe(val => {
      if(val === "guardar"){
        this.getAllMateriales();
      }
    })
  }

 getAllCursos(){
    this.cursosService.getCurso()
      .subscribe({
        next:(res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err) => {
          alert("error al imprimir los cursos")
        }
      })
  }

  getAllTemas(){
    this.temasService.getTema()
      .subscribe({
        next:(res) => {
          this.dataSourceTemas = new MatTableDataSource(res);
          this.dataSourceTemas.paginator = this.paginator;
          this.dataSourceTemas.sort = this.sort;
        },
        error:(err) => {
          alert("error al retornar temas")
        }
      })
  }
  
  getAllAlumnos(){
    this.alumnosService.getAlumno()
      .subscribe({
        next:(res) => {
          this.dataSourceAlumno = new MatTableDataSource(res);
          this.dataSourceAlumno.paginator = this.paginator;
          this.dataSourceAlumno.sort = this.sort;
        },
        error:(err) => {
          alert("error al retornar alumnos")
        }
      })
  }

  getAllMateriales(){
   
    this.materialesService.getMaterial()
      .subscribe({
        next:(res) => {
          this.dataSourceMateriales = new MatTableDataSource(res);
          this.dataSourceMateriales.paginator = this.paginator;
          this.dataSourceMateriales.sort = this.sort;
          
        },
        error:(err) => {
          alert("error al retornar materiales")
        }
      })
  }


  editarCurso(row: any){
    this.dialog.open(CursosComponent,{
      width: '30%',
      data:row,
    } ).afterClosed().subscribe(val => {
        if(val === "guardar"){
          this.getAllCursos();
        }
    })
  }

  editarTema(row: any){
    this.dialog.open(TemasComponent,{
      width: '30%',
      data:row,
    } ).afterClosed().subscribe(val => {
        console.log(val)
        if(val === "guardar"){
           this.getAllTemas();
        }
    })
  }
  
  editarAlumnos(row: any){
    this.dialog.open(AlumnosComponent,{
      width: '30%',
      data:row,
    } ).afterClosed().subscribe(val => {
        if(val === "guardar"){
          this.getAllAlumnos();
        }
    })
  }

  editarMateriales(row: any){
    this.dialog.open(MaterialesComponent,{
      width: '30%',
      data:row,
    } ).afterClosed().subscribe(val => {
        console.log(val)
        if(val === "guardar"){
          this.getAllMateriales();
        }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterTema(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTemas.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTemas.paginator) {
      this.dataSourceTemas.paginator.firstPage();
    }
  }

  applyFilterAlumno(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAlumno.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAlumno.paginator) {
      this.dataSourceAlumno.paginator.firstPage();
    }
  }

  applyFilterMaterial(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMateriales.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMateriales.paginator) {
      this.dataSourceMateriales.paginator.firstPage();
    }
  }

  deleteCurso(id:number){
    this.cursosService.deleteCurso(id)
    .subscribe({
      next:(res)=>{
        alert("Curso eliminado");
        this.getAllCursos();
      },
      error:(err)=>{
        alert("Error al eliminar curso");
      }
    })
  }

   deleteTema(id:number){
    this.temasService.deleteTema(id)
    .subscribe({
      next:(res)=>{
        alert("Tema eliminado");
        this.getAllTemas();
      },
      error:(err)=>{
        alert("Error al eliminar tema");
        alert(err);
       }
    })
  }

  deleteAlumno(id:number){
    this.alumnosService.deleteAlumno(id)
    .subscribe({
      next:(res)=>{
        alert("Alumno eliminado");
        this.getAllAlumnos();
      },
      error:(err)=>{
        alert("Error al eliminar Alumno");
      }
    })
  }

  deleteMaterial(id:number){
    this.materialesService.deleteMaterial(id)
    .subscribe({
      next:(res)=>{
        alert("Material eliminado");
        this.getAllMateriales();
      },
      error:(err)=>{
        alert("Error al eliminar material");
      }
    })
  }
}



