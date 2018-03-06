import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { post } from 'selenium-webdriver/http';

import {Clientes} from '../Modelos/Clientes'

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.css']
})
export class ClientesDetalleComponent implements OnInit {

  cliente: Clientes;
  rForm: FormGroup;
  post:any
  description: string = '';
  name: string = '';

  constructor(private fb: FormBuilder) { 
    this.rForm = fb.group({
      'strNombre': [null, Validators.required],
      'strAPaterno': [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      'validate': false
    })
  }

  ngOnInit() {
  }

  Aceptar(post: any): void{
    this.cliente = new Clientes();
    this.cliente.strNombre = post.strNombre;
    this.cliente.strAPaterno = post.strAPaterno;
    alert('Se guardo papi!!' + this.cliente);
  }

  Cancelar():void{

  }

}
