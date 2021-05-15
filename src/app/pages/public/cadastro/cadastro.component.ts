import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from 'src/app/services/professor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  professor: Professor;
  tipo: number = 1;

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });

  constructor(private service: ProfessorService, private toastr: ToastrService ) { }

  ngOnInit(): void {
    
  }

  incluir(){
      this.professor = {
      nome: this.cadastroForm.get('nome')?.value,
      email: this.cadastroForm.get('email')?.value,
      senha: this.cadastroForm.get('senha')?.value,
      tipo: this.tipo,
    };

    this.service.incluir(this.professor).subscribe((response)=>{
      this.toastr.success(response.mensagem);
    }, (err) => this.toastr.error(err.error.mensagem));
  
  }
}
