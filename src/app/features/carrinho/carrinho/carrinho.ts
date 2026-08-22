import { Component,inject } from '@angular/core';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
@Component({
  selector: 'app-carrinho',
  imports: [],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
carrinhoFacade =inject(CarrinhoFacade);
removerItem(index: number) {
  this.carrinhoFacade.removerItem(index);
}

limparCarrinho() {
  this.carrinhoFacade.limparCarrinho();
}

cancelarCompra() {
  this.carrinhoFacade.limparCarrinho();
  // depois adicione navegação, ex: this.router.navigate(['/produtos']);
}
}
