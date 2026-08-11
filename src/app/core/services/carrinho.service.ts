
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carrinho = signal<{nome: string; preco: number}[]>([]);
  itens = this.carrinho.asReadonly();

  quantidadeItens = computed(() => this.carrinho().length);

  totalItens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0)
  );

  adicionar(produto: {nome: string; preco: number}) {
    this.carrinho.update(listaAtual => [...listaAtual, produto]);
  }
}
