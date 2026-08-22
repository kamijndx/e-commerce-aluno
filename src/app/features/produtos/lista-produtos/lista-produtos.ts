import { Component, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { effect } from '@angular/core';
import { produtosService } from '../produtos.service';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, MatButtonModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

//!================ SIGNALS ======================

  produtos = signal<{nome: string; preco: number}[]>([]);

  carregando = signal(true);

  produtoSelecionado = signal <string | null>(null);

  carrinho = signal <{nome: string; preco: number}[]>([]);
erro = signal < string | null > (null);
//?================ COMPUTED ======================

  totalProdutos = computed(() => this.produtos().length);

  valorTotal = computed(() => {
    return this.produtos().reduce((total, item) =>
    total + item.preco,0
  )});


  //? ============== MÉTODO HTTP CLIENT (API) ============


  carregarProdutos(){

    this.erro.set(null);// limpar o erro antes de fazer a requisição
    this.carregando.set(true); //! ativar o sinal de carregando
    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos = this.produtosService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos: ', erro);
        this.erro.set('erro ao carregar protudos. Por favor, tente novamente');
        this.carregando.set(false);
      }
    });
  }

//** ================ CONSTRUCTOR ======================

  constructor(){
    
    //! Carrega a API
    this.carregarProdutos();

    //! effects continuam iguais - não mexer
  effect(() => {
    console.log('Lista de Produtos Alterados: ', this.produtos());
  });
  effect(() => {
    console.log('Valor Total Atualizado: ', this.valorTotal());
  });
  effect(() => {
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalProdutos()}) - Loja da Kamilly`;
    }
  });
}

//?================ MÉTODO UPDATE() ======================

  adicionarProduto(){
    this.produtos.update(listaAtual => [...listaAtual, 
      {nome:'Playstation 5', preco:3000},
    ]);
  }

  

//?================ MÉTODO SET() ======================
  //!função para substituir a lista atual usando o metodo set()
  substituirProdutos(){
    this.produtos.set([
      { nome:'Teclado', preco: 50 },
      { nome:'Mouse', preco: 15 },
      { nome:'Monitor', preco: 500 },
      { nome:'Desktop', preco: 1500 },
      { nome:'headset', preco: 30 },
    ]);
  }

//?================ MÉTODO EXISTENTE (NÃO MEXER) ======================

  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }

//** ================ INJECT ======================

private produtosService = inject(produtosService);

public carrinhoFacade= inject(CarrinhoFacade);

quantidadeCarrinho = this.carrinhoFacade.quantidade;

totalCarrinho = this.carrinhoFacade.total;

adicionarAoCarrinho(produto: {nome: string; preco: number }){
  this.carrinhoFacade.adicionarProduto(produto);
 }
}
