
import { Injectable, signal, computed } from '@angular/core';

type ItemCarrinho = {
  nome: string;
  preco: number;
}
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carrinho = signal<ItemCarrinho[]>([]);
  itens = this.carrinho.asReadonly();

  quantidadeItens = computed(() => this.carrinho().length);

  totalItens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0)
  );

  carrinhoVazio= computed(() => this.carrinho().length ===0)

  adicionar(produto: ItemCarrinho) {
    this.carrinho.update(listaAtual => [...listaAtual, produto]);
  }
limpar() {
  this.carrinho.set([]);
}

}
